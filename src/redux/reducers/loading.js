/*
* 加载指示符模块
* */
import {LOADING} from '../constant'
const initLoading = {
  isLoading:false
}
export default function loading(preState = initLoading, action){
  switch (action.type) {
    case 'loading':
      return {isLoading: action.data}
    default:
      return preState
  }
}
