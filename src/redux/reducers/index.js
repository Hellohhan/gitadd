/*
* reducer整合模块
* */
import {combineReducers} from 'redux'
import user from './user'
import loading from './loading'
import devices from './devices'
import { alarm } from "./alarm";
import news from './news'
import chat from './chat'
import mySelf from './myselfGoback'
import JPushMesage from './JpushMessage';
import sncode from './sconde'
import isFilter from './isFilter'
import {alarm2} from './alarm2'
import mapPosition from './map'
export default combineReducers({
  user,
  loading,
  devices,
  alarm,
  news,
  chat,
  mySelf,
  JPushMesage,
  sncode,
  isFilter,
  alarm2,
  mapPosition
})
