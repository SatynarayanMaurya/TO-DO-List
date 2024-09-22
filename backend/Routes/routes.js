const express = require("express")
const router = express.Router();

const {signup,login } = require("../Controller/signupController")
const {auth} = require("../Middlewares/Auth");
const { createTodo, getAllTodo, deleteTodo, editTodo } = require("../Controller/todoController");
router.post("/auth/signup", signup);
router.post("/auth/login", login);
router.post("/createTodo",auth,createTodo)
router.get("/getAllTodo",auth,getAllTodo)
router.delete("/deleteTodo",deleteTodo)
router.post("/editTodo",auth, editTodo)

module.exports = router




// const responce = await fetch("http://localhost:4000/api/v1/checkbox",{
//     method:"GET",
//     headers:{
//         "Authorization":`Bearer ${todoId}`,
//         "Content-Type":"application/json"
//     }
// })
// const result = await responce.json.json();
// console.log("Your checkbox responce is : ", result);