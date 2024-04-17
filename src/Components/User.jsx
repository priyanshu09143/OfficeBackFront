import React, { useEffect, useState } from 'react'
import axios from 'axios'

function User(user) {
    const [userData , setUserData] = useState([])
    const API = "https://officebackend.onrender.com"
    
    useEffect(()=>{
        axios.get(API+"/api/users").then((res)=>{
            setUserData(res.data)
        }).catch((err) => {
            console.log(err)
        }) 
    },[])
  return (
    <div className='userData'>
        <table>
            <tr>
                <th>User Id</th>
                <th>Email</th>
                <th>Password</th>
                <th>SignUp Time</th>
            </tr>
            {
                userData.map((user , index)=>{
                    return(
                        <tr key={index}>
                            <td>{user.uid}</td>
                            <td>{user.email}</td>
                            <td>{user.passwordHash}</td>
                            <td>{user.metadata.creationTime}</td>
                        </tr>
                    )
                })
            }
        </table>
    </div>
  )
}

export default User