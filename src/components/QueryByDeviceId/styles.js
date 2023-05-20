import {StyleSheet} from 'react-native'
import { setText, setWidth } from "../../utils/styleAdb";
export default StyleSheet.create({
  wrap:{
    flexDirection:'row',
    alignItems:'center',
    height:setWidth(90)
  },
  scanBtn:{
    width:setWidth(90),
    height:setWidth(90),
    backgroundColor: 'rgba(0,0,0,0)',
    borderWidth:setWidth(1),
    borderColor:'#fff',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:setWidth(15),
    marginRight:setWidth(20)
  },

  inputSearchWrap:{
    flex: 1,
    flexDirection: 'row',
    backgroundColor:'#FFFFFF',
    borderRadius:setWidth(15)
  },
  inputWrap:{
    flex:1,
    height:setWidth(90),
    alignItems:'center',
  },
  searchBtn:{
    width: setWidth(90),
    height:setWidth(90),
    backgroundColor: '#fff',
    borderRadius: setWidth(15),
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth:setWidth(2),
    borderLeftColor:'#EEF2FE'
  },
  searchText:{
    fontSize:setText(34),
    color:'#9CA0A5'
  }
})
