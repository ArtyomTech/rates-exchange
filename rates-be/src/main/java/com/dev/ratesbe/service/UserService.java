package com.dev.ratesbe.service;

import com.dev.ratesbe.mapper.UserMapper;
import com.dev.ratesbe.repository.UserRepository;
import com.dev.ratesbe.repository.entity.UserEntity;
import com.dev.ratesbe.service.domain.RegisterResponse;
import com.dev.ratesbe.service.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public RegisterResponse registerUser(User user) {
        try {
            if (userRepository.existsByUsername(user.getUsername())) {
                return new RegisterResponse(
                        "Username is already taken",
                        false,
                        null
                );
            }

            if (userRepository.existsByEmail(user.getEmail())) {
                return new RegisterResponse(
                        "Email is already registered",
                        false,
                        null
                );
            }

            UserEntity userEntity = userMapper.toEntity(user);
            userEntity.setPassword(passwordEncoder.encode(user.getPassword()));
            userRepository.save(userEntity);

            return new RegisterResponse(
                    "User registered successfully",
                    true,
                    userEntity.getUsername()
            );

        } catch (DataIntegrityViolationException e) {
            return new RegisterResponse(
                    "Registration failed: " + e.getMostSpecificCause().getMessage(),
                    false,
                    null
            );
        } catch (Exception e) {
            return new RegisterResponse(
                    "Registration failed: " + e.getMessage(),
                    false,
                    null
            );
        }
    }

}
