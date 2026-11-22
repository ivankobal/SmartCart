package smartcartBackend.parser;


import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ParsedProductDto {
    private String title;
    private String brand;
    private Double numericPrice;
    private String specs;
    private String img;
    private String shopName;
    private String sourceUrl;
}