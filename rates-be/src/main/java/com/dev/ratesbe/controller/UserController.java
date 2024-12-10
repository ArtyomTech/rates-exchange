package com.dev.ratesbe.controller;

import com.dev.ratesbe.config.JwtTokenProvider;
import com.dev.ratesbe.service.UserService;
import com.dev.ratesbe.service.domain.LoginResponse;
import com.dev.ratesbe.service.domain.RegisterResponse;
import com.dev.ratesbe.service.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody User user) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
            );
            String jwt = jwtTokenProvider.generateToken(authentication);
            return ResponseEntity.ok(new LoginResponse("Login succeeded", true, jwt));
        } catch (BadCredentialsException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new LoginResponse("Incorrect credentials", false, null));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@RequestBody User user) {
        RegisterResponse registerResponse = userService.registerUser(user);
        if (registerResponse.isSuccess()) {
            return ResponseEntity.status(HttpStatus.CREATED).body(registerResponse);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(registerResponse);
        }
    }

}
