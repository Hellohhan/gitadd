import React, { useEffect, useState } from "react";
import { View, Text, Alert,Dimensions } from "react-native";
import { Button } from '@rneui/themed';
import { ImageBackground, Image, SafeAreaView, ScrollView, Platform } from "react-native";

import { StyleSheet, TouchableOpacity } from 'react-native';
import { setWidth, setText, setHeight } from "../../../../utils/styleAdb";
import { Tab, Input, TabView } from '@rneui/themed';
import MyFrame from '../../../../components/MyFrame'
import MyFrameWork from "../../../../components/MyFrameWork";
import styles from "./styles";
import { maintenanceRcordByDeviceidSysRemin,MaintenanceParts} from '../../../../api/requestPath'
import axios from "../../../../api";
import {store} from '../../../../redux/store'
function Index(props) {
  const [index1, setIndex] = React.useState(0);
  const [drive, setdrive] = useState([])/* 驱动 */
  const [cross, setcross] = useState([])/* 十字万向轴 */
  const [vibrator, setvibrator] = useState([])/* 激振器 */
  let { deviceId, name, snCode } = props.route.params
  useEffect(() => {
    getData(deviceId)
    return ()=>{
      store.dispatch({type:'loading',data:false})
    }
  }, [])
  const getData = async (deviceId) => {
    let params = {
      "deviceId": deviceId,
      "sysRemind": "2",
      "jsonEntity": {
        "sysRemind1": "2"
      }
    }
     try{
      store.dispatch({type:'loading',data:true})
       let result =await axios.authPost(MaintenanceParts,params)
        if(result.message==='ok'){
          store.dispatch({type:'loading',data:false})
          let data1 = result.data.filter(item => item.part_id == 1)/* 激振器 */
            let data2 = result.data.filter(item => item.part_id == 2)/* 十字万向轴 */
            let data3 = result.data.filter(item => item.part_id == 3)/* 驱动总成轴承座 */
            setvibrator(data1)
            setcross(data2)
            setdrive(data3)
        }
     }
     catch(e){
      console.log('记录查询失败',e);
      store.dispatch({type:'loading',data:false})
     }
    // try {
    //   store.dispatch({type:'loading',data:true})
    //   const data = await maintenanceParts(params)
    //   console.log(data);
    //   store.dispatch({type:'loading',data:false})
    //   let result = data.data.data;
    //   console.log(result);
    //   let data1 = result.filter(item => item.part_id == 1)/* 激振器 */
    //   let data2 = result.filter(item => item.part_id == 2)/* 十字万向轴 */
    //   let data3 = result.filter(item => item.part_id == 3)/* 驱动总成轴承座 */
    //   console.log(data3);
    //   setvibrator(data1)
    //   setcross(data2)
    //   setdrive(data3)
    // }
    // catch (e) {
    //   console.log(e);
    // }
  }
  return (
      <ImageBackground  style={styles.wrap} source={require('../../images/bg-01.png')}>
 
        {/* 顶部图片 */}
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-start', marginTop: setWidth(196) }}>
          <View style={styles.baoyangItemimg}>
            <Image source={require('../../images/sj-01.png')} style={{ width: setWidth(130), height: setWidth(110) }} />
          </View>
          <View style={{ marginLeft: setWidth(26), marginTop: setWidth(83), width: setWidth(405), height: setWidth(161) }}>
            <Text style={styles.runStateDeviceName}>{name}</Text>
            <View style={{ flexDirection: 'row', borderLeftWidth: setWidth(6), borderLeftColor: '#446bf8' }}>
              <Text style={[styles.byrunStateComAddText, { marginLeft: setWidth(20) }]}>{snCode}</Text>
            </View>
          </View>
        </View>
        {/* 保养内容   */}
        <View style={{ alignItems: 'center' }}>
          <View style={{ width: setWidth(988), borderBottomColor: '#c2c7db', borderBottomWidth: setWidth(1) }}>
            <>
              <Tab
                value={index1}
                onChange={(e) => setIndex(e)}

                indicatorStyle={{
                  backgroundColor: 'blue',
                  height: setHeight(4),
                  alignItems: 'center',
                  marginLeft: setWidth(70),
                  width: setWidth(195)
                }}
                variant='default'
              >
                <Tab.Item
                  title="驱动总成"
                  titleStyle={styles.baoyangjltabttitle}
                  buttonStyle={{
                 
                    // backgroundColor: '#e4ebff',
                    //paddingHorizontal:0,
                    //paddingVertical:0,
                    height: setHeight(80)
                  }}
                />
                <Tab.Item
                  title="十字万向轴"
                  titleStyle={styles.baoyangjltabttitle}

                  buttonStyle={{
                  
                    // backgroundColor: '#e4ebff',
                    //paddingHorizontal:0,
                    //paddingVertical:0
                    height: setHeight(80),
                  }}
                />
                <Tab.Item
                  title="激振器"
                  titleStyle={styles.baoyangjltabttitle}
                  buttonStyle={{
            
                    // backgroundColor: '#e4ebff',
                    //paddingHorizontal:0,
                    //paddingVertical:0
                    height: setHeight(80)
                  }}
                />
              </Tab>
            </>
          </View>
          <View style={{ width: setWidth(988), height: setHeight(1300) }}>
            <TabView value={index1} onChange={setIndex} animationType="timing">
              {/* 驱动总成 */}
              <TabView.Item>
                <SafeAreaView style={{ flex: 1, }}>
                  <ScrollView style={{ marginHorizontal: 16, }}>
                    {
                      drive.length>0?
                      drive.map(item =>{
                        console.log(item);
                        return(
                          <TouchableOpacity style={styles.byshebeiStateItem1} key={item.id}>
                          <View style={styles.baoyangjlview}>
                            <View style={{ flexDirection: 'row', borderLeftWidth: setWidth(6), borderLeftColor: '#446bf8', marginLeft: setWidth(15) }}>
                              <Text style={[styles.byrunStateComAddText, { marginLeft: setWidth(20) }]}>保养时间:</Text>
                              <Text style={styles.byrunStateComAddText}>{item.completion_format}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', borderLeftWidth: setWidth(6), borderLeftColor: '#446bf8', marginLeft: setWidth(15) }}>
                              <Text style={[styles.byrunStateComAddText, { marginLeft: setWidth(20) }]}>保养内容:</Text>
                              <Text style={styles.byrunStateComAddText}>{item.part_name}</Text>
                            </View>
                          </View>

                        </TouchableOpacity>
                        )
                      }
                      
                      
                      )
                      :<View style={{width: Dimensions.get('window').width-setWidth(190)}}> 
                        <Text style={{textAlign:'center'}}> 暂无保养记录</Text>
                      </View>
                    }
                  </ScrollView>
                </SafeAreaView>
              </TabView.Item>
              {/* 十字万向轴 */}
              <TabView.Item>
                <SafeAreaView style={{ flex: 1, }}>
                  <ScrollView style={{ marginHorizontal: 16, }}>
                    {
                      cross.length>0?
                      cross.map(item =>
                        <TouchableOpacity style={styles.byshebeiStateItem1} key={item.id}>
                          <View style={styles.baoyangjlview}>
                            <View style={{ flexDirection: 'row', borderLeftWidth: setWidth(6), borderLeftColor: '#446bf8', marginLeft: setWidth(15) }}>
                              <Text style={[styles.byrunStateComAddText, { marginLeft: setWidth(20) }]}>保养时间:</Text>
                              <Text style={styles.byrunStateComAddText}>{item.completion_format}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', borderLeftWidth: setWidth(6), borderLeftColor: '#446bf8', marginLeft: setWidth(15) }}>
                              <Text style={[styles.byrunStateComAddText, { marginLeft: setWidth(20) }]}>保养内容:</Text>
                              <Text style={styles.byrunStateComAddText}>{item.part_name}</Text>
                            </View>
                          </View>

                        </TouchableOpacity>
                      )
                      :<View style={{width: Dimensions.get('window').width-setWidth(190)}}> 
                      <Text style={{textAlign:'center'}}> 暂无保养记录</Text>
                    </View>
                    }
                  </ScrollView>
                </SafeAreaView>
              </TabView.Item>
              {/* 激振器 */}
              <TabView.Item>
                <SafeAreaView style={{ flex: 1, }}>
                  <ScrollView style={{ marginHorizontal: 16, }}>
                  {
                    vibrator.length>0?
                      vibrator.map(item =>
                        <TouchableOpacity style={styles.byshebeiStateItem1} key={item.id}>
                          <View style={styles.baoyangjlview}>
                            <View style={{ flexDirection: 'row', borderLeftWidth: setWidth(6), borderLeftColor: '#446bf8', marginLeft: setWidth(15) }}>
                              <Text style={[styles.byrunStateComAddText, { marginLeft: setWidth(20) }]}>保养时间:</Text>
                              <Text style={styles.byrunStateComAddText}>{item.completion_format}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', borderLeftWidth: setWidth(6), borderLeftColor: '#446bf8', marginLeft: setWidth(15) }}>
                              <Text style={[styles.byrunStateComAddText, { marginLeft: setWidth(20) }]}>保养内容:</Text>
                              <Text style={styles.byrunStateComAddText}>{item.part_name}</Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      ):
                      <View style={{width: Dimensions.get('window').width-setWidth(190)}}> 
                      <Text style={{textAlign:'center'}}> 暂无保养记录</Text>
                    </View>
                    }
                  </ScrollView>
                </SafeAreaView>
              </TabView.Item>
            </TabView>
          </View>
        </View>
      </ImageBackground>
  );
}

export default Index;
