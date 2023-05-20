import React from "react";
import { Image, ImageBackground, Linking, Modal, Platform, ScrollView, Text, TouchableOpacity, View ,Clipboard} from "react-native";
import Swiper from 'react-native-swiper'
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";


import styles from "./styles";
import { setHeight, setWidth } from "../../utils/styleAdb";
import axios from "../../api";
import FocusAwareStatusBar from "../../components/FocusAwareStatusBar";
import { GETADS,ContactUs,contactUs } from "../../api/requestPath";
import baseUrl from "../../api/baseUrl";
import { asyncGetDevices } from "../../redux/actions/devices";
import { store } from "../../redux/store";
import Ionicons from 'react-native-vector-icons/Ionicons'
class Main extends React.PureComponent {

  state = {
    ads: [],
    swiperIndex: 0,
    isModal: false,
    OfficialWebsit:'',//官网
    address:'',//地址
    email:'',//邮箱
    phone:''//联系电话
  };

  componentDidMount() {
    //获取广告列表
    this.getAds();
    //获取设备列表
    this.getDevices();
    //获取联系我们
    this.getContactus()
  }
 //联系我们
  getContactus= async()=>{
    try{
      const result = await axios.authGet(ContactUs);
      console.log(result.data);
      let data=result.data
      if(result.message==='ok'){
        console.log(data.企业官网);
      this.setState({
            OfficialWebsit:data.企业官网,
            email:data.电子邮箱,
            address:data.地址信息,
            phone:data.联系电话
          })
    }
  }
    catch(e){
      console.log(e);
    }
   }
  //获取设备列表
  getDevices = async () => {
    this.props.asyncGetDevices();
  };

  //获取广告列表
  _renderItem = ({ item, index }) => {
    return (
      <Text style={{ fontSize: 32, color: '#fff' }}>{item}</Text>
    );
  };

  getAds = async () => {
    const result = await axios.authPost(GETADS, {
      "current": 1,
      "size": 5,
    });
    if (result.ok) {
      const ads = result.data.records;
      const newAds = ads.map(ad => {
        ad.adImgUrl = baseUrl.SHOW_IMGS + "?relative=" + ad.adImgUrl;
        return ad;
      });
      this.setState({ ads: newAds });
    } else {
      console.log("获取广告列表失败");
    }
  };

  middleGotoPage = name => {
    console.log('nav', name);
    const { navigation } = this.props;
    switch (name) {
      case "alarm": //去报警信息界面
        navigation.navigate("Alarm");
        break;
      case "deviceManager": //去设备管理界面
        navigation.navigate("DeviceManager");
        break;
      case "remote": //去远程视频界面
        navigation.navigate("Remote");
        break;
      case "afterSale": //去售后查询界面
        navigation.navigate("AfterSale");
        break;
      case "deviceList": //去保养查询界面
        navigation.navigate("DeviceList");
        break;
      case "contactUs": //去联系我们界面
        navigation.navigate("ContactUs");
        break;
    }
  };

  handleSwiper = (index) => {
    console.log(index);
    this.setState({ swiperIndex: index })
  }

