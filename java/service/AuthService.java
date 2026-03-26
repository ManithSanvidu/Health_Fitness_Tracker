package service;

import entity.User;
import repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUserByEmail(String email) {
        if (email == null || email.isBlank()) {
            return null;
        }
        return userRepository.findByEmail(email);
    }

    public User register(String username, String email, String password) {
        if (email == null || email.isBlank()) throw new IllegalArgumentException("Email is required");
        if (password == null || password.isBlank()) throw new IllegalArgumentException("Password is required");

        String normalizedEmail = email.trim().toLowerCase();
        User existingUser = userRepository.findByEmail(normalizedEmail);
        if (existingUser != null) {
            throw new IllegalArgumentException("Email is already registered");
        }

        String safeUsername = (username != null && !username.isBlank())
                ? username.trim()
                : normalizedEmail.substring(0, normalizedEmail.indexOf('@'));

        User user = new User();
        user.setEmail(normalizedEmail);
        user.setUsername(safeUsername);
        user.setPasswordHash(passwordEncoder.encode(password));

        return userRepository.save(user);
    }

    public User authenticate(String email, String password) {
        if (email == null || email.isBlank()) return null;
        if (password == null || password.isBlank()) return null;

        String normalizedEmail = email.trim().toLowerCase();
        User user = userRepository.findByEmail(normalizedEmail);
        if (user == null) return null;

        if (!passwordEncoder.matches(password, user.getPasswordHash())) return null;
        return user;
    }
}