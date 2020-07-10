import request from '@/utils/request'

export function getList() {
  return request({
    url: '/department/list',
    method: 'get'
  })
}
