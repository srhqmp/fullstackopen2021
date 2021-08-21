import express from "express";
const app = express();

import { calculateBmi } from './bmiCalculators';

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

const PORT = 3005;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
