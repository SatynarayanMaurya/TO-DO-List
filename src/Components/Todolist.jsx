import React, { useState } from 'react'
import { FaRegFileAlt } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

function Todolist() {
    const [allList, setAllList ] = useState([]);
    const [checkbox ,setCheckbox]  = useState(false);
    const [text, setText ] = useState("");
    const changeHandler = (e)=>{
        setText(e.target.value);
    }
   
    const AddTodo = (text) => {
        setAllList([...allList, text]);
        setCheckbox(prevState => ({
            ...prevState,
            [text]: false
        }));
        setText("");
    };

    const editHandler = (item)=>{
        setText(item);
        
        const newItems = allList.filter(element => element !== item);
        setAllList(newItems);
    }

    const deleteHandler = (item) => {
        const newItems = allList.filter(element => element !== item);
        setAllList(newItems);
        const newCheckbox = { ...checkbox };
        delete newCheckbox[item];
        setCheckbox(newCheckbox);
    };


    const checkboxHandler = (event)=>{
        const { name, checked } = event.target;
        setCheckbox(prevState => ({
            ...prevState,
            [name]: checked
        }));
    }


  return (

    <div className='w-[100vw] h-[100vh] flex justify-between items-center'>
      
      <div className={`sm:w-[80vw] w-[95vw] sm:h-[80vh] ${allList.length> 4 ? 'h-[95vh]' : 'min-h-[50vh]' }  overflow-y-scroll mx-auto  sm:flex sm:flex-row flex-col  justify-between`}>


        <div className='bg-yellow-300  sm:w-[50%] sm:pt-16 pt-8 sm:pl-16 pl-8 pb-8 flex gap-4 flex-col '>
            
            <div className='flex gap-4 items-center  font-semibold'>
                <h1 className='text-3xl '>Todo List</h1>
                <p className='text-2xl'><  FaRegFileAlt/></p>
            </div>

            <div>
                <input onChange={changeHandler} value={text} type="text" placeholder='Enter Todo...'  className=' sm:w-[80%] w-[72%] pl-4 pr-6 py-2 outline-none rounded-s-xl '/>
                <button onClick={()=>AddTodo(text)} className='bg-orange-500 px-6 py-2 rounded-full -ml-3 text-white text-lg'>Add</button>
            </div>

            <div>
                <div className='flex flex-col gap-2 pl-2 sm:pr-4 pr-2'>
                    {allList.map((list,index) =>{
                        return <div key={index} className='flex justify-between items-center '>

                                    <div className='flex gap-4'>
                                        <input type="checkbox"  className='w-5' onChange={checkboxHandler} name={list}  checked={checkbox[list]}/>
                                        <p className={`${checkbox[list] ? "line-through" : ""}`}>{list}</p>  
                                    </div>
                                    <div className='flex gap-2 '>
                                        <button onClick={()=>editHandler(allList[index])} className='bg-green-400 sm:px-4 px-3 py-2 rounded-full  text-white text-2xl'>
                                            <p ><CiEdit/></p>
                                        </button>
                                        <button onClick={()=>deleteHandler(allList[index])} className='bg-red-500 sm:px-4 px-3 py-2 rounded-full  text-white text-2xl'>
                                            <p><MdDeleteOutline/></p>
                                        </button>
                                    </div>
                                </div>
                    })}
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


















