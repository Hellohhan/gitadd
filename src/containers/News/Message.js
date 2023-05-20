import { View, Text } from 'react-native'
import React,{useEffect,useState} from 'react'
import BubleCard from '../../components/BubbleCard'
import axios from 'axios'
export default function Message(props) {
  // let {messageData}=props.messageData
  const [messageData, setmessageData] = useState([])
  useEffect(() => {
    axios({
      url:'http://192.168.0.15:8701/push/jgpush',
      method:'post',
      data:{"pushType":6,"rIdsList":["190e35f7e0a2cac3468","120c83f760c5bd148c5"],
     "notifyTitle":"通知标题",  "msgTitle":"消息标题","msgContent":"消息内容","extrasParam":"",
     "mark":"1、设备别名推送 2、Tag参数推送 3、发给所有Android用户  4、发给所有IOS用户 5、发给所有设备（Android&IOS）6、设备rId推送"
     }
   })
   .then(res=>{
     let data=res.data.message;
     setmessageData(data)
     console.log(data);
   })
   }, [])
  return (
    <View>
      <BubleCard basic={props} messageData={messageData}>
      </BubleCard>
    </View>
  )
}