package com.dev.ratesbe.controller;

import com.dev.ratesbe.service.CurrencyRateService;
import com.dev.ratesbe.service.domain.CurrencyRate;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/v1/currency-rates")
@RequiredArgsConstructor
public class CurrencyRateController {

    private final CurrencyRateService currencyRateService;

    @GetMapping
    public ResponseEntity<Set<CurrencyRate>> getCurrencyRates() {
        Set<CurrencyRate> currencyRates = currencyRateService.getCurrencyRates();
        return ResponseEntity.ok(currencyRates);
    }

}
