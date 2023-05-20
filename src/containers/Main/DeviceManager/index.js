import React from "react";
import {connect} from 'react-redux'
import { Text, View, FlatList, TouchableOpacity, Image, Alert } from "react-native";

import MyFrameWork from "../../../components/MyFrameWork";
import MyFrame from '../../../components/MyFrame'
import styles from "./styles";
import { setText, setWidth } from "../../../utils/styleAdb";
import { asyncGetDevices } from '../../../redux/actions/devices'
import QueryByDeviceId from '../../../components/QueryByDeviceId'
import Screening from "../../../components/Screening";
import { store } from "../../../redux/store";
import axios from "../../../api";
import {FilterDevice,getDeviceBysnCode,GETDEVICESBYSNCODE,contactUs,getDevicePointsBysnCode,GetDevicePointsBysnCode,getDeviceListByGroupid,GetDeviceListByGroupid,GetDeviceFactory,filterDevice} from '../../../api/requestPath'
class DeviceManager extends React.PureComponent{ 
  state={
    filterData:[]
  }
  //去详情页面(组态图)
  goToViewDetails = (deviceId, deviceName) => {
    this.props.navigation.navigate('ConfigDiagram',{deviceId,deviceName})
  }


  renderItem = ({item}) => {
    return (
      <View key={item.id} style={styles.listItemWrap}>
        <View style={styles.listItemTop}>
          <Text style={styles.listItemName}>{item.name}</Text>
          <TouchableOpacity onPress={() => {
            console.log('售后信息');}}>
            <Text style={styles.listItemTopRight}>售后信息</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.listItem}>
          <View style={styles.leftTextWrap}>
            <View style={styles.leftTextItem}>
              <Text style={styles.leftText}>地区 : </Text>
              <Text style={styles.leftTextItemInfo}>{item.jsonEntity.province+item.jsonEntity.city+item.jsonEntity.county+item.jsonEntity.detailed_address}</Text>
            </View>
            <View style={styles.leftTextItem}>
              <Text style={styles.leftText}>厂家 : </Text>
              <Text style={styles.leftTextItemInfo}>{item.jsonEntity.company_name}</Text>
            </View>
            <View style={styles.leftTextItem}>
              <Text style={styles.leftText}>生产完成时间 : </Text>
              <Text ellipsizeMode='tail' numberOfLines={1} style={styles.leftTextItemInfo}>{item.jsonEntity.device_begin_time}</Text>
            </View>
            <View style={styles.leftTextItem}>
              <Text style={styles.leftText}>安装完成时间 : </Text>
              <Text ellipsizeMode='tail' numberOfLines={1} style={styles.leftTextItemInfo}>{item.jsonEntity.device_install_time}</Text>
            </View>
          </View>
          <View style={styles.rightButtonWrap}>
            {/*<Button style={styles.viewDetails} onPress={() => this.goToViewDetails(item.id,item.name)}>*/}
            {/*  <Text style={styles.viewDetailsText}>查看详情</Text>*/}
            {/*</Button>*/}
            {/*<Button style={styles.location}>*/}
            {/*  <Text style={styles.locationText}>定位</Text>*/}
            {/*</Button>*/}
          </View>
        </View>
      </View>
    )
  }

    componentDidMount(){
      let device=this.props.isFilter
      this.headerRightButton()
      this.setState({filterData:this.props.devices})
      console.log(this.props.isFilter);
    }
    /* 筛选 */
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
  //处理扫一扫按钮
  handleScan=()=>{
    console.log('扫一扫按钮');
    this.props.navigation.navigate('Scan',{device:'deviceManager'})
  }
  //处理搜索按钮
  handleSearchs=async(params)=>{
  try{
    let result= await getDevicePointsBysnCode(params)
    if(params.jsonEntity.snCode===''){
      alert('设备编号不能为空')
      store.dispatch({type:'loading',data:false})
       return
    }
    if(result.data.message==='ok'){
        if(result.data.data.records.length){
          let data=result.data.data.records;
          this.setState({filterData:data},()=>{
            console.log(this.state.filterData);
          })
        }else{
          alert('出厂设备编号错误,请重新输入!')
        }
   }
  }
   catch(e){
   console.log(e);
   }
  }
  //去组态页面
  toConfigDiagram=(isStopOfDevice,id,alarm,time,deviceName)=>{
    return ()=>{
      //如果运行状态是0
      // if (isStopOfDevice===0){
      //   alert('当前设备尚未启动,无法查看实时数据')
      //   return
      // }
      this.props.navigation.navigate('ConfigDiagram',{id:id,alarm:alarm,time:time,deviceName:deviceName})
    }
  }
  //筛选
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

    // try{
    //   store.dispatch({type:'loading',data:true})
    //   let result =await axios.authPost(FilterDevice,data)
    //   console.log(result,'111111111111');
    //   if(result.message==='ok'){
    //     store.dispatch({type:'loading',data:false})
    //     if(result.data.records.length===0){
    //       alert('请更换筛选条件')

    //     }
    //     console.log(result.data);
    //     // this.setState({
    //     //         filterData:result.data.records
    //     //       })
    //   }else{
    //     alert('请更换筛选条件')
    //   }
    // }
    // catch(e){
    //   console.log('筛选失败',e);
    //   store.dispatch({type:'loading',data:false})
    // }
   }



   /* 刷新按钮 */
   refresh=()=>{
    store.dispatch({type:'clearCode'})
    this.setState({
      filterData:this.props.devices
    })
   }
  render() {
    const {navigation,devices,user} =this.props
    let{filterData}=this.state
    console.log(devices);
     console.log(filterData);
    return (
      <MyFrame>
        {/*扫一扫&根据设备标识查询组件*/}
        <QueryByDeviceId handleScan={this.handleScan} handleSearch={(data)=>{this.handleSearchs(data)}} handleStatus={1}/>
      {/*  设备列表*/}
        <View style={styles.deviceListWrap}>
          {/*头部*/}
          <View style={styles.deviceListHeader}>
            <View style={styles.headerWrap}>
              <View style={styles.headerLeft}>
                <Image source={require('./images/deviceList.png')} style={{width:setWidth(51),height:setWidth(71)}}/>
                <Text style={styles.headerLeftText}>设备列表</Text>
              </View>
              <TouchableOpacity onPress={this.refresh}>
                <Image source={require('./images/refresh.png')} style={{width:setWidth(51),height:setWidth(54)}}/>
              </TouchableOpacity>
            </View>
          </View>
          {
            this.state.filterData.map(device=>{
              return(
                <TouchableOpacity key={device.id} style={styles.itemWrap} onPress={this.toConfigDiagram(device.onOff,device.id,device.alarm,device.time,device.name)}>
                {/*左边*/}
                <View style={styles.itemLeftWrap}>
                  {/*<Image source={require('')}/>*/}
                  <View ></View>
                  <View ><Image source={require('../images/sjimg.png')} style={{width:setWidth(140),height:setWidth(90),marginTop:setWidth(30)}} /></View>
                </View>
                {/*  中间*/}
                <View style={styles.itemMidWrap}>
                  <Text>{device.name}</Text>
                  <View style={styles.itemMidInWrap}>
                    <View style={styles.verticalLine}></View>
                    <View>
                      <View style={[styles.itemMidIn,{height:setWidth(50)}]}>
                        <Text style={{fontSize:setText(30),color:'#94949A'}}>{device.snCode}</Text>
                        <TouchableOpacity onPress={()=>{
                          this.props.navigation.navigate("Map",{deviceId:device.id,deviceName:device.name,snCode:device.snCode})
                         }}>
                          <Image source={require('./images/location.png')} style={{width:setWidth(128),height:setWidth(106)}}/>
                        </TouchableOpacity>
                      </View>
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
                <Image source={require('./images/toRight.png')} style={{width:setWidth(25),height:setWidth(45)}}/>
              </TouchableOpacity>
              )
            })
          }

        </View>
         {/* 筛选弹框 */}
        <Screening handleClick={(data)=>{this.Toscreeing(data)}} filterState={1}/>{/* filterState 相当于是一个模块标示 */}
      </MyFrame>
    )
  }
}
export default connect(state => ({
  devices:state.devices,
  isFilter:state.isFilter.Filter,
  mysncode:state.sncode.mycode,
  user:state.user
}
  ),{asyncGetDevices})(DeviceManager)





// import {
//   AMapSdk,
//   MapView,
//   Polyline,
//   Polygon,
//   MapType,
//   Marker
// } from 'react-native-amap3d';
// import {Platform, StyleSheet, View,Image} from 'react-native';
// import React, {Component} from 'react';

// class App extends Component {
//   componentDidMount() {
//     AMapSdk.init(
//       Platform.select({
//         android: 'f61db2223b982fe80fc43b56d2076a4c',
//         ios: 'f61db2223b982fe80fc43b56d2076a4c',
//       }),
//     );
//   }
//   render() {
//     return (
//       <View style={{flex: 1}}>
//     <MapView
//   mapType={MapType.Satellite}
//   initialCameraPosition={{
//     target: {
//       latitude:39.806901,
//       longitude:116.397972,
//     },
//     zoom: 8,
//   }}

//   style={{ flex: 1 }}
// >
// <Marker
//   position={{ latitude: 39.806901, longitude: 116.397972 }}
//   onPress={() => alert("onPress")}
// >
//   <Image
//     source={require("../images/position.png")}
//     style={{ width: 50, height: 50 }}
//   />
// </Marker>
// </MapView>
//       </View>
//     );
//   }
// }

// export default App;
