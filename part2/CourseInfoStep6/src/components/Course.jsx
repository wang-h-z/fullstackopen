const Header = (props) => {
    const { name } = props.name
    console.log(name)
    return (
        <div>
            <h1>{name}</h1>
        </div>
    )
}

const Part = (props) => {
    
    console.log(props)
    return (
        <div>
            <p>{props.parts.name} {props.parts.exercises}</p>
        </div>
    )
}

const Content = (props) => {
    console.log(props)
    const allParts = props.parts.map(part => <Part key={part.id} parts={part}/>)
    return (
        <div>
            {allParts}
        </div>
    )
}

const Total = (props) => {
    console.log(props)
    const totalAmount = props.parts.reduce((sum, prev) => sum + prev.exercises, 0)
    return (
        <div> 
            <p>
                total of {totalAmount} exercises
            </p>
        </div>
    )
}

const Course = (props) => {
    console.log(props)
    return (
        <div>
            <Header name={props.course} />
            <Content parts={props.course.parts} />
            <Total parts={props.course.parts} />
        </div>
    )
}

export default Course;