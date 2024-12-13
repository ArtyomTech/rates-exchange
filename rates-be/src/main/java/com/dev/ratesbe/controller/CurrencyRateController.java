package com.dev.ratesbe.controller;

import com.dev.ratesbe.service.CurrencyRateService;
import com.dev.ratesbe.service.domain.CurrencyConversion;
import com.dev.ratesbe.service.domain.CurrencyRate;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/v1/currency-rates")
@RequiredArgsConstructor
public class CurrencyRateController {

    private final CurrencyRateService currencyRateService;

    @GetMapping
    public ResponseEntity<List<CurrencyRate>> getCurrencyRates() {
        List<CurrencyRate> currencyRates = currencyRateService.getCurrencyRates();
        return ResponseEntity.ok(currencyRates);
    }

    @GetMapping("/conversions")
    public ResponseEntity<List<CurrencyConversion>> getCurrencyConversions() {
        List<CurrencyConversion> currencyConversions = currencyRateService.getCurrencyConversion();
        return ResponseEntity.ok(currencyConversions);
    }

    @PostMapping("/conversion")
    public ResponseEntity<Long> saveCurrencyConversion(@Valid @RequestBody CurrencyConversion currencyConversion) {
        Long currencyConversionId = currencyRateService.saveCurrencyConversion(currencyConversion);
        return ResponseEntity.ok(currencyConversionId);
    }

}
