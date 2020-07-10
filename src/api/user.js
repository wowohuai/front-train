import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/user/info/',
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

export function remove(id) {
  return request({
    url: `/user/remove/${id}`,
    method: 'DELETE'
  })
}

export function add(data) {
  return request({
    url: `/user/add`,
    method: 'post',
    data
  })
}

export function getById({ id }) {
  console.log('getById' + id)
  return request({
    url: '/user/getById',
    method: 'get',
    params: {
      id
    }
  })
}
