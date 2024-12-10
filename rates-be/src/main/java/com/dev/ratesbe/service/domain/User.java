package com.dev.ratesbe.service.domain;

import lombok.Value;

@Value
public class User {

    Long id;
    String username;
    String email;
    String password;

}
