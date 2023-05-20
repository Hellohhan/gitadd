import { View, Text,Image,TouchableOpacity, } from 'react-native'
import React from 'react'
import styles from './style'
import { setWidth,setHeight } from '../../utils/styleAdb'
import Ionicons from 'react-native-vector-icons/Ionicons'
export default function index() {
  return (
    <View style={styles.footer}>
    <TouchableOpacity>
    <Image
    style={{flex:1,marginRight:setWidth(90),width:setWidth(67),height:setHeight(0)}}
    source={require('../../containers/News/Service/image/jian.png')}
   >
   </Image>
    </TouchableOpacity>
    <TouchableOpacity  style={styles.footerText}> 
    <Ionicons name="reorder-three-outline" style={{textAlignVertical:'center'}}></Ionicons>
     <Text>保养提醒</Text>
     <View style={styles.footerTip}></View>
    </TouchableOpacity> 

    <TouchableOpacity  style={styles.footerText}> 
     <Ionicons name="reorder-three-outline" style={{textAlignVertical:'center'}}></Ionicons>
     <Text>报警信息</Text>
     <View style={styles.footerTip}></View>
     </TouchableOpacity> 

     <TouchableOpacity  style={styles.footerText}> 
     <Ionicons name="reorder-three-outline" style={{textAlignVertical:'center'}}></Ionicons>
     <Text>下载申请</Text>
     <View style={styles.footerTip}></View>
     </TouchableOpacity> 
   </View>
  )
}