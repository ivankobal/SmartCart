package smartcartBackend.service;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;
import smartcartBackend.model.Product;
import smartcartBackend.parser.ParsedProductDto;
import smartcartBackend.parser.ProductParserStrategy;
import smartcartBackend.repository.ProductRepository;

import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.util.*;

@Service
public class ParserService {

    private final List<ProductParserStrategy> strategies;
    private final ProductRepository productRepository;

    public ParserService(List<ProductParserStrategy> strategies, ProductRepository productRepository) {
        this.strategies = strategies;
        this.productRepository = productRepository;
    }
    public List<Product> parseBulkFromPage(String pageUrl, String linkCssSelector, String section, String category, int limit) throws Exception {
        Document doc = Jsoup.connect(pageUrl)
                .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36")
                .timeout(15000)
                .get();

        Elements links = doc.select(linkCssSelector);
        Set<String> uniqueUrls = new LinkedHashSet<>();

        for (Element link : links) {
            String absUrl = link.absUrl("href");
            if (absUrl.isEmpty()) {
                absUrl = link.text().trim();
            }
            if (absUrl.startsWith("http")) {
                uniqueUrls.add(absUrl);
            }
            if (uniqueUrls.size() >= limit) {
                break;
            }
        }

        List<Product> savedProducts = new ArrayList<>();
        for (String productUrl : uniqueUrls) {
            try {
                Product saved = parseAndSaveProduct(productUrl, section, category);
                savedProducts.add(saved);
                Thread.sleep(700);
            } catch (Exception ignored) {

            }
        }
        return savedProducts;
    }

    public Product parseAndSaveProduct(String url, String section, String category) throws Exception {
        ProductParserStrategy strategy = strategies.stream()
                .filter(s -> s.supports(url))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Unsupported URL format: " + url));

        ParsedProductDto parsed = strategy.parse(url);

        Product product = productRepository.findBySourceUrl(url)
                .orElseGet(Product::new);

        product.setTitle(parsed.getTitle());
        product.setBrand(parsed.getBrand());
        product.setSection(section != null && !section.isBlank() ? section : "electronics");
        product.setCategory(category != null && !category.isBlank() ? category : "smartphones");
        product.setNumericPrice(parsed.getNumericPrice());
        product.setPrice(formatPriceUah(parsed.getNumericPrice()));
        product.setSpecs(parsed.getSpecs());
        product.setImg(parsed.getImg());
        product.setShopName(parsed.getShopName());
        product.setSourceUrl(parsed.getSourceUrl());

        return productRepository.save(product);
    }

    private String formatPriceUah(Double numericPrice) {
        if (numericPrice == null || numericPrice <= 0) {
            return "Price on request";
        }
        DecimalFormatSymbols symbols = new DecimalFormatSymbols(Locale.US);
        symbols.setGroupingSeparator(' ');
        DecimalFormat formatter = new DecimalFormat("#,###", symbols);
        return formatter.format(Math.round(numericPrice)) + " ₴";
    }
}