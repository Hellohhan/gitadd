import React from 'react'
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableWithoutFeedback,
  Keyboard, TouchableOpacity,
} from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context'
import {Input} from '@rneui/themed'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {connect} from 'react-redux'
import Spinner from 'react-native-loading-spinner-overlay';

import styles from './styles'
import { setWidth, setText, setHeight,newsPush} from "../../utils/styleAdb";
import {asyncLogin} from '../../redux/actions/user'

class Login extends React.Component{

  state={
    username:'',
    password:'',
    isLoading: false,//是否正在加载
    errorMessge: ""
  }
  componentDidMount() {
    this.isLogin()
  }
  componentDidUpdate() {
    this.isLogin()
  }
  isLogin=()=>{
    const {id} = this.props.userInfo
    if (id){
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: 'MyTab' }],
      })
    }else if (this.state.isLoading) {
      this.setState({isLoading:false})
    }
  }
  //登录按钮回调函数
  login = async () =>{
    let {username, password} = this.state
    try {
      this.setState({isLoading:true,errorMessge:"",password: "",username: ""})
      await this.props.asyncLogin({username,password})
    }catch (e) {
      this.setState({errorMessge:e})
    }
  }
  //改变密码
  changePassword = (password) => {
    this.setState({password});
  }
  //改变用户名
  changeUsername = (username) => {
    this.setState({username})
  }

  render(){
    const {username,password,isLoading,errorMessge} = this.state
    return (
      <SafeAreaView style={styles.container}>
        {/*加载占位符*/}
        <Spinner visible={isLoading} />
        <KeyboardAwareScrollView extraHeight={20} enableOnAndroid={true}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            {/*logo*/}
            <View>
              <Image source={require('./images/01.png')} style={styles.logo}/>
              <View style={styles.lineWrap}>
                <Image source={require('./images/02.png')} style={styles.line} />
                <Text style={styles.lineRightText}>您身边的设备监测助手</Text>
              </View>
            </View>
            {/*中间登录部分*/}
            <View style={styles.contentWrap}>
              {/*手机号*/}
              <View style={styles.loginWrap}>
                <Image source={require('./images/04.png')} style={styles.icon}/>
                <View style={styles.verticalLine}/>
                <Input
                  keyboardType='numeric'
                  maxLength={11}
                  value={username}
                  onChangeText={this.changeUsername}
                  inputContainerStyle={{borderBottomWidth:0,height:'100%'}}
                  inputStyle={{fontSize:setText(40),color:'#9F9FA0'}}
                  containerStyle={styles.inputStyle}
                  placeholder='请输入您的手机号'
                  placeholderTextColor='#9F9FA0'
                />
              </View>
              {/* 密码*/}
              <View style={[styles.loginWrap,{marginTop:setWidth(54)}]}>
                <Image source={require('./images/03.png')} style={styles.icon}/>
                <View style={styles.verticalLine}/>
                <Input
                  value={password}
                  maxLength={20}
                  onChangeText={this.changePassword}
                  inputContainerStyle={{borderBottomWidth:0,height:'100%'}}
                  containerStyle={styles.inputStyle}
                  placeholder='请输入您的密码'
                  placeholderTextColor='#9F9FA0'
                  style={{fontSize:setText(40),color:'#9F9FA0'}}
                  secureTextEntry={true}
                  errorMessage={errorMessge}
                  errorStyle={{ color: 'red' }}
                />
              </View>
              {/*登录按钮*/}
              <TouchableOpacity onPress={this.login}>
                <ImageBackground source={require('./images/05.png')}
                  style={styles.loginButtonWrap}
                >
                  <Text style={styles.loginButtonText}>登录</Text>
                  <Text style={[styles.loginButtonText,{marginLeft:setWidth(30)}]}>Login</Text>
                </ImageBackground>
              </TouchableOpacity>

              {/* 忘记密码/注册 */}
              <Text style={styles.forgetPassword}>忘记密码 / 注册</Text>
            </View>
            {/*横线*/}
            <View style={styles.bottomLine}></View>
            <Text style={styles.bottomText}>登录时遇到问题?</Text>
          </View>
          </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    )
  }
}
export default connect(
  state => ({userInfo:state.user}),
  {asyncLogin})(Login)