import React from 'react'
import Header from './Header/Header'
import { Outlet } from 'react-router-dom'

function LoginLayout() {
  return (
    <div>
          <Header />
          <Outlet/>
    </div>
  )
}

export default LoginLayout
