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
      actionInputUser: false
    }
  }

  updateData = (value) => {
    this.setState({ currentUserId: value })
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
        this.setState({ users: response.data, actionInputUser: true })
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
    const { name, email } = this.state
    e.preventDefault()
    this.setState({ name: '', email: '' })
    await apiService.postUser({ name, email })
      .then(async (response) => {
        this.setState(() => {
          return {
            users: [...this.state.users, response.data]
          }
        })
      })
  }

  getPost = async (id) => {
    await apiService.getPost(id)
      .then((response) => {
        this.setState({ posts: response.data, actionInputPost: true })
      })
  }

  deletePost = async (id) => {
    await apiService.deletePost(id)
      .then(async (response) => {
        if (response.status === 200) {
          await this.getPost(this.state.currentUserId)
        }
      })
  }

  changePost = async (postId, value) => {
    await apiService.putPost(postId, value)
      .then(async () => {
        await this.getPost(this.state.currentUserId)
      })
  }

  addPost = async (e) => {
    const { title } = this.state
    e.preventDefault()
    this.setState({ title: '' })
    await apiService.postPost(this.state.currentUserId, { title })
      .then(async (response) => {
        this.setState(() => {
          return {
            posts: [...this.state.posts, response.data]
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
                        getPost={this.getPost}/>
                )
              })
            }
          </div>
          <div className='wrapperPost'>
            {this.state.actionInputPost ?
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
              </div> : null
            }
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
          </div>
        </div>
      </>
    )
  }
}

export default Users
