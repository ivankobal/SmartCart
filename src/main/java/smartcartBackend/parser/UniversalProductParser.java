package smartcartBackend.parser;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Component;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

import java.net.URI;

@Component
public class UniversalProductParser implements ProductParserStrategy {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public boolean supports(String url) {
        return url != null && (url.startsWith("http://") || url.startsWith("https://"));
    }

    @Override
    public ParsedProductDto parse(String url) throws Exception {
        Document doc = Jsoup.connect(url)
                .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36")
                .header("Accept-Language", "uk-UA,uk;q=0.9,en-US;q=0.8,en;q=0.7")
                .timeout(12000)
                .get();

        ParsedProductDto dto = new ParsedProductDto();
        dto.setSourceUrl(url);
        dto.setShopName(extractDomainName(url));

        extractFromJsonLd(doc, dto);

        if (isBlank(dto.getTitle())) {
            String ogTitle = getMetaContent(doc, "meta[property=og:title]");
            dto.setTitle(!isBlank(ogTitle) ? ogTitle : doc.title());
        }

        if (isBlank(dto.getImg())) {
            String ogImage = getMetaContent(doc, "meta[property=og:image]");
            if (!isBlank(ogImage)) {
                dto.setImg(ogImage);
            } else {
                Element firstImg = doc.selectFirst("img[src^=http]");
                dto.setImg(firstImg != null ? firstImg.absUrl("src") : "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500");
            }
        }

        if (isBlank(dto.getSpecs())) {
            String ogDesc = getMetaContent(doc, "meta[property=og:description]");
            String metaDesc = getMetaContent(doc, "meta[name=description]");
            String rawDesc = !isBlank(ogDesc) ? ogDesc : metaDesc;
            dto.setSpecs(!isBlank(rawDesc) ? truncate(rawDesc, 220) : "Imported from " + dto.getShopName());
        }

        if (dto.getNumericPrice() == null || dto.getNumericPrice() <= 0) {
            String metaPrice = getMetaContent(doc, "meta[property=product:price:amount]");
            if (!isBlank(metaPrice)) {
                dto.setNumericPrice(parsePriceNumber(metaPrice));
            } else {
                Element priceEl = doc.selectFirst("[itemprop=price], .product-price__big, .price__value, .product-price, .price");
                if (priceEl != null) {
                    String raw = priceEl.hasAttr("content") ? priceEl.attr("content") : priceEl.text();
                    dto.setNumericPrice(parsePriceNumber(raw));
                }
            }
        }

        if (isBlank(dto.getBrand())) {
            String metaBrand = getMetaContent(doc, "meta[property=product:brand], meta[itemprop=brand]");
            if (!isBlank(metaBrand)) {
                dto.setBrand(metaBrand);
            } else if (!isBlank(dto.getTitle())) {
                dto.setBrand(dto.getTitle().split("\\s+")[0]);
            } else {
                dto.setBrand(dto.getShopName());
            }
        }

        if (isBlank(dto.getTitle())) {
            throw new IllegalStateException("Could not extract product title from the provided URL.");
        }

        if (dto.getNumericPrice() == null || dto.getNumericPrice() <= 0) {
            dto.setNumericPrice(0.0);
        }

        return dto;
    }

    private void extractFromJsonLd(Document doc, ParsedProductDto dto) {
        Elements scripts = doc.select("script[type=application/ld+json]");
        for (Element script : scripts) {
            try {
                JsonNode root = objectMapper.readTree(script.html());
                JsonNode productNode = findProductNode(root);
                if (productNode != null) {
                    if (productNode.has("name")) {
                        dto.setTitle(productNode.get("name").asText().trim());
                    }
                    if (productNode.has("description")) {
                        dto.setSpecs(truncate(Jsoup.parse(productNode.get("description").asText()).text(), 220));
                    }
                    if (productNode.has("brand")) {
                        JsonNode brandNode = productNode.get("brand");
                        if (brandNode.isTextual()) {
                            dto.setBrand(brandNode.asText().trim());
                        } else if (brandNode.has("name")) {
                            dto.setBrand(brandNode.get("name").asText().trim());
                        }
                    }
                    if (productNode.has("image")) {
                        JsonNode imgNode = productNode.get("image");
                        if (imgNode.isTextual()) {
                            dto.setImg(imgNode.asText().trim());
                        } else if (imgNode.isArray() && !imgNode.isEmpty()) {
                            JsonNode first = imgNode.get(0);
                            dto.setImg(first.isTextual() ? first.asText() : first.path("url").asText());
                        } else if (imgNode.has("url")) {
                            dto.setImg(imgNode.get("url").asText().trim());
                        }
                    }
                    if (productNode.has("offers")) {
                        JsonNode offers = productNode.get("offers");
                        JsonNode targetOffer = offers.isArray() && !offers.isEmpty() ? offers.get(0) : offers;
                        String rawPrice = targetOffer.has("price")
                                ? targetOffer.get("price").asText()
                                : targetOffer.path("lowPrice").asText();
                        Double parsed = parsePriceNumber(rawPrice);
                        if (parsed != null && parsed > 0) {
                            dto.setNumericPrice(parsed);
                        }
                    }
                    break;
                }
            } catch (Exception ignored) {
            }
        }
    }

    private JsonNode findProductNode(JsonNode node) {
        if (node == null) return null;
        if (node.isObject()) {
            String type = node.path("@type").asText("");
            if ("Product".equalsIgnoreCase(type)) {
                return node;
            }
            if (node.has("@graph") && node.get("@graph").isArray()) {
                for (JsonNode item : node.get("@graph")) {
                    JsonNode found = findProductNode(item);
                    if (found != null) return found;
                }
            }
        } else if (node.isArray()) {
            for (JsonNode item : node) {
                JsonNode found = findProductNode(item);
                if (found != null) return found;
            }
        }
        return null;
    }

    private String getMetaContent(Document doc, String cssQuery) {
        Element el = doc.selectFirst(cssQuery);
        return el != null ? el.attr("content").trim() : "";
    }

    private Double parsePriceNumber(String raw) {
        if (isBlank(raw)) return null;
        String cleaned = raw.replaceAll("[^0-9.,]", "").replace(",", ".");
        int lastDot = cleaned.lastIndexOf('.');
        if (lastDot > 0 && cleaned.length() - lastDot > 3) {
            cleaned = cleaned.replace(".", "");
        }
        try {
            return Double.parseDouble(cleaned);
        } catch (NumberFormatException e) {
            return null;
        }
    }

    private String extractDomainName(String url) {
        try {
            String host = URI.create(url).getHost();
            return host != null ? host.replaceFirst("^www\\.", "") : "External Store";
        } catch (Exception e) {
            return "External Store";
        }
    }

    private String truncate(String text, int maxLen) {
        if (text == null) return "";
        String singleLine = text.replaceAll("\\s+", " ").trim();
        return singleLine.length() > maxLen ? singleLine.substring(0, maxLen - 3) + "..." : singleLine;
    }

    private boolean isBlank(String s) {
        return s == null || s.trim().isEmpty();
    }
}