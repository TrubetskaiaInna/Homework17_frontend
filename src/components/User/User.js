import React from 'react'

const User = (props) => {

  const { name, email, id } = props.user
  return (
    <>
      <div>{name}</div>
      <div>{email}</div>
      <div className='wrapperButton'>
        <button onClick={() => {props.deleteUser(id)}}
                className='btn btn-danger btn-sm'>Delete
        </button>
        <button className='btn btn-warning btn-sm'>Change</button>
      </div>
    </>
  )
}
export default User
