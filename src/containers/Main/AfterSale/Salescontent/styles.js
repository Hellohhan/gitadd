import {StyleSheet,Dimensions} from "react-native"
import {Text, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import {setText,setWidth,setHeight} from "../../../../utils/styleAdb";

export default StyleSheet.create({
 //头部背景图
 titleWraperBox:{
  position:'absolute',
  zIndex:1,
  width:Dimensions.get('window').width,
  height:setHeight(360),
  // borderWidth:1,
  borderBottomLeftRadius: setWidth(150), 
  borderBottomRightRadius: setWidth(150),
  paddingHorizontal:setWidth(30)
},

titleWraper:{
  flexDirection:'row',
  marginTop:setWidth(120),
  marginBottom:setWidth(44),
  justifyContent:'center'
},
//title的 盒子
box:{
 width:Dimensions.get('window').width,
 alignItems:'center',
},
title:{
  fontWeight: "600",
  fontSize: setText(50),
  color:'#fff'
},
//SVG
Svg:{
width:setWidth(40), 
height:setWidth(60),
},
SvgWraper:{
  position:'absolute',
  top:0,
  left:setWidth(0),
  width:setWidth(140)
},
 //tabview页
 bodyWraper:{
  width:setWidth(950),
  height:setWidth(850),
   backgroundColor:'#ffffff',
   borderTopStartRadius:setWidth(50),
   borderTopEndRadius:setWidth(50),
   paddingTop:setWidth(40),
   marginTop:setWidth(20),
   paddingBottom:setWidth(40),
   alignItems:'center'
 },
 






    container1: {
      flex: 1,
      
      paddingTop: StatusBar.currentHeight,
    },

    shtbimg: {

        width:setWidth(1079),
        height:setHeight(365),

    },
    xqimg: {
        width:setWidth(964),
        height:setWidth(231),
        marginLeft:'auto',
        marginRight:'auto',
  
        flexDirection:'row',
        marginBottom:setWidth(50)
      },
    shebeiItemimg:{
        width:setWidth(161),
        height:setWidth(161),
        marginLeft:setWidth(36),
        marginTop:setWidth(36),
        borderRadius:setWidth(20),
        backgroundColor:'#F4F8FF',
        alignItems:'center',
        justifyContent:'center'
      },
      runStateImg:{
        width:setWidth(131),
        height:setWidth(131),
        marginLeft:setWidth(38),
        marginRight:setWidth(20)
      },
      runStateDeviceName:{
        fontSize:setText(38),
        fontWeight: '600',
        color:'#1D1D38'
      },
      runStateComAddText:{
        marginLeft:setWidth(23),
        fontSize:setText(30),
        color:'#373849'
      },
      baoyangxqTxt:{
        fontSize:setText(38),
        fontWeight: '600',
        color:'#446bf8'
      },
      baoyangxqbt:{
        width:setWidth(199),
        height:setHeight(60),
        marginLeft:setWidth(88),
        marginTop:setHeight(106)
      },
      baoyangjrimg:{
        width:setWidth(24),
        height:setWidth(45),
        marginLeft:setWidth(21)
      },
      tabviewback: {

        width:setWidth(950),
        height:setWidth(3000),
        marginLeft:setWidth(63),
        marginTop:setWidth(49),
        
      },
      container2: {
        flex: 1,
       // paddingTop: StatusBar.currentHeight,
      },
      scrollView2: {
       marginHorizontal: 25,
       
       // marginRight:setWidth(20)
      },
      text1: {
        fontSize: 42,
      },
      runStateDeviceName1:{
        fontSize:setText(38),
        fontWeight: '600',
        color:'#1D1D38',
        textAlignVertical:'center'
      },
      shoucelbbk:{
        width:setWidth(820),
        height:setWidth(80),
        borderBottomWidth:0.5,
        flexDirection:'row',
        justifyContent:'space-between',
        borderColor:'#d4d4d5',
      },
      xzckbut:{
        backgroundColor:'#dae1fe',
        // width:setWidth(202),
        alignItems:'center',
        justifyContent:'center',
        height:setWidth(43),
        // marginRight:setWidth(42),
        borderRadius:setWidth(20),
        marginTop:setWidth(15),
        paddingHorizontal:setWidth(30),
      },

      //TabView盒子
      TabView:{
        width:setWidth(920),
        height:setWidth(850),
        marginBottom:setHeight(1),
        paddingTop:setWidth(30),
         paddingBottom:setWidth(10), 
         backgroundColor:'#fff',
         borderTopStartRadius:setWidth(50),
         borderTopEndRadius:setWidth(50),
         alignItems:'center',}
})