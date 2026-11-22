package smartcartBackend.service;

import jakarta.annotation.PostConstruct;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import smartcartBackend.model.Product;
import smartcartBackend.repository.ProductRepository;
import smartcartBackend.repository.ProductSpecification;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @PostConstruct
    public void initData() {
        if (productRepository.count() == 0) {
            productRepository.saveAll(List.of(
                    new Product("Sony WH-1000XM5", "Sony", "electronics", "headphones", 14999.0, "14 999 ₴", "ANC, 30h battery, Bluetooth 5.2", "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500"),
                    new Product("Apple AirPods Max", "Apple", "electronics", "headphones", 22499.0, "22 499 ₴", "Spatial Audio, H1 chip, Aluminum", "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?w=500"),
                    new Product("Apple MacBook Air M2", "Apple", "electronics", "laptops", 45499.0, "45 499 ₴", "13.6\" Liquid Retina, 8GB/256GB", "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500"),
                    new Product("ASUS ROG Zephyrus G14", "ASUS", "electronics", "laptops", 64999.0, "64 999 ₴", "Ryzen 9, RTX 4060, 16GB RAM, 165Hz", "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500"),
                    new Product("iPhone 15 Pro 256GB", "Apple", "electronics", "smartphones", 49999.0, "49 999 ₴", "A17 Pro, Titanium, 48MP Camera", "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500"),
                    new Product("Samsung Galaxy S24 Ultra", "Samsung", "electronics", "smartphones", 53999.0, "53 999 ₴", "Snapdragon 8 Gen 3, S-Pen, 200MP", "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500"),
                    new Product("Apple Watch Ultra 2", "Apple", "electronics", "watches", 33999.0, "33 999 ₴", "49mm Titanium, GPS + Cellular, 36h", "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500"),
                    new Product("Marshall Stanmore III", "Marshall", "electronics", "audio", 16499.0, "16 499 ₴", "80W Bluetooth 5.2 Home Speaker", "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500"),

                    new Product("DeLonghi Magnifica Evo", "DeLonghi", "appliances", "kitchen_appliances", 21999.0, "21 999 ₴", "1450W, Automatic Cappuccino, 15 bar", "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500"),
                    new Product("Philips Airfryer XXL", "Philips", "appliances", "kitchen_appliances", 8499.0, "8 499 ₴", "2225W, Rapid Air, 7.3L capacity", "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500"),
                    new Product("Dyson V15 Detect Absolute", "Dyson", "appliances", "vacuum_cleaners", 29999.0, "29 999 ₴", "240 AW, Laser Slim Fluffy, 60 min runtime", "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500"),
                    new Product("Roborock S8 Pro Ultra", "Roborock", "appliances", "vacuum_cleaners", 42999.0, "42 999 ₴", "6000Pa, Self-washing & drying dock", "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=500"),

                    new Product("Lavazza Qualita Oro 1kg", "Lavazza", "groceries", "coffee_tea", 689.0, "689 ₴", "100% Arabica, Whole Bean, Medium Roast", "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500"),
                    new Product("Halychyna Milk 2.5% 900g", "Halychyna", "groceries", "dairy_eggs", 46.0, "46 ₴", "Ultra-pasteurized, pure Carpathian milk", "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500"),
                    new Product("Komo Tenero Cheese 50% 150g", "Komo", "groceries", "dairy_eggs", 74.0, "74 ₴", "Semi-hard creamy cheese, sliced", "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=500"),
                    new Product("Barilla Spaghetti No.5 500g", "Barilla", "groceries", "grains_pasta", 65.0, "65 ₴", "Durum wheat semolina, 9 min cooking time", "https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=500"),
                    new Product("Morshynska Still Water 1.5L", "Morshynska", "groceries", "beverages", 24.0, "24 ₴", "Natural mineral table water, non-carbonated", "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=500"),

                    new Product("Ariel Pods All-in-1 44pcs", "Ariel", "household", "cleaning", 649.0, "649 ₴", "Color protection, deep stain removal", "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500"),
                    new Product("Fairy Dishwashing Liquid 900ml", "Fairy", "household", "cleaning", 119.0, "119 ₴", "Concentrated formula, lemon scent", "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=500"),

                    new Product("Bosch GSR 18V-50 Drill Driver", "Bosch", "tools", "power_tools", 6899.0, "6 899 ₴", "Brushless motor, 50 Nm, 2x 2.0Ah batteries", "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=500")
            ));
        }
    }

    public List<Product> getProducts(
            String search,
            List<String> sections,
            List<String> categories,
            List<String> brands,
            Double minPrice,
            Double maxPrice,
            String sortBy
    ) {
        Sort sort = Sort.by("id").ascending();

        if ("price_asc".equals(sortBy)) {
            sort = Sort.by("numericPrice").ascending();
        } else if ("price_desc".equals(sortBy)) {
            sort = Sort.by("numericPrice").descending();
        }

        Specification<Product> spec = ProductSpecification.withFilters(
                search, sections, categories, brands, minPrice, maxPrice
        );

        return productRepository.findAll(spec, sort);
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }
}