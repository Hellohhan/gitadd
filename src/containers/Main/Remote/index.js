import React,{Component} from "react";
import {connect} from 'react-redux'



import { View, Text, ImageBackground, Image,Alert,TouchableOpacity, ScrollView, Platform } from "react-native";
import {Input} from '@rneui/themed';
import { Button } from '@rneui/themed';
import { SafeAreaView,withSafeAreaInsets } from "react-native-safe-area-context";
import FocusAwareStatusBar from "../../../components/FocusAwareStatusBar";

import { setWidth, setText, setHeight } from "../../../utils/styleAdb";
import QueryByDeviceId from '../../../components/QueryByDeviceId';
import axios from "axios";
import { asyncGetDevices } from "../../../redux/actions/devices";
import {getDevicePointsBysnCode,filterDevice} from '../../../api/requestPath'
import Screening from "../../../components/Screening";

import MyFrame from "../../../components/MyFrame";
import styles from "./styles";
import {store} from '../../../redux/store'
class Remote extends Component {  

  state={
    filterdata:[]
  }
  componentDidMount(){
   this.headerRightButton()
    this.setState({filterdata:this.props.devices})
  }
    /* 筛选按钮 */
    headerRightButton=()=>{
      this.props.navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={()=>{
            store.dispatch({type:'changeFilter'})
          }}>
            <Text style={{color:"#black"}}>筛选</Text>
          </TouchableOpacity>
        ),
      });
    }

  //筛选功能
  Toscreeing= async(data)=>{
    console.log(data);
   try{
    store.dispatch({type:'loading',data:true})
    let result=await filterDevice(data)
    if(result.data.message==='ok'){
      store.dispatch({type:'loading',data:false})
      if(result.data.data.records.length===0){
        alert('请更换筛选条件')
      }
      this.setState({
                filterData:result.data.data.records
              })
   
  }else{
    alert('请更换筛选条件')
  }
}
   catch(e){
    console.log('筛选失败',e);
      store.dispatch({type:'loading',data:false})
   }
  }
  //处理扫一扫按钮
  handleScan=()=>{
    this.props.navigation.navigate('Scan',{device:'Remote'})
  }
  //处理搜索按钮
  handleSearch=async(params)=>{
    store.dispatch({type:'loading',data:true})
    if(params.jsonEntity.snCode===''){
      alert('设备编号不能为空')
     store.dispatch({type:'loading',data:false})
      return
    }
     let result= await getDevicePointsBysnCode(params)
     if(result.data.message==='ok'){
      store.dispatch({type:'loading',data:false})
       if(result.data.data.records.length){
         let data=result.data.data.records;
         console.log(data);
        this.setState({filterdata:data})
       }else{
         alert('出厂设备编号错误,请重新输入!')
       }
     } 
  }
     /* 刷新按钮 */
      refresh=()=>{
     store.dispatch({type:'clearCode'})
      this.setState({
        filterdata:this.props.devices
      })
     }
     //loading为fasle
     componentWillUnmount(){
      store.dispatch({type:'loading',data:false})
     }
  render() {
    console.log(this.props.devices);
    let{devices}=this.props
    let{filterdata}=this.state
    console.log(this.state.filterdata);

    return (
      <MyFrame>
      {/*扫一扫&根据设备标识查询组件*/}
      <QueryByDeviceId handleScan={this.handleScan} handleSearch={(data)=>{this.handleSearch(data)}} handleStatus={1}/>
   {/*  设备列表*/}
           <View style={styles.deviceListWrap}>
           {/*头部*/}
           <View style={styles.deviceListHeader}>
             <View style={styles.headerWrap}>
               <View style={styles.headerLeft}>
                 <Image source={require('../../Main/DeviceManager/images/deviceList.png')} style={{width:setWidth(51),height:setWidth(71)}}/>
                 <Text style={styles.headerLeftText}>全部设备</Text>
               </View>
               <TouchableOpacity onPress={this.refresh}>
                 <Image source={require('../../Main/DeviceManager/images/refresh.png')} style={{width:setWidth(51),height:setWidth(54)}}/>
               </TouchableOpacity>
             </View>
           </View>
           {/* 身体 */}
         {
        filterdata.map(device=>{
             return(
               <TouchableOpacity key={device.id} style={styles.itemWrap} >
               {/*左边*/}
               <View style={styles.itemLeftWrap}>
                 <View ><Image source={require('../images/sjimg.png')} style={{width:setWidth(140),height:setWidth(90),marginTop:setWidth(30)}} /></View>
               </View>
               {/*  中间*/}
               <View style={styles.itemMidWrap}>
                 <Text>{device.name}</Text>
                 <View style={styles.itemMidInWrap}>
                   <View style={styles.verticalLine}></View>
                   <View>
                       <Text style={{fontSize:setText(30),color:'#94949A'}}>{device.snCode}</Text>
                       <View style={styles.itemMidIn}>
                        <Text style={styles.itemMidInText}>设备状态:</Text>
                        <Text style={styles.itemMidInTextValue}>{device.onOff === 0?'停止':device.alarmStatus === '0'?'正常':'报警'}</Text>
                      </View>
                     <View style={styles.itemMidIn}>
                       <Text style={styles.itemMidInText}>运行时长:</Text>
                       <Text style={styles.itemMidInTextValue}>{device.time}h</Text>
                     </View>
                   </View>
                 </View>
               </View>
               {/* 右边*/}
               <TouchableOpacity onPress={()=>{
                    this.props.navigation.navigate('Video',{snCode:device.snCode,name:device.name,time:device.time})}}> 
               <View style={{width:setWidth(148),alignItems:'center'}}>
             <Image source={require('../images/cksp-01.png')} style={{width:setWidth(73),height:setWidth(52)}} />
             <Text style={{fontSize:setText(30),color:'#446bf8',marginTop:setWidth(15),fontWeight:'bold'}}>查看视频</Text>
           </View>
               </TouchableOpacity>
               
             </TouchableOpacity>
             )
           })
         }
       </View>
       {/* 筛选弹框 */}
        <Screening handleClick={(data)=>{this.Toscreeing(data)}} filterState={1}/>{/* filterState 相当于是一个模块标示 */}
      </MyFrame>


      // <MyFrameWork >
       
      //   {/* <QueryByDeviceId handleScan={this.handleScan} handleSearch={this.handleSearch}/> */}
      //   <View style={styles.sousuoWrap}>
      //       <TouchableOpacity >
      //           <Image source={require('../images/smimg.png')} style={styles.icon}/>
      //       </TouchableOpacity>
      //       <View style={styles.verticalLine}>
      //         <Input
      //           keyboardType='numeric'
      //           maxLength={20}
      //           inputContainerStyle={{borderBottomWidth:0,height:'100%'}}
      //           inputStyle={{fontSize:setText(40),color:'#9F9FA0'}}
      //           containerStyle={{height:'100%'}}
      //           placeholder='输入待查询设备编号'
      //           placeholderTextColor='#9F9FA0'
      //         />
      //       </View>
      //     <View style={styles.sousuobutton}>
      //       <TouchableOpacity >
      //           <Text style={styles.bottomText}>搜索</Text>
      //       </TouchableOpacity>
      //     </View>     
      //   </View>
      //   <View style={styles.gundongback}>
      //     <View style={[styles.shebeihead,{flexDirection:'row',justifyContent:'space-between'}]}>
      //       <View style={{flexDirection:'row'}}>
      //           <Image source={require('../images/sblb-01.png')} style={styles.shebeimge} />
      //           <Text style={styles.shebeTxt}>设备列表</Text>
      //       </View>
      //       {/* <button onClick={this.getData}>你好</button> */}
      //       <TouchableOpacity  >
               
      //           <Image source={require('../images/reload.png')} style={styles.shebeiReload}/>
      //       </TouchableOpacity>
      //     </View>
          
      //     {this.props.devices.map((item,i)=>(
      //     <TouchableOpacity style={styles.shebeiStateItem} onPress={()=>{
      //               this.props.navigation.navigate('Video',{snCode:item.snCode,name:item.name,time:item.time})}}>
      //       <View style={styles.shebeiItemimg}>
      //         <Image source={require('../images/sj-01.png')} style={{width:setWidth(149),height:setWidth(109),marginLeft:setWidth(20),marginTop:setWidth(26)}}/>
      //         <Image source={require('../images/runing-01.png')} 
      //           style={{width:setWidth(41),height:setHeight(41),marginLeft:setWidth(133),marginTop:setWidth(-32)}}/>
      //       </View>
      //       <View style={{marginLeft:setWidth(15),width:setWidth(550)}}>
      //         <Text style={styles.runStateDeviceName}>{item['name']}</Text>
      //         <View style={{flexDirection:'row',borderLeftWidth:setWidth(6),borderLeftColor:'#446bf8'}}>
      //           <Text style={[styles.runStateComAddText,{marginLeft:setWidth(20)}]}>{item['snCode']}</Text>
      //         </View>
      //         <View style={{flexDirection:'row',borderLeftWidth:setWidth(6),borderLeftColor:'#446bf8'}}>
      //           <Text style={[styles.runStateComAddText,{marginLeft:setWidth(20)}]}>状态:</Text>
      //           <Text style={styles.runStateComAddText}>{item['alarmStatus']==0?'正常':<Text style={{color:'red'}}>'异常'</Text>}</Text>
      //         </View>
      //         <View style={{flexDirection:'row',borderLeftWidth:setWidth(6),borderLeftColor:'#446bf8'}}>
      //           <Text style={[styles.runStateComAddText,{marginLeft:setWidth(20)}]}>运行时长:</Text>
      //           <Text style={styles.runStateComAddText}>{item['time']}h</Text>
      //         </View>
      //       </View>
      //       <View style={{width:setWidth(148),alignItems:'center'}}>
      //         <Image source={require('../images/cksp-01.png')} style={{width:setWidth(73),height:setWidth(52)}} />
      //         <Text style={{fontSize:setText(30),color:'#446bf8',marginTop:setWidth(15),fontWeight:'bold'}}>查看视频</Text>
      //       </View>
      //     </TouchableOpacity>
      //     ))
      //     }
      //     </View>
      //     </MyFrameWork>
    )
  }
}

export default connect(state => ({
  devices:state.devices,
  isFilter:state.isFilter.Filter,
  mysncode:state.sncode.mycode,
  user:state.user
}
  ),{asyncGetDevices})(Remote)