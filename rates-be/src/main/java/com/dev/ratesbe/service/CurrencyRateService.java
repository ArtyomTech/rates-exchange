package com.dev.ratesbe.service;

import com.dev.ratesbe.mapper.CurrencyRateMapper;
import com.dev.ratesbe.repository.CurrencyRateRepository;
import com.dev.ratesbe.repository.entity.CurrencyRateEntity;
import com.dev.ratesbe.service.domain.CurrencyRate;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Set;

import static java.util.stream.Collectors.toSet;
import static java.util.stream.StreamSupport.stream;

@Service
@RequiredArgsConstructor
public class CurrencyRateService {

    private final CurrencyRateRepository currencyRateRepository;
    private final CurrencyRateMapper currencyRateMapper;

    public Set<CurrencyRate> getCurrencyRates() {
        Set<CurrencyRateEntity> currencyRateEntities = stream(
                currencyRateRepository.findAll().spliterator(),
                false
        ).collect(toSet());
        return currencyRateMapper.toDomains(currencyRateEntities);
    }

}
