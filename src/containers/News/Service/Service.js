import { View, Text ,Image,TouchableOpacity, TextInput } from 'react-native'
import React,{useState} from 'react'
import styles from './styles'
import { setHeight, setWidth } from '../../../utils/styleAdb'
import moment from "moment";
import { ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import ServiceBackground from '../../../components/ServiceBackground/index'
import ServiceFotter from '../../../components/ServiceFooter'
import axios from 'axios';
export default function Service(props) {
  const [endDate, setendDate] = useState(new Date())

  const {navigation}=props.basic
  const handleClick=()=>{
    navigation.navigate('Chat')
    // console.log(props);
  }

  return (  
    <View>
     <ServiceBackground>
     <TouchableOpacity onPress={handleClick}>
     <View style={styles.messageWraper}  >
            <View style={styles.HeaderWraper }>
              <Image 
              style={styles.HeadrPicture}
              source={require('./image/num1.jpg')}
              >
              </Image>
              {/* 新消息标识 */}
              <View style={styles.tip}></View>
           
            </View>
          
            <View style={styles.contentWraper}>
             <Text style={styles.contentTitle}>test1</Text>
             <Text  numberOfLines={1}  style={styles.content}>您好您好您好您好您好您好您好您好您好您好您好您好</Text> 
            </View>
           <View style={styles.time}><Text style={{ fontSize:setWidth(30),marginBottom:setWidth(3)}}>{moment(endDate).format('MM月DD日')}</Text></View>
     

        </View>
        </TouchableOpacity>

       





        <View style={styles.messageWraper}>
            <View style={styles.HeaderWraper}>
              <Image 
              style={styles.HeadrPicture}
              source={require('./image/num1.jpg')}
              >
              </Image>
              {/* 新消息标识 */}
              <View style={styles.tip}></View>
            </View>
            <View style={styles.contentWraper}>
             <Text style={styles.contentTitle}>test1</Text>
             <Text  numberOfLines={1}  style={styles.content}>您好您好您好您好您好您好您好您好您好您好您好您好</Text> 
            </View>
           <View style={styles.time}><Text style={{ fontSize:setWidth(30),marginBottom:setWidth(3)}}>{moment(endDate).format('MM月DD日')}</Text></View>
        </View>

        <View style={styles.messageWraper}>
            <View style={styles.HeaderWraper}>
              <Image 
              style={styles.HeadrPicture}
              source={require('./image/num1.jpg')}
              >
              </Image>
              {/* 新消息标识 */}
              <View style={styles.tip}></View>
            </View>
            <View style={styles.contentWraper}>
             <Text style={styles.contentTitle}>test1</Text>
             <Text  numberOfLines={1}  style={styles.content}>您好您好您好您好您好您好您好您好您好您好您好您好</Text> 
            </View>
           <View style={styles.time}><Text style={{ fontSize:setWidth(30),marginBottom:setWidth(3)}}>{moment(endDate).format('MM月DD日')}</Text></View>
        </View>




































        <View ><Text style={styles.NoMoreMessage}>没有更多消息啦~</Text></View>

     </ServiceBackground>

     {/* 底部菜单 */}
     <ServiceFotter/>
 
    </View>
  )
}

