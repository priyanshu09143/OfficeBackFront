import React, { useEffect, useState } from 'react'
import { auth } from '../Firebase'
import { signOut } from 'firebase/auth'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import User from '../Components/User'
import TaskList from '../Components/TaskList'
import Tasks from '../Components/Tasks'

function Home() {
  const [currentUser, setCurrentUser] = useState("")
  const [Shows, setShows] = useState("")
  const Navigate = useNavigate()
  const handleSignOut = () => {
    if(localStorage.getItem("auth")){
      Navigate('/login')
      localStorage.removeItem("auth")
    }
    if(!localStorage.getItem("auth")){
      signOut(auth).then(() => {
        toast.success("SignOut SuccessFull")
        Navigate('/login')
      })
        .catch((e) => {
          console.log(e)
          toast.error("SignOut Failed")
        })
    }
   
  }
  useEffect(() => {
    if(localStorage.getItem("auth")){
      setCurrentUser({email : "admin@admin.com"})
    }
    if(!localStorage.getItem("auth")){
          Navigate('/login')
    }
  },[])

  function shows(state) {
    setShows(state)
  }
  return (
    <>
      <div className='home'>
        <p id='email'>User Email : {currentUser.email || " "}</p>
        <div className="buttons">
          <button onClick={() => shows("user")}>User</button>
          <button onClick={() => shows("taskList")}>Tasks Lists</button>
          <button onClick={() => shows("tasks")}>Tasks</button>

        </div>
        <button id='signOut' onClick={handleSignOut}>Sign Out</button>

        {Shows === "user" && <User />}
        {Shows === "taskList" && <TaskList />}
        {Shows === "tasks" && <Tasks />}
      </div>
    </>
  )
}

export default Home