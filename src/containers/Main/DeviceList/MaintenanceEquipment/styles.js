import {StyleSheet} from "react-native"
import {Text, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import {setText,setWidth,setHeight} from "../../../../utils/styleAdb";

export default StyleSheet.create({
  wrap:{
    flex:1,
  },
  
  baoyangItemimg:{

    width:setWidth(161),
    height:setWidth(161),
    marginLeft:setWidth(93),
    marginTop:setWidth(46),
    borderRadius:setWidth(20),
    backgroundColor:'#ffffff',
    alignItems:'center',
    justifyContent:'center'
  },
  runStateDeviceName:{
    fontSize:setText(38),
    fontWeight: '600',
    color:'#1D1D38'
  },
  
  
  byrunStateComAddText:{
    //marginLeft:setWidth(20),    
    fontSize:setText(32),
    fontWeight: '600',
    color:'black'
  },
  baoyangnyview:{
    width:setWidth(988),
    height:setWidth(586),
    backgroundColor:'#ffffff',
    borderRadius:setWidth(50),
    marginTop:setWidth(37),
    alignItems:'center'
  },
  baoyanginstertop:{
    width:setWidth(888),
    height:setWidth(81),
    borderBottomWidth:setWidth(2),
    borderBottomColor:'#d7d7db',
    //justifyContent:'center',
    flexDirection:'row',
    alignItems:'flex-start',
    marginTop:setWidth(38),
  },
    baoyanginsert:{
      width:setWidth(888),
      height:setWidth(193),
      borderWidth:setWidth(0.5),
      borderColor:'black',
      marginTop:setWidth(5),
     
      
  }


});
