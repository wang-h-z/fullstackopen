const Header = ({course}) => {
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
  const course = 'Half Stack application development'
  /*const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14*/

  const parts = [
    { name: 'Fundamentals of React' , exercises: 10 },
    { name: 'Using props to pass data' , exercises: 7 },
    { name: 'State of a component' , exercises: 14 },
  ]

  return (
    <div>
      <Header course={course} />
      <Part partInfo={parts[0]}/>
      <Part partInfo={parts[1]}/>
      <Part partInfo={parts[2]}/>
      <Total number={parts[0].exercises + parts[1].exercises + parts[2].exercises}/>
    </div>
  )
}

export default App