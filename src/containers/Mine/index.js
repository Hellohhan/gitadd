import React,{useEffect,useRef,useState} from "react";
import { Alert, Image, Text, View ,TouchableOpacity,Modal,TextInput,Button, Dimensions, TouchableHighlight,ToastAndroid,Platform,Toast,PermissionsAndroid } from "react-native";
import MyFrame from "../../components/MyFrame";
import Icons from "../../utils/iconSets";
import styles from "./styles";
import { setHeight, setText, setWidth } from "../../utils/styleAdb";
import MyButton from "../../components/MyButton";
import {store} from "../../redux/store";
import { connect } from "react-redux";
import svg from "../../assets/svg/svg";
import { SvgXml } from "react-native-svg";
import { removeStorage, USER } from "../../utils/storage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {asyncGetDevices} from '.././../redux/actions/devices'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {UserUpdate,VersionQuery,TokenLogout,contactUs,tokenLogout} from '../../api/requestPath';
import RNFetchBlob from 'rn-fetch-blob';
import Geolocation from 'react-native-geolocation-service';
import { PERMISSIONS, request } from 'react-native-permissions'
import { useIsFocused } from '@react-navigation/native';
import axios from "../../api";
const md5 = require('blueimp-md5');
import {
  ChatClient,
  ChatOptions, RNChatSDK} from 'react-native-chat-sdk';
