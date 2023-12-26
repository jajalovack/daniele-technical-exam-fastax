import { useNavigate } from "react-router-dom"
import Button from "./Button"

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className='flex bg-[#121277] p-4 text-white font-bold items-center justify-between'>
        <p onClick={function() {navigate('/')}} className="cursor-pointer">Employee Database</p>
        <div className="flex gap-x-2">
            <Button style="header" onClick={function() {navigate('/login')}}>Login</Button>
            <Button style="header" onClick={function() {navigate('/register')}}>Register</Button>
        </div>
    </div>
  )
}

export default Header