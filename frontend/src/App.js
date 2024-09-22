import Todolist from "./Components/Todolist";

import LoginPage from "./Components/LoginPage";
import SignupPage from "./Components/SignupPage";

import  {Routes, Route} from "react-router-dom"
import Navbar from "./Components/Navbar";
import { useSelector } from "react-redux";


function App() {

  const isSignup = useSelector((state)=>state.signup.isSignup)
  const isLogin = useSelector((state)=>state.login.isLogin)
  // console.log("The login state is : ",isLogin)
  return (
    <div >
      <Navbar/>
      <Routes>
        <Route path="/" element={<Todolist/>}/>
      </Routes>
      {isLogin && <LoginPage/>}
      {isSignup && <SignupPage/>}

    </div>
  );
}

export default App;
