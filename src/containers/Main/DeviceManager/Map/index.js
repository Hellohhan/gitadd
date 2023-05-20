import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ImageBackground, Image, TouchableOpacity, SafeAreaView, ScrollView, Platform ,View, Text, Alert, Dimensions,ToastAndroid} from "react-native";
import svg from "../../../../assets/svg/svg";
import { SvgXml } from "react-native-svg";
import {store} from '../../../../redux/store'
import { connect } from "react-redux";
import MyFrame from '../../../../components/MyFrame'
import styles from './style'
import { setHeight, setText, setWidth } from "../../../../utils/styleAdb";
import {GetDevicePointsBysnCode,getDevicePointsBysnCode} from '../../../../api/requestPath'

import axios from "../../../../api";
import {
  AMap,
  MapView,
  Polyline,
  Polygon,
  MapType,
  AMapSdk,
  Marker
} from 'react-native-amap3d';
function index(props) {
const [CurrentTime, setCurrentTime] = useState('')//当期时间
const [longitude, setlongitude] = useState(0)//经度
 const [latitude,setlatitude ] = useState(0)//纬度
const [address, setaddress] = useState('')//地址
const [temperature, settemperature] = useState('')//温度
const [humidity, sethumidity] = useState('')//湿度
const [isShow, setisShow] = useState(false)

// const longitudeV=useRef(0)
// const latitudeV=useRef(0)
let longitudeV=0
let latitudeV=0
console.log(props);
let{deviceId,deviceName,snCode}=props.route.params
useEffect( () => {
  displayCurrentTime()//当前时间
  getLongLatitude()//获取经纬度
  // Weather()//获取天气
  
}, [])
useLayoutEffect(() => {
  // MapView.destroy();
  AMapSdk.init(
    Platform.select({
      android: '886f3cb90a771cfdba361ea115374aa3',
      ios: '886f3cb90a771cfdba361ea115374aa3',
    }),
  );
  return () => {
    props.dispatch({type:'loading',data:false})
  };
}, [])
;
  //当前时间
  const displayCurrentTime=()=> {
    setInterval(() => {
      const current_time = new Date();
      const year = current_time.getFullYear();
      const month = ('0' + (current_time.getMonth() + 1)).slice(-2);
      const day = ('0' + current_time.getDate()).slice(-2);
      const hour = ('0' + current_time.getHours()).slice(-2);
      const minute = ('0' + current_time.getMinutes()).slice(-2);
      const second = ('0' + current_time.getSeconds()).slice(-2);
      const formatted_time = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
       setCurrentTime(formatted_time)
    }, 1000);
  }
      //根据设备id获取经纬度
   const getLongLatitude=async ()=>{
    var value = {
      "jsonEntity":{
        "snCode":snCode
      }
    }
     try{
    let result=await getDevicePointsBysnCode(value)
     console.log(result);
      store.dispatch({type:'loading',data:true})
      if(result.data.message==='ok'){
       setTimeout(() => {
        setisShow(true)
     store.dispatch({type:'loading',data:false})
       }, 60);
     
      let NewData=result.data.data.records[0].jsonEntity
      //  let longitudes=Number(NewData.longitude)
      //  let latitudes=Number(NewData.longitude)
       let longitudes =Number(NewData.longitude);
       let latitudes=Number(NewData.latitude)
       let data={longitude:longitudes,latitude:latitudes}
       longitudeV=longitudes
       latitudeV=latitudes
      props.dispatch({type:'getposition',data})
       await setlongitude(longitudes)//经度
       await setlatitude(latitudes)//纬度
       await setaddress(NewData.province+NewData.city)//地址
       let newlongitude=NewData.longitude
       let newlatitude=NewData.latitude
       console.log(newlongitude);
       console.log(newlatitude);
         axios.get(`http://192.168.0.15:8400/manager/weather/info?jd=${newlongitude}&wd=${newlatitude}`)
        .then(res=>{
          if(res.message==='ok'){
            store.dispatch({type:'loading',data:false})
            let result=res.data
            settemperature(result.weatherInfo.lives[0].temperature)
            sethumidity(result.weatherInfo.lives[0].temperature_float)
          }
        })
     }
     }
     catch(e){
      console.log(e);
     }
    }
     //--------------------------------------------//
     //地图
     const maps=()=>{
      return(
        <MapView
      mapType={MapType.Satellite}
      
    initialCameraPosition={{
        target: {
          latitude:props.mapPosition.latitude,
          longitude:props.mapPosition.longitude
          // latitude:latitude,
          // longitude:longitude
        },
        //onLayout:{onMapLayout},
        zoom: 8,
      }}
 
     >
    <Marker
      position={{ latitude:props.mapPosition.latitude, longitude:props.mapPosition.longitude}}
    >
      <Image
        source={require("../../images/position.png")}
        style={{ width: 50, height: 50 }}
      />
    </Marker>
    </MapView> 
      )
     }
     //返回
     const Goback=()=>{
      props.navigation.goBack()
     }
  return (
    <View style={styles.bgcWraper}>
   <View style={styles.titleWraper}>
          <TouchableOpacity onPress={Goback} style={styles.SvgWraper}>
            <SvgXml xml={svg.goBack} style={styles.Svg}
              fill={"black"}>
            </SvgXml>
          </TouchableOpacity>
          <View style={styles.box}>
            <Text style={styles.title}>设备地图</Text></View>
        </View>
      {isShow&&maps()}  
     <ImageBackground style={styles.infoWraper} source={require('../../images/dbbg-01.png')}>
        <View style={styles.topWraper}>
        <View style={styles.topLeft}>
      <View style={{flexDirection:'row'}}>
      <Text style={{color:'black',fontSize:setText(35)}}>{deviceName}</Text>
        <Image source={require('../../images/runing-02.png')} style={{width:setWidth(40),height:setHeight(40),marginTop:setWidth(5),marginLeft:setWidth(20)}}/>
      </View>
      <Text style={styles.topText}>{snCode}</Text>
       </View>
        <View style={{alignSelf:'center'}}>
          <Text style={styles.topText}>时间 :{CurrentTime}</Text>
        </View>
        </View>
        <View style={[styles.topWraper,{marginTop:setWidth(60)}]}>
          <View style={styles.bottomWrapers}>
            <Text style={{color:'black',fontSize:setWidth(30)}}>{temperature}℃</Text>
            <Text style={styles.topText}>温度</Text>
          </View>
          <View style={styles.bottomWrapers}>
            <Text  style={{color:'black',fontSize:setWidth(30)}}>{humidity}%</Text>
            <Text style={styles.topText}>湿度</Text>
          </View>


          <View style={styles.bottomWrapers}>
            <Text  style={{color:'black',fontSize:setWidth(30)}}>{longitude+"/"+latitude}</Text>
            <Text style={styles.topText}>位置</Text>
          </View>
          <View style={styles.bottomWrapers}>
            <Text style={{color:'black',fontSize:setWidth(30)}}>{address}</Text>
            <Text style={styles.topText}>地址</Text>
          </View>
        </View>
        
     </ImageBackground>
    
    </View>
  )
}
const mapStateToProps=(state)=>{
  return{
    userInfo:state.user,
    mapPosition:state.mapPosition.position
  }
}
export default connect (mapStateToProps,null)(index)