import sys

def get_recommendation(age, gender, weight_kg, height_cm, activity_level):
    try:
        weight = float(weight_kg)
        height_m = float(height_cm) / 100.0

        if height_m <= 0:
            return "Height must be greater than 0."

        bmi = weight / (height_m ** 2)

        recommendation = f"Your BMI is {bmi:.1f}. "

        if bmi < 18.5:
            recommendation += "You are underweight. Focus on a caloric surplus with nutrient-dense foods and strength training. "
        elif bmi < 25:
            recommendation += "You have a healthy/normal weight. Maintain your balanced diet and mix cardio with strength training. "
        else:
            recommendation += "You are overweight. Consider a slight caloric deficit, prioritize protein, and emphasize daily movement. "

        activity_level = activity_level.lower()

        if activity_level in ["sedentary", "light"]:
            recommendation += "Since your activity level is low, try to incorporate more walking, taking the stairs, and short daily workouts."
        elif activity_level == "moderate":
            recommendation += "Your activity level is good. Keep up the consistent routine!"
        else:
            recommendation += "You are highly active. Ensure you are getting at least 7-8 hours of sleep, ample water, and adequate recovery foods."

        recommendation += "\n\n--- Your personalized fitness plan ---\n"

        if bmi < 18.5:
            recommendation += (
                "Strength: 2–3x/week full-body (compound lifts or bodyweight progressions), moderate loads.\n"
                "Cardio: 2x/week easy walks or cycling 20–30 min for appetite and recovery.\n"
                "Nutrition: add 300–500 kcal/day from whole foods; protein at every meal.\n"
            )
        elif bmi < 25:
            recommendation += (
                "Strength: 3x/week upper/lower or push/pull/legs.\n"
                "Cardio: 2–3x/week 20–40 min moderate intensity OR daily 8–10k steps.\n"
                "Recovery: 1–2 rest or mobility days; sleep 7–8 hours.\n"
            )
        else:
            recommendation += (
                "Cardio: 4–5x/week 30–45 min brisk walking, cycling, or swimming.\n"
                "Strength: 2–3x/week full-body to preserve muscle while in a deficit.\n"
                "Nutrition: slight calorie deficit; high protein; mostly minimally processed foods.\n"
            )

        if activity_level in ["sedentary", "light"]:
            recommendation += "Progression: add 5–10 minutes of movement most days; use a step goal.\n"
        elif activity_level == "moderate":
            recommendation += "Progression: increase weekly volume ~5–10% or add one short interval session.\n"
        else:
            recommendation += "Progression: schedule deload weeks; prioritize sleep and hydration between hard sessions.\n"

        recommendation += "\n(Adjust with your doctor if you have medical conditions.)"

        return recommendation
    except Exception as e:
        return "Error generating recommendation: " + str(e)

if __name__ == "__main__":
    if len(sys.argv) == 6:
        age_arg = sys.argv[1]
        gender_arg = sys.argv[2]
        weight_arg = sys.argv[3]
        height_arg = sys.argv[4]
        activity_arg = sys.argv[5]
        print(get_recommendation(age_arg, gender_arg, weight_arg, height_arg, activity_arg))
    else:
        print("Invalid arguments")