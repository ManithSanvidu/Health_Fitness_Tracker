package entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "user_stats")
public class UserStat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private LocalDate date;
    private int caloriesConsumed;
    private int caloriesBurned;

    public UserStat() {
        this.date = LocalDate.now();
    }

    public Long getId() { return id; }
    public String getEmail() { return email; }
    public LocalDate getDate() { return date; }
    public int getCaloriesConsumed() { return caloriesConsumed; }
    public int getCaloriesBurned() { return caloriesBurned; }

    public void setId(Long id) { this.id = id; }
    public void setEmail(String email) { this.email = email; }
    public void setDate(LocalDate date) { this.date = date; }
    public void setCaloriesConsumed(int caloriesConsumed) { this.caloriesConsumed = caloriesConsumed; }
    public void setCaloriesBurned(int caloriesBurned) { this.caloriesBurned = caloriesBurned; }
}