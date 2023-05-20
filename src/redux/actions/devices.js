/*
* 设备模块
* */

import {
  GETDEVICESSUCCESS,
  GETDEVICESFAIL
} from '../constant'
import {store} from '../store'
import axios from '../../api'
import {GETDEVICES} from '../../api/requestPath'
import { loading } from "./loading";

//表示上次请求设备列表是第几页
let current=1
let isRequest=true

export const getDevicesSuccess = devices => ({type:GETDEVICESSUCCESS, data:devices})
export const getDevicesFail = message => ({type:GETDEVICESFAIL, data:message})

//异步获取设备列表
export const asyncGetDevices = () => {
  if (!isRequest){
    return dispatch => {
      dispatch(getDevicesSuccess([]))
    }
  }
  return async dispatch => {
    //请求参数
    const {id,token} = store.getState().user
    const params = {
      "jsonEntity":{
        "userId":id,
        "deleted":"0"  //deleted:0表示设备没有被删除 1:表示设备已经被删除了
      },
      "page":{
        "size":10,
        "current":current++
      },
      "token":token
    }
    try {
      store.dispatch({type:'loading',data:true})
      const result = await axios.authPost(GETDEVICES,params)
      console.log(result);
      result.data.records.length === 0 ? isRequest = false:isRequest = true
      dispatch(getDevicesSuccess(result.data.records))
      store.dispatch({type:'loading',data:false})
    }catch (e) {
      console.log('获取设备列表错误',e);
      store.dispatch({type:'loading',data:false})
    }
  }
}
