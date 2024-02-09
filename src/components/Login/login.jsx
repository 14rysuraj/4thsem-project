import React from "react";
import "./Login.css";
import Register from "../Register/Register";
import { Link, NavLink } from "react-router-dom";

function Login() {

  const handleLogin = (e) => {
    e.preventDefault();
  }
  return (
   
        
    <div className="body">

      <div className="Lcontainer">
        <div className="profile">
        </div>
        
      <form action="" className="login">

           <label htmlFor="email">Email:</label>
            <input type="text" id="email" name="email" required/><br/>
            
            <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required/><br />
          
          <p id="forget-password"><a href="#" onClick={() => {
            alert('Pagal hai kya yaad kara kar bhai password ')
          }}>forget Password?</a></p><br />
          <button className="login-btn" onClick={handleLogin}>Log In</button>
          <br />
          <p id="or">OR</p>
         <br />
        
          <p id="CA"><NavLink to="/register">create account ?</NavLink></p>
 
          </form>


      </div>
              
             
          </div>
         
    
  );
}

export default Login;
