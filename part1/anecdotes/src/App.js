import React, { useState } from 'react'

const Button = ({action, text}) => {
  return (
    <button onClick={action}>{text}</button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(new Array(anecdotes.length).fill(0))

  const generateRandom = () => {
    const randomNum = Math.floor(Math.random() * 6)
    setSelected(randomNum)
  }

  const upvote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVote(copy)
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <Button action={upvote} text={'vote'} />
      <Button action={generateRandom} text={'next anecdote'} /> 
      <h2>Anecdote with most votes</h2>
      <div>{anecdotes[votes.indexOf(Math.max(...votes))]}</div>
    </div>
  )
}

export default App