import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Text,
  View,
  Image,
  TextInput,
  Touch,
  TouchableOpacity,
} from 'react-native';
import MyButton from '../../../components/MyButton';
import {Button, Text as Texts} from '@rneui/themed';
import MyFrame from '../../../components/MyFrame';
import {setWidth, setHeight} from '../../../utils/styleAdb';
import {asyncGetAlarmData} from '../../../redux/actions/alarm';
import {
  getAlarmInfoByAlarmId,
  batchUploadImg,
  batchUploadImg2,
  submitAlarmHandle,
  GetAlarmInfoByAlarmId,
  SubmitAlarmHandle,
} from '../../../api/requestPath';
import styles from './styles';
import {Alert} from 'react-native';
import {Input} from '@rneui/base';
import {store} from '../../../redux/store';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import imageConversion from 'image-conversion';
import {launchImageLibrary} from 'react-native-image-picker';
import baseUrl from '../../../api/baseUrl';
import axios from '../../../api';
import {resolvePreset} from '@babel/core';
import baseComponent from 'react-native-ui-lib/src/commons/baseComponent';
class ErrorCancel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alarmInfo: {},
      alarmForm: {
        //报警id
        alarmId: Number,
        //设备名称
        deviceName: '',
        //传感器名称
        pointName: 'sdasda',
        //处理人
        alarmHandleName: 'sdasda',
        //联系电话
        alarmHandleTel: '13131703760',
        //异常原因
        alarmReason: '',
        //异常处理过程
        alarmHandleDesc: '',
        //1:异常未处理  0:异常处理完成
        alarmStatus: '',
        //图片路径
        alarmImages: '',
      },
      files: new FormData(),
      checkImgs: true,
      imageFormat: true,
      imgCount: 0,
      isEditing: true, //是否进入编辑状态
      flagUser: true, //是否可以执行onBlur处理函数
      imgList: [], //图片路径
      relativePath: [], //相对路径
    };
    this.alarmHandleNameClose = React.createRef();
    this.alarmHandleNameCheck = React.createRef();
    this.alarmHandleTelClose = React.createRef();
    this.alarmHandleTelCheck = React.createRef();
  }
  //挂载后
  componentDidMount() {
    const {alarmId} = this.props.route.params;
    console.log(alarmId);
    this.getAlarmInfo(alarmId);
    // console.log(this.props.user);
  }
  componentWillUnmount() {
    store.dispatch({type: 'loading', data: false});
  }
  //处理人员
  checkAlarmHandleName = () => {
    if (this.state.alarmForm.alarmHandleName !== '') {
      return true;
    } else {
      alert('用户名不能为空');
      return false;
    }
  };
  //处理手机号
  checkAlarmHandleTel = () => {
    var pattern = /^(13|14|15|18|17)[0-9]{9}$/;
    if (
      this.state.alarmForm.alarmHandleTel !== '' &&
      pattern.test(this.state.alarmForm.alarmHandleTel)
    ) {
      return true;
    } else {
      alert('手机号格式不正确');
      return false;
    }
  };
  //根据alarmId获取报警信息
  getAlarmInfo = async alarmId => {
    let {alarmForm, alarmInfo} = this.state;
    try {
      store.dispatch({type: 'loading', data: true});
      let result = await axios.authGet(
        GetAlarmInfoByAlarmId.replace(':alarmId', alarmId),
      );
      console.log(result);
      if (result.message === 'ok') {
        store.dispatch({type: 'loading', data: false});
        let newData = result.data;
        this.setState({
          alarmInfo: newData,
          alarmForm: {
            ...alarmForm,
            alarmId: newData.alarmId,
            deviceName: newData.deviceName,
            pointName: newData.pointName,
            alarmStatus: newData.alarmStatus,
          },
        });
      }
    } catch (e) {
      console.log('获取报警信息失败', e);
      store.dispatch({type: 'loading', data: false});
    }
  };

  //点击上传
  updateImageDisplay = async () => {
    // create empty array to store file names
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 6,
        includeBase64: true,
        maxWidth: 1000,
        maxHeight: 1000,
      },
      async res => {
        console.log(res.assets);
        console.log('1111111111', res);
        const curFiles = res.assets;
        // console.log(curFiles);

        this.setState({relativePath: curFiles});
        if (curFiles.length > 6) {
          alert('上传的图片数量不能超过6张!');
        } else {
          for (const file of curFiles) {
            // console.log('21323123',file);
            if (this.validFileType(file)) {
              this.setState({imgCount: this.state.imgCount + 1}, () => {
                console.log(this.state.imgCount);
              });
              if (this.state.imgCount > 6) {
                alert;
              } else {
                var result;
                //2097152 = 2MB
                // if (file.size > 2097152) {
                //   //压缩图片大小
                //   result = await imageConversion.compressAccurately(file, {
                //     size: 2097152, //图片的大小
                //     accuracy: 0.95, //图片的质量
                //     type: 'image/*',
                //     width: 1200,
                //     height: 1600,
                //     orientation: 1,
                //   });
                // } else {
                //   result = file;
                // }
                // console.log(result.fileName);

                // this.setState({relativePath:fileNames},()=>{
                //   console.log(this.state.relativePath);
                // })
                // fileNames.push(result.fileName); // push file name to array
                // this.state.files.append(file, result);
                this.setState(prevState => ({
                  imgList: [...prevState.imgList, res.assets],
                }));
              }
            } else {
              this.setState({imageFormat: false});
            }
          }
          if (!this.state.imageFormat) {
            alert('图片不符合要求');
          }
        }
      },
    );
  };
  //点击处理按钮
  handleInfo = async params => {
    // store.dispatch({type:'loading',data:true})
    let {relativePath} = this.state;
    console.log('9999999999', relativePath);

    //1.校验数据
    if (
      this.checkAlarmHandleName() &&
      this.checkAlarmHandleTel() &&
      this.state.checkImgs &&
      this.state.imageFormat
    ) {
      // let result;
      let formData = new FormData();
      //console.log(JSON.stringify('233333333333', formData));
      //formData.set('contextPath', 'files/tes');
      //  if (data) {
      //     if (Array.isArray(data)) {
      //       //图片批量上传
      //       for (let i = 0; i < data.length; i++) {
      //         if (i === 0) {
      //           relativePath = this.state.relativePath[i].relativePath;
      //         } else {
      //           relativePath += ',' + data[i].relativePath;
      //         }
      //       }
      //       this.state.alarmForm.alarmImages = relativePath;
      //     }
      //   }
      formData.append('relative', 'alarm');
      // formData.append('file', this.state.relativePath[0].uri);
      // console.log('242424', this.state.relativePath[0].uri);
      // this.state.files.forEach((file, index) => {
      //   formData.append(`image${index}`, {
      //     uri: file.uri,
      //     type: file.type,
      //     name: file.name,
      //   });
      // });
      for (let i = 0; i < this.state.relativePath.length; i++) {
        formData.append('file', {
          uri: this.state.relativePath[0].uri,
          type: this.state.relativePath[0].type,
          name: this.state.relativePath[0].fileName,
        });
      }

      // this.state.files.append('file', {
      //   uri: params.uri,
      //   type: params.type,
      //   name: params.fileName,
      // });
      console.log('12324', formData);
      fetch(`${baseUrl.DEVICE_URL}/manager/upload/img/batch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      })
        .then(response => {
          return response.json();
        })
        .then(responseText => {
          alert('11111111111111');
          console.log(responseText);
        })
        .catch(error => {
          console.error(error);
        });

      // let result;

      // console.log(this.state.imgList);
      // for (var item of this.state.imgList) {
      //   console.log(item.uri);
      // }
      // // 2.2 再提交普通字段
      // try {
      //   store.dispatch({type: 'loading', data: true});
      //   let newresult = await axios.authPost(
      //     SubmitAlarmHandle,
      //     this.state.alarmForm,
      //   );
      //   console.log(newresult);
      //   if (newresult.message === 'ok') {
      //     this.props.navigation.navigate('figureout');
      //     store.dispatch({type: 'loading', data: false});
      //   }
      // } catch (e) {
      //   console.log(e);
      //   store.dispatch({type: 'loading', data: false});
      // }
      // await submitAlarmHandle(this.alarmForm)
      //   .then(response => {
      //     result = response.data;
      //   })
      //   .catch(error => {
      //     result = error.response.data;
      //   });
      //);
    }
  };

  validFileType(file) {
    const fileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    return fileTypes.includes(file.type);
  }
  render() {
    let {text, phone, isEditing, flag, alarmForm, alarmInfo, flagUser} =
      this.state;
    let {deviceName, pointName} = this.props.route.params;
    console.log(baseUrl.DEVICE_URL);
    console.log(this.state.imgList);
    return (
      <View>
        <MyFrame style={styles.images_url}>
          {/* 头部盒子*/}
          <View style={styles.container}>
            {/* 筛机信息 */}
            <View style={styles.leftWraper}>
              <Image
                source={require('./images/sjimg.png')}
                style={{width: setWidth(150), height: setHeight(156)}}
              />
              <View
                style={{
                  justifyContent: 'space-around',
                  marginLeft: setWidth(30),
                }}>
                <Text style={{fontSize: setWidth(40), color: 'black'}}>
                  {deviceName}
                </Text>
                <View
                  style={{
                    borderLeftColor: 'blue',
                    borderLeftWidth: 2,
                    paddingLeft: setWidth(10),
                  }}>
                  {/* <Text style={styles.alemINfoText}>LKBB367300-00</Text> */}
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.alemINfoText}>异常说明: </Text>
                    <Text style={{color: 'red', fontSize: setWidth(26)}}>
                      {pointName}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            {/* 上报人信息 */}
            <View style={styles.RightWraper}>
              <View>
                <View
                  style={{flexDirection: 'row', marginBottom: setWidth(42)}}>
                  <Text style={[styles.alemINfoText]}>处理人员:</Text>
                  <TextInput
                    onBlur={this.checkAlarmHandleName}
                    style={styles.Myinput}
                    value={alarmForm.alarmHandleName}
                    onChangeText={e => {
                      this.setState(
                        {alarmForm: {...alarmForm, alarmHandleName: e}},
                        () => {},
                      );
                    }}
                  />
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={[styles.alemINfoText]}>联系电话:</Text>
                  <TextInput
                    onBlur={this.checkAlarmHandleTel}
                    style={styles.Myinput}
                    value={alarmForm.alarmHandleTel}
                    onChangeText={e => {
                      this.setState({
                        alarmForm: {...alarmForm, alarmHandleTel: e},
                      });
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
          {/* 处理过程 */}
          <View style={styles.deviceListWrap}>
            {/*头部*/}
            <View style={styles.deviceListHeader}>
              <View style={styles.headerWrap}>
                <View style={styles.headerLeft}>
                  <Image
                    source={require('./images/figureout.png')}
                    style={{width: setWidth(51), height: setWidth(71)}}
                  />
                  <Text style={styles.headerLeftText}>处理过程</Text>
                </View>
              </View>
            </View>
            <View style={styles.border_distance}>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.error_line}></View>
                <Text
                  style={{
                    color: 'black',
                    marginLeft: setWidth(24),
                    fontSize: setWidth(30),
                  }}>
                  产生异常原因说明:
                </Text>
              </View>
              <View style={styles.shadow_container}>
                <View style={styles.border_Shadow}>
                  <TextInput
                    onChangeText={e => {
                      this.setState(
                        {alarmForm: {...alarmForm, alarmReason: e}},
                        () => {},
                      );
                    }}
                    multiline
                    style={styles.border_fontSize}></TextInput>
                </View>
              </View>
            </View>
            <View style={styles.border_distance}>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.error_line}></View>
                <Text
                  style={{
                    color: 'black',
                    marginLeft: setWidth(24),
                    fontSize: setWidth(30),
                  }}>
                  异常处理的过程说明:
                </Text>
              </View>
              <View style={styles.shadow_container}>
                <View style={styles.border_Shadow}>
                  <TextInput
                    multiline
                    onChangeText={e => {
                      this.setState(
                        {alarmForm: {...alarmForm, alarmHandleDesc: e}},
                        () => {},
                      );
                    }}
                    style={styles.border_fontSize}></TextInput>
                </View>
              </View>
            </View>
            <View style={styles.border_distance}>
              <View>
                {/* <View style={styles.error_line}></View> */}
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      color: 'black',
                      marginLeft: setWidth(24),
                      fontSize: setWidth(30),
                    }}>
                    上传图片
                  </Text>
                  <Text style={{fontSize: setWidth(30)}}>
                    * 要求图片格式为png/jpg/jpeg
                  </Text>
                </View>
              </View>
              {/* 上传图片 */}

              <TouchableOpacity onPress={this.updateImageDisplay}>
                <View style={styles.image_borderShadow}>
                  <View style={styles.shadow_container}>
                    <Image
                      style={styles.imageup}
                      source={require('./images/imgup.png')}
                    />
                  </View>
                </View>
              </TouchableOpacity>
              <View style={styles.imgWraper}>
                {this.state.imgList.map((item, index) => {
                  console.log(item);
                  return (
                    <View key={index} style={{marginRight: setWidth(60)}}>
                      <Image
                        style={{width: setWidth(200), height: setWidth(200)}}
                        source={{uri: item[0].uri}}></Image>
                    </View>
                  );
                })}
              </View>
            </View>
            <View>
              <TouchableOpacity onPress={this.handleInfo}>
                <View style={styles.btn_borderStyle}>
                  <Text style={{color: '#fff', textAlign: 'center'}}>
                    确认处理
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </MyFrame>
      </View>
    );
  }
}
const mapStateToProps = state => {
  console.log(state);
  return {
    myalarm: state.alarm,
    user: state.user,
  };
};
//const ErrorStutas=withNavigation(ErrorCancel)
export default connect(mapStateToProps, null)(ErrorCancel);
