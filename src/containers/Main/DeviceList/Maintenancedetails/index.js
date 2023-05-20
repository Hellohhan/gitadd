import React,{useEffect,useState} from "react";
import { View, Text,Alert } from "react-native";
import { Button } from '@rneui/themed';
import {ImageBackground, Image,  SafeAreaView,ScrollView, Platform } from "react-native";

import {StyleSheet, TouchableOpacity} from 'react-native';
import { setWidth, setText, setHeight } from "../../../../utils/styleAdb";
import {maintenanceParts,MaintenanceParts} from '../../../../api/requestPath'
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
   const [componentData, setcomponentData] = useState([])
  let {deviceId,name,snCode,list}=props.route.params//list是所有数据
  console.log(props.route.params+'1232132131232132132312312');
  useEffect(() => {
    getExpireDevice(deviceId)
   return ()=>{
    store.dispatch({type:'loading',data:false})
   }

  }, [])
  /* 获取需要保养的数据 */
  const getExpireDevice=async(deviceId)=>{
    store.dispatch({type:'loading',data:true})
    let params = {
          "deviceId":deviceId,
          "sysRemind":"1",
          "jsonEntity":{
            "sysRemind1":"1"
          }
        }
    try{
      store.dispatch({type:'loading',data:true})
       let result=await axios.authPost(MaintenanceParts,params) 
       if(result.message==='ok'){
        store.dispatch({type:'loading',data:false})
        let mergedData = result.data.map(obj => {
                let matchingObj = list.find(o => o.id === obj.id);
                if (matchingObj) {
                  return {...obj, ...matchingObj};
                }
                return obj;
              });
              setcomponentData(mergedData)
       }
    }
     catch(e){
      console.log(e);
      store.dispatch({type:'loading',data:false})
     }




    // try{
    //   let params = {
    //     "deviceId":deviceId,
    //     "sysRemind":"1",
    //     "jsonEntity":{
    //       "sysRemind1":"1"
    //     }
    //   }
    //   let data= await maintenanceParts(params)
    //   let result=data.data.data
    //    if(data.data.message=='ok'){
    //     store.dispatch({type:'loading',data:false})
    //     let mergedData = result.map(obj => {
    //       let matchingObj = list.find(o => o.id === obj.id);
    //       if (matchingObj) {
    //         return {...obj, ...matchingObj};
    //       }
    //       return obj;
    //     });
    //     setcomponentData(mergedData)
    //    }
    // }
    // catch(e){
    //   console.log(e);
    // }
   }
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
  /* 处理首保时间 */  
  const getStart_Time=(data)=>{
    let newData=data.substr(0,10)
    return newData
  }
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
         <View style={{flexDirection:'row',width:'100%',justifyContent:'flex-start',marginTop:setWidth(20),}}>
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
         {componentData.length?
          componentData.map(item=>
           // console.log(item);
           <View key={item.id} style={{marginBottom:setWidth(50)}}>
              <View  style={styles.headWraper}>
                  <View style={{flexDirection:'row'}}>
                  <Image source={require('./images/jizhenqi-01.png') } style={{width:setWidth(73),height:setWidth(65)}} />
                 <Text  style={styles.titleContent}>{item.part_name+':'+item.part_product_name}</Text>
                  </View>
   
                 <Button
                   title="去保养"
                   titleStyle={{fontSize:setText(38)}}                             /*设备id,部件id,部件名,id,下次保养事件,保养时间        */
                   onPress={()=>{props.navigation.navigate('MaintenanceEquipment',{deviceId, part_id:item.part_id ,part_name:item.part_name,  id:item.id, nextTime:item.part_first_other, set_time:item.set_time_format,name:name,snCode:snCode,remind:item.remind})}} //
                   buttonStyle={{
                     backgroundColor: 'rgba(78, 116, 289, 1)',                    
                     paddingHorizontal:0,
                     paddingVertical:0,
                     borderRadius: 10,
                   }}
                   containerStyle={{
                     width:setWidth(165),
                   }}
                 />
              </View>
             
            <View style={styles.bodyWraper} >
              <View>
                    <View style={{flexDirection:'row'}}>
                  <Text style={styles.bodyContent}>首保时间:{ getStart_Time(item.startTime)}</Text>
                  <View style={styles.baoyangzhouqiView}><Text style={styles.byrunStateComAddZqText}>保养周期:{item.part_first_other}小时</Text></View>
                    </View>
                 <Text style={styles.bodyContent}>上次保养:{ getStart_Time(item.startTime)}</Text>       
                 <Text style={styles.bodyContent}>本次保养:{getMaintenance(item.set_time_format)}</Text>
       
              </View>
            

              <View style={styles.baoyangXmbottomright}>
                     { Date.now()> new Date(item.set_time_format.replace(/-/g,'/')).getTime()?
                      <Text style={styles.byrunStateComAddyqText}>保养逾期{getTime(Date.now(), new Date(item.set_time_format.replace(/-/g,'/')))}天</Text>:<Text style={styles.byrunStateComAdddqText}>距离保养还剩{getTime(Date.now(), new Date(item.set_time_format.replace(/-/g,'/')))}天</Text>
                   }
                 </View>
            </View>
          
            </View>
           
          )
       :<View style={{marginTop:setWidth(300),alignItems:'center'}}>
         <Text>暂无保养信息</Text>
         </View>
           }
         </ScrollView>
         </View>
