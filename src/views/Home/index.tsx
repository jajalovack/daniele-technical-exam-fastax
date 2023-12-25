import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'

const Home = () => {
  const navigate = useNavigate()
  return (
    <>
      <Button style='primary' onClick={function () {navigate('/register')}}>Sign up</Button>
      <Button style='secondary' onClick={function () {navigate('/login')}}>Log In</Button>
    </>
  )
}

export default Home