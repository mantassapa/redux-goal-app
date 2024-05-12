import React from 'react'
import { lightModeTogle } from '../../config/sideFunctions'

const Header = ({userData, setUserData, setShowLogin, showLogin, setShowMain}) => {

  return (
    <header>
        <h4>{userData===null?null:`Welcome: ${userData.username} ${userData.role==="admin"?userData.role:""}`}</h4>
        
        {showLogin===0?
        <button className='logout_btn' onClick={()=>{
            localStorage.removeItem("User")
            setUserData(null)
            setShowLogin(1)
            setShowMain(0)
            }}>log out
        </button>:null}

        <button className='toggle' onClick={lightModeTogle}>Style</button>
        {userData?.role==="admin"?<button className='userData_btn' onClick={()=>setShowMain(0)}>All Users</button>:null}

        {userData!==null?<button className='goals_btn' onClick={()=>setShowMain(1)}>My Goals</button>:null}
    </header>
  )
}

export default Header