/*
* 报警信息界面的action
* */
import {store} from "../store";
import axios from "../../api"
import {getAlarmInfo} from "../../api/requestPath"
import {GETALARMINFOSUCCESS2,GETALARMINFOFAIL2} from "../constant"

//1.获取报警信息成功
export const getAlarmInfoSuccess = data => ({type:GETALARMINFOSUCCESS2,data})
//2.获取报警信息失败
export const getAlarmInfoFail = data => ({type:GETALARMINFOFAIL2,data})

//3.异步请求报警信息数据
export const asyncGetAlarmData2 = () => {
  store.dispatch({type:'loading',data:true})
  const devices = getDevicesId()
  if (devices.length===0){
    //当前没有获取到设备
    return dispatch => {
      dispatch()
    }
  }
  return async dispatch => {
    let page,current = 2,alarmInfos = []
    for (let i = 0; i < devices.length; i++) {
      page = {
        "page":{
          "size": 10,
          "current": 1
        },
        "jsonEntity":{
          "alarmStatus": 0, //1:表示处理完成的报警信息
          "groupId": devices[i].groupId,
          "deviceId": devices[i].deviceId
        }
      }
      try {
        let result = await axios.authPost(getAlarmInfo,page)
        console.log(result);
        store.dispatch({type:'loading',data:true})
        if (result.data.records.length > 0){
          store.dispatch({type:'loading',data:false})
          //当前设备有报警信息的数据
          // dispatch(getAlarmInfoSuccess(result.data.records))
          alarmInfos.push(...result.data.records)
          while (true){
            page = {
              "page":{
                "size": 10,
                "current": current++
              },
              "jsonEntity":{
                "alarmStatus": 0, //1:表示未处理完成的的报警信息
                "groupId": devices[i].groupId,
                "deviceId": devices[i].deviceId
              }
            }
            result = await axios.authPost(getAlarmInfo,page)
            alarmInfos.push(...result.data.records)
            if (result.data.records.length === 0){
              current = 2;
              break
            }
          }
        }
        store.dispatch({type:'loading',data:false})
      }catch (e) {
       console.log('报警信息异常');
       store.dispatch({type:'loading',data:false})
      }
    }
    dispatch(getAlarmInfoSuccess(alarmInfos))
  }
}
//工具方法
//1.获取现有设备列表的所以设备id
const getDevicesId = () => {
  const devices = store.getState().devices
  return devices.reduce((preVal,currentVal)=>([...preVal,{
      deviceId:currentVal.id,
      groupId:currentVal.groupId
    }]),[])
}
//筛选数据
export const filterAlarm2=(data)=>{
   return dispatch=>{
    dispatch({type:'filterAlarm2',data})
   }
}