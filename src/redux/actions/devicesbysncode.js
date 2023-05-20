/*
* 根据生产编号取得单个设备信息
* */

import {
  GETDEVICEBYSNCODESUCCESS,
  GETDEVICEBYSNCODEFAIL
} from '../constant'
import Store from '../store'
import axios from '../../api'
import {GETDEVICESBYSNCODE} from '../../api/requestPath'
import { loading } from "./loading";



export const getDeviceBysnCodeSuccess = devices => ({type:GETDEVICEBYSNCODESUCCESS, data:devices})
export const getDeviceBysnCodeFail = message => ({type:GETDEVICEBYSNCODEFAIL, data:message})

//异步获取设备列表
export const asyncGetBycnCodeDevices = (snCode) => {
  return async dispatch => {
    //请求参数    
    try {
       dispatch(loading(true))
        const result = await axios.get(GETDEVICESBYSNCODE.replace(":snCode",snCode))      
       dispatch({type:GETDEVICEBYSNCODESUCCESS, data:result.data})
       dispatch(loading(false))
    }catch (e) {
      console.log('获取设备列表错误',e);
    }
  }
}
