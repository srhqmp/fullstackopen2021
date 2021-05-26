import React, { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistics = ({count, text}) => {
  if (text === 'positive') {
    return (
      <tr>
        <td>{text}</td>
        <td>{count} %</td>
      </tr>
    )
  }
  return (
      <tr>
        <td>{text}</td>
        <td>{count}</td>
      </tr>
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
  const average = (good - bad) / total
  const positive = (good / total) * 100

  const renderStatistics = () => {
    if (total === 0) {
      return ('No feedback given')
    }
    return (
      <table>
        <tbody>
          <Statistics count={good} text={'good'} />
          <Statistics count={neutral} text={'neutral'} />
          <Statistics count={bad} text={'bad'} />
          <Statistics count={total} text={'all'} />
          <Statistics count={average} text={'average'} />
          <Statistics count={positive} text={'positive'} />
        </tbody>
      </table>
    )
  }
  
  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={handleGoodClick} text={'good'}/>
      <Button handleClick={handleNeutralClick} text={'neutral'}/>
      <Button handleClick={handleBadClick} text={'bad'}/>
      <h2>statistics</h2>
      {renderStatistics()}
    </div>
  )
}

export default App