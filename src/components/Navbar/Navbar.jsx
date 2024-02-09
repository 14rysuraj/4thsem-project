import React from 'react'
import './Navbar.css'
import { slide as Menu } from 'react-burger-menu'
import { Link, NavLink } from 'react-router-dom'




class Navbar extends React.Component {
    render () {
        // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
        return (
          <Menu>
            <NavLink to='/' className='menu-item'
            >Home</NavLink>
            <NavLink to='/book' className='menu-item'>Book</NavLink>
            <NavLink to='/ticketstatus' className='menu-item'>Ticket Status</NavLink>
                <NavLink to='/about' className='menu-item'>About</NavLink>
               

            <NavLink to='/contact' className='menu-item'>Contact</NavLink>
            <NavLink to='/login' className='menu-item'>Login</NavLink>
          </Menu>
        );
      }
   
}
  export default Navbar