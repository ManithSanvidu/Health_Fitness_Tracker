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
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService){
        this.authService = authService;
    }

    @GetMapping("/profile")
    public ResponseEntity<?> profile(@RequestParam(required = false) String email) {
        if (email == null || email.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "email is required"));
        }
        User user = authService.getUserByEmail(email);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        Map<String, Object> responseBody = new LinkedHashMap<>();
        responseBody.put("id", user.getId());
        responseBody.put("email", user.getEmail());
        responseBody.put("username", user.getUsername() != null ? user.getUsername() : user.getEmail().split("@")[0]);
        return ResponseEntity.ok(responseBody);
    }

    @PostMapping("/google")
    public User googlelogin(@RequestBody User user){
        return authService.saveUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String,String> request){
        String token = request.get("token");
        User user = authService.verifyGoogleUser(token);
        String sessionId = UUID.randomUUID().toString();

        Map<String, Object> responseBody = new LinkedHashMap<>();
        responseBody.put("sessionId", sessionId);
        responseBody.put("userId", user.getId());
        responseBody.put("email", user.getEmail());
        responseBody.put("username", user.getUsername() != null ? user.getUsername() : user.getEmail().split("@")[0]);

        return ResponseEntity.ok(responseBody);
    }
}