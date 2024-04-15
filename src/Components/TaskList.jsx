import { onValue, ref } from 'firebase/database'
import { auth, db } from '../Firebase'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function TaskList() {
    const [taskList , setTaskList] = useState([])
    const [userData , setUserData] = useState([])
    const Navigate = useNavigate()
    useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
            if(user){
                onValue(ref(db),snapshot => {
                    const data= []
                    snapshot.forEach((child)=>{
                        let shot = child.val()
                        data.push({
                            id: child.key,
                           data : shot
                        })
                    })
                    setTaskList(data)
                })
            }
            else{
                Navigate('/login')
            }
        })

        axios.get("http://localhost:8000/api/users").then((res)=>{
            setUserData(res.data)
        }).catch((err) => {
            console.log(err)
        }) 
    },[])

  return (
    <div className='userData'>
        <table>
            <tr>
            <th>ID</th>
            <th>Task List Title</th>
            <th>Created By</th>
            <th>No Of Tasks</th>
            <th>createdAt</th>
            </tr>
            {
                taskList.map((item,index)=>{
                    let data = []
                    for(let  i in item.data){
                        data.push(item.data[i])
                    }
                    let filterData = {
                        length : data.length,
                        id : item.id,
                        status : data[0].status,
                    }
                    userData.map((user)=>{
                        if(user.uid === item.id){
                            if(filterData.hasOwnProperty("email")) return
                            else filterData.email = user.email
                            if(filterData.hasOwnProperty("createdAt")) return
                            else filterData.createdAt = user.metadata.creationTime
                        }  
                    })
                        return(
                            <tr key={index}>
                                <td>{filterData.id}</td>
                                <td>{filterData.status}</td>
                                <td>{filterData.email}</td>
                                <td>{filterData.length}</td>
                                <td>{filterData.createdAt}</td>
                            </tr>
                        )
                    
                   
                })
            }
        </table>
    </div>
  )
}

export default TaskList