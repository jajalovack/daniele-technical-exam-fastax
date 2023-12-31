import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import Button from "./Button"

const Header = () => {
  const [isLoggedIn,setIsLoggedIn]=useState(false)
  const navigate = useNavigate()
  const user=JSON.parse(String(localStorage.getItem('currentUser')))

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
    <div className='flex bg-[#121277] p-4 text-white items-center justify-between'>
        <p onClick={function() {navigate('/')}} className="cursor-pointer font-bold">Employee Database</p>
        {
          !isLoggedIn?
          (
            <div className="flex gap-x-2">
              <Button style="header" onClick={function() {navigate('/login')}}>Login</Button>
              <Button style="header" onClick={function() {navigate('/register')}}>Register</Button>
            </div>
          ):(
            <div className="flex items-center gap-4">
              <h2>{user.username} ({user.account_type==0?'Viewer':'Admin'})</h2>
              <Button style="header" onClick={function() {
                navigate('/')
                localStorage.removeItem('currentUser')
                window.dispatchEvent(new Event('storage'))
              }}>Logout</Button>
            </div>)
        }
    </div>
  )
}

export default Header