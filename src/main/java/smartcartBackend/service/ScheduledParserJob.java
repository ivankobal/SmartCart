package smartcartBackend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import smartcartBackend.parser.ParserSourcesConfig;

@Component
public class ScheduledParserJob {

    private static final Logger log = LoggerFactory.getLogger(ScheduledParserJob.class);
    private final ParserService parserService;

    public ScheduledParserJob(ParserService parserService) {
        this.parserService = parserService;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void runOnStartup() {
        syncCatalogSources();
    }

    @Scheduled(fixedRate = 21600000)
    public void syncCatalogSources() {
        if (ParserSourcesConfig.INITIAL_SOURCES.isEmpty()) {
            return;
        }

        log.info("Starting scheduled catalog sync for {} sources...", ParserSourcesConfig.INITIAL_SOURCES.size());
        for (ParserSourcesConfig.SeedSource source : ParserSourcesConfig.INITIAL_SOURCES) {
            try {
                parserService.parseAndSaveProduct(source.url(), source.section(), source.category());
                log.info("Successfully synced: {}", source.url());
            } catch (Exception e) {
                log.warn("Failed to sync source {}: {}", source.url(), e.getMessage());
            }
        }
    }
}