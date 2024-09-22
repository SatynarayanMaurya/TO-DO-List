const Todo = require("../Models/TodosSchema")
const Signup = require("../Models/signupSchema")


exports.createTodo = async(req,res)=>{
    try{
        const {name,userId } = req.body;
        if(!name){
            return res.status(500).json({
                success:false,
                message:"Please give some todo!"
            })
        }
        
       
        const existingUser = await Signup.findById(userId)
        if(!existingUser){
            return res.status(402).json({
                success:false,
                message:"User not found"
            })
        }

        
        
        // Create the todo
        const todo = (await Todo.create({name,user:existingUser._id}))
        return res.status(200).json({
            success:true,
            message:"Todo created successfully",
            yourTodo:todo
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong ! Can't create todo ",  
            errorMessage:error
        })
    }
}

exports.getAllTodo = async (req,res)=>{
    try{

        const userId = req.user.id
        // console.log("User id is : ", userId)
        

        if(!userId){
            return res.status(402).json({
                success:false,
                message:"Invalid user Id!"
            })
        }
        const allTodo = await Todo.find({user:userId}).populate("user")

        return res.status(200).json({
            success:true,
            message:"All Todo fetched successfully !",
            allTodos:allTodo
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Can't get all Todos Catch error! ",
            errorMessage:error
        })
    }
}


exports.deleteTodo = async(req,res)=>{
    try{
        // const userId = req.user.id
        // const index = 2
        // const {userId } = req.body;
        const userId = req.headers.authorization.split(" ")[1]
        console.log("user id is : ",userId)

        if(!userId){
            return res.status(401).json({
                success:false,
                message:"User id is not available"
            })
        }

        const data = await Todo.findByIdAndDelete(userId)
        return res.status(200).json({
            success:true,
            message:"Todo deleted successfully",
            YourData:data
        })
    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:"Catch error ! can't delete the todo",
            errorMessage:error
        })
    }
}


exports.editTodo = async(req,res)=>{
    try{
        const {text, todoId} = req.body;

        if(!text || !todoId){
            return res.status(401).json({
                success:false,
                message:"All fields are required !"
            })
        }
        const todo = await Todo.findByIdAndUpdate({_id:todoId}, {name:text},{new:true})
        const deleteThatTodo = await Todo.findByIdAndDelete({_id:todoId})

        return res.status(200).json({
            success:true,
            message:"Todo Updated successfullly!",
            newTodo : todo,
            deletedTodo:deleteThatTodo
        })
    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:"Catch Error! can't edit the todo"
        })
    }
}

