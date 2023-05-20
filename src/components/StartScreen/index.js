import React from "react";
import { Image, StatusBar, View } from "react-native";
import {connect} from "react-redux"
import {SafeAreaView} from "react-native-safe-area-context"

import { getStorage, USER } from "../../utils/storage";
import { loginSuccess } from "../../redux/actions/user";

class Index extends React.Component {

  componentDidMount() {
    this.goLoginOrMain()
  }

  /*
  * 从持久化存储中读取用户数据,决定去登录页面还是主页
  * */
  goLoginOrMain = async () => {
    // 1.从持久化存储中读取用户信息
    let result = await getStorage(USER);
    if (result) {
      //2.如果用户信息存在 将用户信息保存到redux中, 否则 进行登录
      result = JSON.parse(result);
      if (result.id) {
        store.dispatch(loginSuccess(result));
        //跳转到主页
        this.props.navigation.reset({
          index: 0,
          routes: [{ name: "MyTab" }],
        });
      }
    } else {
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    }
  };
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", justifyContent: "center", alignItems: "center" }}>
        <Image source={require("./sslogo.png")} style={{width:'100%',height:'50%'}} resizeMode={"center"} />
      </SafeAreaView>
    );
  }
}

export default connect(state=>({user:state.user}),{loginSuccess})(Index)
