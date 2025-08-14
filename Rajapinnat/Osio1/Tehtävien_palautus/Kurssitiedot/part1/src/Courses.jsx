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
const Course = ({course})=>{
  return(
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

  export default Course