import React, { useEffect, useState } from 'react'
import { FaRegFileAlt } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { changeLogin } from '../Redux/Slice/LoginSlice';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Todolist() {
    
    const url = "https://to-do-list-backend-sns6.onrender.com"
    const [isDeleted, setIsDeleted] = useState(false)
    const [isTodoAdded, setIsTodoAdded] = useState(false);
    const [isEditTodo, setIsEditTodo] = useState(false)


    const user = useSelector((state)=>state.login.user)
    const [allTodoList, setAllTodoList] = useState([]) ;

    const [ischecked, setIsChecked] = useState(
        new Array(10).fill(false)
    )
    
    const dispatch = useDispatch()
    const [text, setText ] = useState("");
    const loginToken = useSelector((state)=>state.login.token)


    const AddTodo =async (text) => {
        
        if(loginToken === 'null'){
            toast.error("Login to create Todo !")
            dispatch(changeLogin())
            return ;
        }
        const abc = {
            name:text,
            userId:user
        }
        const responce = await fetch(url+"/api/v1/createTodo",{
            method:"POST",
            headers:{
                'Authorization': `Bearer ${loginToken}`,
                "Content-Type":"application/json"
            },
            body:JSON.stringify(abc)
        })
        const result = await responce.json();
        // console.log("Your added todo is : ", result)

        if(!result.success){
            toast.error(result.message);
            return ;
        }
        toast.success(result.message);

        setText("");
        setIsTodoAdded(!isTodoAdded)
        
    };


    const getAllTodo = async()=>{
        if(loginToken === 'null'){
            return ;
        }
        const todos = await fetch(url+"/api/v1/getAllTodo",{
            method:"GET",
            headers:{
                'Authorization': `Bearer ${loginToken}`,
                "Content-Type":"application/json",
            },
        })
        const result  = await todos.json();
        setAllTodoList(result.allTodos)
    }

    useEffect(()=>{
        getAllTodo();
    },[loginToken,isTodoAdded,isDeleted,isEditTodo])

    
    const deleteTodo = async (listId)=>{
        
        // const responce = await fetch("http://localhost:4000/api/v1/deleteTodo",{
        const responce = await fetch(url+"/api/v1/deleteTodo",{
            method:"DELETE",
            headers:{
                'Authorization': `Bearer ${listId}`,
                "Content-Type":"application/json"
            }
        })
        const result = await responce.json();
        // console.log("Responce of deleted item is : ",await responce.json())
        setIsDeleted(!isDeleted)
        toast.success(result.message)
    }

    const editTodo = async (todoId,text)=>{
        setText(text);
        const abc = {
            todoId:todoId,
            text:text
        }
        const responce = await fetch(url+"/api/v1/editTodo",{
            method:"POST",
            headers:{
                'Authorization': `Bearer ${loginToken}`,
                "Content-Type":"application/json"
            },
            body:JSON.stringify(abc)
        })
        const result = await responce.json();
        if(!result.success){
            toast.error(result.message);
            return ;
        }
        setIsEditTodo(!isEditTodo);
    }
   
    const changeHandler = (e)=>{
        setText(e.target.value);
    }

    const checkboxHandler = (index)=>{

        const updatedChecked = [...ischecked];
        updatedChecked[index] = !updatedChecked[index];  // Toggle the value
        setIsChecked(updatedChecked);
    }

  return (

    <div className='w-[100%] h-[100%] mt-[30px] flex justify-between items-center'>
      
      <div className={`sm:w-[80vw] w-[95vw] sm:h-[80vh]  overflow-y-scroll mx-auto  sm:flex sm:flex-row flex-col  justify-between`}>


        <div className='bg-yellow-300 scrollbar-custom h-[100%] overflow-y-scroll  sm:w-[50%] sm:pt-16 pt-8 sm:pl-16 pl-8 pb-8 flex gap-4 flex-col '>
            
            <div className='flex gap-4 items-center  font-semibold'>
                <h1 className='text-3xl '>Todo List</h1>
                <p className='text-2xl'><  FaRegFileAlt/></p>
            </div>

            <div>
                <input onChange={changeHandler} value={text} type="text" placeholder='Enter Todo...'  className=' sm:w-[80%] w-[72%] pl-4 pr-6 py-2 outline-none rounded-s-xl '/>
                <button onClick={()=>AddTodo(text)} className='bg-orange-500 px-6 py-2 rounded-full -ml-3 text-white text-lg'>Add</button>
            </div>

            <div>
                <div className='flex flex-col gap-2 pl-2 sm:pr-4 pr-2 '>
                    { 
                        allTodoList.map((list,index)=>{
                            return <div key={index} className=' flex justify-between items-center '>

                                        <div className='flex gap-4'>
                                            <input type="checkbox"  className='w-5' onChange={()=>checkboxHandler(index)} name={list}  checked={ischecked[index]}/>
                                            <p className={`${ischecked[index] ? "line-through" : ""}`}>{list.name}</p>  
                                        </div>
                                        <div className='flex gap-2 '>
                                            <button onClick={()=>editTodo(list._id,list.name)} className='bg-green-400 sm:px-4 px-3 py-2 rounded-full  text-white text-2xl'>
                                                <p ><CiEdit/></p>
                                            </button>
                                            <button onClick={()=>deleteTodo(list._id)} className='bg-red-500 sm:px-4 px-3 py-2 rounded-full  text-white text-2xl'>
                                                <p><MdDeleteOutline/></p>
                                            </button>
                                        </div>

                                    </div>
                        })
                    }
                </div>
            </div>
        </div>
        
        <div className='bg-green-300 font-bold sm:w-[50%]  flex justify-center items-center flex-col gap-3 sm:py-0 py-8'>
            <h1 className='sm:text-7xl text-4xl'>Build </h1>
            <h3 className='sm:text-5xl text-2xl'><span className='text-red-600'>TO-DO</span> list</h3>
            <p className='sm:text-4xl text-2xl'>using React JS</p>
        </div>
      </div>


    </div>
  )
}

export default Todolist


