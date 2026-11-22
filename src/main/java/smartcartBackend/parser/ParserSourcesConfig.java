package smartcartBackend.parser;

import java.util.List;

public class ParserSourcesConfig {

    public record SeedSource(String url, String section, String category) {}

    public static final List<SeedSource> INITIAL_SOURCES = List.of(
            new SeedSource("https://rozetka.com.ua/ua/asus-90nb15f1-m00kn0/p622282556/", "electronics", "laptops"),
            new SeedSource("https://rozetka.com.ua/ua/hp-dy8u4ea/p622996421/", "electronics", "laptops"),
            new SeedSource("https://rozetka.com.ua/ua/apple-mhfd4ua-a/p580756606/", "electronics", "laptops")
    );
}