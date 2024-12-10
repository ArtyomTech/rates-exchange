package com.dev.ratesbe.startup;

import com.dev.ratesbe.repository.CurrencyRateRepository;
import com.dev.ratesbe.repository.entity.CurrencyRateEntity;
import com.dev.ratesbe.service.domain.Envelope;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import java.io.StringReader;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class StartupCurrencyRateFetcher implements CommandLineRunner {

    private final CurrencyRateRepository currencyRateRepository;

    @Override
    public void run(String... args) throws Exception {
        String url = "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml";
        RestTemplate restTemplate = new RestTemplate();
        String xmlResponse = restTemplate.getForObject(url, String.class);
        List<Envelope.CurrencyRateEntry> currencyRates = parseCurrencyRates(xmlResponse);
        for (Envelope.CurrencyRateEntry entry : currencyRates) {
            CurrencyRateEntity rate = CurrencyRateEntity.builder()
                    .currency(entry.getCurrency())
                    .rate(entry.getRate())
                    .date(entry.getDate())
                    .build();
            currencyRateRepository.save(rate);
        }

        log.info("Currency rates have been saved to the database.");
    }

    private List<Envelope.CurrencyRateEntry> parseCurrencyRates(String xml) throws JAXBException {
        JAXBContext context = JAXBContext.newInstance(Envelope.class);
        Unmarshaller unmarshaller = context.createUnmarshaller();
        Envelope envelope = (Envelope) unmarshaller.unmarshal(new StringReader(xml));
        return envelope.getCurrencyRates();
    }

}
