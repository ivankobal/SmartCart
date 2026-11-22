package smartcartBackend.parser;


public interface ProductParserStrategy {
    boolean supports(String url);
    ParsedProductDto parse(String url) throws Exception;
}