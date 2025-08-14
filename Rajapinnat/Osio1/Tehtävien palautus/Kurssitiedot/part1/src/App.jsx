 const Total = ({parts}) => {
    return(
      <div>
         <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
      </div>
    )
}

const Header = ({course}) => {
    return(
      <h1>{course}</h1>
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

const Content = ({Part}) => {
      return(
    <div>
    {Part}
  </div>

  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>


    </div>
  )
}

export default App