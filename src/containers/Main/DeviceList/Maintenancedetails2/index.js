import React,{useEffect,useState} from "react";
import { View, Text,Alert } from "react-native";
import { Button } from '@rneui/themed';
import {ImageBackground, Image,  SafeAreaView,ScrollView, Platform } from "react-native";

import {StyleSheet, TouchableOpacity} from 'react-native';
import { setWidth, setText, setHeight } from "../../../../utils/styleAdb";
import {MaintenanceParts} from '../../../../api/requestPath'
import MyFrameWork from "../../../../components/MyFrameWork";
import svg from "../../../../assets/svg/svg";
import { SvgXml } from "react-native-svg";
import MyFrame2 from '../../../../components/MyFrame2'
import {store} from '../../../../redux/store'
import axios from "../../../../api";
// import { getDeviceBysnCode } from '../../../../api/requestPath'
import styles from "./styles";
const moment = require('moment');
require('moment/locale/zh-cn');
moment.locale('zh-cn');
function Index(props) {
   const [componentData, setcomponentData] = useState([])//获取需要保养的设备
   const [queryData, setqueryData] = useState([])//获取查询的设备
  let {deviceId,name,snCode}=props.route.params
  useEffect(() => {
    try{
    getExpireDevice(deviceId)
    maintenanceQuery(snCode)
    }
    catch(e){
      console.log(e);
    }
    return ()=>{
      store.dispatch({type:'loading',data:false})
    }
  }, [])
  /* 获取需要保养的数据 */
  const getExpireDevice=async(deviceId)=>{
    let params = {
          "deviceId":deviceId,
          "sysRemind":"0",
          "jsonEntity":{
            "sysRemind1":"1"
          }
        }
    try{
      store.dispatch({type:'loading',data:false})
       let result=await axios.authPost(MaintenanceParts,params) 
       console.log(result);
       if(result.message==='ok'){
        store.dispatch({type:'loading',data:false})
        setcomponentData(result.data)
       }
    }
     catch(e){
      console.log(e);
      store.dispatch({type:'loading',data:false})
     }
    }
  //-----------------------------
   /*   根据sCnode查询设备 */
  //  const maintenanceQuery= async(sncode)=>{
    
  //    try{
  //    let result= await maintenanceQueryBySnCode(sncode)
  //     let data=result.data.data;
  //    if(result.data.message=='ok'){
  //       console.log(data);
  //       setqueryData(data)
  //    }
  //    }
  //    catch(e){
  //     console.log('查询设备失败',e);
  //    }
  //  }
   /* 保养逾期或保养预期 */
   const getTime=(nowTime,time)=>{
    if (nowTime > time){
      return Math.ceil((nowTime - time)/(1000*60*60*24))
    }else{
      return Math.floor((time - nowTime)/(1000*60*60*24))
    }
  }
  /*   处理本次保养时间 */
  const getMaintenance=(data)=>{
    let newData=data.substr(0,10)
      return newData
    }

    console.log(queryData);
  return (

    <MyFrame2>
    <View style={styles.titleWraper2}>
          <TouchableOpacity  onPress={()=>{props.navigation.goBack()}} style={{width:setWidth(140)}}>
            <SvgXml xml={svg.goBack} style={styles.Svg} 
               fill={"black"}>
             </SvgXml> 
             </TouchableOpacity> 
            <Text style={styles.title}>{'保养详情'}</Text>
            <TouchableOpacity  onPress={()=>{props.navigation.navigate('Maintenancerecords',{deviceId,name,snCode})}}>
             <Text style={styles.loginOut}>历史记录</Text>
            </TouchableOpacity>
</View> 
<View style={styles.wrap}>
       {/* 顶部图片 */}
       <View style={{flexDirection:'row',width:'100%',justifyContent:'flex-start',marginTop:setWidth(20)}}>
         <View style={styles.baoyangItemimg}>
         <Image source={require('../../images/sjimg.png')} style={{width:setWidth(140),height:setWidth(90)}} />
         </View>
         <View style={{marginLeft:setWidth(26),marginTop:setWidth(83),width:setWidth(405),height:setWidth(161)}}>
             <Text style={styles.runStateDeviceName}>{name}</Text>
             <View style={{flexDirection:'row',borderLeftWidth:setWidth(6),borderLeftColor:'#446bf8'}}>
                 <Text style={[styles.runStateComAddText,{marginLeft:setWidth(20)}]}>{snCode}</Text>
             </View>
         </View>
       </View>
       <View style={styles.baoyangXm}>
       <ScrollView showsVerticalScrollIndicator={false}>
       {
       queryData.length>0? 
    queryData.map(item => (
    (
      <View key={item.id} style={{marginBottom:setWidth(50)}}>
        <View  style={styles.headWraper}>
          <View style={{flexDirection:'row'}}>
            <Image source={require('./images/jizhenqi-01.png') } style={{width:setWidth(73),height:setWidth(65)}} />
            <Text  style={styles.titleContent}>{item.part_name+':'+item.part_product_name}</Text>
          </View>
        </View>
        <View style={styles.bodyWraper} >
          <View>
            <View style={{flexDirection:'row'}}>
              <Text style={styles.bodyContent}>保养周期:{item.part_first_other}小时</Text>
              {/* <View style={styles.baoyangzhouqiView}><Text style={styles.byrunStateComAddZqText}>保养周期:{item.part_first_other}小时</Text></View> */}
            </View>
            {/* <Text style={styles.bodyContent}>上次保养:32131</Text>       
            <Text style={styles.bodyContent}>本次保养:23123</Text> */}
          </View>
          {/* <View style={styles.baoyangXmbottomright}>
            { Date.now()>Date.parse(item.set_time_format)?
              <Text style={styles.byrunStateComAddyqText}>保养逾期{getTime(Date.now(),Date.parse(item.set_time_format))}天</Text>:<Text style={styles.byrunStateComAdddqText}>距离保养还剩{getTime(Date.now(),Date.parse(item.set_time_format))}天</Text>
            }
          </View> */}
        </View>
      </View>
    ) 
  )):<View style={{width:'100%',height:setWidth(1200),justifyContent:'center',alignItems:'center'}}>
  <Text >当前设备暂无保养信息</Text>
</View>

}
       </ScrollView>
       </View>
</View>
</MyFrame2>






//     <MyFrameWork style={{flex:1}}>

// <View style={styles.titleWraper2}>
//              <TouchableOpacity  onPress={()=>{props.navigation.goBack()}} style={{width:setWidth(140)}}>
//              <SvgXml xml={svg.goBack} style={styles.Svg} 
//                 fill={"black"}>
//               </SvgXml> 
//               </TouchableOpacity> 
//              <Text style={styles.title}>{'保养详情'}</Text>
//              <TouchableOpacity  onPress={()=>{props.navigation.navigate('Maintenancerecords',{deviceId,name,snCode})}}>
//               <Text style={styles.loginOut}>历史记录</Text>
//              </TouchableOpacity>
// </View>

//       <View style={styles.wrap}>
//         {/* 顶部图片 */}
//         <View style={{flexDirection:'row',width:'100%',justifyContent:'flex-start',marginTop:setWidth(130)}}>
//           <View style={styles.baoyangItemimg}>
//           <Image source={require('../../images/sjimg.png')} style={{width:setWidth(140),height:setWidth(90)}} />
//           </View>
//           <View style={{marginLeft:setWidth(26),marginTop:setWidth(83),width:setWidth(405),height:setWidth(161)}}>
//               <Text style={styles.runStateDeviceName}>{name}</Text>
//               <View style={{flexDirection:'row',borderLeftWidth:setWidth(6),borderLeftColor:'#446bf8'}}>
//                   <Text style={[styles.runStateComAddText,{marginLeft:setWidth(20)}]}>{snCode}</Text>
//               </View>
//           </View>
//         </View>
//         {/* 保养内容   */}
//         <View style={styles.baoyangXm}>
//          {queryData.length?
//          queryData.map(item=>
//           // console.log(item);
//           <View key={item.id}>
    
//            <View style={styles.baoyangXmheard}>
//              <View style={styles.baoyangXmHeardleft}>
//                 <Image source={require('./images/jizhenqi-01.png') } style={{width:setWidth(73),height:setWidth(65)}} />
//                 <Text style={[styles.runStateDeviceName,{marginLeft:setWidth(15),marginTop:setWidth(10)}]}>{item.part_name+':'+item.part_product_name}</Text>
//              </View>


//            </View>
//            <View style={styles.baoyangXmbottom}>
//              <View style={styles.baoyangXmbottomleft}>
//                 <View style={{flexDirection:'row',borderLeftWidth:setWidth(6),borderLeftColor:'#446bf8'}}>
//                     <Text style={[styles.byrunStateComAddText,{marginRight:setWidth(20)}]}>首保时间:</Text>
//                     <Text style={styles.byrunStateComAddText}>2023-01-09</Text>
//                     <View style={styles.baoyangzhouqiView}><Text style={styles.byrunStateComAddZqText}>保养周期:90天</Text></View>
//                 </View>
//                 <View style={{flexDirection:'row',borderLeftWidth:setWidth(6),borderLeftColor:'#446bf8'}}>
//                     <Text style={[styles.byrunStateComAddText,{marginRight:setWidth(20)}]}>上次保养:</Text>
//                     <Text style={styles.byrunStateComAddText}>2023-01-09</Text>
//                 </View>

//                 <View style={{flexDirection:'row',borderLeftWidth:setWidth(6),borderLeftColor:'#446bf8'}}>
//                     <Text style={[styles.byrunStateComAddText,{marginRight:setWidth(20)}]}>本次保养:</Text>
//                     <Text style={styles.byrunStateComAddText}>{}</Text>
//                 </View>
//              </View>
//                 <View style={styles.baoyangXmbottomright}>
//                     { Date.now()>Date.parse(item.set_time_format)?
//                      <Text style={styles.byrunStateComAddyqText}>保养逾期{getTime(Date.now(),Date.parse(item.set_time_format))}天</Text>:<Text style={styles.byrunStateComAdddqText}>距离保养还剩{getTime(Date.now(),Date.parse(item.set_time_format))}天</Text>
//                   }
//                 </View>
//            </View>
//            </View>
           
//          )
       
//       :<View style={{marginTop:setWidth(300),alignItems:'center'}}>
//         <Text>当前设备没有需要保养的部件</Text>
//         </View>
//           }
//         </View>
     
   
//       </View>
//     </MyFrameWork>
  );
}

export default Index;
