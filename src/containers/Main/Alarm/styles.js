import {StyleSheet} from "react-native"
import {setHeight, setText,setWidth} from "../../../utils/styleAdb";

export default StyleSheet.create({
  //轮播图 start
  container: {
    flex: 1,
    backgroundColor:'#D7EEFE'
  },
  midWrap:{
    height: setWidth(1200),
    width: setWidth(1080),
  },
  bgImg:{
    width:'100%',
    height:setWidth(1920),
  },
  carouselViewWrap:{
    width: '100%',
    height:setWidth(618),
    marginTop:setWidth(160),
  },
  swiperWrap:{
    height:setWidth(618),
  },
  swiperItem:{
    width:setWidth(1080),
    height:'100%',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  },
  //轮播图 end
//  报警列表 start
  alarmWrap:{
    backgroundColor: '#DDF0FF',
    paddingVertical:setWidth(50),
    paddingHorizontal:setWidth(36),
    borderTopLeftRadius: setText(60),
    borderTopRightRadius: setText(60),
    borderBottomLeftRadius: setText(60),
    borderBottomRightRadius: setText(60)
  },
  alarmItem:{
    backgroundColor: 'rgba(255,255,255,.6)',
    paddingHorizontal: setWidth(20),
    paddingTop:setWidth(26),
    paddingBottom:setWidth(30),
    marginBottom:setWidth(20)
  },
  alarmItemNameWrap:{
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:setWidth(20)
  },
  alarmItemName:{
    marginLeft:setWidth(26),
    fontSize:setText(38),
    fontWeight:'bold',
    color:'#0242F7'
  },
  alarmItemBottomWrap:{
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems:'center'
  },
  alarmItemBottomLeft:{
    flexDirection:'row',
    alignItems:'center'
  },
  alarmItemBottomLeftLine:{
    width:setWidth(6),
    height:setWidth(84),
    backgroundColor:'#1358F7',
    borderRadius: setWidth(4),
    marginRight:setWidth(20)
  },
  alarmItemBottomLeftTextWrap:{
    flexDirection:'row',
    alignItems:'center',
  },
  alarmItemBottomLeftText:{
    fontSize: setText(34),
    color: '#141433'
  },
  alarmItemBottomRight:{
    paddingHorizontal:setWidth(10),
    paddingVertical: setWidth(5),   
    borderWidth:setWidth(1),
    borderColor:'#2E61F8',
    borderRadius:setWidth(30)
  },
  alarmItemBottomRightText:{
    color:'#2E61F8',
    fontSize:setText(30),
  },
//  异常值
  alarmItemValueWrap:{
    backgroundColor:'#FFFFFF',
    position:'absolute',
    top:setWidth(20),
    right:setWidth(-10),
    paddingLeft:setWidth(40),
    paddingRight:setWidth(10),
    paddingVertical:setWidth(10),
    borderTopLeftRadius:setWidth(30),
    borderBottomLeftRadius:setWidth(30),

  },
  alarmItemValue:{
    fontSize:setText(42),
    fontWeight: 'bold',
    color:'#E40004',
  },
//  报警列表 end
//筛选弹出层 start
  filterItemWrap:{
    backgroundColor: '#FFFFFF',
    borderRadius:setWidth(30),
    padding:setWidth(40),
  },
  filterItem:{
    flexDirection:'row',
    alignItems:'center',
    marginBottom:setWidth(40)
  },
  filterItemName:{
    marginRight: setWidth(35),
    fontSize:setWidth(38),
    color:'#29293F',
    fontWeight:'bold'
  },
  filterItemInputWrap:{
    flex:1,
    height:setWidth(60),
    borderWidth:setWidth(1),
    borderColor:'#F2F5FD',
    borderRadius:setWidth(20)
  },
  filterItemInputContainerWrap:{
    height:setWidth(60),
    borderBottomWidth:0
  },
  filterItemInput:{
    color:'#29293F',
    fontSize:setWidth(35)
  },
//  打开日期弹出层
  openDateModel:{
    flex:1,
    height:setWidth(60),
    borderWidth:setWidth(1),
    borderColor:'#F2F5FD',
    borderRadius:setWidth(20),
    justifyContent:'center'
  },
//筛选弹出层 end


//查看详情


//报警模块异常处理
container: {
  flexDirection:'row',
  width:'100%',
  height:setHeight(170),
},
text:{
 marginLeft: setWidth(25),
 marginTop: setWidth(5),
 fontWeight:'bold',
 fontSize: setWidth(36),
 color: 'black',
},

Right_View: {
  marginLeft: setWidth(280),
  fontSize: setWidth(26),
  marginTop: setWidth(-30),  
  color: 'black'
 },

 Left_View: {  
  marginTop:setWidth(-82),
  marginLeft: setWidth(40),
  fontSize: setWidth(26),
  color: 'black'
 },

 Row_Host: {
  flexDirection: 'row',
 },

 Row_HostTwo: {
  flexDirection: 'row',
  marginLeft: setWidth(-240),
 },

 person_Error: {
   color: 'red'    
 },

 footer_Style: {
  backgroundColor: 'white',
  resizeMode: 'contain',
  flex: 1,
  aspectRatio: 1 
 },
 alarmItem_Line: {
  width: setWidth(6),
  height: setWidth(84),
  backgroundColor: '#1358F7',
  borderRadius: setWidth(4),
  marginLeft: setWidth(25)
 },

 alarm_Border: {
    marginTop: setWidth(24),
    backgroundColor: 'white',
    borderTopLeftRadius: setWidth(68),
    borderTopRightRadius: setWidth(68),
    height: setHeight(1500)
  },

  border_Size: {
    marginTop: setWidth(24),
  },
images_url: {
  height: '100%'
},
deviceListWrap: {
  backgroundColor: '#FFFFFF',
  marginTop: setWidth(40),
  borderRadius: setWidth(30),
  paddingVertical: setWidth(40),
  paddingHorizontal: setWidth(30),
  overflow:'hidden'
},

 //处理过程头部 start
 deviceListHeader:{
  paddingHorizontal: setWidth(15),
  marginBottom:setWidth(5)
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
  fontSize:setText(40),
  fontWeight:'bold',
  color:'#01002C'
},

//报警模块中产生异常原因说明
error_word: {
  flexDirection: 'row',
},

error_line: {
  width: setWidth(6),
  height: setWidth(40),
  backgroundColor: '#1358F7',
  borderRadius: setWidth(4),
  marginLeft: setWidth(25)
},

//阴影边框居中
shadow_container: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
},
//边框阴影样式
border_Shadow: {
  width: setWidth(840),
  marginTop: setWidth(25),
  height: setHeight(200),
  backgroundColor:'white',
  borderRadius: setWidth(30),
  shadowColor: '#1358F7',
  shadowOpacity: setWidth(0.5),
  shadowOffset: {width:setWidth(0), height: setHeight(2)},
  shadowRadius:setWidth(14),
  elevation: setWidth(6),
},
//异常说明及各个边框上下的距离
border_distance: {
  marginTop:setWidth(55),
},
//上传图片样式
  imageup: {
    width: setWidth(90),
    height: setHeight(90),
    
  },
  //图片边框阴影
  image_borderShadow: {
    width: setWidth(200),
    marginTop: setWidth(25),
    marginLeft: setWidth(40),
    height: setHeight(200),
    backgroundColor:'white',
    borderRadius: setWidth(30),
    shadowColor: '#1358F7',
    shadowOpacity: setWidth(0.5),
    shadowOffset: {width:setWidth(0), height: setHeight(2)},
    shadowRadius:setWidth(14),
    elevation: setWidth(10),
    color: 'red',
    fontSize: setWidth(30)
  },

  //确认处理按钮样式
  btn_style: {
    borderRadius:setWidth(100),
    marginTop: setWidth(100),
    width:setWidth(850),
    height:setHeight(100),
    backgroundColor: '#1358F7',
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  //确认处理Text样式
  btn_ok: {
    color:'white',
  },

  //后面改动的边框里的text文字样式
  border_fontSize: {
    color: 'red',
    fontSize: setWidth(30),
    marginLeft: setWidth(50),
    marginTop: setWidth(20)
  },

  //按钮确认信息
  btn_borderStyle: 
    {
      width:'100%',
      backgroundColor:'blue',
       paddingVertical:setWidth(18),
       borderRadius:setWidth(43),
       marginTop:setWidth(80)
      },



  

  //报警模块——之处理完成信息的异常说明中的白色方块figureout
  public_style: {
    backgroundColor: '#FFFFFF',
    marginTop: setWidth(40),
    paddingVertical: setWidth(40),
    paddingHorizontal: setWidth(30),
  },

  //报警模块——之处理完成信息的异常说明白色方块中的Image图片和电压样式
  alert_image: {
      width:setWidth(70),
      height:setHeight(80),
      position:'relative',
  },

  alert_text: {
      position: 'absolute',
      left: setWidth(130),
      top: setWidth(50),     
  },

  alert_Size: {
    fontSize: setWidth(38),
    fontWeight:"bold",
    color: 'black',
  },

  //报警模块——之处理完成信息的异常说明白色方块中的蓝色竖线样式
  blue_line: {
    width: setWidth(6),
    height: setWidth(332),
    backgroundColor: '#1358F7',
    borderRadius: setWidth(4),
    right: setWidth(-5),
    marginTop: setWidth(30),
    position: "relative",
  },

   //报警模块——之处理完成信息的异常说明白色方块中的蓝色竖线相对的文字
   line_Size: {
      position: "absolute",
      left: setWidth(70),
      top: setWidth(140),
   },
   
   //报警模块之处理完成信息的查看详情按钮样式
   view_style: {
      borderColor: '#1358f7',
      position: "absolute",
      left:setWidth(620),
      top: setWidth(288),
      borderWidth:setWidth(1),
      borderRadius: setWidth(40),
      backgroundColor: 'white',
      width: '38%',
      
   },
   view_details: {
      color: '#1358f7',
      textAlign: 'center'
   },
   
   //报警模块之图片上传
   exception: {
    width: setWidth(840),
    marginTop: setWidth(25),
    // height: setHeight(400),
    backgroundColor:'white',
    borderRadius: setWidth(30),
    shadowColor: '#1358F7',
    shadowOpacity: setWidth(0.5),
    shadowOffset: {width:setWidth(0), height: setHeight(2)},
    shadowRadius:setWidth(14),
    elevation: setWidth(6),
    padding:setWidth(30),
    flexDirection:'row',
    flexWrap:'wrap'
   },
   //异常说明左边盒子
   leftWraper:{
    flexDirection:'row',
     flex:1.6,
   },
   //异常信息字体
   alemINfoText:{
     fontSize:setWidth(26)
   },
   //异常书名右边盒子
   RightWraper:{
    flex:1,
    justifyContent:"space-around",
    alignItems:'center'
  
   },
   //上报人信息
   Myinput:{
     width:setWidth(160),
    height:setWidth(30),
     borderBottomWidth:1,
     margin:0,
     paddingHorizontal:0,
     paddingVertical:0,
     borderColor:'black',
     fontSize:setWidth(23),
     paddingHorizontal:setWidth(5),
     textAlign:'center'
   },
   // 异常处理，长传图片的图片盒子
   imgWraper:{
    width:'100%',
    paddingHorizontal:setWidth(30),
    // paddingVertical:setWidth(50),
    marginTop:setWidth(40),
    flexDirection:'row',
    flexWrap:'wrap'
  }
})

