import React from "react";
import { connect } from 'react-redux'
import Video from 'react-native-video';
import Orientation from 'react-native-orientation';
import { Dimensions } from 'react-native';

import { View, Text, ImageBackground, Image, TouchableOpacity, ScrollView, Platform,ActivityIndicator } from "react-native";
import MyFrameWork from "../../../components/MyFrameWork";
import styles from "./styles";
import { setWidth, setText, setHeight } from "../../../utils/styleAdb";
import { asyncGetBycnCodeDevices } from "../../../redux/actions/devicesbysncode";
import { getVideoToken, getVideoSource } from "../../../api/requestPath";

import SelectDropdown from 'react-native-select-dropdown'
class VideoPlay extends React.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      isBool: Orientation.getInitialOrientation() === 'PORTRAIT',//当前是否是竖屏(true),横屏(false)
      summary: '',//描述
      CurrentTime: '',//当前时间
      VideoUrl: '',//视频地址
      selectedItem: [],//下拉菜单内容
      defaultShow:'',//下拉菜单默认显示
      isLoading:true//

    };
    this._handleOnPress = this._handleOnPress.bind(this);
  }

  componentDidMount() {
    // this.props.asyncGetBycnCodeDevices(this.props.route.params.snCode)
    // alert('qq');
    this.getVideo()
    this.displayCurrentTime()
    this.setState({isLoading:true})
  }
 
  //获取设备直播源
  async getVideo() { 
    let token
    let value = await getVideoToken()
    // console.log(value);
    if (value.data.code === '200') {
      token = value.data.data.accessToken
      // console.log(token);
      let result = await getVideoSource({ accessToken: token, source: 'G45209920:1' })
      let selectData=result.data.data
       this.setState({VideoUrl:selectData[0].hls})
       this.setState({defaultShow:selectData[0].deviceName})
     let filteredData = selectData.map((item, index) => {
  return {
    deviceName: item.deviceName,
    hls: item.hls,
    channelNo: item.deviceName
  };
}); 
 this.setState({selectedItem:filteredData})
    
    }
  }

  _handleOnPress = () => {
    const { isBool } = this.state;
    if (isBool) {
      let screenWidth = Dimensions.get('window').width;
      let screenHeight = Dimensions.get('window').height;
      this.setState({
        isBool: false, videoWidth: 20,
        videoHeight: 20 * 9 / 16, summary: '本来是竖屏、现在锁定为横屏了....'
      });
      //竖屏时、锁定为横屏
      Orientation.lockToLandscape();
    } else {
      this.setState({
        isBool: true, videoWidth: 20,
        videoHeight: 20 * 9 / 16, summary: '本来是横屏、现在锁定为竖屏了....'
      });
      //横屏时、锁定为竖屏
      Orientation.lockToPortrait();
    }
  };
  //当前时间
  displayCurrentTime() {
    setInterval(() => {
      const current_time = new Date();
      const year = current_time.getFullYear();
      const month = ('0' + (current_time.getMonth() + 1)).slice(-2);
      const day = ('0' + current_time.getDate()).slice(-2);
      const hour = ('0' + current_time.getHours()).slice(-2);
      const minute = ('0' + current_time.getMinutes()).slice(-2);
      const second = ('0' + current_time.getSeconds()).slice(-2);
      const formatted_time = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
      this.setState({
        CurrentTime: formatted_time
      })
    }, 1000);
  }
  //处理视频源下拉菜单
  handleVideo=()=>{
    let {VideoUrl}=this.state
    VideoUrl.map(item=>item.deviceName)
  }
  //选择视频源
  handleSelectItem=(selectedItem)=> {
    this.setState({ selectedItem });
    console.log(selectedItem);
  }

  render() {
    let { snCode, name, time } = this.props.route.params
    let { CurrentTime, VideoUrl ,selectUrl,selectedItem,defaultShow,isLoading} = this.state
    console.log(VideoUrl);
    // let data=[{deviceSerial: 'G45209920', channelNo: 1, deviceName: '研山铁矿筛四车间', hls: 'http://hls01open.ys7.com/openl'},{deviceSerial: 'G45209920', channelNo: 2, deviceName: '研山铁矿筛四车间', hls: 'http://hls01open.ys7.com/openl'},{deviceSerial: 'G45209920', channelNo: 1, deviceName: '研山铁矿筛四车间', hls: 'http://hls01open.ys7.com/openl'},{deviceSerial: 'G45209920', channelNo: 1, deviceName: '研山铁矿筛四车间', hls: 'http://hls01open.ys7.com/openl'},{deviceSerial: 'G45209920', channelNo: 1, deviceName: '研山铁矿筛四车间', hls: 'http://hls01open.ys7.com/openl'},{deviceSerial: 'G45209920', channelNo: 1, deviceName: '研山铁矿筛四车间', hls: 'http://hls01open.ys7.com/openl'},]
    return (
      <MyFrameWork >
        <View style={styles.bigbg} >
          <View style={styles.palybg}>
          {isLoading && (
        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="small" color={'#FFF'} />
        </View>
      )}
            <Video
               source={{uri:VideoUrl}}
              ref={(ref) => {
                this.player = ref
              }}                                      // 回调给player对象
              onBuffer={this.onBuffer}                // 缓冲回调函数
              onError={()=>{alert('视频出错了')}}
              onLoad={()=>{this.setState({isLoading:false})}}
              resizeMode={'cover'}
              //onFullscreenPlayerWillDismiss={handleExitFullscreen}
              // 错误回调函数
              style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}
            //style={{width: this.state.videoWidth, height: this.state.videoHeight}}    
            />
            {/*隐藏按钮 */}
            <View style={styles.palyanbg}>
              <TouchableOpacity style={styles.jietuimg} >
                <Image source={require('./images/tupian-01.png')} style={{ width: setWidth(71), height: setWidth(57) }} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.yunGximg} >
                <Image source={require('./images/yunGx-01.png')} style={{ width: setWidth(71), height: setWidth(59) }} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.playimg}>
                <Image source={require('./images/play-01.png')} style={{ width: setWidth(73), height: setWidth(51) }} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.quanpimg} onPress={() => this.props.navigation.navigate('watchVideo', { url:VideoUrl  })} >
                <Image source={require('./images/quanping-01.png')} style={{ width: setWidth(61), height: setWidth(61) }} />
              </TouchableOpacity>
            </View>

          </View>

          <ImageBackground source={require('../images/dbbg-01.png')} style={styles.bgimg2} >
            <View style={styles.playdbtxt}>
              <View style={styles.playsjTxt}>
                <View style={{ flexDirection: "row" }}>
                  <Image source={require('../images/runing-02.png')} style={{ width: setWidth(41), height: setWidth(41), marginTop: setWidth(12) }} />
                  <Text style={styles.sjnanmetx}>{name}</Text>
                </View>
               <View style={{flexDirection:'row'}}>
               <Text style={{fontSize:setWidth(32),textAlignVertical:'center',marginTop:setWidth(-10),marginRight:setWidth(10),color:'blue'}} >当前视频源:</Text>
               <TouchableOpacity>
               <SelectDropdown
  defaultValue=''
  data={selectedItem}
  buttonStyle={styles.buttonStyle}
  defaultButtonText={defaultShow}
  buttonTextStyle={styles.buttonTextStyle}
  onSelect={(selectedItem, index) => {
     this.setState({VideoUrl:selectedItem.hls})
  }}
  buttonTextAfterSelection={(selectedItem, index) => {
    return selectedItem.channelNo
  }}
  rowTextForSelection={(item, index) => {
    return item.channelNo
  }}
  dropdownStyle={styles.dropdown}
  dropdownTextStyle={{color:'red'}}
