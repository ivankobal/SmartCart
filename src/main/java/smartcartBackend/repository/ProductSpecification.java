package smartcartBackend.repository;

import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import smartcartBackend.model.Product;

import java.util.ArrayList;
import java.util.List;

public class ProductSpecification {

    public static Specification<Product> withFilters(
            String search,
            List<String> sections,
            List<String> categories,
            List<String> brands,
            Double minPrice,
            Double maxPrice
    ) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (search != null && !search.trim().isEmpty()) {
                String[] tokens = search.trim().toLowerCase().split("\\s+");
                for (String token : tokens) {
                    String pattern = "%" + token + "%";
                    Predicate titleMatch = cb.like(cb.lower(root.get("title")), pattern);
                    Predicate brandMatch = cb.like(cb.lower(root.get("brand")), pattern);
                    Predicate sectionMatch = cb.like(cb.lower(root.get("section")), pattern);
                    Predicate categoryMatch = cb.like(cb.lower(root.get("category")), pattern);
                    Predicate specsMatch = cb.like(cb.lower(root.get("specs")), pattern);
                    predicates.add(cb.or(titleMatch, brandMatch, sectionMatch, categoryMatch, specsMatch));
                }
            }

            if (sections != null && !sections.isEmpty()) {
                predicates.add(root.get("section").in(sections));
            }

            if (categories != null && !categories.isEmpty()) {
                predicates.add(root.get("category").in(categories));
            }

            if (brands != null && !brands.isEmpty()) {
                predicates.add(root.get("brand").in(brands));
            }

            if (minPrice != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("numericPrice"), minPrice));
            }

            if (maxPrice != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("numericPrice"), maxPrice));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}