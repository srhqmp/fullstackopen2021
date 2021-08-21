import express from "express";

const app = express();

app.use(express.json());

import { calculateBmi } from './bmiCalculators';
import { calculateExercises } from './exerciseCalculator';

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

// GET bmi
app.get("/:bmi", (req, res) => {
  const { height, weight } = req.query;
  if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const response = {
    weight: Number(weight),
    height: Number(height),
    bmi: calculateBmi({ height: Number(height), weight: Number(weight) })
  };
  return res.send(response);
});

// POST exercise
app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { daily_exercises, target }: any = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: "parameters missing" });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (isNaN(Number(target)) || daily_exercises.some((val: any) => typeof Number(val) !== "number")) {
    return res.status(400).json({ error: "malformatted parameters" });
  }
  const exercises = calculateExercises(daily_exercises.map((val: number) => Number(val)), Number(target));
  return res.status(200).json(exercises);
});

const PORT = 3005;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
