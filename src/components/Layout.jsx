import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import { context } from '../main'
import { useCookies } from 'react-cookie'
import { useEffect } from 'react'

function Layout() {

  const { isAuthenticated, setIsAuthenticated } = useContext(context);

  const [cookies] = useCookies("token");

  useEffect(() => {
    if (cookies.token) {
      setIsAuthenticated(true);
   }
  }, []);


  return (
    <div>
          <Header />
          <Outlet />
          <Footer/>
    </div>
  )
}

export default Layout
