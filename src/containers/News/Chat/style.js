import { StyleSheet ,Dimensions} from "react-native";
import { setHeight, setWidth,setText } from "../../../utils/styleAdb";


export default StyleSheet.create({
    mainContent: {
        flex: 1,
        backgroundColor:'red'
    },
    sendBtn: {
        width: 63,
        height: 32,
        borderRadius: 3,
        backgroundColor:'#07c160',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:5,
        marginRight:5,
    },
    wraper:{
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height
    },

    mainContent: {
        flex: 1,
        // backgroundColor: '#ededed',
    },
    //背景
    background:{
        position:'absolute',
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height-setHeight(400),
        backgroundColor:'#fff',
        opacity:0.5,
        marginTop:setWidth(150)
    },
    //背景里的容器
    chatBody: {
        // flex: 1,
        position:'relative',
        padding:setWidth(40),
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height-setHeight(400),
        marginTop:setWidth(150)
    },
    //左边的气泡
    chatMessage: {
        position: 'relative',
        backgroundColor: '#fff',
        padding:setWidth(20),
        borderTopLeftRadius:0 ,
        borderTopRightRadius:setWidth(40),
        borderBottomLeftRadius:setWidth(40),
        borderBottomRightRadius:setWidth(50),
        borderRadius:setWidth(10),
        marginBottom: setWidth(80),
        marginLeft:setWidth(175),
        marginTop:setWidth(40),
        elevation:5,
        shadowColor:'#315CF7',
        shadowOffset:{width:0,height:150},
        shadowOpacity: 1,
        shadowRadius: 2.5,
    },
    //右边的气泡
    chatReceiver: {
       position:'relative',
        marginLeft: 'auto',
        marginTop:setWidth(40),
        backgroundColor: '#fff',
        marginRight:setWidth(50),
        borderTopLeftRadius:setWidth(40),
        borderTopRightRadius:0 ,
        borderBottomLeftRadius:setWidth(40),
        borderBottomRightRadius:setWidth(50),
        elevation:5,
        shadowColor:'#315CF7',
        shadowOffset:{width:0,height:150},
        shadowOpacity: 1,
        shadowRadius: 2.5,
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
     chatHead:{
        position:'absolute',
        left:0,
        width:setWidth(117) ,
        height:setHeight(117),
        borderRadius:setWidth(117),
        // marginLeft:setWidth(-575),
        backgroundColor: '#fff',
        elevation:5,
        shadowColor:'#315CF7',
        shadowOffset:{width:0,height:150},
        shadowOpacity: 1,
        shadowRadius: 2.5,
    },
    //头像图片
    HeadrPicture:{
        width: '100%',
        height: '100%',
        borderRadius: setWidth(120)
    },
    //回复的头像
    ReceiverHead:{
        position:'relative',
        right:0,
        width:setWidth(120) ,
        height:setHeight(120),
        borderRadius:setWidth(120),
        marginLeft:0,
        elevation:5,
        shadowColor:'#315CF7',
        shadowOffset:{width:0,height:150},
        shadowOpacity: 1,
        shadowRadius: 2.5,
    },
    //回复的头像图片
    ReducerHeaderPicture:{
        width: '100%',
        height: '100%',
        borderRadius: setWidth(120)
    },
   //气泡里的文字
    messageText: {
        fontSize: setText(35),
        color:'black'
    },
    chatName: {
        fontSize: 12,
        position: 'absolute',
        top: -15,
        fontWeight: 'bold',
    },
    chatNameReceiver: {
        fontSize: 12,
        position: 'absolute',
        top: -18,
        fontWeight: 'bold',
        marginLeft: 'auto',
    },
    chatTimeStamp: {
        marginLeft: 10,
        fontSize: 12,
    },
   
    //底部
    footer:{
        marginBottom:setWidth(100),
        paddingHorizontal:setWidth(20),
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'
    },
    //底部图标
    footerIcon:{
      width:setWidth(60),
      height:setWidth(60)
    },
    //键盘
    keybord:{
    paddingVertical:setWidth(0),
    paddingHorizontal:setWidth(20),
      width:setWidth(777),
      height:setHeight(90),
      borderRadius:setWidth(15),
      backgroundColor:'#FFF',
      elevation:6,
      shadowColor:'#D2E5fc',
      shadowOffset:{width:0,height:150},
      shadowOpacity: 1,
      shadowRadius: 2.5,
       lineHeight:setHeight(80)
    }
})