import React from "react";
import { connect } from 'react-redux'

import { Alert, Text, View,Dimensions } from "react-native";

import { ImageBackground, Image, TouchableOpacity, SafeAreaView, ScrollView, Platform } from "react-native";
import { Tab, Input, TabView } from '@rneui/themed';
import MyFrameWork from "../../../components/MyFrameWork";
import { setWidth, setText, setHeight } from "../../../utils/styleAdb";
import { asyncGetDevices } from "../../../redux/actions/devices";
import { maintenanceQueryBySnCode2, MaintenanceParts ,getDeviceBysnCode,MaintenanceQuery,MaintenanceQueryBySnCode,maintenanceQueryBySnCode} from '../../../api/requestPath'
import styles from "./styles"
import MyFrame2 from '../../../components/MyFrame2'
import QueryByDeviceId from '../../../components/QueryByDeviceId'
import {store} from "../../../redux/store"
import axios from "../../../api";
const moment = require('moment');
require('moment/locale/zh-cn');
moment.locale('zh-cn');
class Alarm extends React.PureComponent {
  state = {
    index1: 0,
    devices: [],/* 设备列表  用于初始化*/
    devices2:[],/* 设备列表2  用于搜索*/
    maintained: [],/* 等待保养 */
    query:'LK20001',/* 搜索的 文本框 */
    filteredData:[]/* 过滤的数据 */
  }
  componentDidMount() {
  this.props.asyncGetDevices()
    let { groupId } = this.props.userinfo
    this.getData(groupId)
    // this.getExpireDevice(groupId)
    console.log(this.props.devices);
    console.log(this.props);
  }
  /* 获取设备列表 */
  getData = async (groupId) => {
    try{
      store.dispatch({type:'loading',data:true})
     let result=await axios.authPost(MaintenanceQuery.replace(':groupId',groupId))
     console.log(result);
     let data=result.data
     if(result.message==='ok'){
      store.dispatch({type:'loading',data:false})
       this.setState({
        devices: data,
        devices2:data
       })
     }
    }
    catch(e){
      console.log('获取保养查询失败',e);
      store.dispatch({type:'loading',data:false})
    }
  }
  /* 保养逾期设备 */
  getDeciced = () => {
    let filteredData = this.state.devices2.filter(obj => obj.listMr&&obj.listMr.length > 0);
    return (
      filteredData.map( item =>{
       return(
        <TouchableOpacity key={item.id} style={[styles.byshebeiStateItem1,this.state.index1===0&&styles.hide]} onPress={() => {
          this.props.navigation.navigate('Maintenancedetails',{ name: item.name, categoryName: item.categoryName, deviceId: item.id, snCode: item.snCode })
        }}>
          <View style={styles.byshebeiItemimg}>
          <Image source={require('../images/sjimg.png')} style={{width:setWidth(140),height:setWidth(90)}} />
          </View>
          <View style={{ marginLeft: setWidth(15), width:setWidth(680),position:'relative' }}>
          <View style={{ flexDirection: "row" ,justifyContent:'space-between'}}>
          <Text style={styles.byrunStateDeviceName}>{item.name}</Text>
          <Text style={[styles.byrunStateComAddText, { marginLeft: setWidth(100) }]}>{item.snCode}</Text>
          <View style={{ width: setWidth(117), alignItems: 'center', justifyContent: 'center',position:'absolute',right:setWidth(-30),top:setWidth(100)}}>
                <Image source={require('../images/jinrhui-01.png')} style={{ width: setWidth(24), height: setWidth(45) }} />
          </View>
          </View>
          {/* 调用逾期设备部件接口  */}
          <ListComponent deviceId={item.id}  index1={this.state.index1}/>
          </View>
        </TouchableOpacity>
   
       )
       
      }
      
      )

    
    )
  }
   /* 扫描二维码 */
   handleScan=()=>{
    this.props.navigation.navigate('Scan',{device:'Salescontent'})
   }
   /* 搜索按钮 */
  //  handleSearch= async(mysncode,groupId)=>{
  //   if(mysncode===''){
  //     alert('设备编号不能为空')
  //   }
  //   try{
  //     // let params={mysncode,groupId}
  //     // let result=await axios.authPost(MaintenanceQueryBySnCode(params)) 
  //     // console.log(result);
  //     let data= await maintenanceQueryBySnCode2(mysncode,groupId)
  //     console.log(data);
  //     // let newData=data.data.data
  //     // if(data.data.message==='ok'){
   
