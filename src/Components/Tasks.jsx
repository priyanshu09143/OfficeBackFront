import { onValue, ref } from 'firebase/database'
import { auth, db } from '../Firebase'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
function Tasks() {
    const [taskList, setTaskList] = useState([])
    const [userData, setUserData] = useState([])
    const Navigate = useNavigate()
    const API = "https://officebackend.onrender.com"
    useEffect(() => {
        if(localStorage.getItem("auth")){
            onValue(ref(db), snapshot => {
                const data = []
                snapshot.forEach((child) => {
                    let shot = child.val()
                    data.push({
                        id: child.key,
                        data: shot
                    })
                })
                setTaskList(data)
            })
        }
        if(!localStorage.getItem("auth")){
            auth.onAuthStateChanged((user) => {
                if (user) {
                    onValue(ref(db), snapshot => {
                        const data = []
                        snapshot.forEach((child) => {
                            let shot = child.val()
                            data.push({
                                id: child.key,
                                data: shot
                            })
                        })
                        setTaskList(data)
                    })
                }
                else {
                    Navigate('/login')
                }
            })
        }
       

        axios.get(API+"/api/users").then((res) => {
            setUserData(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])
    return (
        <div className='userData'>
            <table>
                <tr>
                    <th>Task Title</th>
                    <th>Task Discription</th>
                    <th>Task List Title</th>
                    <th>Created By</th>
                </tr>

                {
                    taskList.map((item, index) => {
                        let data = []
                        for (let i in item.data) {
                            data.push(item.data[i])
                        }

                        let filterData = {
                            length: data.length,
                            id: item.id,
                        }
                        userData.map((user) => {
                            if (user.uid === item.id) {
                                if (filterData.hasOwnProperty("email")) return
                                else filterData.email = user.email
                                if (filterData.hasOwnProperty("createdAt")) return
                                else filterData.createdAt = user.metadata.creationTime
                                
                            }
                        })
                        return (
                            data.map((todo , index) => {
                                return <tr key={index}>
                                    <td>{todo.title}</td>
                                    <td>{todo.discription}</td>
                                    <td>{todo.status}</td>
                                    <td>{filterData.email}</td>
                                </tr>
                            })

                        )


                    })
                }
            </table>
        </div>
    )
}

export default Tasks