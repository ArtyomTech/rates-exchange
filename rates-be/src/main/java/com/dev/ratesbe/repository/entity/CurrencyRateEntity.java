package com.dev.ratesbe.repository.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "currency_rate", uniqueConstraints = @UniqueConstraint(columnNames = "currency"))
public class CurrencyRateEntity {

    @Id
    @Column(nullable = false)
    private String currency;

    @Column(nullable = false)
    private double rate;

    @Column(nullable = false)
    private String date;

}
