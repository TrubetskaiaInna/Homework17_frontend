import React, { useState } from 'react'

const User = (props) => {
  const { name, email, id } = props.user
  const [action, setAction] = useState(false)
  const [emailInput, setEmailInp] = useState('')

  const handleInput = (e) => {
    setEmailInp(e.target.value)
  }

  const isAction = () => {
    setAction(true)
  }

  return (
    <>
      <div className='wrapperItemUser'>
        <div className='user'
          onClick={async () => {
            await props.updateData(id)
            await props.getPost(id)
            props.updateActionDelete(true)
          }}>
          <span>{name}</span>
          <span>{email}</span>
        </div>
        <div className='wrapperButton'>
          <button onClick={async () => {
            await props.deleteUser(id)
            props.updateActionDelete(false)
          }}
            className='btn btn-danger btn-sm'>Delete
          </button>
          <button
            onClick={isAction}
            className='btn btn-warning btn-sm'>Change
          </button>
          {action
            ? <div>
              <form className='form'
                onSubmit={async (e) => {
                  e.preventDefault()
                  await props.changeUserEmail(props.user.id, emailInput)
                  setAction(false)
                  setEmailInp('')
                }}>
                <input
                  required
                  name='email'
                  className='form-control'
                  pattern='^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$'
                  value={emailInput}
                  onChange={handleInput}
                  type='text'
                  placeholder='enter new email' />
                <button className='btn btn-primary btn-sm'>Ok</button>
              </form>
            </div>
            : null}
        </div>
      </div>
    </>
  )
}
export default User
