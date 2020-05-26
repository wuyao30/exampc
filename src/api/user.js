import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/token',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

export function queryUserScore(data) {
  return request({
    url: '/product/getuserresult',
    method: 'post',
    data
  })
}

export function updateUserScore(data) {
  return request({
    url: '/product/updateuserscore',
    method: 'post',
    data
  })
}

export function queryIndustryNames() {
  return request({
    url: '/exam/getindustrynames',
    method: 'get'
  })
}

export function queryQuestions(data) {
  return request({
    url: '/exam/getquespage',
    method: 'post',
    data
  })
}

export function updateQuestion(data) {
  return request({
    url: '/exam/updatequetion',
    method: 'post',
    data
  })
}
