import React from 'react'
import { useState } from 'react'
import bcrypt from 'bcryptjs'
import './Register.css'
import TextInput from '../../components/TextInput'
import Button from '../../components/Button'
import $ from 'jquery'

const Register = () => {
  const [inputValue, setInputValue] = useState({
    username: '',
    branch_id: '',
    password: '',
    confirm_password: '',
    account_type: 0
  })
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValues = {
      username: inputValue.username,
      branch_id: inputValue.branch_id,
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
      username: inputValue.username,
      branch_id: inputValue.branch_id,
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
      if (!(inputValue.username&&inputValue.branch_id&&inputValue.password&&inputValue.password))
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
      console.log(inputValue)
      const submitValue = {
        username: inputValue.username,
        branch_id: inputValue.branch_id,
        password: bcrypt.hashSync(inputValue.password,10),
        account_type: inputValue.account_type
      }
      users.push(submitValue)
      localStorage.setItem('users',JSON.stringify(users))
    }
  }

  return (
    <>
      <div className="flex flex-wrap justify-center">
        <h1 className='text-4xl font-medium mb-4 w-full text-center'>Register to Employee Database</h1>
        <form method='post' className='flex justify-center'>
          <div className='flex flex-wrap gap-2 justify-center w-5/12 sizeTextbox'>
            <TextInput placeholder='Username' value={inputValue.username} onChange={onChangeHandler}/>
            <TextInput placeholder='Branch ID' value={inputValue.branch_id} onChange={onChangeHandler}/>
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