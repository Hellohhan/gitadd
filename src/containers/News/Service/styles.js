import { StyleSheet, Dimensions } from "react-native";
import { setWidth, setText } from "../../../utils/styleAdb";

export default StyleSheet.create({

    //消息外层盒子
    messageWraper: {
        position:'relative',
        zIndex:123,
        flexDirection:'row',
        width: '100%',
        height: setWidth(203),
        paddingTop: setWidth(45),
        paddingRight: setWidth(35),
        paddingBottom: setWidth(35),
        borderBottomWidth: 0.5
    },

    //头像盒子
    HeaderWraper: {
        position: 'relative',
        zIndex:1999,
        width: setWidth(121),
        height: setWidth(121),
        borderRadius: setWidth(121),
        backgroundColor: '#fff',
        // elevation:3,
        // shadowColor:'#315CF7',
        // shadowOffset:{width:0,height:0},
        // shadowOpacity: 1,
        // shadowRadius: 2.5,
    },
    //头像
    HeadrPicture: {
        width: '100%',
        height: '100%',
        borderRadius: setWidth(121)
    },
    //新消息标识
    tip: {
        position: 'absolute',
        top: setWidth(7),
        right: setWidth(0),
        zIndex: 11999,
        width: setWidth(20),
        height: setWidth(20),
        borderRadius: setWidth(10),
        backgroundColor: '#DB2617'
    },
    //信息内容外的盒子
    contentWraper: {
        width:setWidth(477),
        marginTop: setWidth(10),
        marginLeft:setWidth(20),
        overflow:'hidden',

    },
    //信息头部
    contentTitle:{
      color:'black',
      marginBottom:setWidth(10)
    },
    //信息
     content:{

     },
     //时间
     time:{
     justifyContent:'flex-end',
     alignItems:'flex-end',
      width:setWidth(330),
      height:'100%',
     },
     //没有更多消息了
     NoMoreMessage:{
        // flex:1,
        // alignItems:'center'
        textAlign:'center',
        marginTop:setWidth(20),
        fontSize:setText(34)
     },
     //底部菜单
     footer:{
        paddingHorizontal:setWidth(46),
        flexDirection:'row',
        marginTop:setWidth(38)
     },
     //菜单的内容盒子
      footerText:{
        // borderWidth:1,
        flex:1,
        flexDirection:'row',
        position:'relative',
     
      },
      //底部新消息提示
      footerTip:{
        position: 'absolute',
        top: setWidth(-10),
        right: setWidth(70),
        width: setWidth(20),
        height: setWidth(20),
        borderRadius: setWidth(10),
        backgroundColor: '#DB2617'
      }
})