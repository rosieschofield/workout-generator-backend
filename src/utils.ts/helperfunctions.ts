import { ExerciseFormat } from "../types/express/types";

export function getRandIndexArr(length: number): number[] {
    const randIndexArr: number[] = [];
    let randomIndex: number;
    while (randIndexArr.length < length) {
        do {
            randomIndex = Math.ceil(Math.random() * 51);
        } while (randIndexArr.find((num) => num === randomIndex) || randomIndex === 0);
        randIndexArr.push(randomIndex);
    }
    return randIndexArr;
}

export function formatExerciseArrForSqlInsert(
    exerciseArray: ExerciseFormat[],
    workoutId: number
): string {
    //take array of objects and workout ID and return values formatted for insert
    let exerciseString = " ";
    exerciseArray.forEach((exObj, index) => {
        exerciseString += `(${workoutId}, ${exObj.exercise_id})`;
        if (index < exerciseArray.length - 1) {
            exerciseString += ", "; // Add a comma if it's not the last element
        }
    });
    return exerciseString;
}
