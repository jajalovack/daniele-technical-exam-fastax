import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom"
import Button from "./Button"

const Header = () => {
  const [isLoggedIn,setIsLoggedIn]=useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    checkLoginStatus()
    window.addEventListener('storage', checkLoginStatus)
    return () => {
      window.removeEventListener("storage", checkLoginStatus)
    }
  },[])

  const checkLoginStatus = () => {
    localStorage.getItem('currentUser')?setIsLoggedIn(true):setIsLoggedIn(false)
  }

  return (
    <div className='flex bg-[#121277] p-4 text-white font-bold items-center justify-between'>
        <p onClick={function() {navigate('/')}} className="cursor-pointer">Employee Database</p>
        {
          !isLoggedIn?
          (
            <div className="flex gap-x-2">
              <Button style="header" onClick={function() {navigate('/login')}}>Login</Button>
              <Button style="header" onClick={function() {navigate('/register')}}>Register</Button>
            </div>
          ):(<Button style="header" onClick={function() {
                navigate('/')
                localStorage.removeItem('currentUser')
                window.dispatchEvent(new Event('storage'))
              }}>Logout</Button>)
        }
    </div>
  )
}

export default Header