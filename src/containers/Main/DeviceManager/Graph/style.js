 
 
 
 import { StyleSheet,Dimensions } from "react-native";
 import { setWidth, setText, setHeight } from "../../../../utils/styleAdb";
 export default StyleSheet.create({
 
//背景图
bgc:{
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height
},

 //头部盒子
 titleWraper2:{
    flexDirection:'row',
    marginTop:setWidth(100),
    marginBottom:setWidth(44),
    paddingHorizontal:setWidth(40)
  },

  //title的盒子
  box2:{
    position:'absolute',
    // zIndex:,
    width:Dimensions.get('window').width,
    alignItems:'center',

  },
   title:{
        fontWeight: "600",
        fontSize: setText(50),
        color: "#fff",
        // marginLeft:setWidth(250),
        flex:1,
        letterSpacing:setWidth(6)
   },
   //SVG
   Svg:{
    width:setWidth(40), 
    height:setWidth(60)
   },

   /* tab栏按钮 */
   buttonWraper:{
    width:setWidth(153),
    alignItems:'center',
    // backgroundColor:'red',
    marginTop:setWidth(-10)
   },
   //处理时间
   times:{
    width:setWidth(320),
    height:setWidth(70),
    padding:0,
    margin:0,
    borderWidth:1,
    borderColor:'white',
    textAlign:'center',
    color:'black',
   fontSize:setText(30)
   },
   /* 时间中间的字 */
   zhi:{
    fontSize:setText(30),
    marginLeft:setWidth(20),
    marginRight:setWidth(20)
   },
   //底部信息
   footerContext:{
    width:setWidth(960),
    height:setHeight(300),
    marginTop:setWidth(100) ,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
},
  //底部左侧
  left:{
    width:setWidth(420),
    height:setHeight(300),
    flexDirection:'column',
     justifyContent:'space-evenly',
  },
  //左侧内容标题
  left_content_title:{
    textAlignVertical:'center',
    color:'#fff'
  },
  //左侧内容边框
  left_content_wraper:{
    width:setWidth(243),
    height:setHeight(70),
    borderColor:'#fff',
    borderWidth:1,
    borderRadius:setWidth(30),
    alignItems:'center',
    justifyContent:'center',
    marginLeft:setWidth(70),
    flexDirection:'row'
  },
  //中间
  middle:{
    width:setWidth(1),
     height:setHeight(200),
     borderWidth:0.5,
     borderColor:'#fff',
  },
  //右侧
  right:{
    width:setWidth(420),
    height:setHeight(300),
    flexDirection:'column',
    justifyContent:'space-evenly',
  
  }
 })
 
