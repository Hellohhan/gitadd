/*
*请求的url
* */
import baseUrl from './baseUrl'
import axios from 'axios'
import {store} from '../redux/store'
let userInfo = {}
//1.盐生成
export const TOKENSALT = `${baseUrl.TOKEN_URL}/token/salt`
//2.令牌获取
export const TOKENGENERATE = `${baseUrl.TOKEN_URL}/token/generate`
//3.令牌验证
export const TOKENCHECK = `${baseUrl.TOKEN_URL}/token/check`
//4.根据username查询用户信息
export const GETUSERINFO = `${baseUrl.AUTH_TOKEN_URL}/user/name/:username`
//5.获取广告列表
export const GETADS = `${baseUrl.DEVICE_URL}/manager/adDisplay/list`
//6.获取设备列表
export const GETDEVICES = `${baseUrl.DEVICE_URL}/manager/device/list`
//7.获取报警信息的数据(未处理的)
export const getAlarmInfo = `${baseUrl.DEVICE_URL}/manager/deviceAlarm/list`
//8.根据生产编码snCode具体设备信息
export const GETDEVICESBYSNCODE = `${baseUrl.DEVICE_URL}/manager/device/snCode/:snCode`
//9.根据报警id查询报警信息
export const GetAlarmInfoByAlarmId=`${baseUrl.DEVICE_URL}/manager/deviceAlarm/id/:alarmId`
//9.报警信息过滤查询
export const FilterAlarmDevices=`${baseUrl.DEVICE_URL}/manager/deviceAlarm/list`
//10.提交异常处理结果
export const SubmitAlarmHandle=`${baseUrl.DEVICE_URL}/manager/deviceAlarm/update`
//11.获取传感器信息
export const GetDevicePoints=`${baseUrl.POINT_URL}/data/realtime/deviceId/:id`
//12.走势图查询
export const PointEcharts=`${baseUrl.POINT_URL}/data/list/echart`
//13.保养查询 
 export const MaintenanceQuery=`${baseUrl.DEVICE_URL}/manager/device/listmr?groupId/:groupId`
//14.设备已到保养周期部件（按设备deviceId和sysRemind） 
 export const MaintenanceParts=`${baseUrl.DEVICE_URL}/manager/maintenanceRecord/list/expired`
//15.批量更新&批量添加记录 
export const MaintenanceBathUpdate=`${baseUrl.DEVICE_URL}/manager/maintenanceRecord/batch/update`
//16.根据cid获取售后资料 
export const GetAfterSalesInformation=`${baseUrl.DEVICE_URL}/manager/categoryService/list/group?categoryId=:cid`
//18.根据cid,serviceType获取某项详细售后资料
export const GetAfterSalesInformationByCidServiceType=`${baseUrl.DEVICE_URL}/manager/categoryService/list/cid/type?categoryId=:cid&serviceType=:serviceType`
//19.设备过滤查询
export const FilterDevice=`${baseUrl.DEVICE_URL}/manager/deviceAlarm/list`
//20设备分页查询(根据snCode查询设备信息/地址)
export const GetDevicePointsBysnCode=`${baseUrl.DEVICE_URL}/manager/deviceAlarm/list`
//设备分页查询(根据userid和groupId)
export const GetDeviceListByGroupid=`${baseUrl.DEVICE_URL}/manager/device/list'`
//9.联系我们
export const ContactUs =`${baseUrl.DEVICE_URL}/manager/version/list/contactinfo`
//22设备查询(snCode)
export const GetDeviceFactory =`${baseUrl.DEVICE_URL}/manager/device/snCode/'+:snCode`
//23令牌退出
export const TokenLogout=`${baseUrl.TOKEN_URL}/token/logout`
//24修改密码
export const UserUpdate=`${baseUrl.AUTH_TOKEN_URL}/user/update`
//25版本更新
export const VersionQuery=`${baseUrl.DEVICE_URL}/manager/version/list`
//26保养查询(搜索)
export const MaintenanceQueryBySnCode=`${baseUrl.DEVICE_URL}/manager/device/listmr`



// export const versionQuery = (data) => axios({ 
//   url: baseUrl.DEVICE_URL + `/manager/version/list`,
//   method: 'post',  
//  data: data})


//设备分页查询(根据snCode查询设备信息/地址)




// export const maintenanceQueryBySnCode2 = (snCode, groupId) => axios({
//   url: `${baseUrl.DEVICE_URL}/manager/device/listmr`,
//   method: 'post',
//   params: {
//     groupId,
//     snCode
//   }
// });












