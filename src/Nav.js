import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, LogBox, Text, TouchableOpacity, View, AsyncStorage ,ImageBackground,Dimensions} from "react-native";
import { SvgXml } from "react-native-svg";

import svg from "./assets/svg/svg";
import { setHeight, setText, setWidth } from "./utils/styleAdb";
import StartScreen from "./components/StartScreen";
import Login from "./containers/Login";
import Main from "./containers/Main";
import News from "./containers/News";
import Mine from "./containers/Mine";
import { store } from "./redux/store";
import DeviceManager from "./containers/Main/DeviceManager";
import ConfigDiagram from "./containers/Main/DeviceManager/ConfigDiagram";
import Alarm from "./containers/Main/Alarm";
import ErrorCancel from "./containers/Main/Alarm/Error";
import Figureout from "./containers/Main/Alarm/figureout";
import ExceptionSpecification from "./containers/Main/Alarm/exceptionspecification";
import Remote from "./containers/Main/Remote";
import AfterSale from "./containers/Main/AfterSale";
// import DeviceList from "./containers/Main/DeviceList"
import applyDetail from './containers/News/Detail'
import MaintenanceInquiry from "./containers/Main/MaintenanceInquiry";
import Chat from './containers/News/Chat'
import Service from "./containers/News/Service/Service";

import Video from "./containers/Main/Video"
import JPush from 'jpush-react-native';

import DeviceList from "./containers/Main/DeviceList"
import Maintenancedetails from "./containers/Main/DeviceList/Maintenancedetails"
import Maintenancedetails2 from "./containers/Main/DeviceList/Maintenancedetails2"
import Maintenancerecords from "./containers/Main/DeviceList/Maintenancerecords"
import MaintenanceEquipment from "./containers/Main/DeviceList/MaintenanceEquipment"

import Salescontent from "./containers/Main/AfterSale/Salescontent"
import { getStorage, USER } from "./utils/storage";
import { connect } from "react-redux";
import { ChatClient, ChatOptions } from 'react-native-chat-sdk';
import Scan from './components/Scan'
import Map from './containers/Main/DeviceManager/Map'
import Graph from './containers/Main/DeviceManager/Graph'

import watchVideo from './components/watchVideo'

// import FullVideo from './components/FullVideo'
// Ignore all log notifications:
LogBox.ignoreAllLogs();
const MineStack = createNativeStackNavigator();
function TabMineStack() {
  return (
    <MineStack.Navigator
      screenOptions={{
        animation: "default",
      }}>
      <MineStack.Screen name="Mine"
        component={Mine}
        options={{ headerShown: false }}
      />
    </MineStack.Navigator>
  );
}
const NewsStack = createNativeStackNavigator();
function TabNewsStack(props) {
  return (
    <NewsStack.Navigator
      screenOptions={{
        animation: "default",
      }}>
      <NewsStack.Screen name="News"
        component={News}
        options={{
          headerShown: false,
        }}
      />
      <NewsStack.Screen
        name="ApplyDetail"
        component={applyDetail}
        options={{
          title: '申请记录',
          headerTitleStyle: {
            fontWeight: "600",
            fontSize: setText(50),
            color: "black",
          },
          headerLeft: (a, b, c) => (
            <TouchableOpacity
              onPress={() => { props.navigation.goBack(); }}
              style={{ width: setWidth(80), height: setWidth(120), justifyContent: "center" }}>
              <SvgXml xml={svg.goBack} width={setWidth(40)} height={setWidth(60)}
                fill={"black"}>
              </SvgXml>
            </TouchableOpacity>
          ),
          headerTitleAlign: "left",
          headerTransparent: true,
        }}
      />
    </NewsStack.Navigator>
  );
}
//-------------------------------------------------------------------

const MainStack = createNativeStackNavigator();

