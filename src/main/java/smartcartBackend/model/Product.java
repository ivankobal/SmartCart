package smartcartBackend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
@Getter
@NoArgsConstructor
@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String brand;

    private String section;

    private String category;

    private Double numericPrice;

    private String price;

    @Column(length = 1000)
    private String specs;

    @Column(length = 1000)
    private String img;

    private String shopName;

    @Column(length = 1000)
    private String sourceUrl;

    public Product(String title, String brand, String section, String category, Double numericPrice, String price, String specs, String img) {
        this.title = title;
        this.brand = brand;
        this.section = section;
        this.category = category;
        this.numericPrice = numericPrice;
        this.price = price;
        this.specs = specs;
        this.img = img;
    }

    public void setId(Long id) { this.id = id; }

    public void setTitle(String title) { this.title = title; }

    public void setBrand(String brand) { this.brand = brand; }

    public void setSection(String section) { this.section = section; }

    public void setCategory(String category) { this.category = category; }

    public void setNumericPrice(Double numericPrice) { this.numericPrice = numericPrice; }

    public void setPrice(String price) { this.price = price; }

    public void setSpecs(String specs) { this.specs = specs; }

    public void setImg(String img) { this.img = img; }

    public void setShopName(String shopName) { this.shopName = shopName; }

    public void setSourceUrl(String sourceUrl) { this.sourceUrl = sourceUrl; }
}