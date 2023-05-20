/*
* user模块
* */
import {
  LOGIN_SUCCESS
} from '../constant'

let userInfo = {
  id: '',
  groupId: '',
  imToUser: '',
  imUserType: '',
  username: '',
  token: ''
}


export default function user(preState = userInfo, action){
  switch (action.type) {
    case LOGIN_SUCCESS://登录成功
      return action.data
    case 'LOGIN_OUT':
      return {id:null}
    default:
      return preState
  }
}
