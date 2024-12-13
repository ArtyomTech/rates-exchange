package com.dev.ratesbe.mapper;

import com.dev.ratesbe.repository.entity.CurrencyConversionEntity;
import com.dev.ratesbe.service.domain.CurrencyConversion;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CurrencyConversionMapper {

    List<CurrencyConversion> toDomains(List<CurrencyConversionEntity> entities);
    CurrencyConversionEntity toEntity(CurrencyConversion domain);

}
