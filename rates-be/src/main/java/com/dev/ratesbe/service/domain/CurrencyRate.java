package com.dev.ratesbe.service.domain;

import lombok.Value;

@Value
public class CurrencyRate {

    String currency;
    double rate;
    String date;

}
