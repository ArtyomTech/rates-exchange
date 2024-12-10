package com.dev.ratesbe.repository;

import com.dev.ratesbe.repository.entity.CurrencyRateEntity;
import org.springframework.data.repository.CrudRepository;

public interface CurrencyRateRepository extends CrudRepository<CurrencyRateEntity, String> {
}
