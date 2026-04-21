package com.vvs.webfluxadminapp.service;

// import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import lombok.Data;
import lombok.NonNull;

@Data
@Component
public class EmailConfig {

  // @NonNull
  @Value("${mail.smtp.host}")
  private String host;

  // @NonNull
  @Value("${mail.smtp.port}")
  private int port;

  // @NonNull
  @Value("${mail.smtp.username}")
  private String username;

  // @NonNull
  @Value("${mail.smtp.password}")
  private String password;

  // @NonNull
  @Value("${mail.smtp.auth}")
  private Boolean auth;

  // @NonNull
  @Value("${mail.smtp.ssl.enable}")
  private Boolean ssl;

  @Value("${mail.smtp.starttls.enable}")
  private Boolean ttls;

  @Value("${mail.smtp.debug}")
  private Boolean debug;

}