function TabMainStack({ navigation }) {
    
  return (
    <MainStack.Navigator
      screenOptions={{
        animation: "default",
        initialRouteName: 'DeviceManager'
      }}>
      <MainStack.Screen name="Main"
        component={Main}
        options={{
          headerShown: false,
          headerTransparent: true,
        }}
      />
       <MainStack.Screen name="Alarm" component={Alarm}
        options={{
          title: "报警信息",
          headerTransparent: true,
          headerStyle: {},
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: setText(52),
          },
          headerTitleAlign: "center",
          headerRight: () => (
            <Text style={{ color: "#fff" }}>筛选</Text>
          ),
          headerLeft: (a, b, c) => (
            <TouchableOpacity onPress={() => {
              navigation.goBack();
            }} style={{ width: setWidth(80), height: setWidth(120), justifyContent: "center" }}>
              <SvgXml xml={svg.goBack} width={setWidth(40)} height={setWidth(60)}
                fill={"#fff"}>
              </SvgXml>
            </TouchableOpacity>
          ),
        }} />
        <MainStack.Screen name="figureout" component={Figureout}
        options={{
          title: "处理完成信息",
          headerTransparent: true,
          headerTintColor: "#000025",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: setText(52),
          },
          headerTitleAlign: "center",
          headerRight: () => (
            <Text style={{ color: "blue" }}>筛选</Text>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => {
              navigation.goBack();
            }} style={{ width: setWidth(80), height: setWidth(120), justifyContent: "center" }}>
              <SvgXml xml={svg.goBack} width={setWidth(40)} height={setWidth(60)}
                fill={"#000025"}></SvgXml>
            </TouchableOpacity>
          ),
        }} />
        <MainStack.Screen name="ErrorCancel" component={ErrorCancel}
          options={{
            title:"异常处理",
            headerTransparent:true,
            headerTintColor: '#000025',
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: setText(52)
            },
            headerTitleAlign:'center',
            headerLeft:()=>(
              <TouchableOpacity onPress={() => {
                navigation.goBack();
              }} style={{ width: setWidth(80), height: setWidth(120), justifyContent: "center" }}>
                <SvgXml xml={svg.goBack} width={setWidth(40)} height={setWidth(60)}
                  fill={"#000025"}></SvgXml>
              </TouchableOpacity>
            )
          }}
        />
         <MainStack.Screen name="ExceptionSpecification" component={ExceptionSpecification}
          options={{
            title:"异常处理说明",
            headerTransparent:true,
            headerTintColor: '#000025',
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: setText(52)
            },
            headerTitleAlign:'center',
            headerLeft:()=>(
              <TouchableOpacity onPress={() => {
                navigation.goBack();
              }} style={{ width: setWidth(80), height: setWidth(120), justifyContent: "center" }}>
                <SvgXml xml={svg.goBack} width={setWidth(40)} height={setWidth(60)}
                  fill={"#000025"}></SvgXml>
              </TouchableOpacity>
            )
          }}
        />
      <MainStack.Screen name="DeviceManager" component={DeviceManager}
        options={{
          title: "设备管理",
          headerTransparent: true,
          headerTintColor: "#000025",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: setText(52),
          },
          headerTitleAlign: "center",
          headerRight: () => (
            <Text style={{ color: "black" }}>筛选</Text>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => {
              navigation.goBack();
            }} style={{ width: setWidth(80), height: setWidth(120), justifyContent: "center" }}>
              <SvgXml xml={svg.goBack} width={setWidth(40)} height={setWidth(60)}
                fill={"#000025"}></SvgXml>
            </TouchableOpacity>
          ),
        }} />
      <MainStack.Screen name="ConfigDiagram" component={ConfigDiagram}
        options={() => ({
          title: "状态查看",
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: setText(52),
          },
          headerTitleAlign: "center",
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity style={{ width: setWidth(80), height: setWidth(120), justifyContent: "center" }}>
              <SvgXml xml={svg.goBack} width={setWidth(40)} height={setWidth(60)}
                fill={"#fff"}></SvgXml>
            </TouchableOpacity>
          ),
        })} />
      <MainStack.Screen name="Remote" component={Remote}
        options={{
          title: "远程视频",
          headerStyle: {
            backgroundColor: "rgba(0,0,0,0)",
          },
          headerTransparent: true,
          headerTintColor: "#000000",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: setText(52),
          },
          headerBackTitle: "",
          headerTitleAlign: 'center',
          headerRight: () => (
            <Text style={{ color: "black" }}>筛选</Text>
          ),
          headerLeft: (a, b, c) => (
            <TouchableOpacity onPress={() => {
              navigation.goBack();
            }} style={{ width: setWidth(80), height: setWidth(120), justifyContent: "center" }}>
              <SvgXml xml={svg.goBack} width={setWidth(40)} height={setWidth(60)}
                fill={"black"}></SvgXml>
            </TouchableOpacity>
          ),
        }} />
      <MainStack.Screen name="Video" component={Video}
        options={{
          title: "查看视频",
          headerStyle: {
            backgroundColor: "rgba(0,0,0,0)",

          },
          headerTransparent: true,
          headerTintColor: "#4e4e4e",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: setText(52),
          },
          headerBackTitle: "",
          headerTitleAlign: 'center',
          headerLeft: (a, b, c) => (
            <TouchableOpacity onPress={() => {
              navigation.goBack();
            }} style={{ width: setWidth(80), height: setWidth(120), justifyContent: "center" }}>
              <SvgXml xml={svg.goBack} width={setWidth(40)} height={setWidth(60)}
                fill={"black"}></SvgXml>
            </TouchableOpacity>
          ),
        }} />
      <MainStack.Screen name="AfterSale" component={AfterSale}
        options={{
          title: "售后管理",
          headerStyle: {
            backgroundColor: "rgba(0,0,0,0)",

          },
          headerTransparent: true,
          headerTintColor: "#000000",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: setText(52),
          },
          headerBackTitle: "",
          headerTitleAlign: 'center',
          headerLeft: (a, b, c) => (
            <TouchableOpacity onPress={() => {
              navigation.goBack();
            }} style={{ width: setWidth(80), height: setWidth(120), justifyContent: "center" }}>
              <SvgXml xml={svg.goBack} width={setWidth(40)} height={setWidth(60)}
                fill={"black"}></SvgXml>
            </TouchableOpacity>
          ),
        }} />

      <MainStack.Screen name="Salescontent" component={Salescontent}
        options={{
          headerShown: false,
        }} />
      {/*保养查询界面*/}
      <MainStack.Screen name="DeviceList" component={DeviceList}
        options={{
          title: "保养查询",
          headerStyle: {
            backgroundColor: "rgba(0,0,0,0)",
          },
          headerTransparent: true,
          headerTintColor: "#000000",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: setText(52),
          },
          headerBackTitle: "",
          headerTitleAlign: 'center',
          headerLeft: (a, b, c) => (
            <TouchableOpacity onPress={() => {
              navigation.goBack();
            }} style={{ width: setWidth(80), height: setWidth(120), justifyContent: "center" }}>
              <SvgXml xml={svg.goBack} width={setWidth(40)} height={setWidth(60)}
                fill={"black"}></SvgXml>
            </TouchableOpacity>
          ),
        }} />
      {/*逾期 保养详情 */}
      <MainStack.Screen name="Maintenancedetails" component={Maintenancedetails}
        options={{
          headerShown: false,
        }}
      />
      {/* 不需要 保养详情 */}
      <MainStack.Screen name="Maintenancedetails2" component={Maintenancedetails2}
        options={{
          headerShown: false,
        }}
      />
      {/* 保养记录 */}
      <MainStack.Screen name="Maintenancerecords" component={Maintenancerecords}
        options={{
          title: "保养记录",
          headerStyle: {
            backgroundColor: "rgba(0,0,0,0)",
          },
          headerTransparent: true,
          headerTintColor: "#000000",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: setText(52),
          },
          headerBackTitle: "",
          headerTitleAlign: 'center',
          headerLeft: (a, b, c) => (
            <TouchableOpacity onPress={() => {
              navigation.goBack();
            }} style={{ width: setWidth(80), height: setWidth(120), justifyContent: "center" }}>
              <SvgXml xml={svg.goBack} width={setWidth(40)} height={setWidth(60)}
                fill={"black"}></SvgXml>
            </TouchableOpacity>
          ),
        }} />
      {/* 设备保养 */}
      <MainStack.Screen name="MaintenanceEquipment" component={MaintenanceEquipment}
        options={{
          title: "设备保养",
          headerStyle: {
            backgroundColor: "rgba(0,0,0,0)",
          },
          headerTransparent: true,
          headerTintColor: "#000000",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: setText(52),
          },
          headerBackTitle: "",
          headerTitleAlign: 'center',
          headerLeft: (a, b, c) => (
            <TouchableOpacity onPress={() => {
              navigation.goBack();
            }} style={{ width: setWidth(80), height: setWidth(120), justifyContent: "center" }}>
              <SvgXml xml={svg.goBack} width={setWidth(40)} height={setWidth(60)}
                fill={"black"}></SvgXml>
            </TouchableOpacity>
          ),
        }} />
      {/*保养查询界面*/}
      <MainStack.Screen name="MaintenanceInquiry" component={MaintenanceInquiry}
        options={{
          title: "保养查询",
          headerTransparent: true,
          headerStyle: {},
          headerTintColor: "#000025",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: setText(52),
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <SvgXml onPress={() => {
              navigation.goBack();
            }} xml={svg.goBack} width={setWidth(40)} height={setWidth(60)} fill={"#000025"}></SvgXml>
          )
        }} />
    </MainStack.Navigator>
  );
};
const Chats = createNativeStackNavigator()
const MyChat = (props) => {
  return (
    <Chats.Navigator>
      <Chats.Screen
        name="Chat"
        component={Chat}
        options={{
          title: "test 1 ",
          headerTransparent: true,
          headerStyle: {},
          headerTintColor: "#000025",
          headerTitleStyle: {
            fontSize: setText(52),
          },
          headerTitleAlign: "center",
          headerLeft: (a, b, c) => (
            <TouchableOpacity
              onPress={() => {
                store.dispatch({ type: 'NewsHeaderTrue' })
                props.navigation.goBack();
              }}
              style={{ width: setWidth(80), height: setWidth(120), justifyContent: "center" }}>
              <SvgXml xml={svg.goBack} width={setWidth(40)} height={setWidth(60)}
                fill={"black"}>
              </SvgXml>
            </TouchableOpacity>
          ),
        }}
      >
      </Chats.Screen>
    </Chats.Navigator>
  )
}

  //  const Maps= createNativeStackNavigator();
  //  function myMap(props){
  //   return(
  //     <Maps.Navigator >
  //     <Maps.Screen name="Map" component={Map}
  //      options={{
  //       title: "设备地图",
  //       headerTransparent:true,
  //       headerTintColor: "#000025",
  //       headerTitleAlign: 'left',
  //       headerTitleStyle: {
  //         fontWeight: "bold",
  //         fontSize: setText(52),
  //       },
  //       headerLeft: (a, b, c) => (
  //         <TouchableOpacity onPress={() => {
  //           props.navigation.goBack();
  //         }} style={{ width: setWidth(80), height: setWidth(120), justifyContent: "center" }}>
  //           <SvgXml xml={svg.goBack} width={setWidth(40)} height={setWidth(60)}
  //             fill={"black"}></SvgXml>
  //         </TouchableOpacity>
  //       ),
  //     }} 
  //     />
  //     </Maps.Navigator>
  //   )
  //  }



