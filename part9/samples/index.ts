import express from "express";

const app = express();

// adding prefix _ allows ts to not check unused var
app.get('/ping', (_req, res) => {
  res.send('pong');
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});