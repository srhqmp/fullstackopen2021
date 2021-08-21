interface ExerciseData {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

type ExerciseParams = Array<number>;

interface Data {
    exercises: ExerciseParams;
    target: number;
}

const parseArgument = (args: Array<string>): Data => {
    if (args.length < 6) throw new Error('Not enough arguments');
    const arr = args.slice(5);

    if (!isNaN(Number(args[4])) &&
        (arr.some(val => typeof Number(val) === "number")))
        return {
            exercises: arr.map(val => Number(val)),
            target: Number(args[4])
        };
    else {
        throw new Error('Provided values were not numbers!');
    }
};

const calculateExercises = (exercise: ExerciseParams, target: number): ExerciseData => {
    const periodLength = calculatePeriodLength(exercise);
    const trainingDays = calculateTrainingDays(exercise);
    const success = calculateSuccess(exercise, target);
    const rating = calculateRating(periodLength, trainingDays, success);
    const ratingDescription = rating === 3 ? 'very good' : rating === 2 ? 'not too bad but could be better' : 'bad rating';
    const average = exercise.reduce((sum, num) => sum + num, 0) / periodLength;
    return { periodLength, trainingDays, success, rating, ratingDescription, target, average };
};

const calculatePeriodLength = (parameters: ExerciseParams): number => {
    return parameters.length;
};

const calculateTrainingDays = (parameters: ExerciseParams): number => {
    return parameters.filter(num => num !== 0).length;
};

const calculateSuccess = (parameters: ExerciseParams, target: number): boolean => {
    return parameters.every(num => num >= target);
};

const calculateRating = (periodLength: number, trainingDays: number, success: boolean): number => {
    const isAlwaysPresent = periodLength === trainingDays;
    return isAlwaysPresent && success ? 3 : isAlwaysPresent ? 2 : 1;
};

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))

try {
    const { target, exercises } = parseArgument(process.argv);
    console.log(calculateExercises(exercises, target));
} catch (e) {
    if (e instanceof Error /*CustomError*/) {
        console.log('Error, something bad happened, message: ', e.message);
    }
}

// npm run calculateExercises 2 1 0 2 4.5 0 3 1 0 4