package com.vvs.webfluxadminapp.service;

import javax.mail.internet.InternetAddress;

// import java.util.Properties;

// import javax.mail.Authenticator;
// import javax.mail.MessagingException;
// import javax.mail.PasswordAuthentication;
// import javax.mail.Session;
// import javax.mail.Transport;
// import javax.mail.Message.RecipientType;
// import javax.mail.internet.InternetAddress;
// import javax.mail.internet.MimeMessage;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;


// import org.springframework.stereotype.Service;

import com.vvs.webfluxadminapp.dto.EmailResponseDto;

// import jakarta.mail.MessagingException;
// import jakarta.mail.internet.InternetAddress;
// import jakarta.mail.internet.MimeMessage;
// import reactor.core.publisher.Mono;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

  private final EmailConfig config;
  private final JavaMailSender mailSender;

  @Override
  public Mono<Void> sendMail(EmailResponseDto email) {
    return Mono.fromRunnable(() -> {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(config.getUsername());
        message.setTo(email.getEmailTo());
        message.setSubject(email.getSubject());
        message.setText(email.getMessage());
        mailSender.send(message);
    })
    .subscribeOn(Schedulers.boundedElastic()) // ВАЖНО: не блокирует WebFlux
    .then();
  }


  // @Override
  // public Mono<Void> sendMail(EmailResponseDto email) {
  //   Properties properties = new Properties();
  //   properties.put("mail.transport.protocol", "smtp");
  //   properties.put("mail.smtp.host", config.getHost());
  //   properties.put("mail.smtp.port", config.getPort());
  //   properties.put("mail.smtp.ssl.enable", config.getSsl());
  //   properties.put("mail.smtp.starttls.enable", config.getTtls());
  //   properties.put("mail.smtp.auth", config.getAuth());

  //   Session session = Session.getInstance(properties, new Authenticator() {
  //     protected PasswordAuthentication getPasswordAuthentication() {
  //       return new PasswordAuthentication(config.getUsername(), config.getPassword());
  //     }
  //   });
  //   session.setDebug(config.getDebug());

  //   try {
  //     MimeMessage message = new MimeMessage(session);
  //     message.setFrom(new InternetAddress(config.getUsername()));
  //     message.addRecipient(RecipientType.TO, new InternetAddress(config.getUsername()));
  //     message.setSubject(email.getSubject());
  //     message.setContent(email.getMessage(), "text/html");

  //     Transport.send(message);
  //   } catch (MessagingException e) {
  //     e.printStackTrace();
  //   }
  //   return Mono.empty();
  // }

}
