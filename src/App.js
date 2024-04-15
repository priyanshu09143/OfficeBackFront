import React from 'react'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import "./App.css"
import { Toaster } from 'react-hot-toast'
function App() {
  return (
    <Router>
      <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
    </Router>
  )
}

export default App