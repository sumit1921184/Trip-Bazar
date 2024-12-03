import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import University from './pages/University'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='University-comp'>      
      <University />
    </div>

  )
}

export default App
