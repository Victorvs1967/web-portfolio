package com.vvs.webfluxadminapp.security;

import java.sql.Date;
import java.time.Instant;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationStartedEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.vvs.webfluxadminapp.model.User;
import com.vvs.webfluxadminapp.model.UserRole;
import com.vvs.webfluxadminapp.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Slf4j
@Component
@RequiredArgsConstructor
public class InitialDataSeeder implements ApplicationListener<ApplicationStartedEvent> {

  @Value("${app.admin.username}")
  private String username;

  @Value("${app.admin.password}")
  private String password;


  @Value("${app.admin.email}")
  private String email;

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  @Override
  public void onApplicationEvent(ApplicationStartedEvent event) {
    userRepository.findUserByUsername(username)
      .switchIfEmpty(createAdmin())
      .subscribe();
  }

  private Mono<User> createAdmin() {
    User user = User.builder()
      .username(username)
      .password(passwordEncoder.encode(password))
      .email(email)
      .role(UserRole.ADMIN)
      .onCreate(Date.from(Instant.now()))
      .onUpdate(Date.from(Instant.now()))
      .isActive(true)
      .build();
    return userRepository.save(user)
      .doOnNext(admin -> log.info("Admin user created successfully..."));
  }
}
