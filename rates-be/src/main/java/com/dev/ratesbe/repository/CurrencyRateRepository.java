package com.dev.ratesbe.repository;

import com.dev.ratesbe.repository.entity.CurrencyRateEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CurrencyRateRepository extends JpaRepository<CurrencyRateEntity, String> {
}
