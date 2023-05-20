import React from "react";
import { Platform, ImageBackground, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


import FocusAwareStatusBar from "../../components/FocusAwareStatusBar";
import { setWidth } from "../../utils/styleAdb";

function Index(props) {
  return (
    <ImageBackground source={require('./images/bg-01.png')} style={{width:'100%',height:'100%'}}>
      <SafeAreaView style={{flex:1}} edges={["right", "left"]}>
        {Platform.OS == "android" ? <FocusAwareStatusBar translucent={true} backgroundColor="rgba(0,0,0,0)" /> : null}
        <ScrollView>
          {props.children}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>

  );
}

export default Index;
