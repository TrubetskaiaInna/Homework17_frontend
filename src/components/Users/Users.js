import React, { useState, useReducer } from 'react'
import { apiService } from '../../service/apiService'
import User from '../User/User'
import './Users.scss'
import Post from '../Post/Post'

const Users = () => {
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])
  const [input, setInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: '',
      email: '',
      title: ''
    }
  )
  const [currentUserId, setCurrentUserId] = useState('')
  const [actionInputUser, setActionInputUser] = useState(false)
  const [actionInputPost, setActionInputPost] = useState(false)
  const [actionDelete, setActionDelete] = useState(true)

  const updateData = (value) => {
    setCurrentUserId(value)
  }

  const updateActionDelete = (value) => {
    setActionDelete(value)
  }

  const handleInput = e => {
    const name = e.target.name
    const newValue = e.target.value
    setInput({ [name]: newValue })
  }

  const getUser = async () => {
    await apiService.getUser()
      .then((response) => {
        setUsers(response.data)
        setActionInputUser(true)
      })
  }

  const deleteUser = async (id) => {
    await apiService.deleteUser(id)
      .then(async (response) => {
        if (response.status === 200) {
          await getUser()
        }
      })
  }

  const changeUserEmail = async (userId, value) => {
    await apiService.putUser(userId, value)
      .then(async () => {
        await getUser()
      })
  }

  const addUser = async (e) => {
    e.preventDefault()
    await apiService.postUser({ name: input.name, email: input.email })
      .then(async (response) => {
        setUsers([...users, response.data])
      })
    setInput({ name: '' })
    setInput({ email: '' })
  }

  const getPost = async (id) => {
    await apiService.getPost(id)
      .then((response) => {
        setPosts(response.data)
        setActionInputPost(true)
      })
  }

  const deletePost = async (id) => {
    await apiService.deletePost(id)
      .then(async (response) => {
        if (response.status === 200) {
          await getPost(currentUserId)
        }
      })
  }

  const changePost = async (postId, value) => {
    await apiService.putPost(postId, value)
      .then(async () => {
        await getPost(currentUserId)
      })
  }

  const addPost = async (e) => {
    e.preventDefault()
    setInput({ title: '' })
    await apiService.postPost(currentUserId, { title: input.title })
      .then(async (response) => {
        setPosts([...posts, response.data])
      })
  }

  return (
    <>
      <div className='button'>
        <button className='btn btn-outline-primary' onClick={getUser}>Get Users</button>
      </div>
      <div className='wrapper'>
        <div className='wrapperUser'>
          {actionInputUser
            ? <div className='card'>
              <div className='card-body'>
                <form onSubmit={addUser}>
                  <div className='input'>
                    <input
                      required
                      name='name'
                      className='form-control'
                      value={input.name}
                      type='text'
                      onChange={handleInput}
                      placeholder='Enter name'
                    />
                    <input
                      required
                      name='email'
                      pattern='^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$'
                      className='form-control'
                      value={input.email}
                      type='text'
                      onChange={handleInput}
                      placeholder='Enter email'
                    />
                  </div>
                  <div className='wrapperButtonForm'>
                    <button className='btn btn-outline-primary btn-sm'>Add user</button>
                  </div>
                </form>
              </div>
            </div> : null
          }
          {
            users.map(user => {
              return (
                <User user={user}
                  key={user.id}
                  deleteUser={deleteUser}
                  changeUserEmail={changeUserEmail}
                  updateData={updateData}
                  getPost={getPost}
                  updateActionDelete={updateActionDelete} />
              )
            })
          }
        </div>
        {(actionInputPost && actionDelete)
          ? <div className='wrapperPost'>
            <div className='card'>
              <div className='card-body'>
                <form onSubmit={addPost}>
                  <div className='input'>
                    <input
                      required
                      name='title'
                      className='form-control'
                      value={input.title}
                      type='text'
                      onChange={handleInput}
                      placeholder='Enter post'
                    />
                  </div>
                  <div className='wrapperButtonForm'>
                    <button className='btn btn-outline-primary btn-sm'>Add post</button>
                  </div>
                </form>
              </div>
            </div>
            {
              posts.map(post => {
                return (
                  <Post key={post.id}
                    title={post.title}
                    id={post.id}
                    deletePost={deletePost}
                    changePost={changePost}
                  />
                )
              })
            }
          </div> : null}
      </div>
    </>
  )
}

export default Users
