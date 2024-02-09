import React from 'react'
import "./Register.css"
import { NavLink } from 'react-router-dom';

function Register() {

    const handlesignup = (e) => {
        e.preventDefault();
}

  return (
      <>
          <div className="register-container">
              
              <form action="post" className='register-form'>
                  <h2 className='register-title'>Registration</h2>
                  <br />
                  <br />
                  <label htmlFor="username" >Username :</label>
                  <input type="text" className='register-input'/>
                  <label htmlFor="email" className='register-input'>Email Address :</label>
                  <input type="email"  className='register-input'/>
                  <label htmlFor="password" className='register-input'>Password :</label>
                  <input type="password" />
                  <button className='signup-button' onClick={handlesignup}>Sign up</button>
                  <br />
                  <br />
                  <p>Already Registered ?<NavLink to="/login" className="reg-click-here"> Login</NavLink></p>

            </form>
       </div>
      </>
  )
}

export default Register
