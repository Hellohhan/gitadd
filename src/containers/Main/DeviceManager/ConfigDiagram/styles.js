import {StyleSheet} from 'react-native'
import { setWidth, screenPxH, setText, setHeight } from "../../../../utils/styleAdb";

export default StyleSheet.create({
  //外部包裹器
  wrap:{
    flex: 1,
  },
  //3d模型 start
  threeWrap:{
    height: setWidth(860),
    position:'relative'
  },
  //3d模型 end
  //数据显示 start
  dataWrap:{
    flex:1,
    opacity:.8,
    marginTop:setWidth(-150)

  },
  tabItemButtonReset:{
    padding: 0,
    paddingVertical:0,
    paddingHorizontal: 0
  },
  tabItemButton:{
    padding:0,
    paddingHorizontal:0,
    width:setWidth(250),
    height:setHeight(120),
    alignItems:'center',
    justifyContent:'center',
    paddingLeft:setWidth(70),
    paddingRight:setWidth(70),
  },
  bottomLine:{
    height:setWidth(10),
    width: '100%',
    backgroundColor: "#486DF8",
    position: "absolute",
    bottom:0
  },
  tableViewItemWrap:{
    // backgroundColor: 'red',
    width:'100%',
  },
  tableViewItemImg:{
    width:setWidth(281),
    height:setWidth(401),
    backgroundColor: "rgb(255,255,255)",
    marginRight:setWidth(60),
    borderRadius:setWidth(32),
    paddingHorizontal:setWidth(15)
  },
  tableViewItemScroll:{
    marginTop:setWidth(25),
    flexGrow:0
},
  tableViewItemTextTop:{
    fontSize: setText(39),
    fontWeight:"bold",
    color: "#01001A",
    marginTop:setWidth(50),
    marginBottom:setWidth(30)
  },
  tableViewItemTextMid:{
    fontSize:setText(34),
    color:'#9597A3',
  },
  tableViewItemTextBot:{
    fontSize:setText(50),
    fontWeight:"bold",
    color:'#01001A',
    marginTop:setWidth(55)
  },

  runTimeAndAlarmNum:{
    height:setWidth(100),
    marginTop: setWidth(20),
    flexDirection:'row',
    paddingHorizontal:setWidth(70),
    justifyContent:'space-between',
    backgroundColor:'#F9FCFF',
    alignItems: "center"
  },
  runTimeAndAlarmNumText:{
    color:'#0057F7',
    fontSize:setText(34)
  }
  //数据显示 end

})
