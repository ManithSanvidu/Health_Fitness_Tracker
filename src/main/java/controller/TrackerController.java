package controller;

import entity.UserStat;
import service.TrackerService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class TrackerController {

    private final TrackerService trackerService;

    public TrackerController(TrackerService trackerService) {
        this.trackerService = trackerService;
    }

    @PostMapping("/meals/add")
    public ResponseEntity<String> addMeals(@RequestBody Map<String, Object> payload) {
        String email = (String) payload.get("email");
        List<Map<String, Object>> meals = (List<Map<String, Object>>) payload.get("meals");
        
        int totalCalories = 0;
        if (meals != null) {
            for (Map<String, Object> meal : meals) {
                Object calObj = meal.get("calories");
                if (calObj instanceof Number) {
                    totalCalories += ((Number) calObj).intValue();
                } else if (calObj instanceof String) {
                    try {
                        totalCalories += Integer.parseInt((String) calObj);
                    } catch(Exception ignored){}
                }
            }
        }
        
        trackerService.addMeals(email, totalCalories);
        return ResponseEntity.ok("Meals added");
    }

    @PostMapping("/workouts/add")
    public ResponseEntity<String> addWorkouts(@RequestBody Map<String, Object> payload) {
        String email = (String) payload.get("email");
        List<Map<String, Object>> workouts = (List<Map<String, Object>>) payload.get("workouts");
        
        int totalBurned = 0;
        if (workouts != null) {
            for (Map<String, Object> workout : workouts) {
                Object calObj = workout.get("calories");
                if (calObj instanceof Number) {
                    totalBurned += ((Number) calObj).intValue();
                } else if (calObj instanceof String) {
                    try {
                        totalBurned += Integer.parseInt((String) calObj);
                    } catch(Exception ignored){}
                }
            }
        }
        
        trackerService.addWorkouts(email, totalBurned);
        return ResponseEntity.ok("Workouts added");
    }

    @GetMapping("/users/stats")
    public ResponseEntity<UserStat> getStats(@RequestParam(required = false) String email) {
        if (email == null || email.isEmpty() || email.equals("null")) {
            return ResponseEntity.badRequest().build();
        }
        UserStat stat = trackerService.getStats(email);
        return ResponseEntity.ok(stat);
    }
}
