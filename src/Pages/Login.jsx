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
    if (localStorage.getItem("auth")) {
      navigate("/")
    }
    if (!localStorage.getItem("auth")) {
      auth.onAuthStateChanged((user) => {
        if (user) {
          navigate("/")
        }
      })
    }
  })

  const Admin = { email: "admin@admin.com", password: "admin@123" }
  const handleLogin = (e) => {
    e.preventDefault()
    if (email === Admin.email ) {
      if(password === Admin.password){
        localStorage.setItem("auth", Admin.email)
        toast.success("Admin Login success")
        navigate("/")
      }
      else{
        toast.error("Please Enter Valid Id or password")
      }
      
    }
    // if (email !== Admin.email) {
    //   signInWithEmailAndPassword(auth, email, password)
    //     .then(() => {
    //       toast.success("Login success")
    //     })
    //     .catch((error) => {
    //       toast.error("Wrong Email or Password")
    //       console.log(error)
    //     })
    // }
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