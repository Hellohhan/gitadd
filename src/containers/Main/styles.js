import { StyleSheet,Dimensions } from "react-native";
import { setWidth, setText, setHeight } from "../../utils/styleAdb";
export default StyleSheet.create({

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
//  六个导航按钮 start
  midBtnWrap:{
    paddingHorizontal:setWidth(48),

  },
  midBtnTopWrap:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  midBtn:{
    backgroundColor:'rgba(255,255,255,.7)',
    borderRadius:setWidth(30)
  },
  midBtnImgBack:{
    width:setWidth(314),
    height:setWidth(194),
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  midBtnText:{
    fontSize:setText(48),
    marginRight:setWidth(15),
    fontWeight:'500',
    color:'#000022',
  },
//  六个导航按钮 end
//  运行状态 start
  runStateWrap:{
    paddingHorizontal: setWidth(48)
  },
  runStateTop:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:setWidth(34),
    marginTop: setWidth(20)
  },
  runStateTopLeft:{
    flexDirection:'row',
    alignItems:'center',
  },
  runStateVerticalLine:{
    width:setWidth(6),
    height:setWidth(50),
    backgroundColor:'#4068F8',
    borderRadius: setWidth(3),
    marginRight: setWidth(24)
  },
  runStateTopLeftText:{
    fontSize: setText(48),
    color: '#2F2E2D'
  },
  runStateTopRight:{
    flexDirection:'row',
    alignItems:'center'
  },
  runStateTopRightText:{
    fontSize:setText(32),
    color:'#3F67F8',
    marginRight:setWidth(20)
  },
  runStateTopRightImg:{
    width:setWidth(24),
    height:setWidth(44)
  },
//  运行状态下部列表
  runStateItem:{
    height:setWidth(240),
    backgroundColor:'#F4F8FF',
    marginBottom: setWidth(10),
    flexDirection:'row',
    alignItems:'center'
  },
  runStateImg:{
    width:setWidth(131),
    height:setWidth(131),
    marginLeft:setWidth(38),
    marginRight:setWidth(20)
  },
  runStateDeviceName:{
    fontSize:setText(38),
    fontWeight: '600',
    color:'#1D1D38'
  },
  runStateComAddText:{
    fontSize:setText(30),
    color:'#989A9C'
  },

  /* 联系我们的遮罩层 */
  zhezhao:{
    position:'absolute',
    left:0,
    right:0,
    top:0,
    bottom:0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor:'#fff',
    opacity:0.5
  },
 /* 联系我们的模态框外层 */
 modalWraper:{
  position:'absolute',
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  justifyContent:'center',
  alignItems:'center',
 },
 //模态框
 modal:{
  width:setWidth(920),
  height:setHeight(470),
  backgroundColor:'#fff',
  borderRadius:setWidth(40),
  paddingHorizontal:setWidth(44),
  paddingVertical:setWidth(47)
 },
 //头部
 modal_title:{
  flexDirection:'row',
  justifyContent:"space-between",
  borderBottomWidth:0.5,
  paddingBottom:setWidth(36),
  marginBottom:setWidth(40)
 },
 //body
 Modal_body:{
  flexDirection:'row'
 },
 //内容
 content:{
  fontSize:setText(33),
  lineHeight:setHeight(53),
  color:'black'
 },
 userInfo:{
   borderBottomWidth:1,
   borderColor:'black',
   fontSize:setWidth(30)
 }
//  运行状态 end


//   container: {
//     flex: 1,
//     backgroundColor: "#dee8f1",
//   },
//   swiperWrap:{
//     height:setWidth(670),
//     position: 'relative',
//   },
//   adItemWrap:{
//     flex: 1,
//     position: 'relative',
//   },
//   adItemImage:{
//     position:'absolute',
//     width:setWidth(605),
//     height:setWidth(425),
//     left:setWidth(35),
//     bottom:setWidth(100)
//   },
//   adItemRight:{
//     position:'absolute',
//     width: setWidth(438),
//     height:'100%',
//     right:0,
//     top:0,
//   },
//   adItemText:{
//     color:'#fff',
//     fontWeight:'bold',
//     fontSize:setText(35)
//   },
//   adItemTextNameWrap:{
//     marginTop:setWidth(90),
//     paddingLeft:setWidth(100)
//   },
//
//   middleContentWrap:{
//     height: setWidth(510),
//     backgroundColor: '#f8f8f8',
//     marginTop: setWidth(20),
//     marginHorizontal: setWidth(15),
//     borderRadius:setWidth(18),
//   },
//   middleContentTop:{
//     height:'50%',
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     paddingTop:setWidth(18)
//   },
//   middleContentBottom:{
//     height:'50%',
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     paddingTop:setWidth(18)
//   },
//   middleContentItem:{
//     alignItems:'center'
//   },
//   middleContentItemText:{
//     color:'#9e9e9e',
//     marginTop:setWidth(5),
//     fontSize: setText(35)
//   },
//
//   runStatusWrap:{
//     backgroundColor: '#f8f8f8',
//     marginTop: setWidth(20),
//     marginHorizontal: setWidth(15),
//     borderRadius:setWidth(18),
//     paddingHorizontal:setWidth(37),
//     paddingVertical:setWidth(37),
//     flex:1,
//     flexGrow:1
//   },
//   runStatusTop:{
//     flexDirection:'row',
//     justifyContent:'space-between'
//   },
//   runStatusTopLeft:{
//     color:'#5c5c5c',
//     fontWeight:'bold'
//   },
//   runStatusTopRight:{
//     color: '#994e63',
//     fontWeight:'bold'
//   },
// //  每个筛机运行状态item
//   deviceItemWrap:{
//     flexDirection:'row',
//     paddingVertical: setWidth(50),
//   },
//   deviceItemLogo:{
//     marginRight:setWidth(44)
//   },
//   deviceItemText:{
//     flex:1
//   },
//   deviceItemName:{
//     fontSize:setText(38),
//     fontWeight:'bold'
//   },
//   offtrue:{color:'#ca4040'},
//   success:{color:'#006415'},
//   alarm:{color:'#f26e00'},
//   deviceItemAddress:{
//     fontSize:setText(31),
//     color:'rgb(157,157,157)',
//     marginTop:setWidth(31)
//   }
});
