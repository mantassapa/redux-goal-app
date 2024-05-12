import React, { useEffect, useState } from 'react'
import { DeleteUser, getAllUsers } from '../../config/connectingToDb'

const Users = () => {
    const [users, setUsers] = useState([])
    const [rerender, setRerender] = useState([])
    
    useEffect(()=>{
        getAllUsers(setUsers)
    },[rerender])
    

  return (
    <div className='user_table'>
        <h1>All Users</h1>
        {users?.map((e, index)=>
                <div className='user_card' key={index}>
                    <h4>Role: {e.role}</h4>
                    <h4>Username: {e.username}</h4>
                    <h4>Email: {e.email}</h4>
                    <h4>Id: {e._id}</h4>
                    <h4>Created: {e.createdAt}</h4>
                    <h4>Updated: {e.updatedAt}</h4>
                    {e.role!=="admin"?<button onClick={()=>{
                        DeleteUser(e._id);
                        setRerender([])
                        setRerender([])
                    }}>dekete</button>:null}
                </div>
        )}
    </div>
  )
}

export default Users