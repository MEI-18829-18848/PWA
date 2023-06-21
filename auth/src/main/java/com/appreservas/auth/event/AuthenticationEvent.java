package com.appreservas.auth.event;

import org.springframework.context.ApplicationEvent;

public class AuthenticationEvent extends ApplicationEvent {
    private String message;

    public AuthenticationEvent(Object source, String message) {
        super(source);
        this.message = message;
    }
    
    public String getMessage() {
        return message;
    }
}