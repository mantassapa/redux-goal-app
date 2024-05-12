import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

const initialState = { goalList: [] }

export const goalListSlice = createSlice({
    name:"goalList",
    initialState,
    reducers:{
        addItems:(state,action)=>{
            const item={
                id: Date.now(),
                title: action.payload,
                imp:false,
            }
            state.goalList.push(item)
        },
        removeItems: (state,action)=>{
            state.goalList=state.goalList.filter((item)=>item.id!==action.payload)
        },
        setingItems: (state,action)=>{
            state.goalList=action.payload
        },
        updateItems:(state,action)=>{
            const newItem={
                id: action.payload.id,
                title: action.payload.title
            }
            
            state.goalList[action.payload.index] = newItem
        },
        updateItemCheck:(state,action)=>{
            const newItem={
                id: action.payload.id,
                title: action.payload.title,
                imp: action.payload.imp
            }
            
            state.goalList[action.payload.index] = newItem
        },
    }

})

export const { addItems, removeItems, setingItems, updateItems, updateItemCheck } = goalListSlice.actions
export default goalListSlice.reducer