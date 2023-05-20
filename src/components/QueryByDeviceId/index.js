/*
* 通过扫一扫或者输入设备号进行查询组件
* */
import React from "react";
import { Image, Text, TouchableOpacity, View,TouchableWithoutFeedback,Keyboard } from "react-native";
import { Input } from '@rneui/themed';

import { setText, setWidth } from "../../utils/styleAdb";
import styles from "./styles";
import { connect } from "react-redux";

 function Scnode ({handleSearch,handleScan,mysncode,dispatch,handleStatus,user}) {
  console.log(mysncode);
  const Processing=()=>{
    switch(handleStatus){
     case 1:
    let params = {
      "jsonEntity":{
        "snCode":mysncode
      },
      "token":user.token
    }
    return(handleSearch(params))
    case 2://保养查询
      return(handleSearch(mysncode,user.groupId))
    }
  }
  return(
    <View style={styles.wrap}>
      <TouchableOpacity style={styles.scanBtn} onPress={handleScan}>
        <Image source={require('./images/scan.png')} style={{width:setWidth(47),height:setWidth(47)}}/>
      </TouchableOpacity>

      <View style={styles.inputSearchWrap}>
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
        <Input
          onChangeText={(e)=>{dispatch({type:'changecode',payload:e})}}
          value={mysncode}
          containerStyle={styles.inputWrap}
          inputContainerStyle={{height:'100%',borderBottomWidth:0}}
          placeholderTextColor='#B9B9BF'
          inputStyle={{fontSize:setText(34),marginTop:setWidth(5)}}
          placeholder='输入待查询的设备编号'
          onSubmitEditing={Processing}
          returnKeyType='search'
        />
        {/* </TouchableWithoutFeedback> */}
        <TouchableOpacity style={styles.searchBtn} onPress={Processing}>
          <Text style={styles.searchText}>搜索</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
} 
const mapStateToprops=(state)=>{
  console.log(state.sncode.mycode);
 return{
  mysncode:state.sncode.mycode,
  user:state.user
 }
}
export default connect (mapStateToprops,null)(Scnode)

