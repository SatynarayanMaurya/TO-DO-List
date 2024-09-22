import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeSignup } from '../Redux/Slice/SignupSlice';
import { changeLogin, setToken, setUser } from '../Redux/Slice/LoginSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Navbar() {

  const dispatch = useDispatch();
  
  const token = useSelector((state)=>state.login.token)
  const flag = token==='null'?true:false;
  const [isLogin, setIslogin] = useState(flag)


  const signupHandler = ()=>{
    dispatch(changeSignup())
  }
  const loginHandler = ()=>{
    setIslogin(!isLogin)
    dispatch(changeLogin())
  }
  const logoutHandler = ()=>{
    setIslogin(!isLogin)
    dispatch(setToken('null'))
    dispatch(setUser('null'))
    localStorage.setItem("token",'null');
    localStorage.setItem("user", 'null')
    window.location.reload();
    toast.success("User Logged out successfully")
  }
  return (
    <div className='w-[100vw] h-[70px]  flex justify-center items-center border border-b-2'>
      <div className='sm:w-[80%] w-[90%] mx-auto flex justify-between items-center'>
        
        <div>
            <img src="https://cdni.iconscout.com/illustration/premium/thumb/todo-list-illustration-download-in-svg-png-gif-file-formats--checklist-checkmark-survey-pack-people-illustrations-5059486.png?f=webp" alt=""  width={50}/>
        </div>

        <div className='flex gap-4'>
          {isLogin ? 
            (<div className='flex gap-4'>
                <button onClick={signupHandler} className='sm:px-3 px-2 sm:py-2 py-1  border-2 rounded-md text-[#6674CC] font-semibold'  style={{ borderColor: '#6674CC' }}>Signup</button>
                <button onClick={loginHandler} className='sm:px-3 px-2 sm:py-2 py-1  border-2 rounded-md text-[#6674CC] font-semibold'  style={{ borderColor: '#6674CC' }}>Login</button>
              </div>)
            :
            (     <button onClick={logoutHandler} className='sm:px-3 px-2 sm:py-2 py-1   border-2 rounded-md text-[#6674CC] font-semibold'  style={{ borderColor: '#6674CC' }}>Log out</button>)}
            
            
            
        </div>
      </div>
    </div>
  )
}

export default Navbar
