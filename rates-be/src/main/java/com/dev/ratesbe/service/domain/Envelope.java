package com.dev.ratesbe.service.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.xml.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

import static java.util.Objects.nonNull;

@Data
@XmlRootElement(name = "Envelope", namespace = "http://www.gesmes.org/xml/2002-08-01")
@XmlAccessorType(XmlAccessType.FIELD)
public class Envelope {

    @XmlElement(name = "Cube", namespace = "http://www.ecb.int/vocabulary/2002-08-01/eurofxref")
    private Cube cube;

    public List<CurrencyRateEntry> getCurrencyRates() {
        List<CurrencyRateEntry> currencyRateEntries = new ArrayList<>();
        if (nonNull(cube) && nonNull(cube.getTimeCubes())) {
            for (Cube.TimeCube timeCube : cube.getTimeCubes()) {
                if (nonNull(timeCube.getCurrencyCubes())) {
                    for (Cube.CurrencyCube currencyCube : timeCube.getCurrencyCubes()) {
                        CurrencyRateEntry entry = CurrencyRateEntry
                                .builder()
                                .currency(currencyCube.getCurrency())
                                .rate(currencyCube.getRate())
                                .date(timeCube.getTime())
                                .build();
                        currencyRateEntries.add(entry);
                    }
                }
            }
        }
        return currencyRateEntries;
    }

    @Data
    @XmlAccessorType(XmlAccessType.FIELD)
    public static class Cube {

        @XmlElement(name = "Cube", namespace = "http://www.ecb.int/vocabulary/2002-08-01/eurofxref")
        private List<TimeCube> timeCubes;

        @Data
        @XmlAccessorType(XmlAccessType.FIELD)
        public static class TimeCube {

            @XmlAttribute(name = "time")
            private String time;

            @XmlElement(name = "Cube", namespace = "http://www.ecb.int/vocabulary/2002-08-01/eurofxref")
            private List<CurrencyCube> currencyCubes;
        }

        @Data
        @XmlAccessorType(XmlAccessType.FIELD)
        public static class CurrencyCube {

            @XmlAttribute(name = "currency")
            private String currency;

            @XmlAttribute(name = "rate")
            private double rate;
        }
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CurrencyRateEntry {
        private String currency;
        private double rate;
        private String date;
    }

}
