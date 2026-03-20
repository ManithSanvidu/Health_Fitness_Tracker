package service;

import entity.User;
import repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;

import java.util.Collections;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.http.javanet.NetHttpTransport;

@Service
public class AuthService {

    private final UserRepository userRepository;

    @Value("${google.client.id}")
    private String googleClientId;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User saveUser(User user) {
        User existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser != null) {
            return existingUser;
        } else {
            return userRepository.save(user);
        }
    }

    public User getUserByEmail(String email) {
        if (email == null || email.isBlank()) {
            return null;
        }
        return userRepository.findByEmail(email);
    }

    public User verifyGoogleUser(String token) {
        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
                    new NetHttpTransport(),
                    JacksonFactory.getDefaultInstance()
            )
                    .setAudience(Collections.singletonList(googleClientId))
                    .build();

            GoogleIdToken idToken = verifier.verify(token);

            if (idToken == null) {
                throw new RuntimeException("Invalid Google Token");
            }

            GoogleIdToken.Payload payload = idToken.getPayload();

            String email = payload.getEmail();
            String name = (String) payload.get("name");

            if (email == null) {
                throw new RuntimeException("Email not found in token");
            }

            String defaultUsername = (name != null && !name.isBlank())
                    ? name.trim()
                    : email.substring(0, email.indexOf('@'));

            User existingUser = userRepository.findByEmail(email);

            if (existingUser != null) {
                if (existingUser.getUsername() == null || existingUser.getUsername().isBlank()) {
                    existingUser.setUsername(defaultUsername);
                    return userRepository.save(existingUser);
                }
                return existingUser;
            } else {
                User user = new User();
                user.setEmail(email);
                user.setUsername(defaultUsername);
                return userRepository.save(user);
            }

        } catch (Exception e) {
            throw new RuntimeException("Token verification failed: " + e.getMessage(), e);
        }
    }
}