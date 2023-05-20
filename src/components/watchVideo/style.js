import { StyleSheet,Dimensions } from "react-native";
import { setWidth, setText, setHeight } from "../../utils/styleAdb";
export default StyleSheet.create({
   //顶部
   Topcontrols:{
    position:'absolute',
    top:setWidth(30),
    width:"100%",
    height:setWidth(100),
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:setWidth(30)
   },
    //底部
    container: {
        flex: 1,
        backgroundColor: '#000',
      },
      video: {
        position:'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
         width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        flex: 1
      },
      controls: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      slider: {
        flex: 1,
        marginHorizontal: 10,
      },
      time: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
      },
      timeText: {
        color: '#fff',
        marginLeft: 5,
        textAlignVertical:'center'
      },
      //中间提示
      middleTip:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        justifyContent:'center',
        alignItems:'center',
        marginTop:setWidth(-100)
      },
      //是否全屏
      video: {
        width: '100%',
        height: "100%",
      },
      fullscreenVideo: {
        width: '100%',
        height: '100%',
      },
      //loading
      // LoadingWraper:{
      //   position:'absolute',
      //   zIndex:999,
      //   left:'50%',
      //   height:'50%'
      // }
})