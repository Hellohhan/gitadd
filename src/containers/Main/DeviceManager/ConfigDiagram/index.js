import React from "react";
import {
  View,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  ImageBackground,
  BackHandler,
  TouchableOpacity,
  Text,
  Dimensions
} from "react-native";
import { WebView } from 'react-native-webview';
import { Tab, TabView } from '@rneui/themed';

import styles from './styles'
import { setHeight, setText, setWidth, screenPxH, screenHeight } from "../../../../utils/styleAdb";
import { SafeAreaView } from "react-native-safe-area-context";
import FocusAwareStatusBar from "../../../../components/FocusAwareStatusBar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { HeaderHeightContext } from "@react-navigation/elements";
import { SvgXml } from "react-native-svg";
import svg from "../../../../assets/svg/svg";
import {getDevicePoints,GetDevicePoints} from '../../../../api/requestPath'
import {store} from '../../../../redux/store'
import axios from "../../../../api";
class ConfigDiagram extends React.PureComponent{
  // source = {uri:'http://192.168.1.69/3d/index.html?deviceId=18'}
//  source = {uri:'http://192.168.0.16:9999/app-3d/index.html?mmName=2LKBBS3673'}
  webRef=React.createRef()
  state={
    // index:0,
    isShowWebView:false,
    sensors:[],//传感器所有数据
    SensorPosition:[],//传感器位置个数
    getMessage:'nosie'//获取web3d传来的参数(起始值),
  }
  componentDidMount() {
    //自定义标题栏左侧返回按钮的行为
    this.headerLeftButton()
    setTimeout(()=>{
      this.setState({isShowWebView:true})
    },300)
    BackHandler.addEventListener('hardwareBackPress', this.myGoBack);
    //传感器
    this.getsensor()
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.myGoBack);
    store.dispatch({type:'loading',data:false})
  }
