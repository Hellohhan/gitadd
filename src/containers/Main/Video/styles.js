import {StyleSheet,Dimensions} from "react-native"
import {setWidth, setText, setHeight} from "../../../utils/styleAdb";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#D7EEFE'
  },
  bgImg1:
  {
    width:'100%',
    resizeMode:'center',
    height:setWidth(903),
    alignItems:'center'
    
  },
  bigbg:
    {width:setWidth(1010),
      height:setWidth(990),
      marginLeft:setWidth(35),
      marginTop:setWidth(231),
      borderRadius:setWidth(35),
      opacity:1,
      alignItems:"center",
      backgroundColor:"#ffffff"
   },
   palybg:
   {
    width:setWidth(1010),
    height:setWidth(567),
    marginTop:setWidth(26),
    backgroundColor:"black"
  },
  palyanbg: {
    width:setWidth(1010),
    height:setWidth(95),
    marginTop:setWidth(473),
    backgroundColor:'#003567',
    opacity:0.5,
    justifyContent:"center",
    flexDirection:"row",
    justifyContent:'space-between'
},
jietuimg: {
  width:setWidth(71),
  height:setWidth(57),
  marginLeft:setWidth(60),
  marginTop:setWidth(17)
},
yunGximg: {
  width:setWidth(71),
  height:setWidth(59),
  marginLeft:setWidth(202),
  marginTop:setWidth(18)
},
playimg: {
  width:setWidth(73),
  height:setWidth(51),
  marginLeft:setWidth(202),
  marginTop:setWidth(23)
},
quanpimg: {
  width:setWidth(61),
  height:setWidth(61),
  marginLeft:setWidth(202),
  marginTop:setWidth(13),
  marginRight:setWidth(60)
},
bgimg2: {
  width:setWidth(1009),
  height:setWidth(398),
  alignItems:'center'
},

playdbtxt:{
  width:setWidth(892),
  height:setWidth(242), 
  marginTop:setWidth(70),
},
playsjTxt:{
  height:setWidth(69),
  borderBottomWidth:setWidth(1),
  borderBottomColor:'#ced1db',
  flexDirection:"row",
  justifyContent:'space-between'
},
sjnanmetx:{
  fontSize:setText(50),
  fontWeight: '600',
  color:'#1D1D38',
  marginLeft:setWidth(20)
},
ydwttxt:{
  fontSize:setText(38),
  fontWeight: '450',
  color:'#446bf8'
},
videobh:{
  height:setWidth(371),
  width:setWidth(892),
  marginTop:setWidth(62)
},
videobhtxt:{
  
  height:setWidth(63),
  borderBottomWidth:setWidth(2),
  borderBottomColor:'#ced1db',
  flexDirection:'row'
},
video: {
  width: '100%',
  height: "100%",
},
fullscreenVideo: {
  width: '100%',
  height: '100%',
},
  //数据选择下拉
  buttonStyle:{
    width:setWidth(300),
    height:setHeight(55),
    // borderRadius:setWidth(45),
    backgroundColor:'white',
    elevation:setWidth(3),
    shadowColor:'#315CF7',
    shadowOffset:{width:0,height:0},
    shadowOpacity:setWidth(1),
    shadowRadius: setWidth(2.5),
    // marginRight:setWidth(44),
},
//文字样式
buttonTextStyle:{
  fontSize:setWidth(20)
},
//下拉菜单
dropdown: {
  maxHeight:setWidth(600),
  backgroundColor: '#fafafa',
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 8,
  fontSize:setText(30),
  elevation:setWidth(3),
  shadowColor:'#315CF7',
  shadowOffset:{width:0,height:0},
  shadowOpacity:setWidth(1),
  shadowRadius: setWidth(2.5),
},
//下拉菜单字体大小控制
dropdownText:{
  fontSize:setWidth(10),
  color:'red'
},
//loading 的边框
LoadingWraper:{
 position:'absolute',
 top:'50%',
 left:'50%',
 marginLeft:setWidth(-30),
 marginTop:setWidth(-35)
},
//中间信息盒子
middleWraper:{
marginTop:setWidth(20),
justifyContent:'space-evenly'
},
//中间信息部分
runStateComAddText:{
fontSize:setText(40),
color:'black'
}
})