</View>
</MyFrame2>





//     <MyFrameWork style={{flex:1}}>
  
//    
     
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
//         {componentData.length?
//          componentData.map(item=>
//           // console.log(item);
//           <View key={item.id}>
//           {/* 激振器保养情况 */}
//            <View style={styles.baoyangXmheard}>
//              <View style={styles.baoyangXmHeardleft}>
//                 <Image source={require('./images/jizhenqi-01.png') } style={{width:setWidth(73),height:setWidth(65)}} />
//                 <Text style={[styles.runStateDeviceName,{marginLeft:setWidth(15),marginTop:setWidth(10)}]}>{item.part_name+':'+item.part_product_name}</Text>
//              </View>
//              <View style={styles.baoyangXmHeardright}>
//                 <Button
//                   title="去保养"
//                   titleStyle={{fontSize:setText(38)}}                             /*设备id,部件id,部件名,id,下次保养事件,保养时间        */
//                   onPress={()=>{props.navigation.navigate('MaintenanceEquipment',{deviceId, part_id:item.part_id ,part_name:item.part_name,  id:item.id, nextTime:item.part_first_other, set_time:item.set_time_format,name:name,snCode:snCode,remind:item.remind})}} //
//                   buttonStyle={{
//                     backgroundColor: 'rgba(78, 116, 289, 1)',                    
//                     paddingHorizontal:0,
//                     paddingVertical:0,
//                     borderRadius: 10,
//                   }}
//                   containerStyle={{
//                     width:setWidth(165),
//                   }}
//                 />
//              </View>

//            </View>
//            <View style={styles.baoyangXmbottom}>
//              <View style={styles.baoyangXmbottomleft}>
//                 <View style={{flexDirection:'row',borderLeftWidth:setWidth(6),borderLeftColor:'#446bf8'}}>
//                     <Text style={[styles.byrunStateComAddText,{marginRight:setWidth(20)}]}>首保时间:</Text>
//                     <Text style={styles.byrunStateComAddText}>{ getStart_Time(item.startTime)}</Text>
//                     <View style={styles.baoyangzhouqiView}><Text style={styles.byrunStateComAddZqText}>保养周期:{item.part_first_other}小时</Text></View>
//                 </View>
//                 <View style={{flexDirection:'row',borderLeftWidth:setWidth(6),borderLeftColor:'#446bf8'}}>
//                     <Text style={[styles.byrunStateComAddText,{marginRight:setWidth(20)}]}>上次保养:</Text>
//                     <Text style={styles.byrunStateComAddText}>{ getStart_Time(item.startTime)}</Text>
//                 </View>

//                 <View style={{flexDirection:'row',borderLeftWidth:setWidth(6),borderLeftColor:'#446bf8'}}>
//                     <Text style={[styles.byrunStateComAddText,{marginRight:setWidth(20)}]}>本次保养:</Text>
//                     <Text style={styles.byrunStateComAddText}>{getMaintenance(item.set_time_format)}</Text>
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
