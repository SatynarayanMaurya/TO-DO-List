import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSignup:false
}
export const signupSlice = createSlice({
    name:"signupSlice",
    initialState,
    reducers:{
        changeSignup :(state)=>{
            state.isSignup = !state.isSignup;
        }
    }
})

export const {changeSignup} = signupSlice.actions
export default signupSlice.reducer;