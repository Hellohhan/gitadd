/*
* 设备模块
* */
import {
  GETDEVICESSUCCESS,
  GETDEVICESFAIL
} from '../constant'

const devices = []

export default function getDevices(preState=devices,action){
  switch (action.type) {
    case GETDEVICESSUCCESS:
      console.log(action.data);
      return [...preState,...action.data]
    case GETDEVICESFAIL:
      return
    default:
      return preState
  }
}
