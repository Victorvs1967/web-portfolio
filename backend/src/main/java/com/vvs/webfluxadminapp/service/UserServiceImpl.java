package com.vvs.webfluxadminapp.service;

import java.time.Instant;
import java.util.Date;

import com.vvs.webfluxadminapp.dto.UserDto;
import com.vvs.webfluxadminapp.error.exception.UserNotFoundException;
import com.vvs.webfluxadminapp.mapper.AppMapper;
import com.vvs.webfluxadminapp.model.User;
import com.vvs.webfluxadminapp.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

  private final UserRepository userRepository;
  private final AppMapper appMapper;

  @Override
  public Mono<UserDto> getUser(String username) {
    return userRepository.findUserByUsername(username)
      .switchIfEmpty(Mono.error(UserNotFoundException::new))
      .map(user -> appMapper.convert(user, UserDto.class));
  }

  @Override
  public Flux<UserDto> getUsers() {
    return userRepository.findAll()
      .map(user -> appMapper.convert(user, UserDto.class));
  }

  @Override
  public Mono<UserDto> updateUserData(UserDto userDto) {
    return userRepository.findUserByUsername(userDto.getUsername())
      .switchIfEmpty(Mono.error(UserNotFoundException::new))
      .map(user -> User
        .builder()
          .id(user.getId())
          .username(user.getUsername())
          .password(user.getPassword())
          .email(user.getEmail())
          .firstName(userDto.getFirstName())
          .lastName(userDto.getLastName())
          .phone(userDto.getPhone())
          .address(userDto.getAddress())
          .photo(userDto.getPhoto())
          .avatar(userDto.getAvatar())
          .onCreate(user.getOnCreate())
          .onUpdate(Date.from(Instant.now()))
          .isActive(userDto.isActive())
          .role(userDto.getRole())
        .build())
      .flatMap(userRepository::save)
      .map(user -> appMapper.convert(user, UserDto.class));
  }

  @Override
  public Mono<UserDto> deleteUser(String username) {
    return userRepository.findUserByUsername(username)
    .switchIfEmpty(Mono.error(UserNotFoundException::new))
      .flatMap(this::delete)
      .map(user -> appMapper.convert(user, UserDto.class));
  }

  private Mono<User> delete(User user) {
    return Mono.fromSupplier(() -> {
      userRepository
          .delete(user)
          .subscribe();
      return user;
    });
  }

}