//9.令牌注销 
export const tokenLogout = (username, token) => {
  userInfo = store.getState().user
  return(
    axios({
      url: baseUrl.TOKEN_URL + '/token/logout',
      method: 'get',
      headers:{
        'x-auth-user':userInfo.username,
        'x-auth-token':userInfo.token,
      },
      params: {
        username,
        token 
      }
    })
  )
}
/**
 * 
 * 设备管理接口   
 */
//8.根据设备id查询设备
export const getDeviceBydeviceId = (id) => axios({
  url: baseUrl.DEVICE_URL + '/manager/device/id/' + id,
  method: 'get'
  })
//9.根据snCode查询设备信息
  export const getDeviceBysnCode = (snCode) => axios({
 url: baseUrl.DEVICE_URL + '/manager/device/snCode/' + snCode,
 method: 'get'
  })
//7.设备过滤查询
export const filterDevice = (value) =>{
  userInfo = store.getState().user
  return(
    axios({
      url: baseUrl.DEVICE_URL + '/manager/device/list',
      method: 'post',
      headers:{
        'x-auth-user':userInfo.username,
        'x-auth-token':userInfo.token,
      },
      data: value
    })
  )
} 


//设备分页查询(根据snCode查询设备信息/地址)
export const getDevicePointsBysnCode = (value) =>{
  userInfo = store.getState().user
  return(
    axios({
      url: baseUrl.DEVICE_URL + '/manager/device/list',
      headers:{
        'x-auth-user':userInfo.username,
        'x-auth-token':userInfo.token,
      },
      method: 'post',
      data: value
    })
  )
} 
/**
 * 
 * 保养接口  
 */
//1.保养查询
export const maintenanceQuery = groupId => axios({
    url:baseUrl.DEVICE_URL + '/manager/device/listmr?groupId=' + groupId,
    method: 'post'
  })
//2.保养到期设备部件列表(根据groupId)
export const maintenanceMaturityDevices = (params) => axios({
  url: baseUrl.DEVICE_URL + `/manager/maintenanceRecord/listPage/mr`,
  method: 'post',
  data: params
})
//4.设备已到保养周期部件（按设备deviceId和sysRemind）
export const maintenanceParts = (params) => axios({
  url:baseUrl.DEVICE_URL + `/manager/maintenanceRecord/list/expired`,
  method: 'post',
  data: params
})
//5.保养记录查询(根据deviceId,sysRemind) sysRemind=0未到期, =1到期 , =2完成
export const maintenanceRcordByDeviceidSysRemind = (params) => axios({
  url: baseUrl.DEVICE_URL + `/manager/maintenanceRecord/list`,
  method: 'post',
  data: params
})
//6.保养查询(根据snCode)
export const maintenanceQueryBySnCode = (snCode,groupId) =>{
  userInfo = store.getState().user
  return(
    axios({
      url: baseUrl.DEVICE_URL + `/manager/maintenanceRecord/list/mr?groupId=${groupId}&snCode=${snCode}`,
      headers:{
        'x-auth-user':userInfo.username,
        'x-auth-token':userInfo.token,
      },
      method: 'post'
    })
  )
}
//-------------------------------------------//
//6.保养查询搜索(根据snCode，groupid)
export const maintenanceQueryBySnCode2 = (snCode, groupId) => {
  userInfo = store.getState().user
return(
  axios({
    url: `${baseUrl.DEVICE_URL}/manager/device/listmr`,
    headers:{
      'x-auth-user':userInfo.username,
      'x-auth-token':userInfo.token,
    },
    method: 'post',
    params: {
      groupId,
      snCode
    }
  })
)
}
//7.批量更新&批量添加记录
export const maintenanceBathUpdate = (params) =>{
  userInfo = store.getState().user
  return(
    axios({
      url: baseUrl.DEVICE_URL + `/manager/maintenanceRecord/batch/update`,
      headers:{
        'x-auth-user':userInfo.username,
        'x-auth-token':userInfo.token,
      },
      method: 'post',
      params: params
    })
  )
} 


/**
 * 传感器接口
 */
// const POINT_URL = '/point'
const POINT_URL = baseUrl.POINT_URL
//1.获取设备实时值
// export const getDevicePoints = (id) => axios({
//   url: POINT_URL + '/data/realtime/deviceId/' + id,
//   method: 'get'
// })
// 2.走势图查询
export const pointEcharts = (value) => {
  userInfo = store.getState().user
  return(
    axios({
      url: POINT_URL + '/data/list/echart',
      method: 'post',
      headers:{
        'x-auth-user':userInfo.username,
        'x-auth-token':userInfo.token,
      },
      data: value
    })
  )
}

/**
 * 
 * 售后查询
 * 
 */

