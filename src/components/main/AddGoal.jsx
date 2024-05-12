import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addItems } from '../../features/goalsSlice'

const AddGoal = ({showGoal, setShowGoal}) => {
    const [inputValue, setInputValue] = useState("")
    const dispatch = useDispatch()

    const handleSubmit = (ev)=>{
        ev.preventDefault()
        dispatch(addItems(inputValue))
    }

return (showGoal===1?
    <div  className='goal_form'>
        <form onSubmit={handleSubmit}>
            <h2>New Goal</h2>
            <input type="text" value={inputValue} onChange={(e)=>setInputValue(e.target.value)} required/>
            <button type='submit'>Add</button>
        </form>
        <button type='click' onClick={()=>setShowGoal(0)}>Exit</button>
    </div>:null
  )
}

export default AddGoal