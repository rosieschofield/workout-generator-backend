export interface ExerciseFormat {
    exercise_id: number;
    exercise_name: string;
}

export interface ExerciseFormatWithWorkoutId extends ExerciseFormat {
    workout_id: number;
}