//1.根据cid获取售后资料
export const getAfterSalesInformation = (cid) => axios({
  url:baseUrl.DEVICE_URL + `/manager/categoryService/list/group?categoryId=${cid}`,
  method: 'post'
})
//2.根据cid,serviceType获取某项详细售后资料
export const getAfterSalesInformationByCidServiceType = (cid,serviceType) => axios({
  url: baseUrl.DEVICE_URL + `/manager/categoryService/list/cid/type?categoryId=${cid}&serviceType=${serviceType}`,
  method: 'post'
})
//3.获取视频资料
export const getVideo = (url) => axios({
  url: baseUrl.DEVICE_URL + `/manager/upload/file/app?file=` + url,
  method: 'get'
})

/**
 * 
 * 萤石云
 */
//1.获取token
const instance = axios.create()
export const getVideoToken = () => instance.request({
    url:'https://open.ys7.com/api/lapp/token/get?appKey=e1e8604f543b4782874f57ac7ec5a8cc&appSecret=c136e5f3f7e72f895dfc1725825ee055',
    method: 'post'
  })
  //2.获取直播源
  export const getVideoSource = ({accessToken, source}) => instance.request({
    url:`https://open.ys7.com/api/lapp/live/address/get?accessToken=${accessToken}&source=${source}`,
    method: 'post'
  })
/**
 * 
 *报警列表接口
 */
// const DEVICE_URL = '/device'
// const DEVICE_URL = devPath.DEVICE_URL
//1.根据位号id查询位号
export const pointById = (pointId) => axios({
  url: baseUrl.DEVICE_URL + '/manager/point/id/' + pointId,
  method: 'get',
})

//2.获取报警列表
export const deviceAlarmList = (page) => axios({
  url: baseUrl.DEVICE_URL + '/manager/deviceAlarm/list',
  method: 'post',
  data: page,
})

//3.根据报警id查询报警信息
export const getAlarmInfoByAlarmId = (alarmId) => axios({
  url:baseUrl. DEVICE_URL + '/manager/deviceAlarm/id/' + alarmId,
  method: 'get'
})

//4.提交异常处理结果
export const submitAlarmHandle = (alarmForm) => axios({
  url: baseUrl.DEVICE_URL + '/manager/deviceAlarm/update',
  method: 'post',
  data: alarmForm,
})

//5.批量上传图片
export const batchUploadImg = (files) => axios({
  url: baseUrl.DEVICE_URL + '/manager/upload/img/batch',
  method: 'post',
  data: files
})
export const batchUploadImg2 = (files) => axios({
  url:baseUrl.DEVICE_URL + '/manager/upload/img',
  method: 'post',
  data: files
})
//6.显示图片
export const fileShow = (relative) => axios({
  url: baseUrl.DEVICE_URL + '/manager/upload/file/show',
  method: 'get',
  params: {
    relative: relative,
  },
  responseType: 'blob'
})
//8.报警信息过滤查询
export const filterAlarmDevices = (value) =>{
  userInfo = store.getState().user
  return(
    axios({
      url: baseUrl.DEVICE_URL + '/manager/deviceAlarm/list',
      method: 'post',
      headers:{
        'x-auth-user':userInfo.username,
        'x-auth-token':userInfo.token,
      },
      data: value
    })
  )
}

//设备分页查询(根据userid和groupId)
export const getDeviceListByGroupid = (value) => axios({
  url: baseUrl.DEVICE_URL + '/manager/device/list',
  method: 'post',
  data: value
})

/**
 * 
 * 其他 
 */
//6.显示图片
export const SHOW_IMGS =()=>{
  return baseUrl.SHOW_IMGS
}
//下载文件
export const DOWNLOAD_APP=()=>{
  return baseUrl.DOWNLOAD_APP
}
//6.用户修改密码
export const userUpdate = (user) => axios({
  url:baseUrl.AUTH_TOKEN_URL + '/user/update',
  method: 'post',
  data: user
})
 //7.版本更新
export const versionQuery = (data) => axios({ 
  url: baseUrl.DEVICE_URL + `/manager/version/list`,
  method: 'post',  
 data: data})
 //联系我们
 export const contactUs = () => axios({
  url:baseUrl.DEVICE_URL +`/manager/version/list/contactinfo`,
  method: 'get'
})
//消息推送
export const newsPush = (userId,cid) =>{
  userInfo = store.getState().user
  return(
    axios({
      url:baseUrl. TOKEN_URL + `/auth/user/modify/${userId}/${cid}`,
      headers:{
        'x-auth-user':userInfo.username,
        'x-auth-token':userInfo.token,
      },
      method: 'get'
    })
  )
}
//-------------------------------------------------------------


