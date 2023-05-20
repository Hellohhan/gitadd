import { StyleSheet,Dimensions } from "react-native";
import { setText, setWidth ,setHeight} from "../../utils/styleAdb";
export default StyleSheet.create({
  //头部
  titleWraper2:{
    position:'relative',
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:setWidth(170),
    marginBottom:setWidth(44),
    // paddingHorizontal:setWidth(40),
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
  
   //退出
   loginOut:{
    color:'#446bf8'
   },
  
  //  公司名称
  comName:{
    height:setWidth(170),
    marginBottom:setWidth(60),
    // marginTop:setWidth(210),
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  comNameRound:{
    width:setWidth(170),
    height: setWidth(170),
    borderRadius:setWidth(85),
    backgroundColor:'#FFFFFF',
    marginRight:setWidth(36)
  },
  comNameText:{
    fontSize:setText(34),
    color:'#000000'
  },
//  天气
  weatherWrap:{
    backgroundColor: '#FFFFFF',
    borderRadius: setWidth(34),
    paddingBottom:setWidth(64)
  },
  //  第一行
  weatherOneWrap:{
    flexDirection: 'row',
    marginTop: setWidth(40),
    alignItems: 'center',
    position:'relative',
  },
  weatherOneText:{
    fontSize:setText(38),
    color:'#191B38',
    fontWeight:'bold',
    marginLeft:setWidth(40),
    marginRight:setWidth(30)
  },
  weatherOneImg:{
    width:setWidth(31),
    height:setWidth(36),
    marginRight:setWidth(8)
  },
//  第二行
  weatherTwoWrap:{
    flexDirection:'row',
    justifyContent:'space-around',
    marginTop:setWidth(40)
  },
  weatherTwoTextWrap:{
    flexDirection:'row',
    alignItems:'center',
    marginTop:setWidth(16)
  },
  weatherTwoText:{
    fontSize:setText(34),
    color:'#9C9CA3'
  },
  weatherTwoBotText:{
    fontSize:setText(38),
    color:'#93939A',
    marginTop:setWidth(10)
  },
//  4个导航按钮
  midNavWrap:{
    flexDirection:'row',
    paddingVertical:setWidth(30),
    paddingHorizontal:setWidth(20),
    backgroundColor:'#fff',
    justifyContent:'space-around',
    borderRadius: setWidth(34),
    marginTop:setWidth(30)
  },
  midNavBut:{
    alignItems:'center',
  },
  midNavText:{
    marginTop:setWidth(15),
    color:'#2F2F43',
    fontSize:setText(35),
    fontWeight: '600'
  },
  //设备列表
  setListWrap:{
    paddingHorizontal: setWidth(35),
    paddingVertical: setWidth(30),
    backgroundColor:'#fff',
    borderRadius: setWidth(34),
    marginTop:setWidth(30),
  },
  setListItem:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',

  },
  setListItemLeft:{
    flexDirection:'row',
    alignItems:'center',
    width:setWidth(264),
    justifyContent:'space-between'
  },
  setListItemText:{
    marginLeft: setWidth(35),
    fontWeight:'600',
    color:'#01002A',
    fontSize:setWidth(35)
  },
 //修改密码中的按钮
 Myinput:{
  borderBottomWidth:1,
  padding:0,
  margin:0,
  height:setHeight(130),
  paddingHorizontal:setWidth(20)
 },
 MyButton2:{
  width:setWidth(300),height:setHeight(110),justifyContent:'center',alignItems:'center',
  borderRadius:setWidth(10),
  backgroundColor:'#cccccc',
 },
 MyButton:{
  width:setWidth(300),height:setHeight(110), backgroundColor:'#0099fa',justifyContent:'center',alignItems:'center',
  borderRadius:setWidth(10),
  borderBottomWidth:1,
  borderBottomColor:'#0686ee'
 },
 qwe:{
  borderBottomWidth:1,
  borderColor:'#999',

 },
 //按钮最外层盒子
 buttonWrape:{
  width:Dimensions.get('window').width-setWidth(110),
  flexDirection:'row',
  justifyContent:"space-evenly"
 },
 secondinput:{
   marginBottom:setWidth(100)
 }

});
