import axios from 'axios'
import env from '../constants/env'

const { BASE_URL } = env

const getToken = () => {
  const token = localStorage.getItem('token')
  return token
}

export async function login (body) {
  const token = getToken()
  return axios({
    url: BASE_URL + `/api/auth`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    data: body
  })
}

export async function logout () {
  localStorage.removeItem('token')
  return (window.location = '/')
}

export async function registerUser (body) {
  const token = getToken()
  return axios({
    url: BASE_URL + `/api/user/register`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    data: body
  })
}

export async function addUser (body) {
  const token = getToken()
  return axios({
    url: BASE_URL + `/api/user/signin`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    data: body
  })
}

export async function getUser (query) {
  const token = getToken()
  return axios({
    url: BASE_URL + `/api/user${query}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
}

export async function addMessage (body) {
  const token = getToken()
  return axios({
    url: BASE_URL + `/api/message`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    data: body
  })
}

export async function updateMessage (id, body) {
  const token = getToken()
  return axios({
    url: BASE_URL + `/api/message/${id}`,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    data: body
  })
}

export async function addFile (body) {
  const token = getToken()
  return axios({
    url: BASE_URL + `/api/file`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    data: body
  })
}

export async function updateFile (id, body) {
  const token = getToken()
  return axios({
    url: BASE_URL + `/api/file/${id}`,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    data: body
  })
}
