import {StyleSheet} from "react-native"
import {Text, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import {setText,setWidth,setHeight} from "../../../../utils/styleAdb";

export default StyleSheet.create({
  wrap:{
    flex:1,
  },
  lishijilubt:{
    fontSize:setText(38),
    fontWeight: '600',
    color:'blue'
  },

  baoyangjltabttitle:{
    fontSize:setText(44),
    color:'#1D1D38',
    position:'absolute',
    alignItems:'stretch',
    paddingHorizontal:0,
    paddingVertical:0,
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
  baoyangjlXm:{
    width:setWidth(988),
    height:setHeight(2000),    
    marginTop:setWidth(56),
    alignItems:'center'

  },
  
  byrunStateComAddText:{
    marginLeft:setWidth(20),    
    fontSize:setText(32),
    fontWeight: '600',
    color:'black'
  },
  baoyangjlview:{
    width:setWidth(988),
    backgroundColor:'rgba(255, 255, 255, 0.5)',
    paddingVertical:setWidth(30),
    marginTop:setWidth(37)
  },
});
