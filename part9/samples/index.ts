import express from "express";
const app = express();

import { calculator } from './calculator';

// adding prefix _ allows ts to not check unused var
app.get('/ping', (_req, res) => {
  res.send('pong');
});

// calculate  endpoint
app.post('/calculate', (req, res) => {
  const { value1, value2, op } = req.body;
  const result = calculator(value1, value2, op);
  res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});