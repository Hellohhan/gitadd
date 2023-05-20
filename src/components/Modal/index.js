import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { Overlay } from '@rneui/themed'


function Index(props) {
  const {modalText, close} = props
  const [isVisible,setIsVisible] = useState(true)
  useEffect(()=>{
    setTimeout(() => {
      setIsVisible(false)
      close()
    },2000)
  },[])
  return (
    <Overlay
      overlayStyle={{backgroundColor:'rgba(105,105,105,1)'}}
      backdropStyle={{backgroundColor:'transparent'}}
      isVisible={isVisible}
    >
      <Text>{modalText}</Text>
    </Overlay>
  );
}

export default Index;
