package com.vvs.webfluxadminapp.security;

import com.vvs.webfluxadminapp.error.exception.WrongCredentialException;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextImpl;
import org.springframework.security.web.server.context.ServerSecurityContextRepository;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import reactor.core.publisher.Mono;

@Component
@RequiredArgsConstructor
public class SecurityContextRepository implements ServerSecurityContextRepository {

  private final AuthenticationManager authenticationManager;

  private final String AUTH_TOKEN_PREFIX = "Bearer ";

  @Override
  public Mono<SecurityContext> load(ServerWebExchange exchange) {
    return Mono.just(exchange.getRequest())
      .map(request -> request.getHeaders().getFirst(HttpHeaders.AUTHORIZATION))
      .filter(token -> token != null && token.startsWith(AUTH_TOKEN_PREFIX))
      .map(token -> token.substring(AUTH_TOKEN_PREFIX.length()))
      .map(authToken -> new UsernamePasswordAuthenticationToken(authToken, authToken))
      .flatMap(authenticationManager::authenticate)
      .switchIfEmpty(Mono.error(WrongCredentialException::new))
      .map(SecurityContextImpl::new);
  }

  @Override
  public Mono<Void> save(ServerWebExchange exchange, SecurityContext context) {
    throw new UnsupportedOperationException("Not supported yet.");
  }

}
