import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: `/user/info/${token}`,
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function list() {
  return request({
    url: '/user/list',
    method: 'get'
  })
}

export function deleteUser(id) {
  return request({
    url: `/user/deleteUser/${id}`,
    method: 'DELETE'
  })
}

export function addUser(data) {
  return request({
    url: `/user/addUser`,
    method: 'post',
    data
  })
}
