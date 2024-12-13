package com.dev.ratesbe.repository;

import com.dev.ratesbe.repository.entity.CurrencyConversionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CurrencyConversionRepository extends JpaRepository<CurrencyConversionEntity, Long> {
}
