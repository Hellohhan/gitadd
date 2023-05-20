/*
* 网络请求模块
* */
import axios from 'axios';

import {store} from '../redux/store';

let userInfo = {}

export default {
  get(url,config){
    return new Promise((resolve, reject) => {
      axios.get(url,config).then(value => {
        resolve(value.data)
      }).catch(e => {
        reject(e.response.data)
      })
    })
  },
  post(url,data,config){
    return new Promise((resolve, reject) => {
      axios.post(url,data,config).then(value => {
        resolve(value.data)
      }).catch(e => {
        reject(e.response.data)
      })
    })
  },
  //授权的get请求
  authGet(url, config){
    return new Promise((resolve, reject) => {
      userInfo = store.getState().user
      axios.get(url,{
        headers:{
          'x-auth-user': userInfo.username,
          'x-auth-token': userInfo.token,
          ...(config?config.headers:null)
        },
        params:config&&config.params
      }).then(value => {
        resolve(value.data)
      }).catch(e => {
        reject(e.response.data)
      })
    })
  },
  //授权的post请求
  authPost(url,data,config){
    return new Promise((resolve, reject) => {
      userInfo = store.getState().user
      axios.post(url,data,{
        headers:{
          'x-auth-user': userInfo.username,
          'x-auth-token': userInfo.token,
        ...(config?config.headers:null)
        }
      }).then(value => {
        resolve(value.data)
      }).catch(e => {
        reject(e.response.data)
      })
    })
  }
}
