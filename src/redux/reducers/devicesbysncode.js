/*
* 设备模块
* */
import {
  GETDEVICEBYSNCODESUCCESS,
  GETDEVICEBYSNCODEFAIL
} from '../constant'

const devices = {}

export default function getDevices(preState=devices,action){
    switch (action.type) {
    case GETDEVICEBYSNCODESUCCESS:        
      return action.data
    case GETDEVICEBYSNCODEFAIL:      
      return
    default:
      return preState
  }
}
