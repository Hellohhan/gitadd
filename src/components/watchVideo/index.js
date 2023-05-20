import { Text, View, Button, Dimensions, TouchableOpacity,ActivityIndicator } from 'react-native'
import React, { Component } from 'react'
import Orientation from 'react-native-orientation';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './style';
import Slider from '@react-native-community/slider';
export default class index extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      isBool: Orientation.getInitialOrientation() === 'PORTRAIT',//当前是否是竖屏(true),横屏(false)
      summary: '',//描述
      paused: true,//暂停
      isMuted: false,//静音
      currentTime: 0,//时间
      duration: 0, //时间
      isTip: true,//底部提示
      fullscreen: false, // 是否全屏
      isLoading:true//loading
    };
    this._handleOnPress = this._handleOnPress.bind(this);
    this.videoRef = React.createRef();
    this.time
  }
  componentDidMount() {
    //默认锁定为竖屏
    Orientation.lockToPortrait();
    this._handleOnPress()
  }
  _handleOnPress = () => {
    const { isBool } = this.state;
    if (isBool) {
      this.setState({ isBool: false, summary: '本来是竖屏、现在锁定为横屏了....' });
      //竖屏时、锁定为横屏
      Orientation.lockToLandscape();
    } else {
      this.setState({ isBool: true, summary: '本来是横屏、现在锁定为竖屏了....' });
      //横屏时、锁定为竖屏
      Orientation.lockToPortrait();
    }
  };
  componentWillUnmount() {
    Orientation.lockToPortrait();
    this.setState({ isBool: true, summary: '本来是竖屏、现在锁定为横屏了....' });
  }
  //是否暂停
  changePaused = () => {
    this.setState({ paused: !this.state.paused })
    clearTimeout(this.time)
    this.time = setTimeout(() => {
      this.setState({ isTip: false })
    }, 5000)
  }
  //是否静音
  isMuted = () => {
    this.setState({ isMuted: !this.state.isMuted })
  }
  //

  onProgress = (data) => {
    this.setState({ currentTime: data.currentTime })
  };

  onLoad = (data) => {
    this.setState({ duration: data.duration })
    this.setState({isLoading:false})
  };

  onSlidingComplete = (value) => {
    clearTimeout(this.time)
    this.videoRef.current.seek(value);
    this.setState({ isTip: true })

  };
  //处理时间
  formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  //切换屏幕
  handlePress2 = () => {
    const { isBool } = this.state;
    if (isBool) {
      this.setState({ isBool: false, summary: '本来是竖屏、现在锁定为横屏了....' });
      //竖屏时、锁定为横屏
      Orientation.lockToLandscape();
    } else {
      this.setState({ isBool: true, summary: '本来是横屏、现在锁定为竖屏了....' });
      //横屏时、锁定为竖屏
      Orientation.lockToPortrait();
    }
  }
  //点击屏幕
  handlePress = () => {
    let time
    this.setState({ isTip: true })
    clearTimeout(time)
    time = setTimeout(() => {
      this.setState({ isTip: false })
    }, 5000)
  }
  //完成播放
  completed = () => {
    this.setState({ isTip: true })
    this.setState({ paused: true })
    this.videoRef.current.seek(0)
  }
  render() {
    let { summary, paused, isMuted, duration, currentTime, isTip, fullscreen ,isLoading} = this.state
    let{ url } = this.props.route.params
     console.log(url)
    return (
      <View style={styles.container}>
          {isLoading && (
        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="small" color={'#FFF'} />
        </View>
      )}
        <Video
          source={{
           uri: url
          }}   // 视频地址
          ref={this.videoRef}       // 回调给player对象
          // onBuffer={onBuffer}   // 缓冲回调函数 
          onError={() => { alert('加载视频出错了，请联系管理员') }}
          resizeMode={fullscreen ? 'cover' : 'contain'} // 视频尺寸适配方式
          style={fullscreen ? styles.fullscreenVideo : styles.video}
          onFullscreenPlayerWillDismiss={() => {
            this.setState({ fullscreen: false });
          }}
          paused={paused}
          muted={isMuted}
          onProgress={this.onProgress}
          onLoad={this.onLoad}
          onTouchStart={this.handlePress}
          onEnd={this.completed}
        />
    
        {/* 顶部控制栏 */}
        <View style={styles.Topcontrols}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Icon
              name="keyboard-arrow-left"
              size={30}
              color="#fff"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.isMuted}>
            <Icon
              name={isMuted ? "volume-off" : "volume-up"}
              size={30}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
        {/* 底部控制栏 */}
        {isTip && <View style={styles.controls} onPanResponderMove={() => { alert(12321312312) }} onPanResponderRelease={this.TouchCancel} >
          <TouchableOpacity onPress={this.changePaused} style={{ flexDirection: 'row' }}>
            <Icon
              name={paused ? 'play-arrow' : 'pause'}
              size={30}
              color="#fff"
            />
            <Text style={styles.timeText}>
              {this.formatTime(currentTime)}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.slider} >
            <Slider
              minimumValue={0}
              maximumValue={duration}
              value={currentTime}
              minimumTrackTintColor="#fff"
              maximumTrackTintColor="#fff"
              thumbTintColor="#fff"
              onSlidingComplete={this.onSlidingComplete}
            />
          </TouchableOpacity>


          <TouchableOpacity onPress={this.isMuted} style={{ flexDirection: 'row' }}>
            <Text style={styles.timeText}>
              {this.formatTime(duration)}
            </Text>
          </TouchableOpacity>
          <View style={styles.time}>
            <TouchableOpacity onPress={this.handlePress2}>
              <Icon name="fullscreen" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>}
      </View>
    )
  }
}

