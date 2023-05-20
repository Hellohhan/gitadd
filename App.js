/*
 * @Author: Hellohhan yj425hh@163.com
 * @Date: 2023-05-17 18:38:39
 * @LastEditors: Hellohhan yj425hh@163.com
 * @LastEditTime: 2023-05-19 00:25:46
 * @FilePath: \landssky517\App.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, {useEffect, useLayoutEffect, useState, useRef} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider, connect} from 'react-redux';
import {
  ActivityIndicator,
  BackHandler,
  Platform,
  ToastAndroid,
} from 'react-native';
import Nav from './src/Nav';
import {store, persistor} from './src/redux/store';
import JPush from 'jpush-react-native';
import {getStorage, USER} from './src/utils/storage';
import {loginSuccess} from './src/redux/actions/user';
import {ChatClient, ChatOptions} from 'react-native-chat-sdk';
import {PersistGate} from 'redux-persist/integration/react'; //引入持久化网关
import {setWidth} from './src/utils/styleAdb';

function App(props) {
  const lastBackButtonPress = useRef(null);
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton,
    );
    return () => backHandler.remove();
  }, []);
  //再次摁返回退出
  const handleBackButton = () => {
    const currentTime = new Date().getTime();

    if (
      lastBackButtonPress.current &&
      currentTime - lastBackButtonPress.current < 2000
    ) {
      // If the user has pressed the back button twice within 2 seconds, exit the app
      BackHandler.exitApp();
    } else {
      // Show a toast message indicating that the user needs to press the back button again
      if (Platform.OS === 'android') {
        ToastAndroid.show('再次摁返回退出', ToastAndroid.SHORT);
      } else {
        alert('再次摁返回退出');
      }
      lastBackButtonPress.current = currentTime;
    }
    // Return true to indicate that we have handled the back button press
    return true;
  };
  // Your ap
  return (
    <SafeAreaProvider>
      {props.isloading && (
        <ActivityIndicator
          size="large"
          animating={true}
          style={{
            position: 'absolute',
            zIndex: 1,
            left: '50%',
            top: '50%',
            right: '50%',
            marginRight: setWidth(30),
            marginBottom: setWidth(30),
          }}
        />
      )}
      {/* <Text>21321312</Text> */}
      <Nav></Nav>
    </SafeAreaProvider>
  );
}
const mapStateToProps = state => {
  return {
    userInfo: state.user,
    isloading: state.loading.isLoading,
  };
};
export default connect(mapStateToProps)(App);
