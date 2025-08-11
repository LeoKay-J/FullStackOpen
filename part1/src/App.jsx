const Header = ({courseName}) => {
    return(
      <div>
      <h1>{courseName}</h1>
      </div>
  )
}

const Content = ({part1, part2, part3, exercises1, exercises2, exercises3}) => {
      return(
    <div>
      <Part   part={part1} exercises={exercises1}/>
      <Part   part={part2} exercises={exercises2}/>
      <Part   part={part3} exercises={exercises3}/>
  </div>
  )
}

const Part = ({part, exercises,}) => {
    return(
      <div>
        <p>
        {part} {exercises}
      </p>
      </div>

  )
}
const Total = ({exercises1, exercises2, exercises3}) => {
    return(
      <div>
         <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
      </div>
    )
} 

 


const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
}

const part2 = {
  name: 'Using props to pass data',
  exercises: 7 
}

const part3 = {
  name: 'State of a component',
  exercises: 14 
}

  return(
  <div>
    <h1>{course}</h1>     
    <p>{part1.name} {part1.exercises}</p> 
    <p>{part2.name} {part2.exercises}</p>
    <p>{part3.name} {part3.exercises}</p>
    <p>{part1.exercises + part2.exercises + part3.exercises}</p>
  </div>
  )
}
export default App