  //     //   if(newData.length>0){
  //     //     console.log(newData);
  //     //     this.setState({
  //     //      devices2:newData
  //     //     })
  //     //     console.log(newData);
  //     //   }elseq{
  //     //     alert('出厂设备编号错误,请重新输入!')
  //     //   }
  //     // }
  //  }
  //  catch(e){
  //   console.log('没有找到该设备',e);
  //  }
  //  }



  handleSearch= async(mysncode,groupId)=>{
    if(mysncode===''){
      alert('设备编号不能为空')
    }
    try{
      let data= await maintenanceQueryBySnCode2(mysncode,groupId)
      let newData=data.data
      console.log(newData);
      if(data.data.message==='ok'){
        if(newData.length>0){
          console.log(newData);
          this.setState({
           devices2:newData
          })
          console.log(newData);
        }else{
          alert('出厂设备编号错误,请重新输入!')
        }
      }
   }
   catch(e){
    console.log('没有找到该设备',e);
   }
   }
   /* 刷新按钮 */
   refresh=()=>{
    store.dispatch({type:'clearCode'})
    this.setState({
      devices2:this.state.devices
    })
   }
  render() {
    let {query,devices2,index1} = this.state
    console.log(devices2);
    console.log(this.props.mysncode);
    console.log(this.state.filteredData);
    return (
      <MyFrame2>
  {/*扫一扫&根据设备标识查询组件*/}
  <QueryByDeviceId handleScan={this.handleScan} handleSearch={(mysncode,groupId)=>{this.handleSearch(mysncode,groupId)}} handleStatus={2}/>
        <View style={styles.bygundongback1}>
          <View style={[styles.byshebeihead1, { flexDirection: 'row', justifyContent: 'flex-start' }]}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={require('../images/sblb-01.png')} style={styles.byshebeimge1} />
            </View>
            <View style={{ width: setWidth(595) }}>
              <Tab
                value={this.state.index1}
                onChange={(e) => this.setState({ index1: e })}
                indicatorStyle={{
                  backgroundColor: 'blue',
                  height: setHeight(4),
                  marginLeft: setWidth(65),
                  width: setWidth(165)
                }}
                variant="primary"
              >
                <Tab.Item
                  title="全部设备"
                  titleStyle={{ fontSize: setText(44), color: '#1D1D38', position: 'absolute', alignItems: 'stretch', paddingHorizontal: 0, paddingVertical: 0 }}
                  buttonStyle={{
                    borderWidth: 0,
                    backgroundColor: '#ffffff',
                    //paddingHorizontal:0,
                    //paddingVertical:0
                    height: setHeight(80)
                  }}
                />
                <Tab.Item
                  title="待保养"
                  titleStyle={{ fontSize: setText(44), color: '#1D1D38', position: 'absolute', paddingHorizontal: 0, paddingVertical: 0, alignItems: 'stretch' }}
                  buttonStyle={{
                    borderWidth: 0,
                    backgroundColor: '#ffffff',
                    //paddingHorizontal:0,
                    //paddingVertical:0
                    height: setHeight(80)
                  }}
                />
              </Tab>
            </View>
            <View style={{ width: setWidth(150) }}></View>
            <TouchableOpacity style={{ width: setWidth(100) }}  onPress={this.refresh}>
              <Image source={require('../images/reload.png')} style={{ width: setWidth(51), height: setWidth(54), marginTop: setWidth(10) }} />
            </TouchableOpacity>

          </View>
          <View style={{width:setWidth(955),height:setWidth(1120)}}>
        <TabView  value={index1} onChange={(e) => this.setState({ index1: e })} animationType='spring'>

           <TabView.Item >
           <SafeAreaView>
          <ScrollView showsVerticalScrollIndicator={false}> 
          {
                    devices2.map(item =>
                      <TouchableOpacity style={styles.byshebeiStateItem1} key={item.id} onPress={() => {
                        item.listMr.length>0?this.props.navigation.navigate('Maintenancedetails', { name: item.name, categoryName: item.categoryName, deviceId: item.id, snCode: item.snCode ,list:item.listMr}):
                        this.props.navigation.navigate('Maintenancedetails2', { name: item.name, categoryName: item.categoryName, deviceId: item.id, snCode: item.snCode })
                      }}>
                        <View style={styles.byshebeiItemimg}><Image source={require('../images/sjimg.png')} style={{width:setWidth(140),height:setWidth(90)}} /></View>
                        <View style={{ marginLeft: setWidth(15), width: setWidth(587) }}>
                          <Text style={styles.byrunStateDeviceName}>{item.name}</Text>
                          <View style={{  borderLeftWidth: setWidth(6), borderLeftColor: '#446bf8',paddingLeft:setWidth(20),borderTopLeftRadius:setWidth(4),borderBottomLeftRadius:setWidth(4) }}>
                            <Text style={[styles.byrunStateComAddText, { marginRight: setWidth(20) }]}>{item.snCode}</Text>
                            <Text style={[styles.byrunStateComAddText, { marginRight: setWidth(20) }]}>{item.categoryName}</Text>
                          </View>
                        </View>
                        <View style={{ width: setWidth(117), alignItems: 'center', justifyContent: 'center' }}>
                          <Image source={require('../images/jinrhui-01.png')} style={{ width: setWidth(24), height: setWidth(45) }} />
                        </View>
                     
                      </TouchableOpacity>
                    )
                  }
         </ScrollView>
         </SafeAreaView>
         </TabView.Item>
          <TabView.Item >
           <SafeAreaView>
          <ScrollView showsVerticalScrollIndicator={false}> 
               {this.state.devices2.filter(obj => obj.listMr&&obj.listMr.length > 0)?this.getDeciced():
                <Text>暂无待保养的设备</Text>
                }
         </ScrollView>
         </SafeAreaView>

         </TabView.Item>
        </TabView>
        </View>
        </View>
      </MyFrame2>
    )
  }
}
const mapStateToprops=(state)=>{
  console.log(state.sncode.mycode);
  return{
    devices: state.devices,
    userinfo: state.user,
    mysncode:state.sncode.mycode
  }
}
export default connect(mapStateToprops,{asyncGetDevices})(Alarm)
/* ------------------------------------------------------------------------- */
//这里是子组件
class ListComponent extends React.PureComponent {
  state={
    list:[]
  }
  componentDidMount(){
    this.Newcomponent()
  }
   /* 逾期时间 */
   getTime=(nowTime,time)=>{
    if (nowTime > time){
      return Math.ceil((nowTime - time)/(1000*60*60*24))
    }else{
      return Math.floor((time - nowTime)/(1000*60*60*24))
    }
  }
   /* 获取 逾期设备部件 */
   Newcomponent= async()=>{
    let params = {
      "deviceId":this.props.deviceId,
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
        this.setState({list:result.data})
        store.dispatch({type:'maintenanceTips',data:result.data})
       }
    }
     catch(e){
      console.log(e);
      store.dispatch({type:'loading',data:false})
     }
    // let data=await maintenanceParts(params)
    // console.log(data.data.data);
    //  let result=data.data.data
    //  this.setState({list:result})
   }
  render() {
    return (

      <View >
        {this.state.list.map(item=>
            <View style={{ flexDirection: 'row', borderLeftWidth: setWidth(6), borderLeftColor: '#446bf8',paddingLeft:setWidth(20),borderBottomLeftRadius:setWidth(4),borderTopLeftRadius:setWidth(4) }} key={item.id}>
            <Text style={styles.byrunStateComAddText}>{item.part_name}</Text>
            <Text style={[styles.byrunStateComAddText, { marginLeft: setWidth(20), color: 'red' }]}>(已经逾期{this.getTime(Date.now(), new Date(item.set_time_format.replace(/-/g,'/')).getTime())}天)</Text>
          </View>
        )}
      </View>
    
    )
  }
}
