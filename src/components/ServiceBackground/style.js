
import { StyleSheet, Dimensions } from "react-native";
import { setWidth, setText, setHeight } from "../../utils/styleAdb";

export default StyleSheet.create({
//背景
background: {
    position:'absolute',
    zIndex:-1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height-setHeight(500),
    backgroundColor: '#FFF',
    opacity: 0.5,
    padding: setWidth(46),
    paddingTop: setWidth(0)
},
//容器
wraper:{
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height-setHeight(500),
    padding: setWidth(46),
    paddingTop: setWidth(30)
}
,
})
    