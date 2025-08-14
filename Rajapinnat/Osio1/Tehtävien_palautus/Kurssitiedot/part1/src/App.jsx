const Total = ({parts}) => {
    const total = parts.reduce((sum, part)=> sum + part.exercises, 0)
    
    return(
     <div>
      <p>Total Exercixes {total}</p>
     </div>
     
    )
}

const Header = ({course}) => {
    return(
      <h1>{course}</h1> 
  )
}
const Part = ({part}) => {
    return(
      <div>
        <p>{part.name} {part.exercises}</p>
      </div>
)

}


const Content = ({parts}) => {
  return(
    <div>
      {parts.map(part => <Part key={part.name} part={part}/>)}
    </div>

  )
}


const App = () => {
  const course = [
    {
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  

  return (
    <div>
      {course.map(course =>
        <div key={course.id}>
          <Header course={course.name}/>
          <Content parts={course.parts}/>
          <Total parts={course.parts}/>
        </div>
      )}
    </div>
  )
}

export default App