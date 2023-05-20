import { StyleSheet, Dimensions } from "react-native";
import { setHeight, setWidth, setText } from "../../../utils/styleAdb";


export default StyleSheet.create({
  //scrolldd的盒子

  scrollWraper: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 150,
  },
  mainContent: {
    flex: 1,
    backgroundColor: 'red'
  },
  sendBtn: {
    width: 63,
    height: 32,
    borderRadius: 3,
    backgroundColor: '#07c160',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    marginRight: 5,
  },
  wraper: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  mainContent: {
    flex: 1,
    // backgroundColor: '#ededed',
  },
  

  //背景
  background: {
    position: 'absolute',
    zIndex: -1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - setHeight(500),
    backgroundColor: '#FFF',
    opacity: 0.5,
    padding: setWidth(46),
    paddingTop: setWidth(0)
  },
  //容器
  wraper: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - setHeight(500),
    padding: setWidth(46),
    paddingTop: setWidth(30)
  },


  //左边的气泡
  chatMessage: {
    position: 'relative',
    backgroundColor: '#fff',
    padding: setWidth(20),
    borderTopLeftRadius: 0,
    borderTopRightRadius: setWidth(40),
    borderBottomLeftRadius: setWidth(40),
    borderBottomRightRadius: setWidth(50),
    borderRadius: setWidth(10),
    marginBottom: setWidth(80),
    marginLeft: setWidth(175),
    marginTop: setWidth(40),
    elevation: 5,
    shadowColor: '#315CF7',
    shadowOffset: { width: 0, height: 150 },
    shadowOpacity: 1,
    shadowRadius: 2.5,
    maxWidth: setWidth(600)
  },
  //右边的气泡
  chatReceiver: {
    position: 'relative',
    marginLeft: 'auto',
    marginTop: setWidth(40),
    backgroundColor: '#fff',
    marginRight: setWidth(50),
    borderTopLeftRadius: setWidth(40),
    borderTopRightRadius: 0,
    borderBottomLeftRadius: setWidth(40),
    borderBottomRightRadius: setWidth(50),
    elevation: 5,
    shadowColor: '#315CF7',
    shadowOffset: { width: 0, height: 150 },
    shadowOpacity: 1,
    shadowRadius: 2.5,
    maxWidth: setWidth(600)
  },
  // //三角
  // chattriangle:{
  //     position:'absolute',    
  //     top:setWidth(23),
  //     left:setWidth(-54),
  //     width:setWidth(0),
  //     height:setWidth(0),
  //     borderTopColor:'transparent',
  //     borderLeftColor:'transparent',
  //     borderBottomColor:'transparent',
  //     borderRightColor:'#fff',
  //     borderWidth:setWidth(27 )
  // },
  // //回复的三角
  // Receivertriangle:{
  //     position:'absolute',    
  //     top:setWidth(23),
  //     left:setWidth(405),
  //     width:setWidth(0),
  //     height:setWidth(0),
  //     borderTopColor:'transparent',
  //     borderLeftColor:'green',
  //     borderBottomColor:'transparent',
  //     borderRightColor:'transparent',
  //     borderWidth:setWidth(27 )
  // },
  //头像
  chatHead: {
    position: 'absolute',
    left: 0,
    width: setWidth(117),
    height: setHeight(117),
    borderRadius: setWidth(117),
    // marginLeft:setWidth(-575),
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#315CF7',
    shadowOffset: { width: 0, height: 150 },
    shadowOpacity: 1,
    shadowRadius: 2.5,
  },
  //头像图片
  HeadrPicture: {
    width: '100%',
    height: '100%',
    borderRadius: setWidth(120)
  },
  //回复的头像
  ReceiverHead: {
    position: 'relative',
    right: 0,
    width: setWidth(120),
    height: setHeight(120),
    borderRadius: setWidth(120),
    marginLeft: 0,
    elevation: 5,
    shadowColor: '#315CF7',
    shadowOffset: { width: 0, height: 150 },
    shadowOpacity: 1,
    shadowRadius: 2.5,
  },
  //回复的头像图片
  ReducerHeaderPicture: {
    width: '100%',
    height: '100%',
    borderRadius: setWidth(120)
  },
  //气泡里的文字
  messageText: {
    fontSize: setText(35),
    color: 'black'
  },
  chatName: {
    fontSize: 12,
    position: 'absolute',
    top: -15,
    fontWeight: 'bold',
  },
  // 时间的盒子
  timeWraper:{
    width: Dimensions.get('window').width-setWidth(100),
    alignItems:'center',
   
  marginTop:setWidth(-50)
  },
  time:{
    fontSize: setWidth(30),
  },
 //当前聊天时间
//  chatTime: {
//   width:setWidth(200),

//   position: 'absolute',
//   top:setWidth(-40),
//   left:setWidth(-440),
//   fontWeight: 'bold',
//   marginLeft: 'auto',
// },
// //回复的时间
// chatTimeReceiver: {
//     width:setWidth(300),
//     fontSize: setWidth(25),
//     position: 'absolute',
//     top:setWidth(-40),
//     left:setWidth(440),
//     fontWeight: 'bold',
//     marginLeft: 'auto',
// },
  //底部菜单
  footer: {
    paddingHorizontal: setWidth(46),
    flexDirection: 'row',
    marginTop: setWidth(38)
  },
  //菜单的内容盒子
  footerText: {
    // borderWidth:1,
    flex: 1,
    flexDirection: 'row',
    position: 'relative',

  },
  //底部新消息提示
  footerTip: {
    position: 'absolute',
    top: setWidth(-10),
    right: setWidth(70),
    width: setWidth(20),
    height: setWidth(20),
    borderRadius: setWidth(10),
    backgroundColor: '#DB2617'
  },
  //------------------------------------------------------
  //底部
  footerKeyboard: {
    marginTop: setWidth(20),
    paddingHorizontal: setWidth(20),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  //底部图标
  footerIcon: {
    width: setWidth(50),
    height: setWidth(50)
  },
  //键盘
  keybord: {
    paddingVertical: setWidth(0),
    paddingHorizontal: setWidth(20),
    width: setWidth(777),
    height: setHeight(90),
    borderRadius: setWidth(15),
    backgroundColor: '#FFF',
    elevation: 6,
    shadowColor: '#D2E5fc',
    shadowOffset: { width: 0, height: 150 },
    shadowOpacity: 1,
    shadowRadius: 2.5,
    lineHeight: setHeight(80),
  },
  //环信自带的ui
  titleContainer: {
    height: 60,
    backgroundColor: '#6200ED',
  },
  title: {
    lineHeight: 60,
    paddingLeft: 15,
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  inputCon: {
    marginLeft: '5%',
    width: '90%',
    height: 60,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  inputBox: {
    marginTop: 15,
    width: '100%',
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonCon: {
    marginLeft: '2%',
    width: '96%',
    flexDirection: 'row',
    marginTop: 20,
    height: 26,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  eachBtn: {
    height: 40,
    width: '28%',
    lineHeight: 40,
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    backgroundColor: '#6200ED',
    borderRadius: 5,
  },
  btn2: {
    height: 40,
    width: '45%',
    lineHeight: 40,
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    backgroundColor: '#6200ED',
    borderRadius: 5,
  },
  logText: {
    padding: 10,
    marginTop: 10,
    color: '#ccc',
    fontSize: 14,
    lineHeight: 20,
  },
})
