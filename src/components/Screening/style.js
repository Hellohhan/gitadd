
import {StyleSheet} from "react-native"
import {setText,setWidth} from "../../utils/styleAdb";

export default StyleSheet.create({
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
  }

})

