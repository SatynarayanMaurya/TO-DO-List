import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogin:false,
    token:localStorage.getItem("token") || 'null',
    user : localStorage.getItem("user") || 'null'
}

export const LoginSlice =createSlice( {
    name:"LoginSlice",
    initialState,
    reducers:{
        changeLogin:(state)=>{
            state.isLogin = !state.isLogin
        },
        setToken :(state,action)=>{
            state.token = action.payload
        },
        setUser :(state,action)=>{
            state.user = action.payload
        },
    }
})

export const {changeLogin,setToken,setUser} = LoginSlice.actions;
export default LoginSlice.reducer;