package service;

import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
public class RecommendationService {

    public String getRecommendationFromPythonOrJava(String age, String gender, String weightKg, String heightCm, String activityLevel) {
        String fromPython = tryRunPythonScript(age, gender, weightKg, heightCm, activityLevel);
        if (fromPython != null && !fromPython.isBlank() && !fromPython.startsWith("Invalid arguments")) {
            return fromPython;
        }
        return getRecommendation(age, gender, weightKg, heightCm, activityLevel);
    }

    private String tryRunPythonScript(String age, String gender, String weightKg, String heightCm, String activityLevel) {
        Path script = resolveRecommendationScript();
        if (script == null) {
            return null;
        }
        Path workDir = script.getParent();
        String scriptFileName = script.getFileName().toString();

        List<List<String>> commandAttempts = new ArrayList<>();
        commandAttempts.add(List.of("python", scriptFileName, age, gender, weightKg, heightCm, activityLevel));
        commandAttempts.add(List.of("py", "-3", scriptFileName, age, gender, weightKg, heightCm, activityLevel));
        commandAttempts.add(List.of("python3", scriptFileName, age, gender, weightKg, heightCm, activityLevel));

        String envPython = System.getenv("PYTHON_EXE");
        if (envPython != null && !envPython.isBlank()) {
            commandAttempts.add(0, List.of(envPython, scriptFileName, age, gender, weightKg, heightCm, activityLevel));
        }

        for (List<String> command : commandAttempts) {
            try {
                ProcessBuilder pb = new ProcessBuilder(command);
                pb.directory(workDir.toFile());
                pb.redirectErrorStream(true);
                Process process = pb.start();
                String output = readStream(process.getInputStream());
                boolean finished = process.waitFor(30, TimeUnit.SECONDS);
                if (!finished) {
                    process.destroyForcibly();
                    continue;
                }
                if (process.exitValue() != 0) {
                    continue;
                }
                String trimmed = output.trim();
                if (!trimmed.isEmpty()) {
                    return trimmed;
                }
            } catch (Exception ignored) {
                // try next interpreter
            }
        }
        return null;
    }

    private static Path resolveRecommendationScript() {
        Path cwd = Paths.get(System.getProperty("user.dir", ".")).toAbsolutePath().normalize();
        Path[] candidates = new Path[]{
                cwd.resolve("recommendation_engine.py"),
                cwd.resolve("backend").resolve("recommendation_engine.py")
        };
        for (Path candidate : candidates) {
            if (Files.isRegularFile(candidate)) {
                return candidate.toAbsolutePath().normalize();
            }
        }
        return null;
    }

    private static String readStream(InputStream inputStream) throws Exception {
        return new String(inputStream.readAllBytes(), StandardCharsets.UTF_8);
    }

    /**
     * Mirrors recommendation_engine.py when Python is not available.
     */
    public String getRecommendation(String age, String gender, String weightKg, String heightCm, String activityLevel) {
        try {
            double weight = Double.parseDouble(weightKg.trim());
            double heightM = Double.parseDouble(heightCm.trim()) / 100.0;

            if (heightM <= 0) {
                return "Height must be greater than 0.";
            }

            double bmi = weight / (heightM * heightM);
            StringBuilder recommendation = new StringBuilder();
            recommendation.append(String.format("Your BMI is %.1f. ", bmi));

            if (bmi < 18.5) {
                recommendation.append("You are underweight. Focus on a caloric surplus with nutrient-dense foods and strength training. ");
            } else if (bmi < 25) {
                recommendation.append("You have a healthy/normal weight. Maintain your balanced diet and mix cardio with strength training. ");
            } else {
                recommendation.append("You are overweight. Consider a slight caloric deficit, prioritize protein, and emphasize daily movement. ");
            }

            String level = activityLevel == null ? "" : activityLevel.toLowerCase().replace('_', '-');

            if ("sedentary".equals(level) || "light".equals(level)) {
                recommendation.append("Since your activity level is low, try to incorporate more walking, taking the stairs, and short daily workouts.");
            } else if ("moderate".equals(level)) {
                recommendation.append("Your activity level is good. Keep up the consistent routine!");
            } else {
                recommendation.append("You are highly active. Ensure you are getting at least 7-8 hours of sleep, ample water, and adequate recovery foods.");
            }

            recommendation.append("\n\n--- Your personalized fitness plan ---\n");
            appendFitnessPlanBody(recommendation, bmi, level);

            recommendation.append("\n(Adjust with your doctor if you have medical conditions.)");

            return recommendation.toString();
        } catch (Exception e) {
            return "Error generating recommendation: " + e.getMessage();
        }
    }

    private static void appendFitnessPlanBody(StringBuilder recommendation, double bmi, String level) {
        if (bmi < 18.5) {
            recommendation.append(
                    "Strength: 2-3x/week full-body (compound lifts or bodyweight progressions), moderate loads.\n"
                            + "Cardio: 2x/week easy walks or cycling 20–30 min for appetite and recovery.\n"
                            + "Nutrition: add 300-500 kcal/day from whole foods; protein at every meal.\n");
        } else if (bmi < 25) {
            recommendation.append(
                    "Strength: 3x/week upper/lower or push/pull/legs.\n"
                            + "Cardio: 2-3x/week 20-40 min moderate intensity OR daily 8-10k steps.\n"
                            + "Recovery: 1-2 rest or mobility days; sleep 7-8 hours.\n");
        } else {
            recommendation.append(
                    "Cardio: 4-5x/week 30-45 min brisk walking, cycling, or swimming.\n"
                            + "Strength: 2-3x/week full-body to preserve muscle while in a deficit.\n"
                            + "Nutrition: slight calorie deficit; high protein; mostly minimally processed foods.\n");
        }

        if ("sedentary".equals(level) || "light".equals(level)) {
            recommendation.append("Progression: add 5-10 minutes of movement most days; use a step goal.\n");
        } else if ("moderate".equals(level)) {
            recommendation.append("Progression: increase weekly volume ~5-10% or add one short interval session.\n");
        } else {
            recommendation.append("Progression: schedule deload weeks; prioritize sleep and hydration between hard sessions.\n");
        }
    }
}
