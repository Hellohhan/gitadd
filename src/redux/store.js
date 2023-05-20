/*
* store对象模块
* */

import {createStore, applyMiddleware} from 'redux'
//使用redux开发者工具
import {composeWithDevTools} from 'redux-devtools-extension'
//异步action
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'//引入  persistReducer 的目的是让reducer持久化 persistStore让store持久化
import reducer from './reducers'
import AsyncStorage from '@react-native-async-storage/async-storage'
const persistConfig = {
    key: 'mxl',//localstorage中的key值
    storage:AsyncStorage,//本地存储
    whitelist: ['JPushMesage','user']//白名单，写上谁,谁就会持久化,不写不会持久化
   }
const persistedReducer=persistReducer(persistConfig,reducer)/* 持久化reducer */ 
let store=createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)))/* 把持久化reducer放入store' */
let persistor=persistStore(store)/* 持久化store */


 export {persistor,store}