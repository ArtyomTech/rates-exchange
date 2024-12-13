package com.dev.ratesbe.service.domain;

import lombok.Value;

import javax.validation.constraints.Max;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Value
public class CurrencyConversion {

    @NotNull
    String fromCurrency;

    @NotNull
    String toCurrency;

    @NotNull
    @Max(value = 1_000_000, message = "Amount must not exceed 1,000,000")
    Double amount;

    @NotNull
    Double result;

    LocalDateTime createdAt;

    String fromExchangeRateLink;

    String toExchangeRateLink;

}
