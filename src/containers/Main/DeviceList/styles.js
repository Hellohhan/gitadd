import {StyleSheet} from "react-native"
import {Text, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import {setText,setWidth,setHeight} from "../../../utils/styleAdb";

export default StyleSheet.create({
  wrap:{
    flex:1,
    backgroundColor: "#dee8f1",
    paddingHorizontal:setWidth(20),
    paddingVertical:setWidth(37)
  },
  bycontainer1: {
    flex: 1,
    paddingLeft:setWidth(30)
    //paddingTop: StatusBar.currentHeight,
  },
  bysousuobg:{
    width:setWidth(986),
    height:setHeight(95),
    marginLeft: 'auto', 
    marginRight: 'auto',
    marginTop:setWidth(232),
    flexDirection:'row',
  },
  bysousuobutton1:{
    width:setWidth(90),
    height:setHeight(87),
    borderRadius:setWidth(18),
    borderWidth:setWidth(1),
    borderColor:'#ffffff',
    backgroundColor: '#ffffff',
    
    alignItems:'center',
    justifyContent:'center'
  },
  byicon1:{
    width:setWidth(47),
    height:setHeight(47),
  },

  byverticalLine1:{
    width:setWidth(793),
    height:setHeight(87),
    borderRadius:setWidth(18),
    
    backgroundColor: '#f8f5f5',
    marginLeft:setWidth(32),
    alignItems:'center',
    
  },
  bysousuobt:{
    width:setWidth(90),
    height:setHeight(87),
    borderRadius:setWidth(18),
    borderWidth:setWidth(1),
    borderColor:'#ffffff',
    backgroundColor: '#ffffff',
    
    marginLeft:setWidth(-30),
    zIndex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  bysousuoTxt:{
    
    textAlign: 'center',
    color:'#555e68',
    fontSize:setText(35),
    color:'#446bf8',
    fontWeight:'bold',
    
  },
  bygundongback1:{
    width:setWidth(955),
    // height:setHeight(1380),
    borderTopEndRadius:setWidth(38),
    borderTopStartRadius:setWidth(38),
    backgroundColor: '#ffffff',
    // marginLeft: 'auto', 
    // marginRight: 'auto',
    marginTop:setWidth(48),

  },
  byshebeihead1:{
    width:setWidth(888),
    height:setHeight(84),
    paddingHorizontal:setWidth(40),
    // marginLeft:setWidth(49),
    flexDirection: 'row',
    marginTop:setWidth(48),
    opacity:1,
  },
  byshebeimge1:{

    width:setWidth(51),
    height:setWidth(71),
    marginLeft:0,
    marginTop:setWidth(0),   
    
  },
  byshebeTxt1:{
    fontSize:setText(45),
    fontWeight:'bold',
    marginLeft:setWidth(35),
    marginTop:setWidth(20),  
  },
  byshebeiReload1:{
    marginTop:setWidth(20),
    marginRight:setWidth(2),
    width:setWidth(55),
    height:setHeight(59),
   
  },
  byscrollView1: {
    marginHorizontal: setWidth(40),
    width:setWidth(986),
    borderWidth:1
  },
  byshebeiStateItem1:{
    // height:setHeight(161),
    // backgroundColor:'#F4F8FF',
    marginTop:setWidth(30),
    marginBottom: setWidth(20),
    flexDirection:'row',
    alignItems:'center',
  },
  byshebeiItemimg:{
    width:setWidth(184),
    height:setHeight(161),
    marginLeft:setWidth(0),
    // backgroundColor:'#F4F8FF',
    alignItems:'center',
    justifyContent:'center',
  },
  byrunStateImg:{
    width:setWidth(131),
    height:setWidth(131),
    marginLeft:setWidth(38),
    marginRight:setWidth(20)
  },
  byrunStateDeviceName:{
    fontSize:setText(38),
    fontWeight: '600',
    color:'#1D1D38'
  },
  byrunStateComAddText:{
    fontSize:setText(30),
    color:'#989A9C'
  },

        //TabView盒子
        TabView:{
          width:setWidth(955),
          height:setWidth(1120),
          marginBottom:setHeight(1),
          paddingTop:setWidth(30),
           paddingBottom:setWidth(10), 
           backgroundColor:'#fff',
           borderTopStartRadius:setWidth(50),
           borderTopEndRadius:setWidth(50),
           
          },
          //隐藏待保养
          hide:{
            display:'none'
          }
})
