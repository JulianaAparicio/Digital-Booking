package digital.booking.controllers;


import digital.booking.entities.User;
import digital.booking.exceptions.BadRequestException;
import digital.booking.services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/users")
public class UserController {

    @Autowired
    UserService userService;

    @Operation(summary = "Crear usuario")
    @PostMapping("register")
    public ResponseEntity<User> RegisterUser(@RequestBody Map<String, String> userInfo) throws BadRequestException {
         User user = getUserEntity(userInfo);
         return ResponseEntity.status(HttpStatus.CREATED).body(userService.create(user));
    }

    private User getUserEntity(Map<String, String> userInfo) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        return new User(userInfo.get("name"), userInfo.get("lastName"), userInfo.get("email"), passwordEncoder.encode(userInfo.get("password")));
    }
}
