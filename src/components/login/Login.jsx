import React, { useState } from 'react'
import { loginUser, registerUser } from '../../config/connectingToDb'




const Login = ({showLogin, setShowLogin, setUserData, setShowMain}) => {
  //login
  const [user, setUser] = useState({
    email:"",
    password:"",
  })
  //register
  const [newUser, setNewUser] = useState({
    username:"",
    email:"",
    password:"",
  })
  const [passRepeat, setPassRepeat] = useState("")
  const [errorMessage,setErrorMessage] = useState("")
  const [showReg,setShowReg] = useState(0)

  const handleSubmitReg=(ev)=>{
    ev.preventDefault()
    if(newUser.password===passRepeat){
      registerUser(newUser,setUserData,setErrorMessage,setShowLogin,setShowMain)

    }else{
      setErrorMessage(errorMessage)
    }
  }

  const handleChange=(ev)=>{
    const {name, value} = ev.target
    setNewUser((prev)=>({
      ...prev,
      [name]:value
    }))
  }
  //register end
  const handleChangeLog=(ev)=>{
    const {name, value}= ev.target
    setUser((prev)=>({
      ...prev,
      [name]:value
    }))
  }
  const handleSubmitLog=(ev)=>{
    ev.preventDefault()
    loginUser(user,setUserData,setErrorMessage,setShowLogin,setShowMain)
  }

  if(showLogin===1){
    return (
      <div className='log_reg_form'>
        {showReg===1?
        <div className='reg_form'>
          <form className='register' onSubmit={handleSubmitReg}>
              <h2>Register</h2>
              <h4>{errorMessage}</h4>
              <label htmlFor="register_username">Username: </label>
              <input id='register_username' type="text" value={newUser.username} required name='username' onChange={handleChange}/>
              <label htmlFor="register_email">Email: </label>
              <input id='register_email' type="email" value={newUser.email} required name='email' onChange={handleChange}/>
              <label htmlFor="register_password">Password: </label>
              <input id='register_password' type="password" value={newUser.password} required name='password' onChange={handleChange}/>
              <label htmlFor="register_password--re">Repeat password: </label>
              <input id='register_password--re' type="password" value={passRepeat}  required onChange={(ev)=>setPassRepeat(ev.target.value)}/>
              <button type='submit'>Register</button>
          </form>
              <button className='reg_toggle' onClick={()=>setShowReg(0)} >Log in</button>
          </div>
          :null}
          {showReg===0?
          <div className='log_form'>
            <form className='login' onSubmit={handleSubmitLog}>
                <h2>Log in</h2>
                <h4>{errorMessage}</h4>
                <label htmlFor="login_email">Email: </label>
                <input id='login_email' type="email" value={user.email} name='email' onChange={handleChangeLog} required/>
                <label htmlFor="login_password">Password: </label>
                <input id='login_password' type="password" value={user.password} name='password' onChange={handleChangeLog} required/>
                <button type='submit'>Log in</button>
            </form>
                <button className='reg_toggle' onClick={()=>setShowReg(1)}>register</button>
          </div>
          :null}
      </div>
    )
  }
}

export default Login