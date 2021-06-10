import React, { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick} value={text}>
    {text}
  </button>
);

const Statistic = ({ value, text }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ clicks }) => {
  const { good, bad, neutral } = clicks;

  if (!good && !bad && !neutral) {
    return "No feedback given";
  }

  const total = good + bad + neutral;
  const avg = (good - bad) / total;
  const positive = (good / total) * 100;

  return (
    <table>
      <tbody>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="total" value={total} />
        <Statistic text="average" value={avg || 0} />
        <Statistic text="positive" value={`${positive || 0} %`} />
      </tbody>
    </table>
  );
};

const App = () => {
  const [clicks, setClicks] = useState({
    good: 0,
    bad: 0,
    neutral: 0,
  });

  const handleClick = (e) => {
    const type = e.target.value;
    let newClick = "";

    if (type === "good") {
      newClick = {
        ...clicks,
        good: clicks.good + 1,
      };
      setClicks(newClick);
    }

    if (type === "bad") {
      newClick = {
        ...clicks,
        bad: clicks.bad + 1,
      };
      setClicks(newClick);
    }

    if (type === "neutral") {
      newClick = {
        ...clicks,
        neutral: clicks.neutral + 1,
      };
      setClicks(newClick);
    }
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={handleClick} text="good" />
      <Button handleClick={handleClick} text="neutral" />
      <Button handleClick={handleClick} text="bad" />
      <h2>Statistics</h2>
      <Statistics clicks={clicks} />
    </div>
  );
};

export default App;
