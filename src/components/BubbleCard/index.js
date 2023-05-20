import { View, Text, TouchableOpacity, Alert,Modal,TouchableHighlight} from 'react-native'
import React, { useState } from 'react'
import styles from './style'
import { connect } from 'react-redux'
import { ScrollView } from 'react-native'
import { useRef } from 'react'
import moment from 'moment'
function Index(props) {
  const [data, setdata] = useState('')
  const [modalVisible, setmodalVisible] = useState(false)
  const scrollViewRef = useRef(null);
  const handleDetail = () => {
    // navigation.navigate('ApplyDetail')
    // props.basic.basic.navigation.navigate('DeviceList');
    props.basic.basic.navigation.navigate('Maintenancedetails');
  }
  // let {messageData}=props.messageData
  console.log(props.JpushMessage);
   let {JpushMessage}=props

   const buttons=(item)=>{
      switch(item){
        case '保养提醒':
          return(
          <TouchableOpacity onPress={handleDetail} >
        <View style={styles.Topbutton} >  
          <Text style={styles.TopbuttonText}>去保养</Text>
        </View>
        </TouchableOpacity>
          )    
      }
   }


  return (
    <ScrollView 
    ref={scrollViewRef}
    onContentSizeChange={() =>  scrollViewRef.current.scrollToEnd({ animated: false })}
    onLayout={() => scrollViewRef.current.scrollToEnd({ animated: false })}
    >
   {
    JpushMessage.map(item=>{
      return(
        <TouchableOpacity key={item.messageID} onLongPress={()=>{setmodalVisible(true);setdata(item.content)}}>
        <View style={styles.wraper}>
          <View style={styles.triangle}></View>
          <View style={item.title=='保养完成'?styles.title2:styles.title}>
         <Text style={styles.titleText}>{item.title}</Text>
       </View>
       {buttons(item.title)}
        <View style={styles.MessageContent}>
         <View style={styles.leftTitle}>
          <Text style={styles.ContentText}>{moment().format('lll')}</Text>
          </View>
          <View  style={styles.leftTitle}>
            <Text style={styles.ContentText}>消息内容:</Text>
           {/* <Text style={styles.ContentText}>设备<Text style={{color:'#f9b7b7'}}>{data}</Text>的保养已逾期3天,请及时进行保养</Text> */}
           <Text style={styles.ContentText}>{item.content}</Text>
          </View>
          </View>
        </View>
        </TouchableOpacity>
      )
    })
   }

   {
    props.JpushMessage.length==0&&<View style={styles.noMessage}>
    <Text>没有更多消息啦~</Text></View>
    
   }
<Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setmodalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>删除此消息</Text>
            <View style={styles.buttonWraper}>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setmodalVisible(false);
                props.dispatch({type:'deleteMessae',payload:data})
              }}
            >
              <Text style={styles.textStyle}>删除</Text>
      
            </TouchableHighlight>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setmodalVisible(false);
              }}
            >
              <Text style={styles.textStyle}>取消</Text>
      
            </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>

{/* 
          <View style={styles.leftTitle}>
          <Text style={styles.ContentText}>2020.08.05  8:30</Text>
          </View>
      

          <View style={styles.leftTitle}>
          <Text style={styles.ContentText} >设备名称:</Text>
          <Text style={styles.ContentText}>筛机1</Text>
          </View>

          <View style={styles.leftTitle}>
          <Text style={styles.ContentText}>数据类型:</Text>
          <Text style={styles.ContentText}>筛机1</Text>
          </View>

          <View style={styles.leftTitle}>
          <Text style={styles.ContentText}>时间区间:</Text>
          <Text style={styles.ContentText}>筛机1</Text>
          </View>

          <View style={styles.BottomButton}>
          <TouchableOpacity>
            <View style={[styles.BtmBox,styles.agree]}>
              <Text style={[styles.BtmBoxText]} >同意</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity>
            <View style={styles.BtmBox}>
            <Text style={styles.BtmBoxText} >拒绝</Text>
            </View>
            </TouchableOpacity>
          </View>  */}
       
     



















{/* 
      {
        messageData.map(item, index => {
          <View style={styles.wraper} key={index}>
            <View style={styles.triangle}>
            </View>
            <View style={styles.title}>
              <Text style={styles.titleText}>{item.notifyTitle}</Text>
            </View>

            <TouchableOpacity onPress={handleDetail} >
              <View style={styles.Topbutton} >
                <Text style={styles.TopbuttonText}>去保养</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.MessageContent}>
              <View style={styles.leftTitle}>
                <Text style={styles.ContentText}>2020.08.05  8:30</Text>
              </View>
              <View style={styles.leftTitle}>
                <Text style={styles.ContentText}>消息内容:</Text>
                <Text style={styles.ContentText}>{item.msgContent}</Text>
              </View>
            </View>
          </View>
        })
      } */}
    </ScrollView>
  )
}
const mapStatetoProps=(state)=>{
  return{
    JpushMessage:state.JPushMesage.JpushMessage
  }
}
export default connect (mapStatetoProps,null)(Index)

