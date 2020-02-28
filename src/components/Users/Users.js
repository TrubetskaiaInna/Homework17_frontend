import React, { Component } from 'react'
import { apiService } from '../../service/apiService'
import User from '../User/User'
import './Users.scss'

class Users extends Component {
  constructor () {
    super()
    this.state = {
      users: [],
      name: '',
      email: '',
      action: false
    }
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
        this.setState({ users: response.data, action: true })
      })
  }

  onSubmit = async (e) => {
    const { name, email } = this.state
    e.preventDefault()
    await apiService.postUser({ name, email })
      .then((res) => {
        this.setState({ name: '', email: '' })
        this.setState((state) => {
          return {
            users: [...this.state.users, res.data]
          }
        })
      })
      .catch((err) => {
        console.log(err)
        this.setState({ name: '', email: '' })
      })

  }

  render () {
    return (
      <>
        <div className='button'>
          <button className='btn btn-outline-primary' onClick={this.getUser}>Get Users</button>
        </div>
        {this.state.action ?
          <div className='card'>
            <form className='form-inline my-2 my-lg-0' onSubmit={this.onSubmit}>
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
                  className="form-control"
                  value={this.state.email}
                  type="text"
                  onChange={this.handleInput}
                  placeholder="Enter email"
                />
              </div>
              <div className='button'>
                <button className='btn btn-outline-primary'>Add user</button>
              </div>
            </form>
          </div> : null
        }
        {
          this.state.users.map(user => {
            return (
              <div className="user" key={user.id}>
                <User user={user}/>
              </div>
            )
          })
        }
      </>
    )
  }
}

export default Users
