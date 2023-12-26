import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'

const Home = () => {
  const navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem('currentUser'))
    {
      navigate('/dashboard')
    }
  })
  
  return (
    <>
      <h1 className='text-5xl font-medium mt-4 mb-3 text-center'>Welcome user!</h1>
      <p className='text-xl mb-2 text-center'>To continue, please</p>
      <div className='flex items-center justify-center gap-x-1.5'>
        <Button style='primary' onClick={function () {navigate('/register')}}>Sign up</Button>
        <p>or</p>
        <Button style='secondary' onClick={function () {navigate('/login')}}>Log In</Button>
      </div>
    </>
  )
}

export default Home