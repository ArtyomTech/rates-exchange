package com.dev.ratesbe.service.domain;

import lombok.Value;

@Value
public class LoginResponse {

    String message;
    boolean isSuccess;
    String username;
    String token;

}