/>
      </TouchableOpacity>
               </View>
              </View>

            <View style={styles.middleWraper}>     
            <Text style={[styles.runStateComAddText]}>{snCode}</Text>          
            <Text style={[styles.runStateComAddText]}>运行时长: {time} 小时</Text>           
            <Text style={[styles.runStateComAddText]}>时间: {CurrentTime}</Text>          
           </View>

              
 
            </View>
          </ImageBackground>
        </View>
        {/*视频捕获 */}
        <ImageBackground source={require('./images/ycvideo.png')} style={styles.bgImg1} >
          <View style={styles.videobh}>
            <View style={styles.videobhtxt}>
              <Image source={require('./images/jietu-01.png')} style={{ width: setWidth(52), height: setWidth(42), marginTop: setWidth(8) }}></Image>
              <Text style={styles.sjnanmetx}>视频捕获</Text>
            </View>
            <View style={{ height: setWidth(282), flexWrap: 'wrap', flexDirection: 'row' ,  marginTop: setWidth(22) }}>
            
            </View>
          </View>
        </ImageBackground>
      </MyFrameWork>
    )
  }
}
export default VideoPlay



// import { Text, View ,SafeAreaView} from 'react-native'
// import React, { Component } from 'react'
// import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
// export default class index extends Component {
//  state = {
          
//           summary: '',//描述
//           CurrentTime: '',//当前时间
//           VideoUrl: [],
//           selectedItem: null
//         };
//           handleSelectItem=(selectedItem)=> {
//     this.setState({ selectedItem });
//     console.log(selectedItem);
//   }

//   render() {
//     let{selectedItem}=this.state
//     return (
//       <View>
//         <SafeAreaView style={{marginTop:200}}>
//         <AutocompleteDropdown
//    clearOnFocus={false}
//    closeOnBlur={true}
//    closeOnSubmit={false}
//    initialValue={{ id: '2' }} // or just '2'
//    onSelectItem={this.setSelectedItem}
//    dataSet={[
//      { id: '1', title: 'Alpha' },
//      { id: '2', title: 'Beta' },
//      { id: '3', title: 'Gamma' },
//    ]}
//  /></SafeAreaView>
//       </View>
//     )
//   }
// }

