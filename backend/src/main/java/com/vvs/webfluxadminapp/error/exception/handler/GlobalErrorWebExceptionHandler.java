package com.vvs.webfluxadminapp.error.exception.handler;

import java.util.Map;

import com.vvs.webfluxadminapp.error.ErrorAttributesKey;

import org.springframework.boot.autoconfigure.web.WebProperties;
import org.springframework.boot.autoconfigure.web.reactive.error.AbstractErrorWebExceptionHandler;
import org.springframework.boot.web.error.ErrorAttributeOptions;
import org.springframework.boot.web.reactive.error.ErrorAttributes;
import org.springframework.context.ApplicationContext;
import org.springframework.core.annotation.Order;
import org.springframework.http.MediaType;
import org.springframework.http.codec.ServerCodecConfigurer;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.server.RequestPredicates;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;

import reactor.core.publisher.Mono;

@Component
@Order(-2)
public class GlobalErrorWebExceptionHandler extends AbstractErrorWebExceptionHandler {

  public GlobalErrorWebExceptionHandler(GlobalErrorAttributes globalErrorAttributes, ApplicationContext applicationContext, ServerCodecConfigurer configurer) {
      super(globalErrorAttributes, new WebProperties.Resources(), applicationContext);
      this.setMessageWriters(configurer.getWriters());
      this.setMessageReaders(configurer.getReaders());
  }

  @Override
  protected RouterFunction<ServerResponse> getRoutingFunction(ErrorAttributes errorAttributes) {
  return RouterFunctions.route(RequestPredicates.all(), this::renderErrorResponse);
  }

  private Mono<ServerResponse> renderErrorResponse(ServerRequest request) {
    Map<String, Object> errorProperties = getErrorAttributes(request, ErrorAttributeOptions.defaults());
    int statusCode = Integer.parseInt(errorProperties.get(ErrorAttributesKey.CODE.getKey()).toString());
    return ServerResponse
      .status(statusCode)
      .contentType(MediaType.APPLICATION_JSON)
      .body(BodyInserters.fromValue(errorProperties));
  } 
}
