import React from 'react';
import {connect} from 'react-redux';
import {
  Text,
  View,
  ImageBackground,
  Platform,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Dialog, Button} from '@rneui/themed';
import {Input} from '@rneui/base';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import {asyncGetAlarmData, filterAlarm1} from '../../../redux/actions/alarm';
import {filterAlarm, Refesh} from '../../../redux/actions/alarm3';
import {setWidth} from '../../../utils/styleAdb';
import FocusAwareStatusBar from '../../../components/FocusAwareStatusBar';
import {SafeAreaView} from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import MyButton from '../../../components/MyButton';
import {GETADS} from '../../../api/requestPath';
import baseUrl from '../../../api/baseUrl';
import axios from '../../../api';
import Screening from '../../../components/Screening';
import {store} from '../../../redux/store';
import {Filter} from '../../../redux/constant';
import {FilterAlarmDevices, filterAlarmDevices} from '../../../api/requestPath';
//报警信息界面
class Alarm extends React.PureComponent {
  state = {
    ads: [] /* 广告 */,
    swiperIndex: 0 /* 轮播图初始值 */,
    refreshing: false, //下拉加载的loading
    filterData: [], //筛选过滤的数据
  };

  componentWillUnmount() {
    store.dispatch({type: 'loading', data: false});
  }

