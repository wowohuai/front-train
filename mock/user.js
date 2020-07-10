const Mock = require('mockjs')
const Random = Mock.Random

const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const data = Mock.mock({
  'list|30': [{
    id: '@id',
    username: '@csentence(2,6)',
    age: '@integer(10,30)',
    position: '@csentence(3,6)',
    department: Random.title(4)
  }]
})

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    username: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    username: 'Normal Editor'
  }
}

module.exports = [
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 200,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/user/info\.*',
    type: 'get',
    response: config => {
      // const { id: token } = config.query
      const info = users['admin-token']

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 200,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  },

  // get user list
  {
    url: '/user/list',
    type: 'get',
    response: _ => {
      return {
        code: 200,
        data
      }
    }
  },

  // get user by id
  {
    url: '/user/getById',
    type: 'get',
    response: _ => {
      const { id } = _.query
      console.log(id)
      return {
        code: 200,
        data: data['list'][id]
      }
    }
  }
]
