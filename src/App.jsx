import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [salary, setSalary] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [earningsSoFar, setEarningsSoFar] = useState(0)
  const [startTime, setStartTime] = useState(null)

  // Calculate hourly rate based on annual salary
  const getHourlyRate = () => {
    const annualSalary = parseFloat(salary) || 0
    return annualSalary / (40 * 52) // 40 hours/week × 52 weeks
  }

  // Toggle the timer
  const toggleTimer = () => {
    if (!isRunning) {
      setIsRunning(true)
      setStartTime(Date.now())
      setEarningsSoFar(0)
    } else {
      setIsRunning(false)
    }
  }

  // Update earnings every second while running
  useEffect(() => {
    let interval = null

    if (isRunning) {
      interval = setInterval(() => {
        const elapsedMs = Date.now() - startTime
        const elapsedHours = elapsedMs / (1000 * 60 * 60)
        const earned = elapsedHours * getHourlyRate()
        setEarningsSoFar(earned)
      }, 1000)
    } else if (!isRunning && interval !== null) {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [isRunning, startTime, salary])

  return (
    <div className="App" style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>💩 Poop Salary Calculator</h1>

      <input
        type="number"
        placeholder="Enter your annual salary"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        style={{ padding: '8px', fontSize: '16px', marginBottom: '1rem' }}
      />

      <div>
        <button onClick={toggleTimer} style={{ padding: '10px 20px', fontSize: '16px' }}>
          {isRunning ? 'Stop' : 'Start'}
        </button>
      </div>

      <p style={{ marginTop: '2rem', fontSize: '20px' }}>
        💸 You’ve earned: <strong>${earningsSoFar.toFixed(7)}</strong>
      </p>
    </div>
  )
}

export default App
