import React,{useEffect} from "react";
import { View, Text,Alert,TextInput } from "react-native";
import { Button } from '@rneui/themed';
import {ImageBackground, Image,  SafeAreaView,ScrollView, Platform } from "react-native";

import {StyleSheet, TouchableOpacity} from 'react-native';
import { setWidth, setText, setHeight } from "../../../../utils/styleAdb";
import {Tab,Input,TabView} from '@rneui/themed';

import MyFrameWork from "../../../../components/MyFrameWork";
import styles from "./styles";
import { Colors } from "react-native/Libraries/NewAppScreen";
import MyFrame from '../../../../components/MyFrame'
import {MaintenanceBathUpdate,maintenanceBathUpdate} from '../../../../api/requestPath'
import axios from "../../../../api";
import {store} from '../../../../redux/store'
function Index(props) {
  const [index1, setIndex] = React.useState(0);
  const [value, onChangeText] = React.useState('');
  let{deviceId,part_id,part_name,id,nextTime,set_time,name,snCode,remind}=props.route.params/*  /*设备id,部件id,部件名,id,下次保养事件,保养时间   */
    console.log(remind);
     /* 保养逾期或保养预期 */
     const getTime=(nowTime,time)=>{
      if (nowTime > time){
        return Math.ceil((nowTime - time)/(1000*60*60*24))
      }else{
        return Math.floor((time - nowTime)/(1000*60*60*24))
      }
    }
     useEffect(() => {
       return ()=>{
        store.dispatch({type:'loading',data:false})
       }
     }, [])
    /* 完成保养按钮 */
    const Complete= async()=>{
      let params = {
        deviceId:deviceId,
        partIds:part_id,
        setTimes:nextTime,
        ids:id,
        reminds:remind,
        remark:value
      }
      try{
        store.dispatch({type:'loading',data:true})
        let result=await maintenanceBathUpdate(params)
        console.log(result);
        if(result.data.message==='ok'){
          store.dispatch({type:'loading',data:false})
          props.navigation.goBack();
        }
      }
      catch(e){
        console.log('保养完成失败',e);
        store.dispatch({type:'loading',data:false})
      }
    }
  return (
    <MyFrame style={{flex:1}}>
      <View style={styles.wrap}>
        {/* 顶部图片 */}
        <View style={{flexDirection:'row',width:'100%',justifyContent:'flex-start',marginTop:setWidth(96)}}>
          <View style={styles.baoyangItemimg}>
              <Image source={require('../../images/sj-01.png') } style={{width:setWidth(130),height:setWidth(110)}} />                      
          </View>
          <View style={{marginLeft:setWidth(26),marginTop:setWidth(83),width:setWidth(405),height:setWidth(161)}}>
              <Text style={styles.runStateDeviceName}>{name}</Text>
              <View style={{flexDirection:'row',borderLeftWidth:setWidth(6),borderLeftColor:'#446bf8'}}>
                  <Text style={[styles.byrunStateComAddText,{marginLeft:setWidth(20)}]}>{snCode}</Text>
              </View>
          </View>
        </View>
        {/* 内容输入部分 */}
        <View style={{width:'100%',alignItems:'center'}}>
          <View style={styles.baoyangnyview}>            
             <ImageBackground source={require('./images/sbbybj-01.png')} style={{width:setWidth(888),height:setWidth(140),marginTop:setWidth(36)}}>
              <View style={{flexDirection:"row",marginLeft:setWidth(56),marginTop:setWidth(25)}}>
                <Text style={styles.byrunStateComAddText}>{Date.now()>Date.parse(set_time)?`您的保养已经逾期`:'距离保养还有'}</Text>
                <Text style={{fontSize:setText(32),fontWeight:'600',color:'blue'}}>{getTime(Date.now(),Date.parse(set_time))}</Text>
                <Text style={styles.byrunStateComAddText} >天</Text>
              </View>
               <Text style={[styles.byrunStateComAddText,{marginLeft:setWidth(56),marginTop:setWidth(5)}]}>如已保养，请填写保养内容并点击保养完成按钮</Text>
             </ImageBackground>
             <View style={styles.baoyanginstertop}>
              <Image source={require('../Maintenancedetails/images/zhouchengzuo-01.png')} style={{width:setWidth(75),height:setWidth(54)}} />
              <Text style={[styles.runStateDeviceName,{marginLeft:setWidth(12),marginTop:setWidth(10)}]}>{part_name}</Text>
             </View>
             <View style={{flexDirection:'row',borderLeftWidth:setWidth(6),borderLeftColor:'#446bf8',alignItems:'flex-start',width:setWidth(888),marginTop:setWidth(15)}}>
                  <Text style={[styles.byrunStateComAddText,{marginLeft:setWidth(20)}]}>备注：</Text>
                  <Text style={{fontSize:setText(32),fontWeight:'600',color:'#d7d7db'}}>(选填)</Text>
            </View>
            {/* <View style={styles.baoyanginsert}>
            </View> */}
            <TextInput
                  editable
                  multiline            
                  numberOfLines={5}
                  maxLength={200}
                  textAlignVertical="top" 
                  onChangeText={text => onChangeText(text)}
                  value={value}         
                  style={{width:setWidth(888),height:setWidth(193),marginTop:setWidth(5),padding:0}}
                  placeholder="请输入内容"
                />
          </View>
          <Button
                  title="保养完成"
                  titleStyle={{fontSize:setText(48)}}
                  onPress={Complete}  
                  buttonStyle={{
                    backgroundColor: 'rgba(78, 116, 289, 1)',                    
                    paddingHorizontal:0,
                    paddingVertical:5,
                    borderRadius: 50,
                  }}
                  containerStyle={{
                    width:setWidth(988),
                    //height:(194),
                    marginTop:setWidth(47)
                  }}
                />
        </View>       
      </View>
   
    </MyFrame>
  );
}

export default Index;
