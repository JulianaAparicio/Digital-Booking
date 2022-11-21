package digital.booking.controllers;


import digital.booking.core.TokenManager;
import digital.booking.services.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/auth")
public class AuthController {
    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    TokenManager tokenManager;
    @Autowired
    AuthService authService;



    @Operation(summary = "Login into the account")
    @PostMapping
    public ResponseEntity<String> RegisterUser(@RequestBody Map<String, String> userInfo) throws Exception {

        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userInfo.get("email"), userInfo.get("password")));
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
        final UserDetails userDetails = authService.loadUserByUsername(userInfo.get("email"));
        final String jwt = tokenManager.generateToken(userDetails);

        return ResponseEntity.ok(jwt);
    }
}
