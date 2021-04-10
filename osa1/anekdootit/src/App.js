import React, { useState } from 'react'

const Button = (props) => {
  return(
      <button onClick={props.handleClick} >{props.text}</button>
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
  const [points,setPoints] = useState([0,0,0,0,0,0])

  

  const randomAnecdote = () => {
    let rand = Math.floor(Math.random()*anecdotes.length)

    // to get less the same random numbers in a row
    if (rand === selected){
      rand = Math.floor(Math.random()*anecdotes.length)
    }
    setSelected(Math.floor(Math.random()*anecdotes.length))
  }

  const voteAnecdote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  const mostVotes = () => {
    const copy = [...points]
    const max = Math.max(...copy)
    return copy.indexOf(max)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <div>has votes {points[selected]}</div> 
      <div>
      <Button handleClick={voteAnecdote} text="vote" />
      <Button handleClick={randomAnecdote} text="next anecdote" />
      </div>
      <h1>Anecdote with most votes</h1>
      {anecdotes[mostVotes()]}
      <div>has votes {points[mostVotes()]}</div>
    </div>
  )
}

export default App
