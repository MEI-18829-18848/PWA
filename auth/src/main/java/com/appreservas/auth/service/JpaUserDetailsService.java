package com.appreservas.auth.service;

import com.appreservas.auth.event.AuthEventPublisher;
import com.appreservas.auth.exception.AuthException;
import com.appreservas.auth.model.Auth;
import com.appreservas.auth.model.SecurityUser;
import com.appreservas.auth.repository.UserRepository;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.event.AuthenticationFailureBadCredentialsEvent;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class JpaUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
    
    @Autowired
    private LoginAttemptService loginAttemptService;
    
    @Autowired
    private HttpServletRequest request;
    
    @Autowired
    AuthEventPublisher publisher = new AuthEventPublisher();

    public JpaUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public SecurityUser loadUserByUsername(String username) throws UsernameNotFoundException {
        String ip = getClientIP();
        System.out.println(ip);

        if (loginAttemptService.isBlocked(ip)) {
            var auth = new Auth();
            AuthException e = new AuthException("blocked");
            var event = new AuthenticationFailureBadCredentialsEvent(auth, e);
            publisher.publishEvent("message: " + "getRandomString", event);
            throw e;
        }

        try {
            // User user = userRepository.findByEmail(email);
            // if (user == null) {
            //     return new org.springframework.security.core.userdetails.User(
            //       " ", " ", true, true, true, true, 
            //       getAuthorities(Arrays.asList(roleRepository.findByName("ROLE_USER"))));
            // }
            //
            // return new org.springframework.security.core.userdetails.User(
            //   user.getEmail(), user.getPassword(), user.isEnabled(), true, true, true, 
            //   getAuthorities(user.getRoles()));
            return userRepository
                    .findByUsername(username)
                    .map(SecurityUser::new)
                    .orElseThrow(() -> new UsernameNotFoundException("Username not found: " + username));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        // System.out.println("Hello");
    }
    
    private String getClientIP() {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader == null){
            return request.getRemoteAddr();
        }
        return xfHeader.split(",")[0];
    }
}
