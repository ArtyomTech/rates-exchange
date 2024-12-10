package com.dev.ratesbe.mapper;

import com.dev.ratesbe.repository.entity.UserEntity;
import com.dev.ratesbe.service.domain.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserEntity toEntity(User domain);

}
