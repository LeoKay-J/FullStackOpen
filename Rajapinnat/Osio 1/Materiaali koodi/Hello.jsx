const Hello = (props) => {
    return (
        <div>
            <p>Hello {props.name}, you are {props.age} years old</p>
        </div>
    )
}  

const App = () => {
    const name = 'Peter'
    const age = '10'

    return (
        <div>
            <H1>Greetings</H1>
            <Hello name ='Maya' age={26 + 10} />
            <Hello name ={name} age={age}/>
        </div>
    )
}