 
 import { StyleSheet, Dimensions } from "react-native";
 import { setWidth, setText } from "../../utils/styleAdb";
 export default StyleSheet.create({
 //底部菜单
 footer:{
    paddingHorizontal:setWidth(46),
    flexDirection:'row',
    marginTop:setWidth(38)
 },
 //菜单的内容盒子
  footerText:{
    // borderWidth:1,
    flex:1,
    flexDirection:'row',
    position:'relative',
 
  },
  //底部新消息提示
  footerTip:{
    position: 'absolute',
    top: setWidth(-10),
    right: setWidth(70),
    width: setWidth(20),
    height: setWidth(20),
    borderRadius: setWidth(10),
    backgroundColor: '#DB2617'
  }
 })
