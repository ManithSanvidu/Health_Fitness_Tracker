package repository;

import entity.UserStat;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.Optional;

public interface UserStatRepository extends JpaRepository<UserStat, Long> {
    Optional<UserStat> findByEmailAndDate(String email, LocalDate date);
}
