import React from 'react'
import { useState, useEffect } from 'react'
import Button from '../../components/Button'
import Modal from '../../components/Modal'

const Dashboard = () => {
  const [modalDelete,setModalDelete]=useState(false)
  const [modalCant,setModalCant]=useState(false)
  const [userId,setUserId]=useState(0)
  const users = JSON.parse(String(localStorage.getItem('users')))
  const currentUser = JSON.parse(String(localStorage.getItem('currentUser')))
  
  const deleteUser = (id: number) => {
    const findSelf=users.find((x: typeof users)=>x.id==id).id
    if (findSelf==currentUser.id)
    {
      setModalCant(true)
      return
    }
    else
    {
      setModalDelete(true)
      return
    }
  }

  const confirmDelete = (id: number) => {
    const newUsers=users.filter((x: typeof users)=>x.id!=id)
    localStorage.setItem('users',JSON.stringify(newUsers))
  }

  return (
    <>
      <Modal type='delete' open={modalDelete} onClose={()=>{setModalDelete(false)}} onDelete={()=>{confirmDelete(userId)}}/>
      <Modal type='cant' open={modalCant} onClose={()=>{setModalCant(false)}} onDelete={()=>{}}/>
      <div className="flex flex-wrap justify-center">
        <div className="flex w-9/12 mt-2 mb-2">
          {
            currentUser.account_type==1?
              <div className="flex">Add user</div>
            :
              <></>
          }
        </div>
        <div className='flex justify-center w-9/12'>
            <div className="userId w-1/12 text-center font-bold">User ID</div>
            <div className="branchId w-1/12 text-center font-bold">Branch ID</div>
            <div className="fullname w-2/12 text-center font-bold">Full Name</div>
            <div className="position w-1/12 text-center font-bold">Position</div>
            <div className="username w-1/12 text-center font-bold">Username</div>
            <div className="pword w-4/12 text-center font-bold">Password Hash</div>
            <div className="accountType w-1/12 text-center font-bold">Account Type</div>
            <div className="removeUser w-1/12"></div>
        </div>
        {
          users.map((user: typeof users, index: number) => {
            return (
              <div className='flex justify-center items-center w-9/12 mb-2' key={index}>
                <div className="userId w-1/12 text-center">{user.id}</div>
                <div className="branchId w-1/12 text-center">{user.branch_id}</div>
                <div className="fullname w-2/12 text-center">{user.first_name} {user.last_name}</div>
                <div className="position w-1/12 text-center">{user.position}</div>
                <div className="username w-1/12 text-center">{user.username}</div>
                <div className="pword w-4/12 text-center overflow-x-auto">{user.password}</div>
                <div className="accountType w-1/12 text-center">{user.account_type==0?'Viewer':'Admin'}</div>
                <div className="removeUser w-1/12 text-center">{currentUser.account_type==1?<Button style='danger' onClick={() => {deleteUser(user.id); setUserId(user.id)}}>Delete</Button>:<></>}</div>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default Dashboard