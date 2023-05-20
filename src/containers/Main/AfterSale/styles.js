import {StyleSheet} from "react-native"
import {Text, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import {setText,setWidth,setHeight} from "../../../utils/styleAdb";

export default StyleSheet.create({

  deviceListWrap:{
    backgroundColor: '#FFFFFF',
    marginTop:setWidth(40),
    borderRadius:setWidth(30),
    paddingVertical:setWidth(40),
    paddingHorizontal:setWidth(30)
  },
  //设备列表头部 start
  deviceListHeader:{
    paddingHorizontal: setWidth(15),
    marginBottom:setWidth(10)
  },
  headerWrap:{
    flexDirection:'row',
    justifyContent:'space-between',
    borderBottomWidth:setWidth(2),
    borderBottomColor:'#E7E7E9',
    alignItems: 'center',
    paddingBottom:setWidth(5),
  },
  headerLeft:{
    flexDirection: 'row',
    alignItems:'center',

  },
  headerLeftText:{
    marginLeft:setWidth(40),
    fontSize:setText(38),
    fontWeight:'bold',
    color:'#01002C'
  },
  //设备列表头部 end

  //设备列表item start
  itemWrap:{
    paddingHorizontal:setWidth(10),
    paddingVertical: setWidth(20),
    borderColor:'#F8FAFE',
    borderWidth:setWidth(2),
    borderRadius: setWidth(20),
    marginTop: setWidth(25),
    flexDirection:'row',
    alignItems:'center'
  },
  itemLeftWrap:{
    flexDirection:'row',
    position:'relative',
    width: setWidth(166),
    height: setWidth(142),
    marginRight:setWidth(20)
  },
  itemLeftRunState:{
    width:setWidth(41),
    height:setWidth(41),
    position: 'absolute',
    right:0,
    bottom:0
  },

  itemMidWrap:{
    flex:1
  },
  itemMidInWrap:{
    flexDirection:'row',
    alignItems:'center',
    marginTop:setWidth(10)
  },
  verticalLine:{
    width:setWidth(10),
    height:'92%',
    backgroundColor: '#0D58F7',
    borderRadius:setWidth(5),
    marginRight: setWidth(20)
  },
  itemMidIn:{
    flexDirection:'row',
    alignItems:'center',
  },
  itemMidInText:{
    fontSize: setText(34),
    color: '#8F9096',
    marginRight:setWidth(20)
  },
  itemMidInTextValue:{
    fontSize: setText(34),
    color: '#8F9096',
  }


  /* --------------------------------------- */
  // container1: {
  //   flex: 1,
    
  //   //paddingTop: StatusBar.currentHeight,
  // },
  // sousuobg:{
  //   width:setWidth(986),
  //   height:setHeight(95),
  //   marginLeft:setWidth(47),
  //   marginTop:setWidth(232),
  //   flexDirection:'row'
    
  // },
  // sousuobutton1:{
  //   width:setWidth(90),
  //   height:setHeight(87),
  //   borderRadius:setWidth(18),
  //   borderWidth:setWidth(1),
  //   borderColor:'#ffffff',
  //   backgroundColor: '#ffffff',
    
  //   alignItems:'center',
  // },
  // icon1:{
  //   width:setWidth(48),
  //   height:setWidth(45),
  //   marginLeft: setWidth(18),
  //   marginRight: setWidth(18),
  //   marginTop:setWidth(12)
  // },
  // verticalLine1:{
  //   width:setWidth(793),
  //   height:setHeight(87),
  //   borderRadius:setWidth(18),
    
  //   backgroundColor: '#f8f5f5',
  //   marginLeft:setWidth(32),
  //   alignItems:'center',
    
  // },
  // sousuobt:{
  //   width:setWidth(90),
  //   height:setHeight(87),
  //   borderRadius:setWidth(18),
  //   borderWidth:setWidth(1),
  //   borderColor:'#ffffff',
  //   backgroundColor: '#ffffff',
    
  //   marginLeft:setWidth(-30),
  //   zIndex:1,
  //   alignItems:'center',
  // },
  // sousuoTxt:{
  //   marginTop:setWidth(14),
  //   textAlign: 'center',
  //   color:'#555e68',
  //   fontSize:setText(35),
  //   color:'#446bf8',
  //   fontWeight:'bold',
    
  // },
  // gundongback1:{
  //   width:setWidth(986),
  //   height:setHeight(1380),
    
  //   borderTopEndRadius:setWidth(38),
  //   borderTopStartRadius:setWidth(38),
  //   backgroundColor: '#ffffff',
  //   marginLeft:setWidth(47),
  //   marginTop:setWidth(48),
    
  // },
  // shebeihead1:{
  //   width:setWidth(888),
  //   height:setHeight(84),
  //   borderBottomWidth:setWidth(2),
  //   marginLeft:setWidth(49),
  //   flexDirection: 'row',
  //   marginTop:setWidth(48),
  //   opacity:1,
    
  // },
  // shebeimge1:{

  //   width:setWidth(51),
    
  //   height:setWidth(71),
  //   marginLeft:0,
  //   marginTop:setWidth(0),   
    
  // },
  // shebeTxt1:{
  //   fontSize:setText(45),
  //   fontWeight:'bold',
  //   marginLeft:setWidth(35),
  //   marginTop:setWidth(20),  
  // },
  //   //设备刷新按钮
  //   shebeiReload1:{

  //     marginTop:setWidth(10),
  //     width:setWidth(51),
  //     height:setWidth(54),
  //   },
  //   scrollView1: {
  //     marginHorizontal: 20,
  //   },
  //   text1: {
  //     fontSize: 42,
  //   },
  //   shebeiStateItem1:{
  //     height:setHeight(161),
  //     //height:setWidth(161),
  //     backgroundColor:'#F4F8FF',
  //     marginTop:setWidth(30),
  //     marginBottom: setWidth(10),
  //     flexDirection:'row',
  //     alignItems:'center'
  //   },
  //   shebeiItemimg:{
  //     width:setWidth(184),
  //     height:setHeight(161),
  //     marginLeft:setWidth(0),
  //     backgroundColor:'#F4F8FF',
  //   },
  //   runStateImg:{
  //     width:setWidth(131),
  //     height:setWidth(131),
  //     marginLeft:setWidth(38),
  //     marginRight:setWidth(20)
  //   },
  //   runStateDeviceName:{
  //     fontSize:setText(38),
  //     fontWeight: '600',
  //     color:'#1D1D38'
  //   },
  //   runStateComAddText:{
  //     fontSize:setText(30),
  //     color:'#989A9C'
  //   }
})