//自定义标题栏左侧返回按钮的行为
  headerLeftButton=()=>{
    this.props.navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => {
          this.props.navigation.goBack();
        }} style={{ width: setWidth(80), height: setWidth(120), justifyContent: "center" }}>
          <SvgXml xml={svg.goBack} width={setWidth(40)} height={setWidth(60)}
                  fill={"#fff"}></SvgXml>
        </TouchableOpacity>
      ),
    });
  }
  //自定义后退按钮的行为
  myGoBack= ()=>{
    this.setState({isShowWebView:false})
    setTimeout(()=>{
      this.props.navigation.goBack();
    },200)
    return true;
  }
  //TabItem titleStyle
  tabItemTitleStyle=active=>({fontSize: setText(30),fontWeight:'bold',color:active?'#486DF8':'#01001B',paddingVertical:0,paddingHorizontal:0,paddingBottom:setWidth(5)})


  /* 获取传感器位置 */
   getsensor= async()=>{
    let id=this.props.route.params.id
    try{
       store.dispatch({type:'loading',data:true})
      let result= await axios.authGet(GetDevicePoints.replace(':id',id))/* 这里改成id */
      console.log(result);
      if(result.message==='ok'){
        store.dispatch({type:'loading',data:false})
        let data=result.data;
         this.setState({
         sensors:data
     })
       /* 过滤传感器位置 */
      let uniqueGroups = data.reduce((acc, curr) => {
      if (!acc.some(item => item.groupName === curr.groupName)) {
          acc.push(curr);
        }
        return acc;
      }, []);

      this.setState({
            SensorPosition:uniqueGroups
           })
         }
      }
    catch(e){
      console.log('传感器加载失败',e);
      store.dispatch({type:'loading',data:false})
    }
    





    // store.dispatch({type:'loading',data:true})
    // let id=this.props.route.params.id
    // try{
    //  let result= await getDevicePoints(id) /* 这里改成id */
    //  if(result.data.message==='ok'){
    //   store.dispatch({type:'loading',data:false})
    //   let data=result.data.data;
    //   console.log(result.data.data);
    //  this.setState({
    //   sensors:data
    //  })
    //   /* 过滤传感器位置 */
    //   let uniqueGroups = data.reduce((acc, curr) => {
    //   if (!acc.some(item => item.groupName === curr.groupName)) {
    //       acc.push(curr);
    //     }
    //     return acc;
    //   }, []);
    //    console.log(uniqueGroups);
    //    this.setState({
    //     SensorPosition:uniqueGroups
    //    })
    //  }
    // }
    // catch(e){
    //  console.log('获取传感器接口失败',e);
    //  store.dispatch({type:'loading',data:false})
    // }
   }
   /* 去往走势图 */
   toNext(deviceName,deviceId,pointId,value,pointName,unit){
      this.props.navigation.navigate('Graph',{deviceName,deviceId,pointId,value,pointName,unit})
   }
  render() {
    const {index, isShowWebView,getMessage,SensorPosition,sensors}=this.state
    let{alarm,time,deviceName}=this.props.route.params
    console.log(this.props);
    return (
      <ImageBackground source={require('./images/stateViewImg.png')} style={{width:'100%',height:setWidth(1571)}}>
           <SafeAreaView style={{height:screenHeight-50}} edges={["right", "left"]}>
          {Platform.OS == "android" ? <FocusAwareStatusBar translucent={true} backgroundColor="rgba(0,0,0,0)" /> : null}
          <HeaderHeightContext.Consumer>
            {headerHeight => (
              <View style={[styles.wrap,{marginTop:headerHeight}]}>
                {/*3D模型*/}
                <View style={styles.threeWrap}>
                  {
                    isShowWebView?(<WebView
                      ref={this.webRef}
                      cacheEnabled={true}//是否缓存
                      cacheMode={'LOAD_DEFAULT'}
                      source={this.source}
                      style={{backgroundColor:'rgba(0,0,0,0)'}}
                      onMessage={(e) => {
                        console.log(e.nativeEvent.data);
                        let data=e.nativeEvent.data;
                        let startStr = '从3d页面发送的消息';
                        let endStr = '--http://192.168.1.64/3d/3673.gltf';
                        let startIndex = data.indexOf(startStr) + startStr.length;
                        let endIndex = data.indexOf(endStr);
                        if (startIndex < endIndex && startIndex >= startStr.length) {
                          let result = data.substring(startIndex, endIndex);
                          this.setState({
                            getMessage:result
                          },()=>{
                            console.log(this.state.getMessage);
                          })
                        } else {
                          console.log('未找到要截取的数据');
                        }
                      }}
                      onLoadStart={()=>{store.dispatch({type:'loading',data:true})}}
                      onLoad={()=>{
                        this.webRef.current.injectJavaScript(`window.gltfUrl="http://192.168.1.64/3d/3673.gltf";true;`)
                        store.dispatch({type:'loading',data:false})
                      }}
                      androidLayerType="hardware"
                    />):null
                  }
                {/*  3个按钮的位置*/}
                </View>
                {/*  数据显示*/}
                <ImageBackground style={styles.dataWrap} source={require('./images/bgImg.png')} borderRadius={setWidth(42)} >
                  <Tab
                    value={getMessage}
                    onChange={(index) => {this.setState({getMessage:SensorPosition[index].groupName})}}        
                    indicatorStyle={{
                      backgroundColor: 'rgba(0,0,0,0)',
                      height:0,
                      width:0,
                      // backgroundColor: "#486DF8",
                      // height: setWidth(10),
                      // width:setWidth(110),
                      // position:'absolute',
                      // left:setWidth(70)
                    }}
                    scrollable={true}
                    variant="default"
                  >
                    {
                    SensorPosition.map((item,indexs)=>{
                     return(
                      <Tab.Item
                      title={item.groupName}
                      titleStyle={this.tabItemTitleStyle}
                      buttonStyle={styles.tabItemButtonReset}
                      key={item.groupName}
                    >
                      <View style={styles.tabItemButton}>
                        <Text style={this.tabItemTitleStyle(getMessage===item.groupName)}>{item.groupName}</Text>
                        {getMessage===item.groupName&&<View style={styles.bottomLine}></View>}
                      </View>
                    </Tab.Item>
                     )
                      })
                    }
                  </Tab>
                  <ScrollView
                        horizontal={true}
                        style={styles.tableViewItemScroll}
                        contentContainerStyle={{height:setWidth(401),paddingHorizontal:setWidth(40)}}
                        showsHorizontalScrollIndicator={false}
                  >
                 {
                  sensors.length>0?
                  sensors.map(item=>{
                 
                    if(item.groupName===getMessage){
                     return(
                      <TouchableOpacity key={item.id} style={[styles.tableViewItemImg,{marginLeft:0}]} onPress={()=>{this.toNext(deviceName,item.deviceId,item.pointId,item.value,item.pointName,item.unit)}}>
                          <ImageBackground
                              source={item.alarmState?require('./images/tabItemBgimg/noise2.png'):require('./images/tabItemBgimg/noise.png')}
                              style={[styles.tableViewItemImg,{marginLeft:0}]}
                            >
                              <Text style={styles.tableViewItemTextTop}>{item.pointName}</Text>
                              <View>
                                <Text style={styles.tableViewItemTextMid}>
                                  上限值: {item.maximum}
                                </Text>
                                <Text style={styles.tableViewItemTextMid}>
                                  下限值: {item.minimum}
                                </Text>
                              </View>
                              <Text style={styles.tableViewItemTextBot}>
                                {item.value}
                                {item.unit}
                              </Text>
                            </ImageBackground>
                      </TouchableOpacity>
                     )
                    } 
                  }):<View style={{width:Dimensions.get('window').width-setWidth(100),height:setHeight(400),alignItems:'center',justifyContent:'center',}}>
                    <Text style={{textAlign:'center',}}>
                    当前设备没有传感器信息
                  </Text>
                  </View>
                 }
                </ScrollView>
                <View style={styles.runTimeAndAlarmNum}>
                          <Text style={styles.runTimeAndAlarmNumText}>总运行时长:{time}h</Text>
                          <Text style={styles.runTimeAndAlarmNumText}>报警次数:{alarm}</Text>
                 </View>
                </ImageBackground>
              </View>
            )}
          </HeaderHeightContext.Consumer>
        </SafeAreaView>
      </ImageBackground>
    )
  }
}

export default ConfigDiagram


