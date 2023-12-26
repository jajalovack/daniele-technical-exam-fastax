import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import bcrypt from 'bcryptjs'
import $ from 'jquery'
import TextInput from '../../components/TextInput'
import Button from '../../components/Button'

const Login = () => {
  const [inputValue, setInputValue] = useState({
    username: '',
    branch_id: '',
    password: ''
  })

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValues = {
      username: inputValue.username,
      branch_id: inputValue.branch_id,
      password: inputValue.password
    }

    if (event.target.placeholder=='Username')
    {
      newValues.username=event.target.value
    }
    else if (event.target.placeholder=='Branch ID')
    {
      newValues.branch_id=event.target.value
    }
    else
    {
      newValues.password=event.target.value
    }
    
    setInputValue(newValues)
  }

  const validateForm = () => {
    let error=false
    const users=localStorage.getItem('users')?JSON.parse(String(localStorage.getItem('users'))):[]
    const user=users.find((x: typeof users)=>x.username==inputValue.username)
    const passwordCorrect=bcrypt.compareSync(inputValue.password,user.password)
    if (!inputValue.username || !users.find((x: typeof users)=>x.username==inputValue.username))
    {
      $('#username').addClass('border-red-500')
      error=true
    }
    else
    {
      $('#username').removeClass('border-red-500')
    }
    if (!inputValue.branch_id)
    {
      $('#branch_id').addClass('border-red-500')
      error=true
    }
    else
    {
      $('#branch_id').removeClass('border-red-500')
    }
    if (!(inputValue.password && passwordCorrect))
    {
      $('#password').addClass('border-red-500')
      error=true
    }
    else
    {
      $('#password').removeClass('border-red-500')
    }

    if (error)
    {
      if (!(inputValue.username&&inputValue.branch_id&&inputValue.password))
      {
        $('#errorMessage').html('<p class="text-red-500">Please enter all the required fields</p>')
      }
      else if (!users.find((x: typeof users)=>x.username==inputValue.username))
      {
        $('#errorMessage').html('<p class="text-red-500">User does not exist. Do you want to <a href="/register" class="underline text-blue-500" >sign up?</a></p>')
      }
      else if (!passwordCorrect)
      {
        $('#errorMessage').html('<p class="text-red-500">Incorrect password!</p>')
      }
    }
    else
    {
      $('#errorMessage').html('')
      console.log(inputValue)

      localStorage.setItem('currentUser',JSON.stringify(
        {
          username: user.username,
          branch_id: user.branch_id,
          account_type: user.account_type
        }
      ))
      
      window.location.replace(document.URL.replace('/login','/dashboard'))
    }
  }
  return (
    <>
      <div className="flex flex-wrap justify-center">
        <h1 className='text-4xl font-medium mb-4 w-full text-center'>Login to Employee Database</h1>
        <form method='post' className='flex justify-center'>
          <div className='flex flex-wrap gap-2 justify-center w-5/12 sizeTextbox'>
            <TextInput placeholder='Username' value={inputValue.username} onChange={onChangeHandler}/>
            <TextInput placeholder='Branch ID' value={inputValue.branch_id} onChange={onChangeHandler}/>
            <div className="w-full password">
              <TextInput placeholder='Password' type='password' value={inputValue.password} onChange={onChangeHandler}/>
            </div>
          </div>
        </form>
        <div className='w-full mb-2'></div>
        <Button onClick={validateForm}>Login</Button>
        <span id="errorMessage" className='w-full text-center'></span>
      </div>
    </>
  )
}

export default Login