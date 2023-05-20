import React, {Component} from 'react';
import {
  Text,
  View,
  Platform,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {connect} from 'react-redux';
import {Dialog, Button} from '@rneui/themed';
import {Input} from '@rneui/base';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import styles from './styles';
import {setHeight, setWidth} from '../../../utils/styleAdb';
import FocusAwareStatusBar from '../../../components/FocusAwareStatusBar';
import {SafeAreaView} from 'react-native-safe-area-context';
import MyButton from '../../../components/MyButton';
import {GETADS} from '../../../api/requestPath';
import baseUrl from '../../../api/baseUrl';
import axios from '../../../api';
import MyFrame2 from '../../../components/MyFrame2';
import {asyncGetAlarmData2, filterAlarm2} from '../../../redux/actions/alarm2';
import Screening from '../../../components/Screening';
import {store} from '../../../redux/store';
import {FilterAlarmDevices} from '../../../api/requestPath';

class Figureout extends Component {
  state = {
    filterData: [], //筛选过滤的数据
    refreshing: false,
  };
  componentDidMount() {
    this.props.asyncGetAlarmData2();
    //标题栏右边按钮
    this.headerRightButton();
    this.setState({filterData: this.props.myalarm2});
  }
  componentWillUnmount() {
    store.dispatch({type: 'loading', data: false});
  }
  //上拉加载报警信息的方法
  pullLoadAlarms = () => {
    //1.获取还没有请求到的设备
    //2.根据设备获取对应的报警信息
  };
  //查看详情跳转
  handleDetails = alarmId => {
    this.props.navigation.push('ExceptionSpecification', {alarmId});
  };
  /* 筛选按钮*/
  headerRightButton = () => {
    this.props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            store.dispatch({type: 'changeFilter'});
          }}>
          <Text style={{color: 'blue'}}>筛选</Text>
        </TouchableOpacity>
      ),
    });
  };
  //筛选
  Toscreening = async data => {
    try {
      store.dispatch({type: 'loading', data: true});
      let result = await axios.authPost(FilterAlarmDevices, data);
      console.log(result);
      if (result.message === 'ok') {
        store.dispatch({type: 'loading', data: false});
        if (result.data.records.length === 0) {
          alert('请更换筛选条件');
        }
        this.props.filterAlarm2(result.data.records);
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
    const oriageScrollHeight = event.nativeEvent.layoutMeasurement.height; // scrollView高度
    console.log(`offSetY${offSetY}`);
    console.log(`oriageScrollHeight${oriageScrollHeight}`);
    console.log(`contentSizeHeight${contentSizeHeight}`);
    if (offSetY + oriageScrollHeight >= contentSizeHeight - 1) {
      this.props.asyncGetAlarmData2();
    }
  };
  //下拉刷新
  onRefresh = () => {
    this.props.asyncGetAlarmData2();
  };
  render() {
    const {isFilter, filterObj, filterData, refreshing} = this.state;
    let {myalarm2} = this.props;

    return (
      <MyFrame2>
        <SafeAreaView style={{flex: 1}} edges={['right', 'left']}>
          {Platform.OS == 'android' ? (
            <FocusAwareStatusBar
              translucent={true}
              backgroundColor="rgba(0,0,0,0)"
            />
          ) : null}
          <ScrollView
            showsVerticalScrollIndicator={false}
            onScrollEndDrag={this.onMomentumScrollEnd}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={this.onRefresh}
              />
            }>
            {myalarm2 &&
              myalarm2.length > 0 &&
              myalarm2.map(item => {
                console.log('22222222', item);
                return (
                  <View style={styles.public_style} key={item.index}>
                    <Image
                      style={styles.alert_image}
                      source={require('./images/dya.png')}
                    />
                    <View style={styles.alert_text}>
                      <Text style={styles.alert_Size}>{item.pointName}</Text>
                    </View>
                    <View style={styles.blue_line}></View>
                    <View style={styles.line_Size}>
                      <Text
                        style={{
                          fontSize: setWidth(32),
                          marginTop: setWidth(10),
                        }}>
                        设备名称: {item.deviceName}
                      </Text>
                      <Text
                        style={{
                          fontSize: setWidth(32),
                          marginTop: setWidth(10),
                        }}>
                        报警时间: {item.createTime}
                      </Text>
                      <Text
                        style={{
                          fontSize: setWidth(32),
                          marginTop: setWidth(10),
                        }}>
                        完成时间: {item.updateTime}
                      </Text>
                      <Text
                        style={{
                          fontSize: setWidth(32),
                          marginTop: setWidth(10),
                        }}>
                        异常值: {item.alarmValue}
                      </Text>
                      <Text
                        style={{
                          fontSize: setWidth(32),
                          marginTop: setWidth(10),
                        }}>
                        客户名称:{item.jsonEntity.company_name}
                      </Text>
                      <Text
                        style={{
                          fontSize: setWidth(32),
                          marginTop: setWidth(10),
                        }}>
                        地 址:
                        {item.jsonEntity.province +
                          item.jsonEntity.city +
                          item.jsonEntity.county +
                          item.jsonEntity.detailed_address}
                      </Text>
                      <TouchableOpacity
                        style={styles.view_style}
                        onPress={() => {
                          this.handleDetails(item.alarmId);
                        }}>
                        <Text style={styles.view_details}>查看详情</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
          </ScrollView>
          {/* 筛选模态框 */}
          <Screening
            handleClick={data => {
              this.Toscreening(data);
            }}
            filterState={3}
          />
          {/* filterState 相当于是一个模块标识 */}
        </SafeAreaView>
      </MyFrame2>
    );
  }
}
const mapStateToProps = state => {
  console.log(state.alarm2);
  return {
    myalarm2: state.alarm2,
  };
};
export default connect(mapStateToProps, {asyncGetAlarmData2, filterAlarm2})(
  Figureout,
);
