import React, { useEffect, useState } from 'react'
import AddGoal from './AddGoal'
import { useSelector } from 'react-redux'
import { removeItems, setingItems, updateItemCheck, updateItems } from '../../features/goalsSlice'
import { useDispatch } from 'react-redux'
import { updateUser } from '../../config/connectingToDb'

const Main = ({userData}) => {
    const itemsList = useSelector((state)=>state.goalList)
    const id = userData?._id
    const [itemIndex, setItemIndex] = useState(-1)
    const [itemId, setItemId] = useState(0)
    const itemTitle = itemIndex>0?itemsList[itemIndex]?.title:null
    const [itemTitleUpdate, setItemTitleUpdate] = useState("")
    const [showUpdate, setShowUpdate] = useState(0)
    const [showGoal, setShowGoal] = useState(0)
    const [check, setCheck] = useState(false)
    const [rerendder, setRerender] = useState([])

    const dispatch = useDispatch()

    useEffect(()=>{
        setItemTitleUpdate(itemTitle)
    },[itemTitle])


    useEffect(()=>{
        const sorting = itemsList?.slice().sort(( a, b ) => b.imp - a.imp)
        dispatch(setingItems(sorting))
    },[rerendder])

    const updatedItem = {
        index: itemIndex,
        id: itemId,
        title: itemTitleUpdate,
        imp: check
    }

    useEffect(()=>{
        updateUser(id, itemsList)
    },[itemsList])



    const handleUpdate=(ev)=>{
        ev.preventDefault()
        dispatch(updateItems(updatedItem))
        
        setShowUpdate(0)
        setItemIndex(-1)
    }


    const handleCheck =(e)=>{
        if(itemIndex>=0){
        setItemTitleUpdate(itemTitle)
        dispatch(updateItemCheck(updatedItem))
        setRerender([])
        setItemIndex(-1)
        }
    }
  return (
    <main>
        <AddGoal showGoal={showGoal} setShowGoal={setShowGoal}/>
        <h1>My Goals</h1>
        <button onClick={()=>setShowGoal(1)}>Add new Goal</button>
        <div className='goal_cards'>
            {itemsList?.map((item,index)=>
            <li key={item.id}>
                <input type="checkbox" title='double click to make important!' checked={item.imp} onChange={(e)=>{
                        setCheck(e.target.checked)
                        setItemIndex(index)
                        setItemId(item.id)
                        handleCheck()
                }}/>
                <div className='card'>
                    <h2>{item.title}</h2>
                    <button onClick={()=>dispatch(removeItems(item.id))}>Remove</button>
                    <button onClick={()=>{
                        setItemIndex(index)
                        setItemId(item.id)
                        setItemTitleUpdate(itemTitle)
                        setShowUpdate(1)
                        }}>Update</button>
                </div>
            </li>)}
        </div>
        {showUpdate===1?
        <form onSubmit={handleUpdate} className='update_form'>
            <h2>Update</h2>
            <input type="text" value={itemTitleUpdate} onChange={(e)=>setItemTitleUpdate(e.target.value)}/>
            <button type='submit'>Update</button>
            <button type='click' onClick={()=>setShowUpdate(0)}>Exit</button>
        </form>:null}
    </main>
  )
}

export default Main