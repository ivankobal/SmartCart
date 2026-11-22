package smartcartBackend.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import smartcartBackend.model.Product;
import smartcartBackend.service.ParserService;
import smartcartBackend.service.ScheduledParserJob;

import java.util.Map;

@RestController
@RequestMapping("/api/parser")
public class ParserController {

    private final ParserService parserService;
    private final ScheduledParserJob scheduledParserJob;

    @Value("${smartcart.admin.secret}")
    private String adminSecret;

    public ParserController(ParserService parserService, ScheduledParserJob scheduledParserJob) {
        this.parserService = parserService;
        this.scheduledParserJob = scheduledParserJob;
    }

    @PostMapping("/sync")
    public ResponseEntity<?> triggerManualSync(
            @RequestHeader(value = "X-Admin-Key", required = false) String providedKey
    ) {
        if (!isAuthorized(providedKey)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("message", "Access denied: invalid admin key"));
        }

        scheduledParserJob.syncCatalogSources();
        return ResponseEntity.ok(Map.of("message", "Catalog synchronization completed"));
    }

    @PostMapping("/import-url")
    public ResponseEntity<?> importProductByUrl(
            @RequestHeader(value = "X-Admin-Key", required = false) String providedKey,
            @RequestBody Map<String, String> payload
    ) {
        if (!isAuthorized(providedKey)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("message", "Access denied: invalid admin key"));
        }

        String url = payload.get("url");
        String section = payload.get("section");
        String category = payload.get("category");

        if (url == null || url.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Product URL is required"));
        }

        try {
            Product saved = parserService.parseAndSaveProduct(url.trim(), section, category);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "message", "Failed to parse URL: " + e.getMessage()
            ));
        }
    }

    private boolean isAuthorized(String providedKey) {
        return providedKey != null && providedKey.equals(adminSecret);
    }
}