import React from "react";
import { Platform, ImageBackground, ScrollView, Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderHeightContext } from '@react-navigation/elements';

import FocusAwareStatusBar from "../../components/FocusAwareStatusBar";
import { setWidth } from "../../utils/styleAdb";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";

function Index(props) {
  const {isNews}=props
  return (
    <ImageBackground source={require('./images/bgImg.png')} style={{width:'100%',height:'100%'}}>
      <SafeAreaView style={{flex:1}} edges={["right", "left"]}>
        {Platform.OS == "android" ? <FocusAwareStatusBar translucent={true} backgroundColor="rgba(0,0,0,0)" /> : null}
        <KeyboardAwareScrollView extraHeight={20} enableOnAndroid={true}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <HeaderHeightContext.Consumer>
              {headerHeight => (
                <ScrollView style={{flex:1,paddingHorizontal:isNews?setWidth(0):setWidth(48),marginTop:headerHeight}}>
                  {props.children}
                </ScrollView>
              )}
            </HeaderHeightContext.Consumer>
          </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </ImageBackground>

  );
}
const mapStatetoProps=(state)=>{
  return{
    isNews:state.news.isNews
  }
}
export default connect(mapStatetoProps,null)(Index) ;
