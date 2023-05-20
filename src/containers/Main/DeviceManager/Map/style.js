import { StyleSheet,Dimensions } from "react-native";
import { setWidth, setText, setHeight } from "../../../../utils/styleAdb";
import { set } from "lodash";
export default StyleSheet.create({
//最外层盒子
bgcWraper:{
width:'100%',
height:'100%',

// justifyContent:'center'
},
  //头部
  titleWraper:{
    position:'absolute',
    top:setWidth(25),
    left:setWidth(25),
    flexDirection:'row',
    marginTop:setWidth(80),
    marginBottom:setWidth(44),
    justifyContent:'center',
    zIndex:99,
  },
  //title的 盒子
  box:{
//    width:Dimensions.get('window').width,
//    alignItems:'center',
  },
  title:{
    fontWeight: "600",
    fontSize: setText(50),
    color:'black'
  },
  //SVG
  Svg:{
  width:setWidth(40), 
  height:setWidth(60),
  },
  SvgWraper:{
    // position:'absolute',
    // top:0,
    // left:setWidth(0),
    width:setWidth(140)
  },


 //底部信息盒子
  infoWraper:{
    position:'absolute',
    left:setWidth(46),
    zIndex:3,
    bottom:setWidth(100),
    width:Dimensions.get('window').width-setWidth(100),
    height:setHeight(400),
    borderRadius:setWidth(30),
    overflow:'hidden',
    padding:setWidth(47),
    backgroundColor:'#fff',
  },
  //盒子
  topWraper:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  //上半部分字体
  topText:{
   fontSize:setWidth(25),
   color:'black'
  },
  //上左上半部分
  topLeft:{
    width:setWidth(330),
    paddingLeft:setWidth(20),
    borderLeftWidth:2,
    borderLeftColor:'blue',
  },
  //下半部分的盒子
  bottomWrapers:{
    alignItems:'center',justifyContent:'space-between'
  }
})