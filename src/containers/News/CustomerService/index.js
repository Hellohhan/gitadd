
/* ------------------------------------------------------------------------- */

import React, { useState, useEffect, useRef, useContext } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  RefreshControl, Keyboard
} from 'react-native';
import ServiceBackground from '../../../components/ServiceBackground'
import { setWidth, setHeight } from '../../../utils/styleAdb'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styles from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ChatClient,
  ChatOptions,
  ChatMessageChatType,
  ChatMessage,
  ChatMessageEventListener,
  ChatConversationType,
  ChatSdk
} from 'react-native-chat-sdk';
import { connect } from 'react-redux';
import style from '../../../components/ServiceBackground';
import { useNavigation } from '@react-navigation/native';
import {asyncGetAlarmData} from "../../../redux/actions/alarm"
import { asyncGetDevices } from "../../../redux/actions/devices";
import { store } from '../../../redux/store';
import {MaintenanceParts} from '../../../api/requestPath'
import  axios  from '../../../api'
const moment = require('moment');
require('moment/locale/zh-cn');
moment.locale('zh-cn');
const NowContent = React.createContext()
function CustomerService(props) {


  //全局usecontext
  const [receiver, setReceiver] = useState('boy');//说明现在是什么身份
  const [value, onChangeText] = React.useState('');//输入框的值
  const [keyboard, setkeyboard] = useState(true)//键盘状态
  const [isoption, setisoption] = useState(['321321'])//接收消息
  const [time, setTime] = useState(null);//时间
  const [refreshing, setRefreshing] = React.useState(false);//上拉加载的loading
  const number = useRef(20)/* 历史记录加载条目 */
  const [isScroview, setisScroview] = useState(true)/* 是否滚动最下面 */
  const scrollViewRef = useRef()//滚动到最下面
  const [maintenanceTip, setmaintenanceTip] = useState(false)
   const navigation = useNavigation();
  // 进行 app 设置
  const title = 'ChatQuickstart';
  const [appKey, setAppKey] = React.useState('1183230509163686#demo');
  const [userId, setUserId] = React.useState('test');//这里是写死的,管理端只设置一个号
  const [logText, setWarnText] = React.useState('Show log area');
 
  
  /* -------------------------------------------------------------------------------- */
  const{username}=props.userInfo
  useEffect(() => {
    getHistoryMessage()//获取历史消息
    props.asyncGetAlarmData()//报警信息
    props.asyncGetDevices()//设备列表
    Newcomponent()
  }, [])

  /*获取保养预期设备*/
const Newcomponent= async()=>{
    let params = {
      "deviceId":props.deviceId,
      "sysRemind":"1",
      "jsonEntity":{
        "sysRemind1":"1"
      }
    }
    try{
       let result=await axios.authPost(MaintenanceParts,params) 
       console.log(result);
       if(result.message==='ok'){
         if(result.data.length>0){
          setmaintenanceTip(true)
         }else{
          setmaintenanceTip(false)
         }
       }
    }
     catch(e){
      console.log(e);
     }
   }

  /* 获取历史消息 */
  function getHistoryMessage(data) {
    if (data) {
      number.current = number.current + data
    }
    console.log(number.current);
    // 会话 ID。
    const convId = "test";
    // 会话类型。详见 `ChatConversationType` 枚举类型。
    const convType = ChatConversationType.PeerChat;
    // 获取的最大消息数目。 
    const pageSize = number.current;
    // 搜索的起始消息 ID。
    const startMsgId = "";
    ChatClient.getInstance()
      .chatManager.fetchHistoryMessages(convId, convType, pageSize, startMsgId)
      .then((messages) => {
        console.log("get message success: ", messages);
        const history = messages.list.map(item => {
          let name = item.from === username ? 'boy' : 'gril'
          return {
            message: item.body.content,
            name: name,
            time: item.serverTime
          }
        })
        store.dispatch({ type: 'getHistoryChat', historys: history })
      })
      .catch((reason) => {
        console.log("load conversions fail.", reason);
      });

  }
  /* 下拉加载历史消息 */
  const onRefresh = React.useCallback(() => {
    setisScroview(false);/* 是否滚动到最下面 */
    setRefreshing(true);
    getHistoryMessage(10)
    setRefreshing(false);
  }, []);

  //发送消息
  const sendMessage = (message) => {
    let data = { name: receiver, message: message, time: Date.now() }
    console.log(data);
    store.dispatch({ type: 'getChat', payload: data })
    let msg = ChatMessage.createTextMessage(
      userId,
      value,
      ChatMessageChatType.PeerChat,
    );
    const callback = new (class {
      onProgress(locaMsgId, progress) {
        rollLog(`send message process: ${locaMsgId}, ${progress}`);
      }
      onError(locaMsgId, error) {
        rollLog(`send message fail: ${locaMsgId}, ${JSON.stringify(error)}`);
      }
      onSuccess(message) {
        rollLog('send message success: ' + message.localMsgId);
      }
    })();
    rollLog('start send message ...');
    ChatClient.getInstance()
      .chatManager.sendMessage(msg, callback)
      .then(() => {
        rollLog('send message: ' + msg.localMsgId);
      })
      .catch(reason => {
        rollLog('send fail: ' + JSON.stringify(reason));
      });
  };
  //发送按钮
  const sendDo = () => {
    sendMessage(value);
    onChangeText('');
    Keyboard.dismiss();
  };

  // 输出 console log 文件
  useEffect(() => {
    logText.split('\n').forEach((value, index, array) => {
      if (index === 0) {
        console.log(value);
      }
    });
  }, [logText]);

  // 输出 UI log 文件
  const rollLog = text => {
    setWarnText(preLogText => {
      let newLogText = text;
      preLogText
        .split('\n')
        .filter((value, index, array) => {
          if (index > 8) {
            return false;
          }
          return true;
        })
        .forEach((value, index, array) => {
          newLogText += '\n' + value;
        });
      return newLogText;
    });
  };
  /* --------------------------------------------------------------= */
  // 设置消息监听器。
  const setMessageListener = () => {
    let msgListener = {
      onMessagesReceived(messages) {
        let data = []
        for (let index = 0; index < messages.length; index++) {
          data = { name: 'girl', message: messages[index].body.content, time: messages[index].serverTime }
        }
        // setItems([...items, data])
        console.log(JSON.stringify(messages) + '*********************************');
        store.dispatch({ type: 'getChat', payload: data })
      },
      onCmdMessagesReceived: messages => { },
      onMessagesRead: messages => { },
      onGroupMessageRead: groupMessageAcks => { },
      onMessagesDelivered: messages => { },
      onMessagesRecalled: messages => { },
      onConversationsUpdate: () => { },
      onConversationRead: (from, to) => { },
    };
    ChatClient.getInstance().chatManager.removeAllMessageListener();
    ChatClient.getInstance().chatManager.addMessageListener(msgListener);
  };
  props.mychat.map(item => {
    console.log(item.name);
  })
  // SDK 初始化。
  // 调用任何接口之前，请先进行初始化。
  useEffect(() => {
    init()
  }, []);
  const init = () => {
    let o = new ChatOptions({
      autoLogin: false,
      appKey: appKey,
    });
    ChatClient.getInstance().removeAllConnectionListener();
    ChatClient.getInstance()
      .init(o)
      .then(() => {
        rollLog('init success');
        this.isInitialized = true;
        let listener = {
          onTokenWillExpire() {
            rollLog('token expire.');
          },
          onTokenDidExpire() {
            rollLog('token did expire');
          },
          onConnected() {
            rollLog('login success.');
            setMessageListener();
          },
          onDisconnected(errorCode) {
            rollLog('login fail: ' + errorCode);
          },
        };
        ChatClient.getInstance().addConnectionListener(listener);

      })
  };
  //下拉加载
  const onMomentumScrollEnd = (event) => {
    const offSetY = event.nativeEvent.contentOffset.y; // 获取滑动的距离
    const contentSizeHeight = event.nativeEvent.contentSize.height; // scrollView  contentSize 高度
    const oriageScrollHeight = event.nativeEvent.layoutMeasurement.height; // scrollView高度
   
    console.log(`offSetY${offSetY}`);
    console.log(`oriageScrollHeight${oriageScrollHeight}`);
    console.log(`contentSizeHeight${contentSizeHeight}`);
    if (offSetY + oriageScrollHeight >= contentSizeHeight - 1) {
      getHistoryMessage()
    }
  };
  //底部消息提醒
  const MessageTip = () => {
    return (
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => { setkeyboard(!keyboard) }}
        >
          <Image
            style={{ flex: 1, marginRight: setWidth(90), width: setWidth(67), height: setHeight(0) }}
            source={require('../Service/image/jian.png')}
          >
          </Image>
        </TouchableOpacity >
        <TouchableOpacity style={styles.footerText} onPress={()=>{navigation.navigate('DeviceList')}}>
          <Ionicons name="reorder-three-outline" style={{ textAlignVertical: 'center' }}></Ionicons>
          <Text>保养提醒</Text>
          {maintenanceTip&&<View style={styles.footerTip}></View>}
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerText}  onPress={()=>{ navigation.navigate('Alarm')}}>
          <Ionicons name="reorder-three-outline" style={{ textAlignVertical: 'center' }}></Ionicons>
          <Text>报警信息</Text>
          {props.myalarm.length>0&&<View style={styles.footerTip}></View> }
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerText}  onPress={()=>{}}>
          <Ionicons name="reorder-three-outline" style={{ textAlignVertical: 'center' }}></Ionicons>
          <Text>下载申请</Text>
          {/* <View style={styles.footerTip}></View> */}
        </TouchableOpacity>
      </View>
    )
  }
  /* ----------------------------------------------------------------------------------------------------*/
  console.log(props.maintenanceTips);
  return (
    <>
      <SafeAreaView>
        <View style={styles.background}></View>
        <View style={styles.wraper}>
          <ScrollView showsVerticalScrollIndicator={false}
             onScrollEndDrag={onMomentumScrollEnd}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ref={scrollViewRef}
            onContentSizeChange={() => isScroview && scrollViewRef.current.scrollToEnd({ animated: true })}
            onLayout={() => isScroview && scrollViewRef.current.scrollToEnd({ animated: true })}
          >
            {
              props.mychat.map((item, index) => {
                const isFirstMessage = index === 0;
                const isWithin5Minutes = moment(item.time).diff(props.mychat[index - 1]?.time, 'minutes') < 5;
                const shouldDisplayTime = isFirstMessage || !isWithin5Minutes;
                // Format the time based on how recent the message is
                const timeFormat = moment(item.time).isSame(new Date(), 'day')
                  ? shouldDisplayTime
                    ? 'LT'
                    : null
                  : moment(item.time).isSame(new Date(), 'week')
                  ? shouldDisplayTime
                    ? 'dddd LT'
                    : 'dddd'
                  : 'YYYY-MM-DD';
                return (
                  <View key={index} style={{ flexDirection: 'row' }}>
                      {shouldDisplayTime && (
                <View style={styles.timeWraper}>       
               <Text style={styles.time}>
                 {moment(item.time).format(timeFormat)}
               </Text>
               </View>
      )}
                    <View style={[styles.chatMessage, receiver == item.name ? styles.chatReceiver : null]}>
                      <Text style={styles.messageText} selectable={true}>{item.message}</Text>
                    </View>
                    <View style={[styles.chatHead, receiver == item.name ? styles.ReceiverHead : null]}>
                      <TouchableOpacity>
                        <Image
                          style={styles.HeadrPicture}
                          source={require('../Service/image/R-C.png')}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              })
            }
          </ScrollView>
        </View>
        {keyboard ? MessageTip():
          /* 底部键盘 */
          <View style={styles.footerKeyboard}>
            <TouchableOpacity
              onPress={() => { setkeyboard(true) }}
            >
              <Image style={{ width: setWidth(67), height: setHeight(55) }} source={require('../Service/image/jian.png')}></Image>
            </TouchableOpacity>
            <TextInput
              style={styles.keybord}
              onChangeText={text => onChangeText(text)}
              // placeholder={'开始聊天吧'}
              autoFocus={true}
              value={value}
              onSubmitEditing={sendDo}
              multiline={true}
              onFocus={() => { setisScroview(true) }}
              editable={true}
            />
            <TouchableOpacity>
              <Image style={styles.footerIcon} source={require('../Service/image/表情.png')}></Image>
            </TouchableOpacity>
            {value ?
              <Button
                onPress={() => { sendDo() }}
                title="发送"
                color="#841584"
              /> :
              <TouchableOpacity>
                <Image style={styles.footerIcon} source={require('../Service/image/更多.png')}></Image>
              </TouchableOpacity>
            }
          </View>
        }
      </SafeAreaView>
    </>
  )
}
const mapStatetoProps = (state) => {
  console.log(state);
  return {
    mychat: state.chat.myChat,
    userInfo:state.user,
    userInfo:state.user,
    myalarm:state.alarm,
  }
}
export default connect(mapStatetoProps,{asyncGetAlarmData,asyncGetDevices})(CustomerService)



