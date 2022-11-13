package com.vvs.webfluxadminapp.service;

import java.time.Instant;
import java.util.Date;

import com.vvs.webfluxadminapp.dto.ResponseDto;
import com.vvs.webfluxadminapp.dto.UserDto;
import com.vvs.webfluxadminapp.error.exception.EmailAlreadyExistException;
import com.vvs.webfluxadminapp.error.exception.UserAlreadyExistException;
import com.vvs.webfluxadminapp.mapper.AppMapper;
import com.vvs.webfluxadminapp.model.User;
import com.vvs.webfluxadminapp.model.UserRole;
import com.vvs.webfluxadminapp.repository.UserRepository;
import com.vvs.webfluxadminapp.security.JwtUtil;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

  @Value("${app.admin.username}")
  private String username;
  @Value("${app.admin.password}")
  private String password;
  @Value("${app.admin.email}")
  private String email;

  private final PasswordEncoder passwordEncoder;
  private final UserRepository userRepository;
  private final JwtUtil jwtUtil;
  private final AppMapper appMapper;

  @Override
  public Mono<UserDto> signUp(UserDto userDto) {
    createAdmin();
    
    return isUserExist(userDto.getUsername())
      .filter(userExist -> !userExist)
      .switchIfEmpty(Mono.error(UserAlreadyExistException::new))
      .doOnNext(_Boolean -> isEmailExist(userDto.getEmail()))
      .filter(emailExist -> !emailExist)
      .switchIfEmpty(Mono.error(EmailAlreadyExistException::new))
      .map(aBoolean -> userDto)
      .map(usrDto -> appMapper.convert(usrDto, User.class))
      .doOnNext(user -> user.setPassword(passwordEncoder.encode(user.getPassword())))
      .flatMap(userRepository::save)
      .map(user -> appMapper.convert(user, UserDto.class));
}

  @Override
  public Mono<ResponseDto> login(String username, String password) {
    return userRepository.findUserByUsername(username)
      .filter(userDetails -> passwordEncoder.matches(password, userDetails.getPassword()))
      .map(userDetails -> jwtUtil.generateToken(userDetails))
      .map(token -> ResponseDto.builder()
        .token(token)
        .build());
  }

  private Mono<Boolean> isUserExist(String username) {
    return userRepository.findUserByUsername(username)
      .map(user -> true)
      .switchIfEmpty(Mono.just(false));
  }

  private Mono<Boolean> isEmailExist(String email) {
    return userRepository.findUserByEmail(email)
      .map(user -> true)
      .switchIfEmpty(Mono.just(false));
  }

  private void createAdmin() {
    User user = User.builder()
      .username(username)
      .password(passwordEncoder.encode(password))
      .email(email)
      .onCreate(Date.from(Instant.now()))
      .role(UserRole.ADMIN)
      .build();

    userRepository.findAll()
      .map(users -> users)
      .switchIfEmpty(userRepository.save(user))
      .subscribe();
  }
  
}