const Tab = createBottomTabNavigator();

function MyTab(props) {
  useEffect(() => {
    JPush.init({ "appKey": "d8830987dd59849e05bcc4f8", "channel": "yourChannel", "production": 1 });
    //连接状态
    const connectListener = result => {
      console.log("connectListener:" + JSON.stringify(result))
    };
    JPush.addConnectEventListener(connectListener);
    //通知回调
    const notificationListener = result => {
      if (result.notificationEventType === 'notificationOpened') {
        props.navigation.navigate('TabNews');
      };
      store.dispatch({ type: 'getJpush', payload: result })
    };
    JPush.addNotificationListener(notificationListener);
    //本地通知回调
    const localNotificationListener = result => {
      console.log("localNotificationListener:" + JSON.stringify(result))
    };
    JPush.addLocalNotificationListener(localNotificationListener);
    //自定义消息回调
    // this.customMessageListener = result => {
    //     console.log("customMessageListener:" + JSON.stringify(result))
    // };
    // JPush.addCustomMessagegListener(this.customMessageListener);
    //tag alias事件回调
    const tagAliasListener = result => {
      console.log("tagAliasListener:" + JSON.stringify(result))
    };
    JPush.addTagAliasListener(tagAliasListener);
    //手机号码事件回调
    const mobileNumberListener = result => {
      console.log("mobileNumberListener:" + JSON.stringify(result))
    };
    JPush.addMobileNumberListener(mobileNumberListener);
  }, [])

  console.log(props);
  return (
    <Tab.Navigator initialRouteName="TabMain"//重定向
      backBehavior={"none"}
      screenOptions={{
        tabBarInactiveTintColor: "#626473",//非活动选项卡中图标和标签的颜色
        tabBarActiveTintColor: "#065AF7",//活动选项卡中图标和标签的颜色。
        tabBarStyle: {
          paddingTop: setHeight(24),
        },//tabBar样式
        tabBarLabelStyle: { fontSize: setText(34) },//tabBar文本样式
        tabBarLabelPosition: "below-icon",//below-icon:标签显示在图标下方
      }}>
      <Tab.Screen name="TabMain" component={TabMainStack}
        options={{
          headerShown: false,
          tabBarLabel: "工作台",
          tabBarIcon: ({ focused }) => {
            let img = focused ? require("./assets/tab/01a.png") : require("./assets/tab/01.png");
            return (
              <Image source={img}
                style={{ width: setWidth(50), height: setWidth(65) }} />
            );
          },
        }}
      />
      <Tab.Screen name="TabNews" component={TabNewsStack}
        options={{
          headerShown: false,
          tabBarLabel: "消息",
          tabBarIcon: ({ focused }) => {
            let img = focused ? require("./assets/tab/02a.png") : require("./assets/tab/02.png");
            return (
              <Image source={img}
                style={{ width: setWidth(64), height: setWidth(65) }} />
            );
          },
        }}
      />
      <Tab.Screen name="TabMine" component={TabMineStack}
        options={{
          headerShown: false,
          tabBarLabel: "我的",
          tabBarIcon: ({ focused }) => {
            let img = focused ? require("./assets/tab/03a.png") : require("./assets/tab/03.png");
            return (
              <Image source={img}
                style={{ width: setWidth(54), height: setWidth(65) }} />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}


const Stack = createNativeStackNavigator();

class Nav extends React.Component {
  
  render() {

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={'Login'}
          screenOptions={{
            headerShown: false,
          }}>
          {/*<Stack.Screen name="StartScreen" component={StartScreen} />*/}
          <Stack.Screen name="MyTab" component={MyTab} />
          <Stack.Screen name="Login" component={Login} />
        
          <Stack.Screen name="Salescontent"
            component={Salescontent}
          />
          <Stack.Screen name="Maintenancedetails"
            component={Maintenancedetails}
          />
          <Stack.Screen name="Maintenancerecords"
            component={Maintenancerecords}
          />
          <Stack.Screen name="MaintenanceEquipment"
            component={MaintenanceEquipment}
          />
          <Stack.Screen
            name="Chat"
            component={MyChat}
          />
          <Stack.Screen
            name="Scan"
            component={Scan}
          />
          <Stack.Screen
            name="Map"
            component={Map}
          />
          <Stack.Screen
            name="Graph"
            component={Graph}
          />
        <Stack.Screen
            name="watchVideo"
            component={watchVideo}
          />

        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
export default connect(
  state => ({ userInfo: state.user }),
)(Nav)

watchVideo
