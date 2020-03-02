import axios from 'axios'
import { API_HOST } from '../config/index'

export class apiService {
  static getUser () {
    return axios.get(`${API_HOST}users`)
      .catch(error => {
        if (error.response) {
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else {
          console.log('Strange Error', error.message)
        }
        console.log(error.config)
      })
  }

  static postUser (currentUser) {
    return axios.post(`${API_HOST}users`, {
      name: currentUser.name,
      email: currentUser.email
    })
      .catch(error => {
        if (error.response) {
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else {
          console.log('Strange Error', error.message)
        }
        console.log(error.config)
      })
  }

  static deleteUser (id) {
    return axios.delete(`${API_HOST}users/${id}`)
      .catch(error => {
        if (error.response) {
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else {
          console.log('Strange Error', error.message)
        }
        console.log(error.config)
      })
  }

  static putUser (id, email) {
    return axios.put(`${API_HOST}users/${id}`, { email })
      .then(response => console.log(response))
      .catch(error => {
        if (error.response) {
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else {
          console.log('Strange Error', error.message)
        }
        console.log(error.config)
      })
  }

  static getPost (id) {
    return axios.get(`${API_HOST}posts/user/${id}`)
      .catch(error => {
        if (error.response) {
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else {
          console.log('Strange Error', error.message)
        }
        console.log(error.config)
      })
  }

  static postPost (id, currentPost) {
    return axios.post(`${API_HOST}posts/user/${id}`, {
      title: currentPost.title
    })
      .catch(error => {
        if (error.response) {
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else {
          console.log('Strange Error', error.message)
        }
        console.log(error.config)
      })
  }

  static deletePost (id) {
    return axios.delete(`${API_HOST}posts/${id}`)
      .catch(error => {
        if (error.response) {
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else {
          console.log('Strange Error', error.message)
        }
        console.log(error.config)
      })
  }

  static putPost (id, title) {
    return axios.put(`${API_HOST}posts/${id}`, { title })
      .then(response => console.log(response))
      .catch(error => {
        if (error.response) {
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else {
          console.log('Strange Error', error.message)
        }
        console.log(error.config)
      })
  }
}
