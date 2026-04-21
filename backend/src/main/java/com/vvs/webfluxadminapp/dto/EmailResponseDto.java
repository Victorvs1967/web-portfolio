package com.vvs.webfluxadminapp.dto;

// import jakarta.validation.constraints.Email;
// import jakarta.validation.constraints.Min;

import javax.validation.constraints.Email;
import javax.validation.constraints.Min;
// import javax.validation.constraints.NotNull;

import lombok.Builder;
import lombok.Getter;
import lombok.NonNull;

@Getter
@Builder
public class EmailResponseDto {

  @NonNull
  private String subject;

  @NonNull
  @Email
  private String emailTo;

  @NonNull
  @Min(10)
  private String message;

}
