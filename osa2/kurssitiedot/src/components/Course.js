import React from 'react'

const Header = (props) => {
    return(
      <h1>{props.course}</h1>
    )
  }
  
const Part = (props) => {
    return(
      <p>{props.name} {props.exercises}</p>
    )
  }
  
const Content = ({parts}) => {
  
    return(
      <div>
        {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}/>)}
      </div>
    )
  }
  
  
const Total = ({parts}) => {
    const total = (parts.map(part => part.exercises)).reduce((a,b) => a + b, 0)
    return(
      <h4> Total of {total} exercises</h4>
    )
  }

const Course = ({course}) => {
    return(
      <div>
      <Header course={course.name}/>
      <Content parts={course.parts} />
      <Total parts={course.parts} />
      </div>
    )
  }

export default Course