const Mock = require('mockjs')

const data = Mock.mock({
  'list|10': [{
    id: '@id',
    depart_id: '@id(10)',
    depart_name: '@csentence(3,8)'
  }]
})

module.exports = [
  {
    url: '/department/list',
    type: 'get',
    response: config => {
      const list = data.list
      return {
        code: 200,
        data: list
      }
    }
  }
]
