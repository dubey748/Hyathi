import { useState } from 'react'

import './App.css'
import Cal from './Cal'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Cal/>
    </>
  )
}

export default App
