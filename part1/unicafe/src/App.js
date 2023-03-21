import { useState } from 'react'

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text} {value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad, average }) => {
  let total = 0
  let avg = 0
  let positive = 0
  total = bad + good + neutral
  if (total == 0)
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  if (total != 0) {
    if (average <= 0)
      avg = 0
    else
      avg = average / total
    positive = good / total * 100
  }

  return (
    <div>
      <StatisticsLine text="good" value={good} />
      <StatisticsLine text="neutral" value={neutral} />
      <StatisticsLine text="bad" value={bad} />
      <StatisticsLine text="all" value={total} />
      <StatisticsLine text="average" value={avg} />
      <StatisticsLine text="positive" value={positive} />
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [average, setAverage] = useState(0)


  const goodFeedback = () => {
    setGood(good + 1)
    setAverage(average + 1)
  }

  const neutralFeedback = () => {
    setNeutral(neutral + 1)
  }

  const badFeedback = () => {
    setBad(bad + 1)
    setAverage(average - 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={goodFeedback}>good</button>
      <button onClick={neutralFeedback}>neutral</button>
      <button onClick={badFeedback}>bad</button>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} average={average} />
    </div>
  )
}

export default App