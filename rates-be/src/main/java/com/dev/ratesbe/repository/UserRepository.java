package com.dev.ratesbe.repository;

import com.dev.ratesbe.repository.entity.UserEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<UserEntity, Integer> {

    Optional<UserEntity> findByUsername(String username);
    Optional<UserEntity> findByUsernameAndEmail(String username, String email);

}
