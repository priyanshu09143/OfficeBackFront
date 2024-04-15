import React, { useEffect, useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from "../Firebase"
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function Login() {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/")
      }
    })
  })

  const handleLogin = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success("Login success")
      })
      .catch((error) => {
        toast.error("Wrong Email or Password")
        console.log(error)
      })
  }
  return (
    <>
      <div className='login'>
        <h1>Login Here</h1>

        <form>
          <input type="email" placeholder="User ID" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" onClick={handleLogin}>Login</button>
        </form>
      </div>
    </>
  )
}

export default Login