  componentDidMount() {
    //初次获取报警信息
    this.props.asyncGetAlarmData();
    console.log(this.props.myalarm);
    this.setState({filterData: this.props.myalarm});
    //标题栏右边按钮
    this.headerRightButton();
    //获取广告列表
    this.getAds();
  }
  /* 获取广告列表 */
  getAds = async () => {
    const result = await axios.authPost(GETADS, {
      current: 1,
      size: 5,
    });
    if (result.ok) {
      const ads = result.data.records;
      const newAds = ads.map(ad => {
        ad.adImgUrl = baseUrl.SHOW_IMGS + '?relative=' + ad.adImgUrl;
        return ad;
      });
      this.setState({ads: newAds});
    } else {
      console.log('获取广告列表失败');
    }
  };
  handleSwiper = index => {
    console.log(index);
    this.setState({swiperIndex: index});
  };
  /* 筛选按钮*/
  headerRightButton = () => {
    this.props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            store.dispatch({type: 'changeFilter'});
          }}>
          <Text style={{color: '#fff'}}>筛选</Text>
        </TouchableOpacity>
      ),
    });
  };
  //筛选
  Toscreening = async data => {
    console.log(data);
    try {
      store.dispatch({type: 'loading', data: true});
      let result = await filterAlarmDevices(data);
      console.log(result);
      if (result.data.message === 'ok') {
        store.dispatch({type: 'loading', data: false});
        if (result.data.data.records.length === 0) {
          alert('请更换筛选条件');
        }
        this.props.filterAlarm1(result.data.data.records);
      } else {
        alert('请更换筛选条件');
      }
    } catch (e) {
      console.log(e);
      console.log('筛选失败', e);
    }
  };
  //上拉加载报警信息的方法
  onMomentumScrollEnd = event => {
    //1.获取还没有请求到的设备
    //2.根据设备获取对应的报警信息
    const offSetY = event.nativeEvent.contentOffset.y; // 获取滑动的距离
    const contentSizeHeight = event.nativeEvent.contentSize.height; // scrollView  contentSize 高度
    const oriageScrollHeight = event.nativeEvent.layoutMeasurement.height; //scrollView高度
    console.log(`offSetY${offSetY}`);
    console.log(`oriageScrollHeight${oriageScrollHeight}`);
    console.log(`contentSizeHeight${contentSizeHeight}`);
    if (offSetY + oriageScrollHeight >= contentSizeHeight - 1) {
      this.props.asyncGetAlarmData();
    }
  };
  //下拉刷新
  onRefresh = () => {
    this.props.asyncGetAlarmData();
  };
  render() {
    const {isFilter, filterObj, ads, refreshing, filterData} = this.state;
    // console.log(filterData);
    return (
      <ImageBackground
        source={require('./images/bcimg.png')}
        style={{width: '100%', height: '100%'}}>
        <SafeAreaView style={{flex: 1}} edges={['right', 'left']}>
          {Platform.OS == 'android' ? (
            <FocusAwareStatusBar
              translucent={true}
              backgroundColor="rgba(0,0,0,0)"
            />
          ) : null}

          {/*  轮播图*/}
          <ScrollView
            onScrollEndDrag={this.onMomentumScrollEnd}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={this.onRefresh}
              />
            }>
            <View style={styles.carouselViewWrap}>
              <Swiper
                style={styles.swiperWrap}
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
                  backgroundColor: 'rgba(0, 0, 0, 0)',
                  borderWidth: setWidth(1),
                  borderColor: '#F5F6F7',
                }}
                activeDotColor="#FEFEFF">
                {ads.map(ad => (
                  <View key={ad.adId} style={styles.swiperItem}>
                    <Image
                      source={{
                        uri: ad.adImgUrl,
                      }}
                      style={{width: setWidth(800), height: setWidth(560)}}
                    />
                  </View>
                ))}
              </Swiper>
            </View>
            {/*  报警信息列表*/}
            <View style={styles.alarmWrap}>
              {this.props.myalarm.length > 0 ? (
                this.props.myalarm.map(item => {
                  return (
                    <View key={item.index}>
                      {/* 报警信息item */}
                      <View style={styles.alarmItem}>
                        <View style={styles.alarmItemNameWrap}>
                          <Image
                            source={require('./images/vibrator.png')}
                            style={{width: setWidth(75), height: setWidth(65)}}
                          />
                          <Text style={styles.alarmItemName}>
                            {item.pointName}
                          </Text>
                        </View>
                        <View style={styles.alarmItemBottomWrap}>
                          <View style={styles.alarmItemBottomLeft}>
                            <View style={styles.alarmItemBottomLeftLine}></View>
                            <View>
                              <View style={styles.alarmItemBottomLeftTextWrap}>
                                <Text style={styles.alarmItemBottomLeftText}>
                                  报警时间:{' '}
                                </Text>
                                <Text style={styles.alarmItemBottomLeftText}>
                                  {item.createTime}
                                </Text>
                              </View>
                              <View style={styles.alarmItemBottomLeftTextWrap}>
                                <Text style={styles.alarmItemBottomLeftText}>
                                  设备名称:{' '}
                                </Text>
                                <Text style={styles.alarmItemBottomLeftText}>
                                  {item.deviceName}
                                </Text>
                              </View>
                            </View>
                          </View>
                          <MyButton style={styles.alarmItemBottomRight}>
                            <Text
                              style={styles.alarmItemBottomRightText}
                              onPress={() =>
                                this.props.navigation.push('ErrorCancel', {
                                  alarmId: item.alarmId,
                                  deviceName: item.deviceName,
                                  pointName: item.pointName,
                                })
                              }>
                              处理完成
                            </Text>
                          </MyButton>
                        </View>
                        {/* 异常值 */}
                        <View style={styles.alarmItemValueWrap}>
                          <Text style={styles.alarmItemValue}>
                            异常值 {item.alarmValue}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })
              ) : (
                <View style={{width: '100%', alignItems: 'center'}}>
                  <Text style={{color: 'black'}}>暂无数据</Text>
                </View>
              )}
            </View>
            <Screening
              handleClick={data => {
                this.Toscreening(data);
              }}
              filterState={2}
            />
            {/* filterState 相当于是一个模块标识 */}
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}
const mapStateToProps = state => {
  console.log(state.alarm);
  return {
    myalarm: state.alarm,
  };
};
export default connect(mapStateToProps, {asyncGetAlarmData, filterAlarm1})(
  Alarm,
);
