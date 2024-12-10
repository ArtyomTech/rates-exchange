package com.dev.ratesbe.mapper;

import com.dev.ratesbe.repository.entity.CurrencyRateEntity;
import com.dev.ratesbe.service.domain.CurrencyRate;
import org.mapstruct.Mapper;

import java.util.Set;

@Mapper(componentModel = "spring")
public interface CurrencyRateMapper {

    Set<CurrencyRate> toDomains(Set<CurrencyRateEntity> entities);

}
