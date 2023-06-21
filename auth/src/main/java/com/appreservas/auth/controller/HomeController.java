package com.appreservas.auth.controller;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
public class HomeController {
    @GetMapping("/home")
    @SecurityRequirement(name = "Bearer Authentication")
    public String home(UserDetails principal){
        return "Hello, "+ principal.getUsername();
    }
}
