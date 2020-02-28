import React from 'react'

const User = ({ user }) => {

  const { name } = user
  return (
    <>
      {name}
      <div className='wrapperButton'>
        <button className='btn btn-danger btn-sm'>Delete</button>
        <button className='btn btn-warning btn-sm'>Change</button>
      </div>
    </>
  )
}
export default User
