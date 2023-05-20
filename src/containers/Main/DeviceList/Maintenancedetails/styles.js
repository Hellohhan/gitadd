import {StyleSheet} from "react-native"
import {Text, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import {setText,setWidth,setHeight} from "../../../../utils/styleAdb";

export default StyleSheet.create({
  wrap:{
    flex:1,
  },

  //头部标题
titleWraper2:{
  position:'relative',
  flexDirection:'row',
  justifyContent:'space-between',
  marginTop:setWidth(120),
  marginBottom:setWidth(44),

},
 title:{
      fontWeight: "600",
      fontSize: setText(50),
      color: "#2F3043",
      textAlign:'center',
     
 },
 //SVG
 Svg:{
  
  width:setWidth(40), 
  height:setWidth(60),

 },
 Svg2:{
  width:setWidth(40), 
  height:setWidth(60),
 },

 //历史记录
 loginOut:{
  color:'#446bf8'
 },
  lishijilubt:{
    fontSize:setText(38),
    fontWeight: '600',
    color:'blue'
  },
  baoyangItemimg:{

    width:setWidth(161),
    height:setWidth(161),
    marginLeft:setWidth(50),
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


  //内容区域
  baoyangXm:{
    width:'100%',
    height:setHeight(1200),
    backgroundColor:'#ffffff',
    borderTopEndRadius:setWidth(50),
    borderTopStartRadius:setWidth(50),
    marginTop:setWidth(45),
    paddingBottom:setWidth(30),
    paddingHorizontal:setWidth(30),     
   paddingVertical:setWidth(40),


  },
  
 //头部
  headWraper:{
    flexDirection:'row',
    justifyContent:"space-between",
    paddingBottom:setWidth(5),
    borderBottomWidth:0.5,
    borderBottomColor:'#ccccd8',
    marginBottom:setWidth(10)
  },
  titleContent:{
     textAlignVertical:'center',
    fontSize:setText(33),
    color:'black'
  },
  //身体
bodyWraper:{
  flexDirection:'row',
  borderLeftColor:'blue',
 borderLeftWidth:2,
 paddingLeft:setWidth(8)
},
bodyContent:{
  fontSize:setWidth(30),
  color:'black',
 },

bodyContent2:{
 fontSize:setWidth(35),
 color:'black',
 marginLeft:setWidth(-12),
 
},

  baoyangzhouqiView:{
    marginLeft:setWidth(25),
    backgroundColor:'#d8e1fd',
    borderRadius:setWidth(20),
    alignItems:'center',
    justifyContent:'center' ,
    paddingHorizontal:setWidth(10),
    paddingHorizontal:setWidth(20),
  
  },

  byrunStateComAddZqText:{
      
    fontSize:setText(32),
    fontWeight: '600',
    color:'#5577f9'
  },


  baoyangXmbottomright:{
    width:setWidth(200),
    //justifyContent:''
    marginLeft:setWidth(30)
  },
  byrunStateComAdddqText:{
    marginLeft:setWidth(20),    
    fontSize:setText(32),
    fontWeight: '600',
    color:'#446bf8',
    textAlignVertical:'center'
  },
  byrunStateComAddyqText:{
    marginLeft:setWidth(20),    
    fontSize:setText(32),
    fontWeight: '600',
    color:'#df3c2f',
    textAlignVertical:'center'
  },



  // baoyangXmheard:{
  //   width:setWidth(990),
  //   height:setWidth(88),
  //   marginTop:setWidth(50),
  //   borderBottomWidth:setWidth(2),
  //   borderBottomColor:'#d7d7db',
  //   justifyContent:'space-between',
  //   flexDirection:'row',
   
  // },
  // baoyangXmHeardleft:{
  //   width:setWidth(825),
  //   flexDirection:'row',
  //   alignItems:'flex-start',
  //   justifyContent:'flex-start'
  // },
  // baoyangXmHeardright:{
  //   // width:setWidth(165),
  //   // alignItems:'center',
  //   // justifyContent:'center',
    
  // },
  // baoyangXmbottom:{
  //   width:setWidth(990),
  //   height:setWidth(152),
  //   marginTop:setWidth(26),
  //   justifyContent:'space-between',
  //   // flexDirection:'row'
  // },
  // baoyangXmbottomleft:{

  //   width:setWidth(805),


  // },
  // baoyangXmbottomright:{
  //   width:setWidth(185),
  //   alignItems:'flex-end',
    
  //   //justifyContent:''
  // },
  // byrunStateComAddText:{
  //   marginLeft:setWidth(20),    
  //   fontSize:setText(32),
  //   fontWeight: '600',
  //   color:'#373849'
  // },

  // baoyangzhouqiView:{
  //   marginLeft:setWidth(25),
  //   backgroundColor:'#dae1fe',
  //   // width:setWidth(280),
  //   height:setWidth(40),
  //   borderRadius:setWidth(20),
  //   alignItems:'center',
  //   justifyContent:'center' ,
  //   paddingHorizontal:setWidth(10)
  // },
  // byrunStateComAddyqText:{
  //   marginLeft:setWidth(20),    
  //   fontSize:setText(32),
  //   fontWeight: '600',
  //   color:'#df3c2f'
  // },
  // byrunStateComAdddqText:{
  //   marginLeft:setWidth(20),    
  //   fontSize:setText(32),
  //   fontWeight: '600',
  //   color:'#446bf8'
  // },



  

});
