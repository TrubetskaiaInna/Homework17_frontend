import React, { Component } from 'react'
import { apiService } from '../../service/apiService'
import User from '../User/User'
import './Users.scss'
import Post from '../Post/Post'

class Users extends Component {
  constructor () {
    super()
    this.state = {
      users: [],
      posts: [],
      name: '',
      email: '',
      title: '',
      currentUserId: '',
      actionInputUser: false,
      actionInputPost: false,
      actionDelete: true
    }
  }

  updateData = (value) => {
    this.setState({ currentUserId: value })
  }

  updateActionDelete = (value) => {
    this.setState({ actionDelete: value })
  }

  handleInput = ({ target: { name, value } }) => {
    this.setState(
      {
        [name]: value
      })
  }

  getUser = async () => {
    await apiService.getUser()
      .then((response) => {
        this.setState({
          users: response.data,
          actionInputUser: true
        })
      })
  }

  deleteUser = async (id) => {
    await apiService.deleteUser(id)
      .then(async (response) => {
        if (response.status === 200) {
          await this.getUser()
        }
      })
  }

  changeUserEmail = async (userId, value) => {
    await apiService.putUser(userId, value)
      .then(async () => {
        await this.getUser()
      })
  }

  addUser = async (e) => {
    const { name, email, users } = this.state
    e.preventDefault()
    this.setState({ name: '', email: '' })
    await apiService.postUser({ name, email })
      .then(async (response) => {
        this.setState(() => {
          return {
            users: [...users, response.data]
          }
        })
      })
  }

  getPost = async (id) => {
    await apiService.getPost(id)
      .then((response) => {
        this.setState({
          posts: response.data,
          actionInputPost: true
        })
      })
  }

  deletePost = async (id) => {
    const { currentUserId } = this.state
    await apiService.deletePost(id)
      .then(async (response) => {
        if (response.status === 200) {
          await this.getPost(currentUserId)
        }
      })
  }

  changePost = async (postId, value) => {
    const { currentUserId } = this.state
    await apiService.putPost(postId, value)
      .then(async () => {
        await this.getPost(currentUserId)
      })
  }

  addPost = async (e) => {
    const { title, currentUserId, posts } = this.state
    e.preventDefault()
    this.setState({ title: '' })
    await apiService.postPost(currentUserId, { title })
      .then(async (response) => {
        this.setState(() => {
          return {
            posts: [...posts, response.data]
          }
        })
      })
  }

  render () {
    return (
      <>
        <div className='button'>
          <button className='btn btn-outline-primary' onClick={this.getUser}>Get Users</button>
        </div>
        <div className='wrapper'>
          <div className='wrapperUser'>
            {this.state.actionInputUser ?
              <div className="card">
                <div className='card-body'>
                  <form onSubmit={this.addUser}>
                    <div className='input'>
                      <input
                        required
                        name="name"
                        className="form-control"
                        value={this.state.name}
                        type="text"
                        onChange={this.handleInput}
                        placeholder="Enter name"
                      />
                      <input
                        required
                        name="email"
                        pattern="^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$"
                        className="form-control"
                        value={this.state.email}
                        type="text"
                        onChange={this.handleInput}
                        placeholder="Enter email"
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
              this.state.users.map(user => {
                return (
                  <User user={user}
                        key={user.id}
                        deleteUser={this.deleteUser}
                        changeUserEmail={this.changeUserEmail}
                        updateData={this.updateData}
                        getPost={this.getPost}
                        updateActionDelete={this.updateActionDelete}/>
                )
              })
            }
          </div>
          {(this.state.actionInputPost && this.state.actionDelete) ?
            <div className='wrapperPost'>
              <div className='card'>
                <div className='card-body'>
                  <form onSubmit={this.addPost}>
                    <div className='input'>
                      <input
                        required
                        name="title"
                        className="form-control"
                        value={this.state.title}
                        type="text"
                        onChange={this.handleInput}
                        placeholder="Enter post"
                      />
                    </div>
                    <div className='wrapperButtonForm'>
                      <button className='btn btn-outline-primary btn-sm'>Add post</button>
                    </div>
                  </form>
                </div>
              </div>
              {
                this.state.posts.map(post => {
                  return (
                    <Post key={post.id}
                          title={post.title}
                          id={post.id}
                          deletePost={this.deletePost}
                          changePost={this.changePost}
                    />
                  )
                })
              }
            </div> : null}
        </div>
      </>
    )
  }
}

export default Users
