package controller;

import entity.User;
import service.AuthService;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.UUID;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService){
        this.authService = authService;
    }

    @GetMapping("/profile")
    public ResponseEntity<?> profile(@RequestParam(required = false) String email) {
        try {
            if (email == null || email.isBlank()) {
                return ResponseEntity.badRequest().body(Map.of("message", "email is required"));
            }

            User user = authService.getUserByEmail(email);

            if (user == null) {
                return ResponseEntity.status(404).body(Map.of("message", "User not found"));
            }

            Map<String, Object> responseBody = new LinkedHashMap<>();
            responseBody.put("id", user.getId());
            responseBody.put("email", user.getEmail());
            responseBody.put("username",
                    user.getUsername() != null
                            ? user.getUsername()
                            : user.getEmail().split("@")[0]);

            return ResponseEntity.ok(responseBody);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String,String> request){
        try {
            String email = request.get("email");
            String password = request.get("password");

            if (email == null || email.isBlank() || password == null || password.isBlank()) {
                return ResponseEntity.badRequest().body(Map.of("message", "Email and password are required"));
            }

            User user = authService.authenticate(email, password);
            if (user == null) return ResponseEntity.status(401).body(Map.of("message", "Invalid credentials"));

            String sessionId = UUID.randomUUID().toString();

            Map<String, Object> responseBody = new LinkedHashMap<>();
            responseBody.put("sessionId", sessionId);
            responseBody.put("userId", user.getId());
            responseBody.put("email", user.getEmail());
            responseBody.put("username",
                    user.getUsername() != null
                            ? user.getUsername()
                            : user.getEmail().split("@")[0]);

            return ResponseEntity.ok(responseBody);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of(
                    "message", "Server error",
                    "error", e.getMessage()
            ));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> request) {
        try {
            String username = request.get("username");
            String email = request.get("email");
            String password = request.get("password");

            if (email == null || email.isBlank() || password == null || password.isBlank()) {
                return ResponseEntity.badRequest().body(Map.of("message", "Email and password are required"));
            }

            User user = authService.register(username, email, password);
            String sessionId = UUID.randomUUID().toString();

            Map<String, Object> responseBody = new LinkedHashMap<>();
            responseBody.put("sessionId", sessionId);
            responseBody.put("userId", user.getId());
            responseBody.put("email", user.getEmail());
            responseBody.put("username",
                    user.getUsername() != null
                            ? user.getUsername()
                            : user.getEmail().split("@")[0]);

            return ResponseEntity.ok(responseBody);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body(Map.of("message", e.getMessage()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of(
                    "message", "Server error",
                    "error", e.getMessage()
            ));
        }
    }
}