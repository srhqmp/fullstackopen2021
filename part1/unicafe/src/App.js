import React, { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistics = ({count, text}) => {
  return (
    <div>{text} {count}</div>
  )
}

const Total = ({total}) => {
  return (
    <div>all {total}</div>
  )
}

const Average = ({good, bad, total}) => {
  let average = (good - bad) / total
  if (isNaN(average)) {
    average = 0
  }
  return (
    <div>average {average}</div>
  )
}

const Positive = ({good, total}) => {
  let positive = (good / total) * 100
  if (isNaN(positive)) {
    positive = 0
  }
  return (
    <div>positive {positive} %</div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  const total = good + neutral + bad

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={handleGoodClick} text={'good'}/>
      <Button handleClick={handleNeutralClick} text={'neutral'}/>
      <Button handleClick={handleBadClick} text={'bad'}/>
      
      <h2>statistics</h2>
      <Statistics count={good} text={'good'} />
      <Statistics count={neutral} text={'neutral'} />
      <Statistics count={bad} text={'bad'} />
      <Total total={total} />
      <Average good={good} bad={bad} total={total} />
      <Positive good={good} total={total} />
    </div>
  )
}

export default App