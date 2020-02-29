import axios from 'axios'
import { API_HOST } from '../config/index'

export class apiService {

  static getUser () {
    return axios.get(`${API_HOST}users`)
  }

  static postUser (currentUser) {
    return axios.post(`${API_HOST}users`, {
      name: currentUser.name,
      email: currentUser.email
    })
  }

  static deleteUser (id) {
    return axios.delete(`${API_HOST}users/${id}`)
      .catch(error => console.log(error))
  }
}
