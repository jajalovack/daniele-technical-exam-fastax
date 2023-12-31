import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import bcrypt from 'bcryptjs'
import './Register.css'
import TextInput from '../../components/TextInput'
import Button from '../../components/Button'
import $ from 'jquery'

const Register = () => {
  const navigate=useNavigate();

  useEffect(() => {
    if (localStorage.getItem('currentUser'))
    {
      navigate('/dashboard')
    }
  },[])
  
  
  const [inputValue, setInputValue] = useState({
    first_name: '',
    last_name: '',
    username: '',
    branch_id: '',
    position: '',
    password: '',
    confirm_password: '',
    account_type: 0
  })

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValues = {
      first_name: inputValue.first_name,
      last_name: inputValue.last_name,
      username: inputValue.username,
      branch_id: inputValue.branch_id,
      position: inputValue.position,
      password: inputValue.password,
      confirm_password: inputValue.confirm_password,
      account_type: inputValue.account_type
    }

    if (event.target.placeholder=='Username')
    {
      newValues.username=event.target.value
    }
    else if (event.target.placeholder=='Branch ID')
    {
      newValues.branch_id=event.target.value
    }
    else if (event.target.placeholder=='First Name')
    {
      newValues.first_name=event.target.value
    }
    else if (event.target.placeholder=='Last Name')
    {
      newValues.last_name=event.target.value
    }
    else if (event.target.placeholder=='Position')
    {
      newValues.position=event.target.value
    }
    else if (event.target.placeholder=='Password')
    {
      newValues.password=event.target.value
    }
    else
    {
      newValues.confirm_password=event.target.value
    }
    setInputValue(newValues)
  }

  const radioToggle = event => {
    const newValues = {
      first_name: inputValue.first_name,
      last_name: inputValue.last_name,
      username: inputValue.username,
      branch_id: inputValue.branch_id,
      position: inputValue.position,
      password: inputValue.password,
      confirm_password: inputValue.confirm_password,
      account_type: inputValue.account_type
    }
    if (event.target.id=='accountTypeViewer' || event.target.htmlFor=='accountTypeViewer')
    {
      newValues.account_type=0
    }
    else
    {
      newValues.account_type=1
    }
    setInputValue(newValues)
  }

  const validateForm = () => {
    let error=false
    const users=localStorage.getItem('users')?JSON.parse(String(localStorage.getItem('users'))):[]
    
    if (!inputValue.first_name)
    {
      $('#first_name').addClass('border-red-500')
      error=true
    }
    else
    {
      $('#first_name').removeClass('border-red-500')
    }
    if (!inputValue.last_name)
    {
      $('#last_name').addClass('border-red-500')
      error=true
    }
    else
    {
      $('#last_name').removeClass('border-red-500')
    }
    if (!inputValue.username || users.find((x: typeof users)=>x.username==inputValue.username))
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
    if (!inputValue.position)
    {
      $('#position').addClass('border-red-500')
      error=true
    }
    else
    {
      $('#position').removeClass('border-red-500')
    }
    if (!inputValue.password)
    {
      $('#password').addClass('border-red-500')
      error=true
    }
    else
    {
      $('#password').removeClass('border-red-500')
    }
    if (!inputValue.confirm_password || inputValue.password != inputValue.confirm_password)
    {
      $('#confirm_password').addClass('border-red-500')
      error=true
    }
    else
    {
      $('#confirm_password').removeClass('border-red-500')
    }

    if (error)
    {
      if (!(inputValue.username&&inputValue.first_name&&inputValue.last_name&&inputValue.position&&inputValue.branch_id&&inputValue.password&&inputValue.confirm_password))
      {
        $('#errorMessage').html('<p class="text-red-500">Please enter all the required fields</p>')
      }
      else if (users.find((x: typeof users)=>x.username==inputValue.username))
      {
        $('#errorMessage').html('<p class="text-red-500">Username is already taken</p>')
      }
      else if (inputValue.password!=inputValue.confirm_password)
      {
        $('#errorMessage').html('<p class="text-red-500">Passwords do not match</p>')
      }
    }
    else
    {
      $('#errorMessage').html('')
      const submitValue = {
        id: users.length==0?1:Number(users.at(-1).id)+1,
        first_name: inputValue.first_name,
        last_name: inputValue.last_name,
        username: inputValue.username,
        branch_id: inputValue.branch_id,
        position: inputValue.position,
        password: bcrypt.hashSync(inputValue.password,10),
        account_type: inputValue.account_type
      }
      users.push(submitValue)
      localStorage.setItem('users',JSON.stringify(users))
      localStorage.setItem('currentUser',JSON.stringify(
        {
          id: submitValue.id,
          first_name: submitValue.first_name,
          last_name: submitValue.last_name,
          username: submitValue.username,
          branch_id: submitValue.branch_id,
          position: submitValue.position,
          account_type: submitValue.account_type
        }
      ))
      window.location.replace(document.URL.replace('/register','/dashboard'))
    }
  }

  return (
    <>
      <div className="flex flex-wrap justify-center">
        <h1 className='text-2xl md:text-4xl font-medium mb-4 w-full text-center'>Register to Employee Database</h1>
        <form method='post' className='flex justify-center'>
          <div className='flex flex-wrap gap-2 justify-center w-10/12 md:w-9/12 lg:w-5/12 sizeTextbox'>
            <TextInput placeholder='First Name' value={inputValue.first_name} onChange={onChangeHandler}/>
            <TextInput placeholder='Last Name' value={inputValue.last_name} onChange={onChangeHandler}/>
            <TextInput placeholder='Username' value={inputValue.username} onChange={onChangeHandler}/>
            <TextInput placeholder='Branch ID' value={inputValue.branch_id} onChange={onChangeHandler}/>
            <div className="w-full password">
              <TextInput placeholder='Position' value={inputValue.position} onChange={onChangeHandler}/>
            </div>
            <div className="w-full password">
              <TextInput placeholder='Password' type='password' value={inputValue.password} onChange={onChangeHandler}/>
            </div>
            <div className="w-full password">
              <TextInput placeholder='Confirm Password' type='password' value={inputValue.confirm_password} onChange={onChangeHandler}/>
            </div>
            <div className="w-full flex justify-center gap-4 mb-2">
              <div className="flex items-center gap-1">
                <input type="radio" name="accountType" id="accountTypeViewer" defaultChecked={true} onClick={radioToggle}/>
                <label htmlFor="accountTypeViewer" onClick={radioToggle}>Viewer</label>
              </div>
              <div className="flex items-center gap-1">
                <input type="radio" name="accountType" id="accountTypeAdmin" onClick={radioToggle}/>
                <label htmlFor="accountTypeAdmin" onClick={radioToggle}>Admin</label>
              </div>
            </div>
          </div>
        </form>
        <div className='w-full'></div>
        <Button onClick={validateForm}>Register</Button>
        <span id="errorMessage" className='w-full text-center'></span>
      </div>
    </>
  )
}

export default Register