package smartcartBackend.controller;


import org.springframework.web.bind.annotation.*;
import smartcartBackend.repository.UserRepository;
import smartcartBackend.model.User;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/signup")
    public Map<String, Object> signup(@RequestBody Map<String, String> userData) {
        String email = userData.get("email");
        String password = userData.get("password");
        String name = userData.get("name");

        if (userRepository.existsByEmail(email)) {
            return Map.of("success", false, "message", "This email already exists!");
        }

        User newUser = new User(name, email, password);
        userRepository.save(newUser);

        return Map.of(
                "success", true,
                "token", "mock-jwt-token-" + newUser.getId(),
                "name", newUser.getName(),
                "email", newUser.getEmail()
        );
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isPresent() && userOpt.get().getPassword().equals(password)) {
            User user = userOpt.get();
            return Map.of(
                    "success", true,
                    "token", "mock-jwt-token-" + user.getId(),
                    "name", user.getName(),
                    "email", user.getEmail()
            );
        }

        return Map.of("success", false, "message", "Invalid email or password");
    }
}