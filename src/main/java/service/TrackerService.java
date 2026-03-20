package service;

import entity.UserStat;
import repository.UserStatRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.Optional;

@Service
public class TrackerService {

    private final UserStatRepository userStatRepository;

    public TrackerService(UserStatRepository userStatRepository) {
        this.userStatRepository = userStatRepository;
    }

    public void addMeals(String email, int additionalCalories) {
        if(email == null) return;
        LocalDate today = LocalDate.now();
        Optional<UserStat> statOpt = userStatRepository.findByEmailAndDate(email, today);
        UserStat stat = statOpt.orElseGet(() -> {
            UserStat newStat = new UserStat();
            newStat.setEmail(email);
            newStat.setDate(today);
            newStat.setCaloriesConsumed(0);
            newStat.setCaloriesBurned(0);
            return newStat;
        });
        stat.setCaloriesConsumed(stat.getCaloriesConsumed() + additionalCalories);
        userStatRepository.save(stat);
    }

    public void addWorkouts(String email, int burnedCalories) {
        if(email == null) return;
        LocalDate today = LocalDate.now();
        Optional<UserStat> statOpt = userStatRepository.findByEmailAndDate(email, today);
        UserStat stat = statOpt.orElseGet(() -> {
            UserStat newStat = new UserStat();
            newStat.setEmail(email);
            newStat.setDate(today);
            newStat.setCaloriesConsumed(0);
            newStat.setCaloriesBurned(0);
            return newStat;
        });
        stat.setCaloriesBurned(stat.getCaloriesBurned() + burnedCalories);
        userStatRepository.save(stat);
    }

    public UserStat getStats(String email) {
        if(email == null) return new UserStat();
        return userStatRepository.findByEmailAndDate(email, LocalDate.now())
                .orElseGet(() -> {
                    UserStat stat = new UserStat();
                    stat.setEmail(email);
                    stat.setDate(LocalDate.now());
                    stat.setCaloriesConsumed(0);
                    stat.setCaloriesBurned(0);
                    return stat;
                });
    }
}
