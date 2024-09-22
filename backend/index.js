const express = require("express")
const app = express();
require("dotenv").config();
const routes = require('./Routes/routes')
const database = require("./config/database")
const cors = require("cors")

const Port = process.env.PORT || 4000

database.connect();
app.use(express.json());
// const corsOptions = {
//     origin: ['http://localhost:3000','https://to-do-list-frontend-oeti.onrender.com'],
//     optionsSuccessStatus: 200 // For legacy browsers
//   };
app.use(cors());
app.use("/api/v1",routes);



app.get("/",(req,res)=>{
    res.send(
        "<h1>Hello World</h1>"
    )
})

app.listen(Port,()=>{
    console.log("App is running")
})
