import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { setWidth,setText } from "../../utils/styleAdb";

export default StyleSheet.create({
  wrap:{
    flex:1,
    backgroundColor: "#dee8f1",
    paddingHorizontal:setWidth(20),
    paddingVertical:setWidth(37)
  },
  titleWraper:{
    flexDirection:'row',
    marginTop:setWidth(100),
    marginBottom:setWidth(44),
  },
  //进入客服页的HEADER
  titleWraper2:{
    flexDirection:'row',
    marginTop:setWidth(100),
    marginBottom:setWidth(44),
    paddingHorizontal:setWidth(40)
  },
  //人工客服title的 盒子
  box:{
   position:'absolute',
   zIndex:-1,
   width:Dimensions.get('window').width,
   alignItems:'center',

  },
  //消息的盒子
  box2:{
    position:'absolute',
    zIndex:-1,
    width:Dimensions.get('window').width-setWidth(100),
    alignItems:'center',

  },
   title:{
        fontWeight: "600",
        fontSize: setText(50),
        color: "#2F3043",
        // marginLeft:setWidth(250),
        flex:1
   },
   //SVG
   Svg:{
    width:setWidth(40), 
    height:setWidth(60)
   },

   Svg2:{
    width:setWidth(40), 
    height:setWidth(60),
   }
});
