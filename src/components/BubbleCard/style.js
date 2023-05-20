import {StyleSheet} from 'react-native'
import {setText, setWidth,} from "../../utils/styleAdb";
import {Dimensions} from "react-native";
export default StyleSheet.create({
    //盒子本身
    wraper:{
        position:'relative',
        width:setWidth(920),
        // height:setWidth(350),
        backgroundColor:'#FFF',
        marginTop:setWidth(30),
        marginLeft:setWidth(45),
        borderRadius:setWidth(40),
        padding:setWidth(40),
        paddingBottom:setWidth(20)
    },
    //三角形
    triangle:{
    position:'absolute',    
    top:setWidth(60),
    left:setWidth(-80),
    width:setWidth(0),
    height:setWidth(0),
    borderTopColor:'transparent',
    borderLeftColor:'transparent',
    borderBottomColor:'transparent',
    borderRightColor:'#fff',
    borderWidth:setWidth(40)
    },
    //标题的盒子
    title:{
     width:setWidth(620),
     color:'black',
     borderColor:'#a7aab5',
     borderBottomWidth:0.5,
     paddingBottom:setWidth(1),

    },
    title2:{
      width:setWidth(825),
      color:'black',
      borderColor:'#a7aab5',
      borderBottomWidth:0.5,
      paddingBottom:setWidth(1),
    },
    //标题内容
    titleText:{
    color:'#373849',
    fontWeight:'700'
    },
    //上面的按钮
    Topbutton:{
        position:'absolute',
        top:setWidth(-32),
        right:setWidth(0),
      width:setWidth(155),
      height:setWidth(51),
      backgroundColor:'#456bf8',
      borderRadius:setWidth(45),
    },
    //上面的按钮内容
    TopbuttonText:{
        textAlign:'center',
        color:'#fff',
        fontSize:setText(35),
        lineHeight:setWidth(51)
    },  
    //消息内容盒子
    MessageContent:{
        marginTop:setWidth(20),
    },
    //消息内容
    ContentText:{
     fontSize:setText(33),
     marginRight:setText(20)
    },
    //消息内容的最外层盒子
    leftTitle:{
        flexDirection:'row',
        marginBottom:setWidth(12),
        paddingRight:setWidth(127)
    },
    //底部按钮
    BottomButton:{
      position:'absolute',
      right:setWidth(0),
       bottom:0,
      flexDirection:'row'
    }
    ,
    //按钮盒子
    BtmBox:{
     position:'absolute',
     bottom:setWidth(30),
     right:setWidth(0),
     width:setWidth(90),
     height:setWidth(47),
     borderColor:'#456BF8',
     borderWidth:setWidth(1),
     borderRadius:setWidth(50)
    },
     //盒子内容
    BtmBoxText:{
       fontSize:setText(33),
       textAlign:'center',
       lineHeight:setWidth(40),
       color:'#456BF8'
    },
    //同意按钮margin
    agree:{
      marginRight:setWidth(140)
    },
    //官网沾的modal
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: setWidth(40)
    },
    modalView: {
      margin:setWidth(40),
      backgroundColor: "white",
      borderRadius:setWidth(40),
      padding:setWidth(70),
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: setWidth(4)
      },
      shadowOpacity:setWidth(0.5),
      shadowRadius: setWidth(7.68),
      elevation: setWidth(10)
    },
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius:setWidth(40),
      padding:setWidth(20),
      elevation: setWidth(4)
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: setWidth(30),
      textAlign: "center"
    },
    buttonWraper:{
      flexDirection:'row',
      justifyContent:'space-between'
    },
    //没有更多消息啦
    noMessage:{
      width:Dimensions.get('window').width-setWidth(100),
      alignItems:'center',
      marginTop:setWidth(20)
    }
})