  /* 联系我们模态框 */
  myModal = () => {
    const { ads,email,address, OfficialWebsit,phone} = this.state;
    return (
      <>
        <View style={styles.zhezhao} ></View>
        <View style={styles.modalWraper} >
          <View style={styles.modal}>
            <View style={styles.modal_title}>
              <Text style={{ color: 'blue' }}>联系信息</Text>
              <TouchableOpacity onPress={() => { this.setState({ isModal: false }) }}>
                <Ionicons name="close-outline" style={{ fontSize: setWidth(60) }} color={'blue'}></Ionicons>
              </TouchableOpacity>
            </View>
             <TouchableOpacity>
            <View style={styles.Modal_body}>
              <Text style={styles.content}>地址信息: </Text>
              <Text style={styles.content} selectable={true} >{address}</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{this.GoToPhone(phone)}}>
            <View style={styles.Modal_body}>
              <Text style={styles.content}>联系电话: </Text>
              <Text style={styles.content}>{phone}</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity>
            <View style={styles.Modal_body}>
              <Text style={styles.content}>电子邮箱: </Text>
              <Text style={styles.content}selectable={true} >{email}</Text>
            </View>
            </TouchableOpacity>

           <TouchableOpacity onPress={()=>Linking.openURL(OfficialWebsit)}>
           <View style={styles.Modal_body}>
              <Text style={styles.content}>企业官网: </Text>
              <Text style={styles.content} >{OfficialWebsit}</Text>
            </View>
           </TouchableOpacity>
          </View>
        </View>
      </>
    )
  }
  /* 跳转到电话 */
  GoToPhone=(data)=>{
    Linking.openURL(`tel:${data}`)
    Clipboard.setString(data)
  }
  render() {
    const { ads,email,address, OfficialWebsit} = this.state;
    const { navigation, devices } = this.props;
    console.log(this.state.phone);
    return (
      <SafeAreaView style={{ flex: 1 }} edges={["right", "left"]}>
        {Platform.OS == "android" ? <FocusAwareStatusBar translucent={true} backgroundColor="rgba(0,0,0,0)" /> : null}
        <ScrollView style={styles.container} onPress={()=>{alert(123)}}>
          {/*轮播图+六个导航按钮*/}
          <View style={styles.midWrap}>
            <ImageBackground source={require("./images/bgimg.png")} style={styles.bgImg}>
              {/*  轮播图*/}
              <View style={styles.carouselViewWrap}>
                <Swiper style={styles.swiperWrap}
                  // index={this.state.swiperIndex}
                  loop={false}
                  // onIndexChanged={this.handleSwiper}
                  paginationStyle={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    height: setWidth(54),
                  }}
                  dotStyle={{
                    width: setWidth(20),
                    height: setWidth(20),
                    borderRadius: setWidth(10),
                    marginRight: setWidth(5),
                    backgroundColor: "rgba(0, 0, 0, 0)",
                    borderWidth: setWidth(1),
                    borderColor: '#F5F6F7'
                  }}
                  activeDotColor="#FEFEFF"

                >
                  {
                    ads.map(ad => (
                      <View key={ad.adId} style={styles.swiperItem}>
                        <Image source={
                          {
                            uri: ad.adImgUrl
                          }
                        }
                          style={{ width: setWidth(800), height: setWidth(560) }}
                        />
                      </View>
                    ))
                  }
                </Swiper>

              </View>
              {/*  六个导航按钮*/}
              <View style={styles.midBtnWrap}>
                <View style={styles.midBtnTopWrap}>
                  <TouchableOpacity style={styles.midBtn} onPress={() => navigation.navigate("Alarm")}>
                    <ImageBackground source={require('./images/midBtnTop1.png')} style={styles.midBtnImgBack}>
                      <Text style={styles.midBtnText}>报警信息</Text>
                      <Image source={require('./images/midBtnTop11.png')} style={{ width: setWidth(68), height: setWidth(69) }} />
                    </ImageBackground>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.midBtn} onPress={() => navigation.navigate("DeviceManager")}>
                    <ImageBackground source={require('./images/midBtnTop2.png')} style={styles.midBtnImgBack}>
                      <Text style={styles.midBtnText}>设备管理</Text>
                      <Image source={require('./images/midBtnTop22.png')} style={{ width: setWidth(76), height: setWidth(76) }} />
                    </ImageBackground>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.midBtn} onPress={() => navigation.navigate("DeviceList")}>
                    <ImageBackground source={require('./images/midBtnTop3.png')} style={styles.midBtnImgBack}>
                      <Text style={styles.midBtnText}>保养查询</Text>
                      <Image source={require('./images/midBtnTop33.png')} style={{ width: setWidth(74), height: setWidth(59) }} />

                    </ImageBackground>
                  </TouchableOpacity>
                </View>
                <View style={[styles.midBtnTopWrap, { marginTop: setWidth(20) }]}>
                  <TouchableOpacity style={styles.midBtn} onPress={() => navigation.navigate("AfterSale")}>
                    <ImageBackground source={require('./images/midBtnBot1.png')} style={styles.midBtnImgBack}>
                      <Text style={styles.midBtnText}>售后查询</Text>
                      <Image source={require('./images/midBtnBot11.png')} style={{ width: setWidth(77), height: setWidth(66) }} />

                    </ImageBackground>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.midBtn} onPress={() => navigation.navigate("Remote")}>
                    <ImageBackground source={require('./images/midBtnBot2.png')} style={styles.midBtnImgBack}>
                      <Text style={styles.midBtnText}>远程视频</Text>
                      <Image source={require('./images/midBtnBot22.png')} style={{ width: setWidth(74), height: setWidth(61) }} />

                    </ImageBackground>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.midBtn}
                    onBackdropPress={() => { this.setState({ isModal: false }) }}
                    onPress={() => { this.setState({ isModal: true }) }}
                  >
                    <ImageBackground source={require('./images/midBtnBot3.png')} style={styles.midBtnImgBack}>
                      <Text style={styles.midBtnText}>联系我们</Text>
                      <Image source={require('./images/midBtnBot33.png')} style={{ width: setWidth(71), height: setWidth(63) }} />
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
          </View>




          {/*  运行状态*/}
          <View style={styles.runStateWrap}>
            {/* 运行状态头部 */}
            <View style={styles.runStateTop}>
              <View style={styles.runStateTopLeft}>
                <View style={styles.runStateVerticalLine}></View>
                <Text style={styles.runStateTopLeftText}>运行状态</Text>
              </View>
              <TouchableOpacity style={styles.runStateTopRight} onPress={()=>{this.props.navigation.navigate('Alarm')}}>
                <Text style={styles.runStateTopRightText}>更多</Text>
                <Image source={require('./images/toRight.png')} style={styles.runStateTopRightImg} />
              </TouchableOpacity>
            </View>
            {/*运行状态下部设备列表*/}
            {
              devices.map(device => (
                <TouchableOpacity key={device.id} style={styles.runStateItem}
                 onPress={()=>{this.props.navigation.navigate('DeviceManager')}}
                >
                  <Image source={device.onOff === 0 ? require('./images/runState/stop.png') : device.alarmStatus === '0' ? require('./images/runState/runing.png') : require('./images/runState/alarm.png')} style={styles.runStateImg} />
                  <View>
                    <Text style={styles.runStateDeviceName}>{device.name}{device.onOff === 0 ? '停止状态' : device.alarmStatus === '0' ? '开启状态' : '报警状态'}</Text>
                    <View style={{ flexDirection: 'row', marginTop: setWidth(18) }}>
                      <Text style={[styles.runStateComAddText, { marginRight: setWidth(20) }]}>厂家:</Text>
                      <Text style={styles.runStateComAddText}>{device.jsonEntity.company_name}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: setWidth(14) }}>
                      <Text style={[styles.runStateComAddText, { marginRight: setWidth(20) }]}>地址:</Text>
                      <Text style={styles.runStateComAddText}>{device.jsonEntity.province + device.jsonEntity.city + device.jsonEntity.county + device.jsonEntity.detailed_address}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            }
          </View>
        </ScrollView>
        {/* 联系我们遮罩层 */}
        {
          this.state.isModal && this.myModal()
        }

      </SafeAreaView>
    );
  }
}

export default connect(state => ({ devices: state.devices }), { asyncGetDevices })(Main);


