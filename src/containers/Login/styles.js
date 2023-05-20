import {StyleSheet} from 'react-native'

import { setWidth, setText, setHeight } from "../../utils/styleAdb";

export default StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#ffffff'
  },
  logo:{
    width:setWidth(640),
    height:setWidth(272),//
    resizeMode:'center',
    marginTop:setHeight(200),
    marginLeft:setWidth(43),
    marginBottom:setHeight(20),
  },
  lineWrap:{
    flexDirection:'row',
    alignItems:'center'
  },
  line:{
    width: setWidth(260),
    height: setWidth(20),
    resizeMode: 'center',
    marginRight:setWidth(25)
  },
  lineRightText:{
    color: '#656565',
    fontSize:setText(40),
    fontStyle:'italic'
  },
  //中间登录部分
  contentWrap:{
    marginTop: setHeight(150),
    marginBottom: setHeight(250),
    alignItems:'center'
  },
  loginWrap:{
    width:setWidth(745),
    height:setHeight(125),
    borderRadius:setWidth(30),
    borderWidth:setWidth(1),
    borderColor:'#B5B5B5',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon:{
    width:setWidth(26),
    height:setWidth(36),
    marginLeft: setWidth(44),
    marginRight: setWidth(25)
  },
  verticalLine:{
    width:setWidth(1),
    height:setHeight(80),
    backgroundColor: '#B1B1B1'
  },
  inputStyle:{
    flexGrow:1,
    flexShrink:1,
    height:'100%',
  },
  loginButtonWrap:{
    marginTop:setHeight(55),
    width:setWidth(800),
    height:setHeight(158),
    resizeMode:'stretch',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  loginButtonText:{
    fontSize: setText(45),
    color:'#8A0002'
  },
  forgetPassword:{
    color:'#9D9D9E',
    fontSize:setText(35),
    marginTop:setHeight(36)
  },
  bottomLine:{
    backgroundColor:'#D3D3D3',
    height:setWidth(1)
  },
  bottomText:{
    marginTop:setWidth(25),
    textAlign: 'center',
    color:'#9C9C9D'
  },
 //环信自带的ui
 titleContainer: {
  height: 60,
  backgroundColor: '#6200ED',
},
title: {
  lineHeight: 60,
  paddingLeft: 15,
  color: '#fff',
  fontSize: 20,
  fontWeight: '700',
},
inputCon: {
  marginLeft: '5%',
  width: '90%',
  height: 60,
  paddingBottom: 6,
  borderBottomWidth: 1,
  borderBottomColor: '#ccc',
},
inputBox: {
  marginTop: 15,
  width: '100%',
  fontSize: 14,
  fontWeight: 'bold',
},
buttonCon: {
  marginLeft: '2%',
  width: '96%',
  flexDirection: 'row',
  marginTop: 20,
  height: 26,
  justifyContent: 'space-around',
  alignItems: 'center',
},
eachBtn: {
  height: 40,
  width: '28%',
  lineHeight: 40,
  textAlign: 'center',
  color: '#fff',
  fontSize: 16,
  backgroundColor: '#6200ED',
  borderRadius: 5,
},
btn2: {
  height: 40,
  width: '45%',
  lineHeight: 40,
  textAlign: 'center',
  color: '#fff',
  fontSize: 16,
  backgroundColor: '#6200ED',
  borderRadius: 5,
},
logText: {
  padding: 10,
  marginTop: 10,
  color: '#ccc',
  fontSize: 14,
  lineHeight: 20,
},
})
