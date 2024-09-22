import React from 'react'
import { useForm } from 'react-hook-form';
import { RxCross2 } from "react-icons/rx";
import { useDispatch,  } from 'react-redux';
import { changeSignup } from '../Redux/Slice/SignupSlice';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { changeLogin } from '../Redux/Slice/LoginSlice';


function SignupPage() {
    
    const url = "https://to-do-list-backend-so3m.onrender.com"
    const dispatch = useDispatch();
    const {register, handleSubmit, formState:{errors,reset}} = useForm(
        {
            name:"",
            email:"",
            password:"",
            confirmPassword:""
        }
    )

    const onSubmit = async(data) => {
        const responce = await fetch(url+"/api/v1/auth/signup",{
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        })

        const result = await responce.json();
        if(!result.success){
          toast.error(result.message)
          return;
        }
        toast.success(result.message)
        dispatch(changeSignup())
        dispatch(changeLogin())
      };

      const closeSignup = ()=>{
        dispatch(changeSignup())
      }
      const signinHandler = ()=>{
        dispatch(changeSignup());
        dispatch(changeLogin())
      }
  return (
    <div  className='w-[100vw] h-[100vh] flex justify-center items-center fixed inset-0  bg-opacity-75 backdrop-blur-sm bg-black'>
      
       <div className='sm:w-[28%] w-[90%] sm:mt-0 -mt-12 bg-black text-white flex flex-col gap-1 px-6 rounded-xl pb-8'>
            <div onClick={closeSignup} className=' mt-2 ml-auto -mr-4  text-2xl flex justify-between w-max cursor-pointer hover:bg-red-700 transition-all duration-100 rounded-sm'><RxCross2/></div>
            <div>
                <h1 className='text-2xl font-bold text-center '>SIGN UP TO CREATE TODO</h1>
            </div>

            <div className='mt-4 flex flex-col gap-4'>
                <form action="" className='flex flex-col gap-6' onSubmit={handleSubmit(onSubmit)}>
                    
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="name" >What's your name ? </label>
                        <input type="text" {...register("name",{required:true})} name='name' id='name' placeholder='Enter your name...' className='bg-[#4f4f4f] py-2 px-4 rounded-md outline-none  ' />
                        {errors.name && <p className='text-red-500'>*Name is required</p>}
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="email" >What's your email ? </label>
                        <input type="email" name='email' id='email'  {...register("email",{required:true})}  placeholder='Enter your email...' className='bg-[#4f4f4f] py-2 px-4 rounded-md outline-none  ' />
                        {
                            errors.email && <p className='text-red-500'>*Email is required</p>
                        }
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="password" >Password ? </label>
                        <input type="password" name='password'  {...register("password",{required:true})}  id='password' placeholder='Enter password...' className='bg-[#4f4f4f] py-2 px-4 rounded-md outline-none ' />
                        {errors.password && <p className='text-red-500'>*Password is required</p>}
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="confirmPassword" >Confirm password ? </label>
                        <input type="password" name='confirmPassword'  {...register("confirmPassword",{required:true})}  id='confirmPassword' placeholder='Enter confirm password...' className='bg-[#4f4f4f] py-2 px-4 rounded-md outline-none  ' />
                        {errors.confirmPassword && <p className='text-red-500'>*Confirm Password is required</p>}
                    </div>

                    <button className='bg-[#6674CC] rounded-lg py-3 mt-2'>Submit</button>
                </form>
                <button onClick={signinHandler} className='text-indigo-500 w-max mt-3'>Sign in with your account</button>
            </div>
       </div>
    </div>
  )
}

export default SignupPage
