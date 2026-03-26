package controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import service.RecommendationService;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class RecommendationController {

    private final RecommendationService recommendationService;

    public RecommendationController(RecommendationService recommendationService) {
        this.recommendationService = recommendationService;
    }

    @PostMapping("/recommend")
    public ResponseEntity<?> getRecommendation(@RequestBody Map<String, Object> data) {
        try {
            Object age = data.get("age");
            Object gender = data.get("gender");
            Object weight = data.get("weight");
            Object height = data.get("height");
            Object activity = data.get("activity");

            if (age == null || gender == null || weight == null || height == null || activity == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "Missing required fields: age, gender, weight, height, activity"));
            }

            String result = recommendationService.getRecommendationFromPythonOrJava(
                    age.toString(),
                    gender.toString(),
                    weight.toString(),
                    height.toString(),
                    activity.toString()
            );

            return ResponseEntity.ok(Map.of("result", result));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage() != null ? e.getMessage() : "Unknown error"));
        }
    }
}
