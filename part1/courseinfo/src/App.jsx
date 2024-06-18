const Header = ({course}) => {
  console.log(course)
  return (
    <div>
      <h1>{course}</h1>
    </div>
  )
}

const Content = ({part, exercise}) => {
  return (
    <div>
    <p>
      {part} {exercise}
    </p>
    </div>
  )
}

const Total = ({number}) => {
  return (
    <div>
    <p>Number of exercises {number}</p>
    </div>
  )
}

const Part = ({partInfo}) => {
  console.log(partInfo)
  return (
    <div>
    <p>
      {partInfo.name} {partInfo.exercises}
    </p>
    </div>
  );
}

const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Part partInfo={course.parts[0]}/>
      <Part partInfo={course.parts[1]}/>
      <Part partInfo={course.parts[2]}/>
      <Total number={course.parts.reduce((sum, part) => sum + part.exercises, 0)}/>
    </div>
  )
}

export default App