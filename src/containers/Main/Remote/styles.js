import {StyleSheet} from "react-native"
import {setWidth, setText, setHeight} from "../../../utils/styleAdb";

export default StyleSheet.create({
  deviceListWrap:{
    backgroundColor: '#FFFFFF',
    marginTop:setWidth(40),
    borderRadius:setWidth(30),
    paddingVertical:setWidth(40),
    paddingHorizontal:setWidth(30)
  },
  //设备列表头部 start
  deviceListHeader:{
    paddingHorizontal: setWidth(15),
    marginBottom:setWidth(10)
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
    fontSize:setText(38),
    fontWeight:'bold',
    color:'#01002C'
  },
  //设备列表头部 end

  //设备列表item start
  itemWrap:{
    paddingHorizontal:setWidth(10),
    paddingVertical: setWidth(20),
    borderColor:'#F8FAFE',
    borderWidth:setWidth(2),
    borderRadius: setWidth(20),
    marginTop: setWidth(25),
    flexDirection:'row',
    alignItems:'center'
  },
  itemLeftWrap:{
    flexDirection:'row',
    position:'relative',
    width: setWidth(166),
    height: setWidth(142),
    marginRight:setWidth(20)
  },
  itemLeftRunState:{
    width:setWidth(41),
    height:setWidth(41),
    position: 'absolute',
    right:0,
    bottom:0
  },

  itemMidWrap:{
    flex:1
  },
  itemMidInWrap:{
    flexDirection:'row',
    alignItems:'center',
    marginTop:setWidth(10)
  },
  verticalLine:{
    width:setWidth(10),
    height:'92%',
    backgroundColor: '#0D58F7',
    borderRadius:setWidth(5),
    marginRight: setWidth(20)
  },
  itemMidIn:{
    flexDirection:'row',
    alignItems:'center',
  },
  itemMidInText:{
    fontSize: setText(34),
    color: '#8F9096',
    marginRight:setWidth(20)
  },
  itemMidInTextValue:{
    fontSize: setText(34),
    color: '#8F9096',
  }


})
