import React from 'react'
import Button from '../../components/Button'

const Dashboard = () => {
  const users = JSON.parse(String(localStorage.getItem('users')))
  const currentUser = JSON.parse(String(localStorage.getItem('currentUser')))

  const deleteUser = (id: number) => {
    const findSelf=users.find((x: typeof users)=>x.id==id).id
    if (findSelf==currentUser.id)
    {
      alert("You can't delete your own account while logged in.")
      return
    }
    const newUsers=users.filter((x: typeof users)=>x.id!=id)
    console.log(newUsers)
  }

  return (
    <>
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
          users.map((user: typeof users) => {
            return (
              <div className='flex justify-center items-center w-9/12 mb-2'>
                <div className="userId w-1/12 text-center">{user.id}</div>
                <div className="branchId w-1/12 text-center">{user.branch_id}</div>
                <div className="fullname w-2/12 text-center">{user.first_name} {user.last_name}</div>
                <div className="position w-1/12 text-center">{user.position}</div>
                <div className="username w-1/12 text-center">{user.username}</div>
                <div className="pword w-4/12 text-center overflow-x-auto">{user.password}</div>
                <div className="accountType w-1/12 text-center">{user.account_type==0?'Viewer':'Admin'}</div>
                <div className="removeUser w-1/12 text-center">{currentUser.account_type==1?<Button style='danger' onClick={() => {deleteUser(user.id)}}>Delete</Button>:<></>}</div>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default Dashboard