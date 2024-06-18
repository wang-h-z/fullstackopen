import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => {
  return (
  <p>
    {props.text} {props.value}
  </p>
  )
}

const Statistics = (props) => {
  if (props.total == 0) {
    return (
      <div>
        <h1>statistics</h1>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <tr>
            <td>good</td>
            <td>{props.good}</td>
          </tr>
          <tr>
            <td>neutral</td>
            <td>{props.neutral}</td>
          </tr>
          <tr>
            <td>bad</td>
            <td>{props.bad}</td>
          </tr>
          <tr>
            <td>total</td>
            <td>{props.total}</td>
          </tr>
          <tr>
            <td>average</td>
            <td>{props.average}</td>
          </tr>
          <tr>
            <td>positiive</td>
            <td>{props.positive}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const calculateStatistics = (newGood, newNeutral, newBad) => {
    const newTotal = newGood + newNeutral + newBad;
    const newAverage = (newGood - newBad) / newTotal;
    const newPositive = ((newGood / newTotal) * 100).toFixed(1);
    return { newTotal, newAverage, newPositive };
  };

  const handleGood = () => {
    const newGood = good + 1;
    const { newTotal, newAverage, newPositive } = calculateStatistics(newGood, neutral, bad);
    setGood(newGood);
    setStatistics({ total: newTotal, average: newAverage, positive: newPositive });
  };

  const handleNeutral = () => {
    const newNeutral = neutral + 1;
    const { newTotal, newAverage, newPositive } = calculateStatistics(good, newNeutral, bad);
    setNeutral(newNeutral);
    setStatistics({ total: newTotal, average: newAverage, positive: newPositive });
  };

  const handleBad = () => {
    const newBad = bad + 1;
    const { newTotal, newAverage, newPositive } = calculateStatistics(good, neutral, newBad);
    setBad(newBad);
    setStatistics({ total: newTotal, average: newAverage, positive: newPositive });
  };

  const [statistics, setStatistics] = useState({ total: 0, average: 0, positive: 0 });

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={statistics.total}
        average={statistics.average}
        positive={statistics.positive}
      />
    </div>
  );
};

export default App

