import React, { useState } from 'react'

const User = (props) => {
  const { name, email, id } = props.user
  const [action, setAction] = useState(false)
  const [emailInput, setEmailInp] = useState('')

  const handleInput = (e) => {
    setEmailInp(e.target.value)
  }

  const putUser = () => {
    setAction(true)
  }

  return (
    <>
      <span>{name}</span>
      <span>{email}</span>

      <div className='wrapperButton'>
        <button onClick={async () => {await props.deleteUser(id)}}
                className='btn btn-danger btn-sm'>Delete
        </button>
        <button
          onClick={putUser}
          className='btn btn-warning btn-sm'>Change
        </button>
        {action ?
          <form className='form' onSubmit={async (e) =>{
            e.preventDefault()
            await props.changeUserEmail(props.user.id, emailInput)
            setAction(false)
            setEmailInp('')
          }}>
            <input
              name="email"
              pattern="^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$"
              value={emailInput}
              onChange={handleInput}
              type='text'
              placeholder='enter new email'/>
            <button className='btn btn-primary btn-sm'>Ok</button>
          </form>
          : null}
      </div>
    </>
  )
}
export default User
