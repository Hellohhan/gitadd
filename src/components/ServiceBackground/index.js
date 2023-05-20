import { View, Text,ScrollView ,RefreshControl} from 'react-native'
import React,{useRef,useEffect,useState} from 'react'
import styles from './style'
export default function style(props) {
  let {items}=props.items

    useEffect(() => {
          scrollViewRef.current.scrollToEnd({ animated: true });
        }, [items])
  // console.log(props.items+'123');

  /*下拉加载 */
const onRefresh = React.useCallback(() => {
  setisScroview(false);/* 是否滚动到最下面 */
  setRefreshing(true);
  getHistoryMessage(10)
  setRefreshing(false);
}, []);
  return (
    <View>
     <View style={styles.background}></View>
        <View style={styles.wraper}>
        <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef}
           refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
           {props.children}
        </ScrollView>
        </View>
    </View>
  )
}

