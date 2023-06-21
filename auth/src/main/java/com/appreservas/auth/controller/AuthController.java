package com.appreservas.auth.controller;

import com.appreservas.auth.event.AuthEventPublisher;
import com.appreservas.auth.model.Auth;
import com.appreservas.auth.model.ChangePassword;
import com.appreservas.auth.model.EmailDetails;
import com.appreservas.auth.model.ForgotPassword;
import com.appreservas.auth.model.LoginRequest;
import com.appreservas.auth.model.User;
import com.appreservas.auth.repository.UserRepository;
import com.appreservas.auth.service.EmailService;
import com.appreservas.auth.service.JpaUserDetailsService;
import com.appreservas.auth.service.TokenService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.event.AuthenticationFailureBadCredentialsEvent;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;


import org.slf4j.Logger;

import java.util.*;

@RestController
public class AuthController {
    private static final Logger LOG = LoggerFactory.getLogger(AuthController.class);
    private final TokenService tokenService;
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final JpaUserDetailsService jpaUserDetailsService;
    private final EmailService emailService;
    @Autowired
    AuthEventPublisher publisher = new AuthEventPublisher();


    public AuthController(TokenService tokenService, AuthenticationManager authenticationManager, UserRepository userRepository, PasswordEncoder encoder, JpaUserDetailsService jpaUserDetailsService, EmailService emailService) {
        this.tokenService = tokenService;
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.encoder = encoder;
        this.jpaUserDetailsService = jpaUserDetailsService;
        this.emailService = emailService;

    }

    @PostMapping("/login")
    public ResponseEntity token(@RequestBody LoginRequest userLogin){
        try{
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userLogin.username(), userLogin.password()));
            Map<String, Object> response = Map.of("token",tokenService.generateToken(authentication, jpaUserDetailsService.loadUserByUsername(userLogin.username())));
            LOG.info("Valid Login for user: "+ userLogin.username());
            var auth = new Auth();
            var event = new AuthenticationSuccessEvent(auth);
            publisher.publishEvent("message: " + getRandomString(), event);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        catch(AuthenticationException e){
            var auth = new Auth();
            var event = new AuthenticationFailureBadCredentialsEvent(auth, e);
            publisher.publishEvent("message: " + getRandomString(), event);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity createUser(@RequestBody User newUser) {
        newUser.setPassword(encoder.encode(newUser.getPassword()));
        User userCreated = userRepository.save(newUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(userCreated.toString());
    }
    
    @PostMapping("/forgotpassword")
    public ResponseEntity forgotPassword(@RequestBody ForgotPassword fp){
       User user = userRepository.findByUsername(fp.username()).orElse(new User());
       if (Objects.equals(user.getEmail(), fp.email()) && !Objects.equals(fp.email(), "")){
           String newPassword = getRandomString();
           emailService.sendSimpleMail(buildForgotPasswordEmail(fp.username(), newPassword, fp.email()));
           user.setPassword(encoder.encode(newPassword));
           userRepository.save(user);
           return ResponseEntity.status(HttpStatus.OK).body("New password generated and sent to user email");
       }
       return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No user matches the data provided");
    }

    @PostMapping("/changePassword")
    @SecurityRequirement(name = "Bearer Authentication")
    public ResponseEntity changePassword(@RequestBody ChangePassword pwData) {
        Authentication authToken = SecurityContextHolder.getContext().getAuthentication();
        Map<String,Object> tokenPayload = getTokenPayload(authToken);
        User user = userRepository.findByUsername(tokenPayload.get("username").toString()).orElse(new User());
        BCryptPasswordEncoder bc = new BCryptPasswordEncoder();
        boolean passChecker = bc.matches(pwData.currentPassword(), user.getPassword());
        if (passChecker){
            user.setPassword(encoder.encode(pwData.newPassword()));
            userRepository.save(user);
            return ResponseEntity.status(HttpStatus.OK).body("");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Current Password does not match");
    }

    private String getRandomString(){
        Random rand = new Random();
        String str = rand.ints(48, 123)
                .filter(num -> (num<58 || num>64) && (num<91 || num>96))
                .limit(15)
                .mapToObj(c -> (char)c).collect(StringBuffer::new, StringBuffer::append, StringBuffer::append)
                .toString();
        return str;
    }

    private EmailDetails buildForgotPasswordEmail(String username, String newPassword, String userEmail){
        EmailDetails ed = new EmailDetails();
        ed.setMsgBody("Looks like you forgot your password.\nHere is your new password for the username "+ username+ "\nNew Password: "+newPassword);
        ed.setSubject("Your new AppReservas Password");
        ed.setRecipient(userEmail);
        return ed;
    }

    private Map<String, Object> getTokenPayload(Authentication authToken){
        if (authToken instanceof JwtAuthenticationToken) {
            return ((JwtAuthenticationToken) authToken).getTokenAttributes();
        }
        return Collections.emptyMap();
    }
}

