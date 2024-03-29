package com.vvs.webfluxadminapp.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsConfigurationSource;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

@EnableWebFluxSecurity
@RequiredArgsConstructor
public class SecurityConfig {

  @Value("${app.host.url}")
  private String hostUrl;

  private final static String[] WHITELIST_AUTH_URLS = {"/mail/sendmail", "/auth/signup", "/auth/login", "/api/images/upload"};

  private final AuthenticationManager authenticationManager;
  private final SecurityContextRepository securityContextRepository;

  public CorsConfigurationSource creatConfigurationSource() {
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    CorsConfiguration config = new CorsConfiguration();

    config.setAllowCredentials(true);
    config.addAllowedOrigin(hostUrl);
    config.addAllowedOrigin("http://victors-dev.me");
    config.addAllowedHeader("*");
    config.addAllowedMethod("*");
    source.registerCorsConfiguration("/**", config);

    return source;
  }

  @Bean
  public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {
    return http
      .cors().configurationSource(creatConfigurationSource()).and()
      .exceptionHandling()
      .authenticationEntryPoint((shs, e) -> Mono.fromRunnable(() -> shs.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED)))
      .accessDeniedHandler((shs, e) -> Mono.fromRunnable(() -> shs.getResponse().setStatusCode(HttpStatus.FORBIDDEN)))
      .and()
      .csrf().disable()
      .formLogin().disable()
      .authenticationManager(authenticationManager)
      .securityContextRepository(securityContextRepository)
      .authorizeExchange()
      .pathMatchers(HttpMethod.PUT).hasAnyAuthority("ADMIN", "MANAGER")
      .pathMatchers(HttpMethod.DELETE).hasAnyAuthority("ADMIN", "MANAGER")
      .pathMatchers(HttpMethod.OPTIONS).permitAll()
      .pathMatchers(WHITELIST_AUTH_URLS).permitAll()
      .anyExchange().authenticated()
      .and()
      .build();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

}
