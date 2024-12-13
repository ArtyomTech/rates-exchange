package com.dev.ratesbe.repository.entity;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

import static java.util.Objects.isNull;

@Data
@Entity
@Table(name = "currency_conversion")
public class CurrencyConversionEntity {

    private static final String BASE_EXCHANGE_URL =
            "https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/eurofxref-graph-";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fromCurrency;

    @Column(nullable = false)
    private String toCurrency;

    @Column(nullable = false)
    private Double amount;

    @Column(nullable = false)
    private Double result;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false, updatable = false)
    private String fromExchangeRateLink;

    @Column(nullable = false, updatable = false)
    private String toExchangeRateLink;

    @PrePersist
    private void prePersist() {
        if (isNull(createdAt)) {
            createdAt = LocalDateTime.now();
        }
        if (isNull(fromExchangeRateLink)) {
            fromExchangeRateLink = buildExchangeRateLink(fromCurrency);
        }
        if (isNull(toExchangeRateLink)) {
            toExchangeRateLink = buildExchangeRateLink(toCurrency);
        }
    }

    private String buildExchangeRateLink(String currency) {
        return String.format("%s%s.en.html", BASE_EXCHANGE_URL, currency.toLowerCase());
    }

}
