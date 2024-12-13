package com.dev.ratesbe.service;

import com.dev.ratesbe.mapper.CurrencyConversionMapper;
import com.dev.ratesbe.mapper.CurrencyRateMapper;
import com.dev.ratesbe.repository.CurrencyConversionRepository;
import com.dev.ratesbe.repository.CurrencyRateRepository;
import com.dev.ratesbe.repository.entity.CurrencyConversionEntity;
import com.dev.ratesbe.repository.entity.CurrencyRateEntity;
import com.dev.ratesbe.service.domain.CurrencyConversion;
import com.dev.ratesbe.service.domain.CurrencyRate;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CurrencyRateService {

    private final CurrencyRateRepository currencyRateRepository;
    private final CurrencyConversionRepository currencyConversionRepository;

    private final CurrencyRateMapper currencyRateMapper;
    private final CurrencyConversionMapper currencyConversionMapper;

    public List<CurrencyRate> getCurrencyRates() {
        List<CurrencyRateEntity> currencyRateEntities = currencyRateRepository.findAll();
        return currencyRateMapper.toDomains(currencyRateEntities);
    }

    public List<CurrencyConversion> getCurrencyConversion() {
        List<CurrencyConversionEntity> currencyConversionEntities = currencyConversionRepository.findAll();
        return currencyConversionMapper.toDomains(currencyConversionEntities);
    }

    public Long saveCurrencyConversion(CurrencyConversion currencyConversion) {
        CurrencyConversionEntity currencyConversionEntity = currencyConversionMapper.toEntity(currencyConversion);
        return currencyConversionRepository.save(currencyConversionEntity).getId();
    }

}
