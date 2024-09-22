
import React from 'react'
import { useForm } from 'react-hook-form';
import { RxCross2 } from "react-icons/rx";
import { changeLogin, setUser } from '../Redux/Slice/LoginSlice';
import { useDispatch, } from 'react-redux';
import { setToken } from '../Redux/Slice/LoginSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { changeSignup } from '../Redux/Slice/SignupSlice';



function LoginPage() {
    
    const dispatch = useDispatch();
    const url = "https://to-do-list-backend-so3m.onrender.com"
    const {register, handleSubmit, formState:{errors}} = useForm(
        {
            email:"",
            password:"",
        }
    )

    const onSubmit = async(data) => {

        const responce = await fetch(url+"/api/v1/auth/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        })
        const result = await responce.json();
        // console.log("YOur result is : ",result)

        if(!result.success){
            toast.error(result.message)
            return ;
        }
        toast.success(result.message)
        // Extract the token
        const token = result.user.token;
        localStorage.setItem("token",token)
        localStorage.setItem("user",result.user._id);
        dispatch(setToken(token));
        dispatch(setUser(result.user._id))
        dispatch(changeLogin())



    }
    const closeHandler = ()=>{
        dispatch(changeLogin());
    }

    const createAccountHandler = ()=>{
        dispatch(changeLogin());
        dispatch(changeSignup())
    }
  return (
    <div    className='w-[100vw] h-[100vh] flex justify-center items-center fixed inset-0  bg-opacity-70 backdrop-blur-sm bg-black'>
      
        <div className='sm:w-[28%] w-[90%] sm:mt-0 -mt-24 bg-black text-white flex flex-col gap-1 px-6 rounded-xl pb-8'>
            <div onClick={closeHandler} className=' mt-2 ml-auto -mr-4  text-2xl flex justify-between w-max cursor-pointer hover:bg-red-700 transition-all duration-100 rounded-sm'><RxCross2/></div>
            <div>
                <h1 className='text-2xl font-bold text-center px-4'>LOGIN OR SIGN UP TO CREATE TODO</h1>
            </div>

            <div className='mt-4 flex flex-col gap-4'>
                <form action="" className='flex flex-col gap-6' onSubmit={handleSubmit(onSubmit)}>
                    

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="email" >What's your email ? </label>
                        <input type="text" name='email' id='email'  {...register("email",{required:true})}  placeholder='Enter your email...' className='bg-[#4f4f4f] py-2 px-4 rounded-md outline-none  ' />
                        {
                            errors.email && <p className='text-red-500'>*Email is required</p>
                        }
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="password" >Password ? </label>
                        <input type="password" name='password'  {...register("password",{required:true})}  id='password' placeholder='Enter password...' className='bg-[#4f4f4f] py-2 px-4 rounded-md outline-none ' />
                        {errors.password && <p className='text-red-500'>*Password is required</p>}
                    </div>


                    <button className='bg-[#6674CC] rounded-lg py-3 mt-2'>Submit</button>
                </form>

                <button onClick={createAccountHandler} className='text-indigo-500 w-max mt-3'>Create Account</button>
            </div>
        </div>
    </div>
    
  )
}

export default LoginPage
