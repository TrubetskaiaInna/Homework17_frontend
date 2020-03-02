import React, { useState } from 'react'

const Post = (props) => {
  const [title, setTitle] = useState('')
  const [action, setAction] = useState(false)

  const handleInput = (e) => {
    setTitle(e.target.value)
  }

  const isAction = () => {
    setAction(true)
  }

  return (
    <>
      <div className='wrapperItemPost'>
        <div className='post'>
          <span>{props.title}</span>
        </div>
        <div className='wrapperButton'>
          <button className='btn btn-danger btn-sm'
                  onClick={async () => { await props.deletePost(props.id) }}>Delete
          </button>
          <button className='btn btn-warning btn-sm'
                  onClick={isAction}>Change
          </button>
          {action
            ? <div>
              <form className='form'
                    onSubmit={async (e) => {
                      e.preventDefault()
                      await props.changePost(props.id, title)
                      setAction(false)
                      setTitle('')
                    }}>
                <input
                  required
                  className='form-control'
                  name='title'
                  value={title}
                  type='text'
                  onChange={handleInput}
                  placeholder='Enter post'
                />
                <button className='btn btn-primary btn-sm'>Ok</button>
              </form>
            </div> : null
          }
        </div>
      </div>
    </>
  )
}
export default Post