function  Index(props) {
 const [WeatherData, setWeatherData] = useState([])
 const [company_name, setcompany_name] = useState('')//公司名称
 const [temperature, settemperature] = useState('')//温度
 const [humidity, sethumidity] = useState('')//湿度
 const [WindPower, setWindPower] = useState('')//风力
 const [longitude, setlongitude] = useState('')//经度
 const [latitude,setlatitude ] = useState('')//纬度
 const [modalVisible, setmodalVisible] = useState(false)//控制模态框，
 const [password, setPassword] = useState('')//输入密码
 const [checkPass, setCheckPass] = useState('')//确认密码
 const [passwordValid, setPasswordValid] = useState(false);//判断密码是否输入正确
 const [checkPassValid, setCheckPassValid] = useState(false);//判断在此输入密码是否正确
 const [appKey,setappKey] = useState('1183230509163686#demo')//环信key值
 const pass1=useRef(null)//首次修改
 const pass2=useRef(null)//再次输入
 //----------------------------------
  //退出
  const loginOut=async()=>{
    let{username,token}=props.user
    console.log(username);
    try{
      let loginoutData= await tokenLogout(username,token)
      console.log(loginoutData.data,'1233211231231');
    }
   catch(e){
    console.log('退出失败',e);
   }
     ChatClient.getInstance()
     .logout()
     .then(() => {
       console.log('成功退出');
     })
    //  /Applications/Postman.app/Contents/Resources/app.asar/html/scratchpad.html
     .catch(reason => {
      console.log('logout fail:' + JSON.stringify(reason));
     });
     store.dispatch({type:'LOGIN_OUT'})
     await  props.navigation.navigate('Login')
  }
  let{id,groupId,username}=props.userInfo
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      init()
      requestLocationPermission()//获取定位权限
      getWeatherData()//获取天气数据
    props.asyncGetDevices()//获取设备数中的公司名（因为获取用户信息的接口里没有公司中文名，所以用设备接口获取字段，后期维护更改！）
    setcompany_name(props.devices[0].jsonEntity.company_name)//获取公司名

    console.log(props.devices);
    }else{
      store.dispatch({type:'loading',data:false})
    }
  }, [isFocused]);

  //获取定位
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'This app needs access to your location ' +
            'so we can provide better service.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
        Geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
            setlongitude(position.coords.latitude)//经度
            setlatitude(position.coords.longitude)//纬度
          },
          (error) => {
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
console.log(latitude);
console.log();
  //调用天气接口
  const getWeatherData=()=>{
   try{
    fetch(`http://192.168.0.15:8400/manager/weather/info?jd=${longitude}&wd=${latitude}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if(data.message==='ok'){
        // store.dispatch({type:'loading',data:false})
        let result=data.data
        // alert(result.weatherInfo.lives[0].temperature)
        setWeatherData(result)
        settemperature(result.weatherInfo.lives[0].temperature)
        sethumidity(result.weatherInfo.lives[0].temperature_float)
        setWindPower(result.weatherInfo.lives[0].windpower)
      }else{
        // store.dispatch({type:'loading',data:false})
      }
    })
   }
   catch(e){
     console.log(e);
    //  store.dispatch({type:'loading',data:false})
   }
  }
//。。。。。。。。。。。。。。。。。。
// 初始化环信聊天客户端
const init = () => {
  // 创建 ChatOptions 对象
  let o = new ChatOptions({
    autoLogin: false,
    appKey: appKey,
  });
  // 移除所有连接监听器
  ChatClient.getInstance().removeAllConnectionListener();
  // 初始化聊天客户端
  ChatClient.getInstance()
    .init(o)
    .then(async () => {
      console.log('环信初始化成功');
      // 设置初始化标志
      this.isInitialized = true;
      // 创建连接监听器
      let listener = {
        onTokenWillExpire() {
          console.log('token expire.');
        },
        onTokenDidExpire() {
          console.log('token did expire');
        },
        onConnected() {
          console.log('login success.');
          setMessageListener();
        },
        onDisconnected(errorCode) {
          console.log('login fail: ' + errorCode);
        },
      };
    })
    .catch((error) => {
      console.log (
        'init fail: ' +
          (error instanceof Object ? JSON.stringify(error) : error)
      );
    });
};
//注册&&登录环信
const registerAccount =async (data) => {
  console.log('start register account ...');
  let { username, userId } = props.user;
  let password = md5(username + userId);
  console.log(password);
  ChatClient.getInstance()
    .createAccount(username, password)
    .then(response => {
      console.log(`register success: userName = ${username}, password = ******`);
    })
    .catch(error => {
      console.log('register fail: ' + JSON.stringify(error));
    });
   console.log('start login ...');
  await  ChatClient.getInstance()
      .login(username, password)
      .then(() => {
       console.log('login operation success.');
      })
      .catch(reason => {
       console.log('login fail: ' + JSON.stringify(reason));
      });
     await props.navigation.navigate('TabNews',{servce:false})
     store.dispatch({type:'NewsHeaderTrue'})
};
console.log(props.user);
 //点击修改密码
 const changePassword=()=>{
  setmodalVisible(true)
 }
 //初次密码
const validatePassword = () => {
  if (password.length === 0) {
    alert('密码不能为空')
  } else if (!/^[a-zA-Z]/.test(password) || password.length < 8 || password.length > 16) {
    alert('密码长度8-16位,首字母必须是字母')
    pass1.current.setNativeProps({ text: '' });
    pass2.current.setNativeProps({ text: '' });
    setPasswordValid(false);
    setCheckPassValid(false);
  } else {
    setPasswordValid(true);
    return true;
  }
};
//再次密码
const validateCheckPass = () => {
  if (checkPass.length === 0) {
   alert('再次输入密码')
  } else if (checkPass !== password) {
     alert('两次密码不匹配')
      pass1.current.setNativeProps({ text: '' });
      pass2.current.setNativeProps({ text: '' });
  } else {
    setCheckPassValid(true);
    return true;
  }
};
 //确定按钮
const handleSubmit = async () => {
  if (validatePassword() && validateCheckPass()) {
    const password=checkPass//再次输入的密码
    // console.log(password);
    console.log(props.user);
    const user = {
      'id': props.user.id,
      'password': password,
      'enable': true
    }
     try
     {
      let result= await axios.authPost(UserUpdate,user)
    if (result.ok === true){
      if(Platform.OS='android'){
        ToastAndroid.show('密码修改成功！', ToastAndroid.SHORT);
       }else{
         alert('密码修改成功!')
       }
        //关闭Dialog
       // 退出登录,去登录界面
        store.dispatch({type:'LOGIN_OUT'})
        setmodalVisible(false)
        setPassword(''),
        setCheckPass('')
        setPasswordValid(false)
        setCheckPassValid(false)
        props.navigation.navigate('Login')
      }
     }
     catch(e){
      console.log('密码修改失败');
     }
  } 
};
 //取消按钮
 const cancle=()=>{ 
  setmodalVisible(false)
  setPassword(''),
  setCheckPass('')
  setPasswordValid(false)
  setCheckPassValid(false)
 }

 //。。。。。。。。。
 /* 版本更新 */
 const versionUpdate = async () => {
  var data = {
    "versionStatus":"1",
    "platform":"android_admin"
  }
  try{
    let result=await axios.authPost(VersionQuery,data)
    if (result.data.records.length){
      var version = result.data.records[0]
     downloadFile(version.versionUrl)
       if (Platform.OS === 'android' && Platform.Version < version.minVersionNumber){
         alert(123)
         Alert.alert(
           '版本更新',
           `最新版本: ${version.versionNumber}`,
           [
             {
               text: '取消',
               style: 'cancel'
             },
             {
               text: '立即更新',
               onPress: ()=> downloadFile(version.versionUrl)
             }
           ],
           { cancelable: false }
         )
       }else{
        if(Platform.OS='android'){
         ToastAndroid.show('当前已是最新版本!', ToastAndroid.SHORT);
        }else{
          alert('当前已是最新版本!')
        }
    }
  }
  }
  catch(e){
    console.log(e);
  }
}


async function  downloadFile (url){
  const [myProgressIsShow, setMyProgressIsShow] = useState(false);
  const [myProgressPercentage, setMyProgressPercentage] = useState(0);

  let filename = url.split('?')[1].split('/')[1];
  let path = RNFetchBlob.fs.dirs.DownloadDir + '/landsky/' + filename;
  RNFetchBlob.fs.exists(path)
    .then((exists) => {
      if (exists) {
        // 文件已存在打开它
        RNFetchBlob.android.actionViewIntent(path, 'application/*');
      } else {
        // 文件不存在，请下载
        let config = {
          fileCache: true,
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            path: RNFetchBlob.fs.dirs.DownloadDir + '/landsky/' + filename,
            description: 'Downloading file...',
          },
        };
        let task = RNFetchBlob.config(config).fetch('GET', url);
        task.progress((received, total) => {
          setMyProgressIsShow(true);
          setMyProgressPercentage(Math.ceil((received / total) * 100));
        });
        task.then((res) => {
          setMyProgressIsShow(false);
          setMyProgressPercentage(0);
          // 打开文件
          RNFetchBlob.android.actionViewIntent(path, 'application/*');
        });
      }
    });
  }
  console.log(company_name);
  return (
    <MyFrame>
  <View style={styles.titleWraper2}>
             <TouchableOpacity  onPress={()=>{props.navigation.navigate('TabMain')}} style={{width:setWidth(140)}}>
             <SvgXml xml={svg.goBack} style={styles.Svg} 
                fill={"black"}>
              </SvgXml> 
              </TouchableOpacity> 
             <Text style={styles.title}>{'我的'}</Text>
             <TouchableOpacity  onPress={loginOut}>
              <Text style={styles.loginOut}>退出登录</Text>
             </TouchableOpacity>
             </View>
      {/*公司名称*/}
      <View style={styles.comName}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.comNameRound} />
          <Text style={[styles.comNameText, { marginRight: setWidth(36) }]}>ID</Text>
          <Text style={styles.comNameText}>{username}</Text>
        </View>
        <Text style={{ fontSize: setText(34), color: "#7B7F93" }}>{company_name}</Text>
      </View>
      {/* 天气 */}
      <View style={styles.weatherWrap}>
        {/*第一行*/}
        <View style={styles.weatherOneWrap}>
          <Text style={styles.weatherOneText}>今日天气</Text>
          <Image source={require("./images/position.png")} style={styles.weatherOneImg} />
          {/* <Text style={{ fontSize: setText(36), color: "#909097" }}>{WeatherData.weatherCityName}</Text> */}
          <Image source={require("./images/weather/cloudy.png")}
                 style={{
                   width: setWidth(300),
                   height: setWidth(300),
                   position: "absolute",
                   right: setWidth(-20),
                   top: setWidth(-190),
                 }}
          />
        </View>
        {/*  第二行*/}
        <View style={styles.weatherTwoWrap}>
          <View style={{ alignItems: "center", justifyContent: "flex-end" }}>
            <Image source={require("./images/temperature.png")} style={{ width: setWidth(36), height: setWidth(64) }} />
            <View style={styles.weatherTwoTextWrap}>
              <Text style={{ fontSize: setText(34), color: "#9C9CA3" }}>{temperature}</Text>
              <Icons name="sheshidu" size={setText(34)} color="#9C9CA3" style={{ marginTop: setWidth(10) }} />
            </View>
            <Text style={styles.weatherTwoBotText}>温度</Text>
          </View> 
          
          <View style={{ alignItems: "center", justifyContent: "flex-end" }}>
            <Image source={require("./images/humidity.png")} style={{ width: setWidth(41), height: setWidth(53) }} />
            <View style={styles.weatherTwoTextWrap}>
              <Text style={styles.weatherTwoText}>{humidity}</Text>
              <Text style={{ fontSize: setText(34), color: "#9C9CA3" }}>%</Text>
            </View>
            <Text style={styles.weatherTwoBotText}>湿度</Text>
          </View>
          <View style={{ alignItems: "center", justifyContent: "flex-end" }}>
            <Image source={require("./images/windpower.png")} style={{ width: setWidth(88), height: setWidth(67) }} />
            <View style={styles.weatherTwoTextWrap}>
              <Text style={styles.weatherTwoText}>{WindPower}</Text>
              <Text style={{ fontSize: setText(34), color: "#9C9CA3" }}>级</Text>
            </View>
            <Text style={styles.weatherTwoBotText}>风力</Text>
          </View>
        </View>
      </View>

      {/* 4个导航按钮 */}
      <View style={styles.midNavWrap}>
        <MyButton onPress={() => {
          props.navigation.navigate('figureout')
        }}
                  style={{ paddingHorizontal: setWidth(10), paddingVertical: setWidth(10) }}>
          <View style={styles.midNavBut}>
            <Image source={require("./images/midNav/handleComplete.png")}
                   style={{ width: setWidth(71), height: setWidth(70) }} />
            <Text style={styles.midNavText}>处理完成</Text>
          </View>
        </MyButton>
        <MyButton onPress={() => {
        }}
                  style={{ paddingHorizontal: setWidth(10), paddingVertical: setWidth(10) }}>
          <View style={styles.midNavBut}>
            <Image source={require("./images/midNav/dataDownLoad.png")}
                   style={{ width: setWidth(71), height: setWidth(70) }} />
            <Text style={styles.midNavText}>数据下载</Text>
          </View>
        </MyButton>
        <MyButton onPress={() => {
          props.navigation.navigate('AfterSale')
        }}
                  style={{ paddingHorizontal: setWidth(10), paddingVertical: setWidth(10) }}>
          <View style={styles.midNavBut}>
            <Image source={require("./images/midNav/AfterSalesService.png")}
                   style={{ width: setWidth(69), height: setWidth(70) }} />
            <Text style={styles.midNavText}>售后服务</Text>
          </View>
        </MyButton>
        <MyButton onPress={() => {
          props.navigation.navigate('DeviceList')
        }}
                  style={{ paddingHorizontal: setWidth(10), paddingVertical: setWidth(10) }}>
          <View style={styles.midNavBut}>
            <Image source={require("./images/midNav/maintenanceInquiry.png")}
                   style={{ width: setWidth(71), height: setWidth(70) }} />
            <Text style={styles.midNavText}>保养查询</Text>
          </View>
        </MyButton>
      </View>
      {/*  设置列表*/}
      <View style={styles.setListWrap}>
        <MyButton
          style={{ paddingHorizontal: setWidth(10), paddingVertical: setWidth(10), marginBottom: setWidth(40) }}
          onPress={() => {
            props.navigation.navigate('DeviceManager')
          }}>
          <View style={styles.setListItem}>
            <View style={styles.setListItemLeft}>
              <Image source={require("./images/setList/aboutDevice.png")}
                     style={{ width: setWidth(51), height: setWidth(70) }} />
              <Text style={styles.setListItemText}>关于设备</Text>
            </View>
            <Image source={require("./images/setList/toRight.png")}
                   style={{ width: setWidth(25), height: setWidth(45) }} />
          </View>
        </MyButton>
        <MyButton
          style={{ paddingHorizontal: setWidth(10), paddingVertical: setWidth(10), marginBottom: setWidth(40) }}
          onPress={() => {
         
          registerAccount(1)
          }}>
          <View style={styles.setListItem}>
            <View style={styles.setListItemLeft}  >
              <Image source={require("./images/setList/manualCustomerService.png")}
                     style={{ width: setWidth(68), height: setWidth(59) }} />
              <Text style={styles.setListItemText}>人工客服</Text>
            </View>
            <Image source={require("./images/setList/toRight.png")}
                   style={{ width: setWidth(25), height: setWidth(45) }} />
          </View>
        </MyButton>

        <MyButton
          style={{ paddingHorizontal: setWidth(10), paddingVertical: setWidth(10), marginBottom: setWidth(40) }}
          onPress={changePassword}>

          <View style={styles.setListItem}>
            <View style={styles.setListItemLeft}>
              <Image source={require("./images/setList/password.png")}
                     style={{ width: setWidth(46), height: setWidth(63), marginLeft: setWidth(5) }} />
              <Text style={styles.setListItemText}>修改密码</Text>
            </View>
            <Image source={require("./images/setList/toRight.png")}
                   style={{ width: setWidth(25), height: setWidth(45) }} />
          </View>
        </MyButton>

        <MyButton
          style={{ paddingHorizontal: setWidth(10), paddingVertical: setWidth(10) }}
          onPress={versionUpdate}>

          <View style={[styles.setListItem, { marginBottom: 0 }]}>
            <View style={styles.setListItemLeft}>
              <Image source={require("./images/setList/deviceUpdate.png")}
                     style={{ width: setWidth(70), height: setWidth(68) }} />
              <Text style={styles.setListItemText}>设备更新</Text>
            </View>
            <Image source={require("./images/setList/toRight.png")}
                   style={{ width: setWidth(25), height: setWidth(45) }} />
          </View>
        </MyButton>
    










    <Modal visible={modalVisible} animationType="slide">
      <View style={{width:'100%',paddingVertical:setHeight(50)}}> 
        <Text style={{textAlign:'center',fontSize:setText(60),color:'black',fontWeight:'700'}}>修改密码</Text>
      </View>
      <View style={{ padding: setWidth(40) }}>
        <TextInput
          ref={pass1}
          placeholder="密码"
          style={styles.Myinput}
          value={password}
          secureTextEntry={true}
          onChangeText={(e) => {
            setPassword(e);
            setPasswordValid(false);
          }}
          onBlur={validatePassword}
    
        />
        {passwordValid && <FontAwesome name="check"  color= 'green'style={{ color: 'green',position:'absolute',right:setWidth(70),top:setWidth(100) }} />}
        <TextInput
         ref={pass2}
          placeholder="确认密码"
          style={[styles.Myinput, styles.secondinput]}
          value={checkPass}
          secureTextEntry={true}
          onChangeText={(e) => {
            setCheckPass(e);
            setCheckPassValid(false);
          }}
          onBlur={validateCheckPass}
        />
        {checkPassValid && <FontAwesome name="check"  color= 'green'style={{ color: 'green',position:'absolute',right:setWidth(70),top:setWidth(225) }} />}
        <View style={styles.buttonWrape}>
          <TouchableHighlight activeOpacity={0.6} underlayColor="#DDDDDD" onPress={cancle}>
            <View style={[styles.qwe, styles.MyButton2]}>
              <Text style={{ color: '#FFF' }}>取消</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={handleSubmit}
          >
            <View style={styles.MyButton}>
              <Text style={{ color: '#FFF' }}>确定</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
      </View>
    </MyFrame>

  );
}
const mapStateToProps=(state)=>{

  return{
   mySelf:state.mySelf.isNews,
   userInfo:state.user,
   devices: state.devices,
   user:state.user
  }
 }
 export default connect(mapStateToProps,{asyncGetDevices})(Index) ;
 
 
 
// // 导入依赖库
// import React, {useEffect} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
// } from 'react-native';
// import {
//   ChatClient,
//   ChatOptions,
//   ChatMessageChatType,
//   ChatMessage,
// } from 'react-native-chat-sdk';

// // 创建 app
// const App = () => {
//   // 进行 app 设置
//   const title = 'ChatQuickstart';
//   const [appKey, setAppKey] = React.useState('1183230509163686#demo');
//   const [username, setUsername] = React.useState('test2');
//   const [password, setPassword] = React.useState('xishuashua123');
//   const [userId, setUserId] = React.useState('');
//   const [content, setContent] = React.useState('');
//   const [logText, setWarnText] = React.useState('Show log area');

//   // 输出 console log 文件
//   useEffect(() => {
//     logText.split('\n').forEach((value, index, array) => {
//       if (index === 0) {
//         console.log(value);
//       }
//     });
//   }, [logText]);
//   useEffect(async() => {
//    await init()
//   //  await registerAccount()

//   }, [])
  
//   // 输出 UI log 文件
//   const rollLog = text => {
//     setWarnText(preLogText => {
//       let newLogText = text;
//       preLogText
//         .split('\n')
//         .filter((value, index, array) => {
//           if (index > 8) {
//             return false;
//           }
//           return true;
//         })
//         .forEach((value, index, array) => {
//           newLogText += '\n' + value;
//         });
//       return newLogText;
//     });
//   };


//   // SDK 初始化。
//   // 调用任何接口之前，请先进行初始化。
//   const init = () => {
//     let o = new ChatOptions({
//       autoLogin: false,
//       appKey: appKey,
//     });
//     ChatClient.getInstance().removeAllConnectionListener();
//     ChatClient.getInstance()
//       .init(o)
//       .then(() => {
//         rollLog('init success');
//         this.isInitialized = true;
//         let listener = {
//           onTokenWillExpire() {
//             rollLog('token expire.');
//           },
//           onTokenDidExpire() {
//             rollLog('token did expire');
//           },
//           onConnected() {
//             rollLog('login success.');
//             setMessageListener();
//           },
//           onDisconnected(errorCode) {
//             rollLog('login fail: ' + errorCode);
//           },
//         };
//         ChatClient.getInstance().addConnectionListener(listener);
//       })
//       .catch(error => {
//         rollLog(
//           'init fail: ' +
//             (error instanceof Object ? JSON.stringify(error) : error),
//         );
//       });
//   };

//   // 注册账号。
//   const registerAccount = () => {
//     rollLog('start register account ...');
//     ChatClient.getInstance()
//       .getAccessToken()
//       .then(token => {
//         ChatClient.getInstance()
//           .createAccount(username, password, token.access_token)
//           .then(response => {
//             console.log(`注册成功: userName = ${username}, password = ******`);
//           })
//           .catch(error => {
//             console.log('注册失败' + JSON.stringify(error));
//           });
//       })
//       .catch(error => {
//         console.log('获取 token 失败' + JSON.stringify(error));
//       });
//   };

//   // 用环信即时通讯 IM 账号和密码登录。
//   const loginWithPassword = () => {
//     // if (this.isInitialized === false || this.isInitialized === undefined) {
//     //   rollLog('Perform initialization first.');
//     //   return;
//     // }
//     rollLog('start login ...');
//     ChatClient.getInstance()
//       .login(username, password)
//       .then(() => {
//         console.log('login operation success.');
//       })
//       .catch(reason => {
//         console.log('login fail: ' + JSON.stringify(reason));
//       });
//   };

//   // 登出。
//   const logout = () => {
//     // if (this.isInitialized === false || this.isInitialized === undefined) {
//     //   rollLog('Perform initialization first.');
//     //   return;
//     // }
//     rollLog('start logout ...');
//     ChatClient.getInstance()
//       .logout()
//       .then(() => {
//         rollLog('logout success.');
//       })
//       .catch(reason => {
//         rollLog('logout fail:' + JSON.stringify(reason));
//       });
//   };

//   // 发送一条文本消息。
//   const sendmsg = () => {
//     // if (this.isInitialized === false || this.isInitialized === undefined) {
//     //   rollLog('Perform initialization first.');
//     //   return;
//     // }
//     let msg = ChatMessage.createTextMessage(
//       userId,
//       content,
//       ChatMessageChatType.PeerChat,
//     );
//     const callback = new (class {
//       onProgress(locaMsgId, progress) {
//         rollLog(`send message process: ${locaMsgId}, ${progress}`);
//       }
//       onError(locaMsgId, error) {
//         rollLog(`send message fail: ${locaMsgId}, ${JSON.stringify(error)}`);
//       }
//       onSuccess(message) {
//         rollLog('send message success: ' + message.localMsgId);
//       }
//     })();
//     rollLog('start send message ...');
//     ChatClient.getInstance()
//       .chatManager.sendMessage(msg, callback)
//       .then(() => {
//         rollLog('send message: ' + msg.localMsgId);
//       })
//       .catch(reason => {
//         rollLog('send fail: ' + JSON.stringify(reason));
//       });
//   };

//   // UI 组件渲染。
//   return (
//     <SafeAreaView>
//       <View style={styles.titleContainer}>
//         <Text style={styles.title}>{title}</Text>
//       </View>
//       <ScrollView>
//         <View style={styles.inputCon}>
//           <TextInput
//             multiline
//             style={styles.inputBox}
//             placeholder="Enter appkey"
//             onChangeText={text => setAppKey(text)}
//             value={appKey}
//           />
//         </View>
//         <View style={styles.buttonCon}>
//           <Text style={styles.btn2} onPress={init}>
//             INIT SDK
//           </Text>
//         </View>
//         <View style={styles.inputCon}>
//           <TextInput
//             multiline
//             style={styles.inputBox}
//             placeholder="Enter username"
//             onChangeText={text => setUsername(text)}
//             value={username}
//           />
//         </View>
//         <View style={styles.inputCon}>
//           <TextInput
//             multiline
//             style={styles.inputBox}
//             placeholder="Enter password"
//             onChangeText={text => setPassword(text)}
//             value={password}
//           />
//         </View>
//         <View style={styles.buttonCon}>
//           <Text style={styles.eachBtn} onPress={registerAccount}>
//             SIGN UP
//           </Text>
//           <Text style={styles.eachBtn} onPress={loginWithPassword}>
//             SIGN IN
//           </Text>
//           <Text style={styles.eachBtn} onPress={logout}>
//             SIGN OUT
//           </Text>
//         </View>
//         <View style={styles.inputCon}>
//           <TextInput
//             multiline
//             style={styles.inputBox}
//             placeholder="Enter the username you want to send"
//             onChangeText={text => setUserId(text)}
//             value={userId}
//           />
//         </View>
//         <View style={styles.inputCon}>
//           <TextInput
//             multiline
//             style={styles.inputBox}
//             placeholder="Enter content"
//             onChangeText={text => setContent(text)}
//             value={content}
//           />
//         </View>
//         <View style={styles.buttonCon}>
//           <Text style={styles.btn2} onPress={sendmsg}>
//             SEND TEXT
//           </Text>
//         </View>
//         <View>
//           <Text style={styles.logText} multiline={true}>
//             {logText}
//           </Text>
//         </View>
//         <View>
//           <Text style={styles.logText}>{}</Text>
//         </View>
//         <View>
//           <Text style={styles.logText}>{}</Text>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// // 设置 UI。
// const styles = StyleSheet.create({
//   titleContainer: {
//     height: 60,
//     backgroundColor: '#6200ED',
//   },
//   title: {
//     lineHeight: 60,
//     paddingLeft: 15,
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: '700',
//   },
//   inputCon: {
//     marginLeft: '5%',
//     width: '90%',
//     height: 60,
//     paddingBottom: 6,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   inputBox: {
//     marginTop: 15,
//     width: '100%',
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
//   buttonCon: {
//     marginLeft: '2%',
//     width: '96%',
//     flexDirection: 'row',
//     marginTop: 20,
//     height: 26,
//     justifyContent: 'space-around',
//     alignItems: 'center',
//   },
//   eachBtn: {
//     height: 40,
//     width: '28%',
//     lineHeight: 40,
//     textAlign: 'center',
//     color: '#fff',
//     fontSize: 16,
//     backgroundColor: '#6200ED',
//     borderRadius: 5,
//   },
//   btn2: {
//     height: 40,
//     width: '45%',
//     lineHeight: 40,
//     textAlign: 'center',
//     color: '#fff',
//     fontSize: 16,
//     backgroundColor: '#6200ED',
//     borderRadius: 5,
//   },
//   logText: {
//     padding: 10,
//     marginTop: 10,
//     color: '#ccc',
//     fontSize: 14,
//     lineHeight: 20,
//   },
// });

// export default App;

