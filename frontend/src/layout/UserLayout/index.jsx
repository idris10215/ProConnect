import FooterComponent from '@/Components/Footer'
import NavbarComponent from '@/Components/Navbar'
import React from 'react'

const UserLayout = ({children}) => {
  return (
    <div>
        <NavbarComponent /> 
        {children}
        {/* <FooterComponent /> */}
    </div>
  )
}

export default UserLayout