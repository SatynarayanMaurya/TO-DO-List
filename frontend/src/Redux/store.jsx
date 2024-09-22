import { configureStore } from '@reduxjs/toolkit'
import signupSlice from "./Slice/SignupSlice" 
import LoginSlice from './Slice/LoginSlice'

export const store = configureStore({
  reducer: {
    signup:signupSlice,
    login:LoginSlice
  },
})

