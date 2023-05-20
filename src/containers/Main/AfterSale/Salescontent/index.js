import React, { useEffect, useState } from "react";
import { View, Text, Alert, Dimensions, ToastAndroid } from "react-native";
import { Button, TabView, Tab } from '@rneui/themed';
import RNFetchBlob from 'rn-fetch-blob';

import { ImageBackground, Image, TouchableOpacity, SafeAreaView, ScrollView, Platform } from "react-native";

import MyFrameWork from "../../../../components/MyFrameWork";
import { setWidth, setText, setHeight } from "../../../../utils/styleAdb";
import styles from "./styles";
import { color } from "@rneui/base";
import MyFrame2 from "../../../../components/MyFrame2";
import svg from "../../../../assets/svg/svg";
import { SvgXml } from "react-native-svg";
import { getAfterSalesInformation, GetAfterSalesInformationByCidServiceType, MaintenanceQuery, DOWNLOAD_APP ,GetAfterSalesInformation} from '../../../../api/requestPath'
import { store } from '../../../../redux/store'
import { connect } from "react-redux";
import baseUrl from "../../../../api/baseUrl";
import axios from "../../../../api";
function Index(props) {
  const [index1, setIndex] = React.useState(0);
  const [afterSaledata, setafterSaledata] = useState([])
  const [install, setinstall] = useState([])/* 安装手册 */
  const [VulnerableData, setVulnerableData] = useState([])/* 易损资料 */
  const [configuration, setconfiguration] = useState([])/* 配置图 */
  const [VideoData, setVideoData] = useState([])/* 视频资料 */
  const [DOWNLOAD_APPs, setDOWNLOAD_APPs] = useState('http://192.168.0.16:8400/manager/upload/file/app?file=wearin/20211109051411133.pdf')
  let deviceData = props.route.params
  console.log(deviceData.deviceData.c_id);
  const Goback = () => {
    props.navigation.goBack()
  }
  useEffect(() => {
    afterSale()
    return () => {
      store.dispatch({ type: 'loading', data: false })
    }
  }, [index1])
  /* 获取售后信息 */
  const afterSale = async () => {
    // let mydata = []
    try {
      props.dispatch({ type: 'loading', data: true })
      let res=await axios.authPost(GetAfterSalesInformation.replace(':cid',deviceData.deviceData.c_id))
        console.log(res);
      // // let data = await getAfterSalesInformation(deviceData.deviceData.c_id) /* 这里需要改成 cid    deviceData.deviceData.c_id   4可以用 */
      let result = res.data
      // console.log(result);
      if (res.message === 'ok') {
        props.dispatch({ type: 'loading', data: false })
        let serviceType1 = result.filter(item => item.serviceType === '1')
        let serviceType2 = result.filter(item => item.serviceType === '2')
        let serviceType3 = result.filter(item => item.serviceType === '3')
        let serviceType4 = result.filter(item => item.serviceType === '4')
        switch (index1) {
          case 0:
            try {
              props.dispatch({ type: 'loading', data: true })
              // let installs = await getAfterSalesInformationByCidServiceType(deviceData.deviceData.c_id, parseInt(serviceType1[0].serviceType))
              let installs=await axios.authPost(GetAfterSalesInformationByCidServiceType.replace(':cid',deviceData.deviceData.c_id).replace(':serviceType',parseInt(serviceType1[0].serviceType)))
              console.log(installs);
              if (installs.message === 'ok') {
                props.dispatch({ type: 'loading', data: false })
                let newdata = installs.data
                // console.log(newdata);
                return setinstall(newdata)
              }
            }
            catch (e) {
              // alert('请求安装插件失败')
              console.log(e);
              props.dispatch({ type: 'loading', data: false })
            }
          case 1:
            try {
              props.dispatch({ type: 'loading', data: true })
              let VulnerableData=await axios.authPost(GetAfterSalesInformationByCidServiceType.replace(':cid',deviceData.deviceData.c_id).replace(':serviceType',parseInt(serviceType2[0].serviceType)))
              console.log(VulnerableData);
              if (VulnerableData.message === 'ok') {
                props.dispatch({ type: 'loading', data: false })
                let newdata = VulnerableData.data
                // console.log(newdata);
                return setVulnerableData(newdata)
              }
            }
            catch (e) {
            console.log('请求易损件失败',e)
            props.dispatch({ type: 'loading', data: false })
            }

          case 2:
            try {
              props.dispatch({ type: 'loading', data: true })
              let configuration=await axios.authPost(GetAfterSalesInformationByCidServiceType.replace(':cid',deviceData.deviceData.c_id).replace(':serviceType',parseInt(serviceType3[0].serviceType)))
              console.log(configuration);
              if (configuration.message === 'ok') {
                props.dispatch({ type: 'loading', data: false })
                let newdata = configuration.data
                return setconfiguration(newdata)
              }
            }
            catch (e) {
              console.log('请求配置图失败')
              props.dispatch({ type: 'loading', data: false })
            }

          case 3:
            try {
              props.dispatch({ type: 'loading', data: true })
              let VideoData=await axios.authPost(GetAfterSalesInformationByCidServiceType.replace(':cid',deviceData.deviceData.c_id).replace(':serviceType',parseInt(serviceType4[0].serviceType)))
              console.log(VideoData);
              if (VideoData.message === 'ok') {
                props.dispatch({ type: 'loading', data: false })
                let newdata = VideoData.data
                return setVideoData(newdata)
              }
            }
            catch (e) {
              // alert('请求视频资料失败')
              props.dispatch({ type: 'loading', data: false })
            }
        }
      }
    }
    catch (e) {
      console.log('售后信息获取失败', e);
      props.dispatch({ type: 'loading', data: false })
    }
  }
  //下载配置图资料
  async function downloadFile(url) {
    const filename = url.split('/').pop();
    let URL = DOWNLOAD_APP() + url
    // let URL=DOWNLOAD_APPs
    console.log(URL);
    console.log(filename);
    const path = `${RNFetchBlob.fs.dirs.DownloadDir}/landsky/${filename}`
    //查看文件是否存在
    console.log(path);
    const exists = await RNFetchBlob.fs.exists(path);
    console.log(exists);
    if (exists) {
      //文件已经存在，打开它
      RNFetchBlob.android.actionViewIntent(path, 'application/pdf');
    } else {
      //文件不存在下载
      const { dirs } = RNFetchBlob.fs;
      const res = await RNFetchBlob.config({
        path,
      }).fetch('GET', URL);
      console.log(res.info().status);
      if (res.respInfo.status === 200) {
        RNFetchBlob.android.actionViewIntent(path, 'application/pdf');
      }
    }
  }
  //保养详情
  const maintenanceDetail = async () => {
    try {
      store.dispatch({ type: 'loading', data: true })
      let result=await axios.authPost(MaintenanceQuery.replace(':groupId',props.user.groupId))
      if(result.message==='ok'){
      store.dispatch({ type: 'loading', data: false })
      for (var item of result.data) {
            if (item.snCode === deviceData.deviceData.sn_code) {
                    if(item.listMr.length>0){
               props.navigation.navigate ('Maintenancedetails', { name: item.name, categoryName: item.categoryName, deviceId: item.id, snCode: item.snCode ,list:item.listMr})
                    }else{
               props.navigation.navigate('Maintenancedetails2', { name: item.name, categoryName: item.categoryName, deviceId: item.id, snCode: item.snCode })
                    }
            }
          }
      }
    }
    // item.listMr.length>0?this.props.navigation.navigate('Maintenancedetails', { name: item.name, categoryName: item.categoryName, deviceId: item.id, snCode: item.snCode ,list:item.listMr}):
    // this.props.navigation.navigate('Maintenancedetails2', { name: item.name, categoryName: item.categoryName, deviceId: item.id, snCode: item.snCode })
    catch (e) {
      console.log('获取保养信息失败', e);
      store.dispatch({ type: 'loading', data: false })
    }
  }
  console.log(index1);
  //去视频组件
  const ToVideo = (url) => {
    console.log(url);
    props.navigation.navigate('watchVideo', { url: DOWNLOAD_APP() + url })
  }
  return (
    <>
      <ImageBackground style={styles.titleWraperBox} source={require('./images/shBackTop-01.png')}>
        <View style={styles.titleWraper}>
          <TouchableOpacity onPress={Goback} style={styles.SvgWraper}>
            <SvgXml xml={svg.goBack} style={styles.Svg}
              fill={"#fff"}>
            </SvgXml>
          </TouchableOpacity>
          <View style={styles.box}>
            <Text style={styles.title}>售后查询</Text></View>
        </View>
        <View style={styles.xqimg}>
          <ImageBackground source={require('./images/shxqImg-01.png')} style={{ width: '100%', height: '100%', flexDirection: 'row' }}>
            <View style={styles.shebeiItemimg}>
              <Image source={require('../../images/sj-01.png')} style={{ width: setWidth(150), height: setWidth(110) }} />

            </View>
            <View style={{ marginLeft: setWidth(26), marginTop: setWidth(43), width: setWidth(405), height: setWidth(161) }}>
              <Text style={styles.runStateDeviceName}>{deviceData.deviceData.name}</Text>
              <View style={{ flexDirection: 'row', borderLeftWidth: setWidth(6), borderLeftColor: '#446bf8' }}>
                <Text style={[styles.runStateComAddText, { marginRight: setWidth(20) }]}>{deviceData.deviceData.sn_code}</Text>
              </View>
              <View style={{ flexDirection: 'row', borderLeftWidth: setWidth(6), borderLeftColor: '#446bf8' }}>
                <Text style={[styles.runStateComAddText, { marginRight: setWidth(-20) }]}>注册手机号:</Text>
                <Text style={styles.runStateComAddText}>{deviceData.deviceData.phone}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.baoyangxqbt} onPress={maintenanceDetail}>
              <View style={{ flexDirection: 'row', width: setWidth(199) }}>
                <Text style={styles.baoyangxqTxt}>保养详情</Text>
                <Image source={require('../../images/jinrul-01.png')} style={styles.baoyangjrimg} />
              </View>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </ImageBackground>

      <MyFrame2>
        <View style={{ marginTop: setWidth(490), alignItems: 'center' }}>
          <Tab
            value={index1}
            onChange={(e) => setIndex(e)}
            indicatorStyle={{
              backgroundColor: '#ffffff',
              borderRadius: 18,
              opacity: 0.65,
              height: setWidth(224),
              marginTop: setWidth(200)

            }}
            variant='default'
          >

            <Tab.Item
              title="安装手册"
              titleStyle={{ fontSize: setWidth(26), color: '#1D1D38', fontWeight: '900', paddingHorizontal: 0, paddingVertical: 0 }}
              icon={<Image source={require('./images/azsc-01.png')} style={{ width: setWidth(104), height: setWidth(120) }} />}
              buttonStyle={{
                borderWidth: 0,
                backgroundColor: '#eef5ff',
                borderColor: "eef5ff",
                borderTopLeftRadius: setWidth(30),
                borderBottomLeftRadius: setWidth(30),
                height: setWidth(224)
              }}
            />
            <Tab.Item
              title="易损件"
              titleStyle={{ fontSize: setWidth(26), color: '#1D1D38', fontWeight: '900', paddingHorizontal: 0, paddingVertical: 0 }}
              icon={<Image source={require('./images/ysj-01.png')} style={{ width: setWidth(101), height: setWidth(101), marginTop: setWidth(18) }} />}
              buttonStyle={{
                borderWidth: 0,
                backgroundColor: '#eef5ff',
                borderColor: "eef5ff",
                height: setWidth(224)

              }}
            />
            <Tab.Item
              title="配置图"
              titleStyle={{ fontSize: setWidth(26), color: '#1D1D38', fontWeight: '900', paddingHorizontal: 0, paddingVertical: 0 }}
              icon={<Image source={require('./images/pzt-01.png')} style={{ width: setWidth(131), height: setWidth(101), marginTop: setWidth(18) }} />}
              buttonStyle={{
                borderWidth: 0,
                backgroundColor: '#eef5ff',
                borderColor: "eef5ff",
                height: setWidth(224)
              }}
            />
            <Tab.Item
              title="视频资料"
              titleStyle={{ fontSize: setWidth(26), color: '#1D1D38', fontWeight: '900', paddingHorizontal: 0, paddingVertical: 0 }}
              icon={<Image source={require('./images/spzl-01.png')} style={{ width: setWidth(133), height: setWidth(98), marginTop: setWidth(18) }} />}
              buttonStyle={{
                borderWidth: 0,
                backgroundColor: '#eef5ff',
                borderColor: "eef5ff",
                borderTopRightRadius: setWidth(30),
                borderBottomRightRadius: setWidth(30),
                height: setWidth(224)
              }}
            />
          </Tab>

          <View style={{ height: setWidth(48), flexDirection: 'row', alignItems: 'center', marginBottom: setWidth(20) }}>
            <View style={{ width: setWidth(42), height: setWidth(19), borderBottomWidth: setWidth(6), borderBottomColor: index1 == 0 ? '#446bf8' : '#cdd2db', }}></View>
            <View style={{ width: setWidth(6), height: setWidth(19), }}></View>
            <View style={{ width: setWidth(42), height: setWidth(19), borderBottomWidth: setWidth(6), borderBottomColor: index1 == 1 ? '#446bf8' : '#cdd2db' }}></View>
            <View style={{ width: setWidth(6), height: setWidth(19), }}></View>
            <View style={{ width: setWidth(42), height: setWidth(19), borderBottomWidth: setWidth(6), borderBottomColor: index1 == 2 ? '#446bf8' : '#cdd2db' }}></View>
            <View style={{ width: setWidth(6), height: setWidth(19), }}></View>
            <View style={{ width: setWidth(42), height: setWidth(19), borderBottomWidth: setWidth(6), borderBottomColor: index1 == 3 ? '#446bf8' : '#cdd2db' }}></View>
          </View>




          {/*       tabView页 */}
          {/* {BodyContent()} */}
          <View style={{ width: setWidth(980), height: setWidth(880), marginLeft: setWidth(42) }}>
            <TabView value={index1} onChange={setIndex} animationType='spring'>
              <TabView.Item >
                <SafeAreaView>
                  <View style={styles.TabView} >
                    <ScrollView showsVerticalScrollIndicator={false}>
                      {
                        install.map(item => {
                          // console.log(item);
                          return (
                            <View style={{ width: setWidth(820), height: setWidth(184), marginBottom: setHeight(1), }}>
                              <View style={styles.shoucelbbk}>
                                <Text style={styles.runStateDeviceName1}>{item.serviceTypeDesc}</Text>
                                <TouchableOpacity style={styles.xzckbut} onPress={() => { downloadFile(item.serviceUrl) }}>
                                  <Text style={{ fontSize: setText(28), color: 'blue' }}>下载查看</Text>
                                </TouchableOpacity>
                              </View>
                              <View style={{ marginTop: setWidth(20) }}>
                                <View style={{ flexDirection: 'row', borderLeftWidth: setWidth(6), borderLeftColor: '#446bf8' }}>
                                  <Text style={[styles.runStateComAddText, { marginRight: setWidth(20) }]}>完成日期:</Text>
                                  <Text style={[styles.runStateComAddText, { marginRight: setWidth(20) }]}>{item.updateTime}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', borderLeftWidth: setWidth(6), borderLeftColor: '#446bf8' }}>
                                  <Text style={[styles.runStateComAddText, { marginRight: setWidth(20) }]}>更新日期:</Text>
                                  <Text style={styles.runStateComAddText}>{item.updateTime}</Text>
                                </View>
                              </View>
                            </View>
                          )
                        }
                        )
                      }
                    </ScrollView>
                  </View>
                </SafeAreaView>
              </TabView.Item>

              <TabView.Item >
                <SafeAreaView>
                  <View style={styles.TabView} >
                    <ScrollView showsVerticalScrollIndicator={false}>
                      {
                        VulnerableData.map(item => {
                          return (
                            <View style={{ width: setWidth(820), height: setWidth(184), marginBottom: setHeight(1), }}>
                              <View style={styles.shoucelbbk}>
                                <Text style={styles.runStateDeviceName1}>{item.serviceTypeDesc}</Text>
                                <TouchableOpacity style={styles.xzckbut} onPress={() => { downloadFile(item.serviceUrl) }}>
                                  <Text style={{ fontSize: setText(28), color: 'blue' }} >下载查看</Text>
                                </TouchableOpacity>
                              </View>
                              <View style={{ marginTop: setWidth(20) }}>
                                <View style={{ flexDirection: 'row', borderLeftWidth: setWidth(6), borderLeftColor: '#446bf8' }}>
                                  <Text style={[styles.runStateComAddText, { marginRight: setWidth(20) }]}>完成日期:</Text>
                                  <Text style={[styles.runStateComAddText, { marginRight: setWidth(20) }]}>{item.updateTime}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', borderLeftWidth: setWidth(6), borderLeftColor: '#446bf8' }}>
                                  <Text style={[styles.runStateComAddText, { marginRight: setWidth(20) }]}>更新日期:</Text>
                                  <Text style={styles.runStateComAddText}>{item.updateTime}</Text>
                                </View>
                              </View>
                            </View>
                          )
                        }
                        )
                      }
                    </ScrollView>
                  </View>
                </SafeAreaView>
              </TabView.Item>
              <TabView.Item >
                <SafeAreaView>
                  <View style={styles.TabView}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                      {
                        configuration.map(item => {
                          // console.log(item);
                          return (
                            <View style={{ width: setWidth(820), height: setWidth(184), marginBottom: setHeight(1), }}>
                              <View style={styles.shoucelbbk}>
                                <Text style={styles.runStateDeviceName1}>{item.serviceTypeDesc}</Text>
                                <TouchableOpacity style={styles.xzckbut}  onPress={() => { downloadFile(item.serviceUrl) }} >
                                  <Text style={{ fontSize: setText(28), color: 'blue' }} >下载查看</Text>
                                </TouchableOpacity>
                              </View>
                              <View style={{ marginTop: setWidth(20) }}>
                                <View style={{ flexDirection: 'row', borderLeftWidth: setWidth(6), borderLeftColor: '#446bf8' }}>
                                  <Text style={[styles.runStateComAddText, { marginRight: setWidth(20) }]}>完成日期:</Text>
                                  <Text style={[styles.runStateComAddText, { marginRight: setWidth(20) }]}>{item.updateTime}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', borderLeftWidth: setWidth(6), borderLeftColor: '#446bf8' }}>
                                  <Text style={[styles.runStateComAddText, { marginRight: setWidth(20) }]}>更新日期:</Text>
                                  <Text style={styles.runStateComAddText}>{item.updateTime}</Text>
                                </View>
                              </View>
                            </View>
                          )
                        }
                        )
                      }
                    </ScrollView>
                  </View>
                </SafeAreaView>
              </TabView.Item>

              <TabView.Item >
                <SafeAreaView>
                  <View style={styles.TabView} >
                    <ScrollView showsVerticalScrollIndicator={false}>
                      {
                        VideoData.map(item => {
                          return (
                            <View style={{ width: setWidth(820), height: setWidth(184), marginBottom: setHeight(1), }}>
                              <View style={styles.shoucelbbk}>
                                <Text style={styles.runStateDeviceName1}>{item.serviceTypeDesc}</Text>
                                <TouchableOpacity style={styles.xzckbut} onPress={() => { ToVideo(item.serviceUrl) }}>
                                  <Text style={{ fontSize: setText(28), color: 'blue' }}>点击查看</Text>
                                </TouchableOpacity>
                              </View>
                              <View style={{ marginTop: setWidth(20) }}>
                                <View style={{ flexDirection: 'row', borderLeftWidth: setWidth(6), borderLeftColor: '#446bf8' }}>
                                  <Text style={[styles.runStateComAddText, { marginRight: setWidth(20) }]}>完成日期:</Text>
                                  <Text style={[styles.runStateComAddText, { marginRight: setWidth(20) }]}>{item.updateTime}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', borderLeftWidth: setWidth(6), borderLeftColor: '#446bf8' }}>
                                  <Text style={[styles.runStateComAddText, { marginRight: setWidth(20) }]}>更新日期:</Text>
                                  <Text style={styles.runStateComAddText}>{item.updateTime}</Text>
                                </View>
                              </View>
                            </View>
                          )
                        }
                        )
                      }
                    </ScrollView>
                  </View>
                </SafeAreaView>
              </TabView.Item>
            </TabView>
          </View>
        </View>
      </MyFrame2>
    </>
  );
}
const mapStatetoProps = (state) => {
  return {
    isloading: state.loading.isLoading,
    user: state.user
  }
}
export default connect(mapStatetoProps, null)(Index)




















    //   <MyFrameWork style={{flex:1}}>
    //      <ImageBackground source={require('./images/shBackTop-01.png')} style={styles.shtbimg} ></ImageBackground>
    //      <View style={styles.xqimg}>
    //          <ImageBackground source={require('./images/shxqImg-01.png')} style={{width:'100%',height:'100%',flexDirection:'row'}}>

    //                <View style={styles.shebeiItemimg}>

    //                   <Image source={require('../../images/sj-01.png') } style={{width:setWidth(150),height:setWidth(110)}} />

    //                </View>
    //                <View style={{marginLeft:setWidth(26),marginTop:setWidth(43),width:setWidth(405),height:setWidth(161)}}>
    //                   <Text style={styles.runStateDeviceName}>香蕉筛</Text>
    //                   <View style={{flexDirection:'row',borderLeftWidth:setWidth(6),borderLeftColor:'#446bf8'}}>
    //                       <Text style={[styles.runStateComAddText,{marginRight:setWidth(20)}]}>LKLB367300-00</Text>
    //                   </View>
    //                   <View style={{flexDirection:'row',borderLeftWidth:setWidth(6),borderLeftColor:'#446bf8'}}>
    //                       <Text style={[styles.runStateComAddText,{marginRight:setWidth(-20)}]}>注册手机号:</Text>
    //                       <Text style={styles.runStateComAddText}>13785566698</Text>
    //                   </View>
    //               </View>
    //               <TouchableOpacity style={styles.baoyangxqbt}>
    //                 <View style={{flexDirection:'row',width:setWidth(199)}}>
    //                         <Text style={styles.baoyangxqTxt}>保养详情</Text>
    //                         <Image source={require('../../images/jinrul-01.png')} style={styles.baoyangjrimg} />
    //                 </View>
    //               </TouchableOpacity>
    //          </ImageBackground>
    //       </View>
    //   <View style={styles.tabviewback}>
    //    <Tab
    //     value={index1}
    //     onChange={(e) => setIndex(e)}
    //     indicatorStyle={{
    //       backgroundColor:'#ffffff',
    //       borderRadius:18,
    //       opacity:0.65,
    //       height:setWidth(224)

    //     }}
    //     variant='default'
    //   >
    //     <Tab.Item
    //       title="安装手册"
    //       titleStyle={{ fontSize:setWidth(26),color:'#1D1D38',fontWeight:'900',paddingHorizontal:0,paddingVertical:0}}
    //       icon={<Image source={require('./images/azsc-01.png')} style={{width:setWidth(104),height:setWidth(120)}} /> }
    //       buttonStyle={{
    //       borderWidth: 0,
    //       backgroundColor:'#eef5ff',
    //       borderColor:"eef5ff",
    //       borderTopLeftRadius:setWidth(30),
    //       borderBottomLeftRadius:setWidth(30),
    //       height:setWidth(224)
    //     }}
    //     />
    //     <Tab.Item
    //        title="易损件"
    //        titleStyle={{ fontSize:setWidth(26),color:'#1D1D38',fontWeight:'900',paddingHorizontal:0,paddingVertical:0 }}
    //        icon={<Image source={require('./images/ysj-01.png')} style={{width:setWidth(101),height:setWidth(101),marginTop:setWidth(18)}} /> }
    //        buttonStyle={{
    //        borderWidth: 0,
    //        backgroundColor:'#eef5ff',
    //        borderColor:"eef5ff",
    //        height:setWidth(224)

    //      }}
    //     />
    //     <Tab.Item
    //        title="配置图"
    //        titleStyle={{ fontSize:setWidth(26),color:'#1D1D38',fontWeight:'900' ,paddingHorizontal:0,paddingVertical:0}}
    //        icon={<Image source={require('./images/pzt-01.png')} style={{width:setWidth(131),height:setWidth(101),marginTop:setWidth(18)}} /> }
    //        buttonStyle={{
    //        borderWidth: 0,
    //        backgroundColor:'#eef5ff',
    //        borderColor:"eef5ff",
    //        height:setWidth(224)
    //       }}
    //     />
    //      <Tab.Item
    //        title="视频资料"
    //        titleStyle={{ fontSize:setWidth(26),color:'#1D1D38',fontWeight:'900',paddingHorizontal:0,paddingVertical:0 }}
    //        icon={<Image source={require('./images/spzl-01.png')} style={{width:setWidth(133),height:setWidth(98),marginTop:setWidth(18)}} /> }
    //        buttonStyle={{
    //        borderWidth: 0,
    //        backgroundColor:'#eef5ff',
    //        borderColor:"eef5ff",
    //        borderTopRightRadius:setWidth(30),
    //        borderBottomRightRadius:setWidth(30),
    //        height:setWidth(224)
    //      }}
    //     />
    //   </Tab>
    //   <View style={{height:setWidth(48),flexDirection:'row',alignItems:'center'}}>
    //               <View style={{width:setWidth(42),height:setWidth(19),borderBottomWidth:setWidth(6), borderBottomColor:index1==0?'#446bf8':'#cdd2db' ,marginLeft:setWidth(382)}}></View>
    //               <View style={{width:setWidth(6),height:setWidth(19),}}></View>
    //               <View style={{width:setWidth(42),height:setWidth(19),borderBottomWidth:setWidth(6),borderBottomColor:index1==1?'#446bf8':'#cdd2db'}}></View>
    //               <View style={{width:setWidth(6),height:setWidth(19),}}></View>
    //               <View style={{width:setWidth(42),height:setWidth(19),borderBottomWidth:setWidth(6),borderBottomColor:index1==2?'#446bf8':'#cdd2db'}}></View>
    //               <View style={{width:setWidth(6),height:setWidth(19),}}></View>
    //               <View style={{width:setWidth(42),height:setWidth(19),borderBottomWidth:setWidth(6),borderBottomColor:index1==3?'#446bf8':'#cdd2db'}}></View>
    //   </View>
    //  <View style={{width:setWidth(950),height:setWidth(4000),backgroundColor:'#ffffff',borderTopStartRadius:setWidth(50),borderTopEndRadius:setWidth(50)}}>
    //   <TabView  value={index1} onChange={setIndex} animationType='spring'  >
    //     {/* 安装手册 */}
    //     <TabView.Item >
    //     <SafeAreaView style={styles.container2}>
    //       <ScrollView style={styles.scrollView2}>
    //                <View style={{width:setWidth(840),height:setWidth(184),marginTop:setHeight(48)}}>
    //                  <View style={styles.shoucelbbk}>

    //                        <Text style={styles.runStateDeviceName1}>筛机安装手册1</Text>

    //                     <TouchableOpacity  style={styles.xzckbut}>
    //                        <Text style={{fontSize:setText(40),color:'#446bf8'}}>下载查看</Text>
    //                     </TouchableOpacity>
    //                  </View>
    //                  <View style={{marginTop:setWidth(20)}}>
    //                     <View style={{flexDirection:'row',borderLeftWidth:setWidth(6),borderLeftColor:'#446bf8'}}>
    //                          <Text style={[styles.runStateComAddText,{marginRight:setWidth(20)}]}>完成日期:</Text>
    //                           <Text style={[styles.runStateComAddText,{marginRight:setWidth(20)}]}>2019-02-13 16:37:09</Text>
    //                       </View>
    //                       <View style={{flexDirection:'row',borderLeftWidth:setWidth(6),borderLeftColor:'#446bf8'}}>
    //                           <Text style={[styles.runStateComAddText,{marginRight:setWidth(20)}]}>更新日期:</Text>
    //                           <Text style={styles.runStateComAddText}>2019-02-13 16:37:09</Text>
    //                       </View>
    //                   </View>
    //                </View>
    //             </ScrollView>
    //       </SafeAreaView>
    //     </TabView.Item>
    //     {/* 易损件 */}
    //     <TabView.Item >
    //     <SafeAreaView style={styles.container2}>
    //       <ScrollView style={styles.scrollView2}>
    //        <View style={{width:setWidth(840),height:setWidth(184),marginTop:setHeight(48)}}>
    //           <View style={styles.shoucelbbk}>
    //               <Text style={styles.runStateDeviceName1}>易损件资料1</Text>
    //                 <TouchableOpacity  style={styles.xzckbut}>
    //                   <Text style={{fontSize:setText(40),color:'#446bf8'}}>下载查看</Text>
    //                 </TouchableOpacity>
    //           </View>
    //           <View style={{marginTop:setWidth(20)}}>
    //             <View style={{flexDirection:'row',borderLeftWidth:setWidth(6),borderLeftColor:'#446bf8'}}>
    //               <Text style={[styles.runStateComAddText,{marginRight:setWidth(20)}]}>完成日期:</Text>
    //               <Text style={[styles.runStateComAddText,{marginRight:setWidth(20)}]}>2019-02-13 16:37:09</Text>
    //             </View>
    //             <View style={{flexDirection:'row',borderLeftWidth:setWidth(6),borderLeftColor:'#446bf8'}}>
    //                 <Text style={[styles.runStateComAddText,{marginRight:setWidth(20)}]}>更新日期:</Text>
    //                 <Text style={styles.runStateComAddText}>2019-02-13 16:37:09</Text>
    //             </View>
    //           </View>
    //         </View>
    //         </ScrollView>
    //     </SafeAreaView>
    //   </TabView.Item>
    //   {/* 配置图 */}
    //   <TabView.Item >
    //     <SafeAreaView style={styles.container2}>
    //       <ScrollView style={styles.scrollView2}>
    //       <View style={{width:setWidth(840),height:setWidth(184),marginTop:setWidth(48)}}>
    //           <View style={styles.shoucelbbk}>
    //               <Text style={styles.runStateDeviceName1}>配置图</Text>
    //               <TouchableOpacity  style={styles.xzckbut}>
    //                     <Text style={{fontSize:setText(40),color:'#446bf8'}}>点击查看</Text>
    //               </TouchableOpacity>
    //           </View>
    //           <View style={{marginTop:setWidth(20)}}>
    //               <View style={{flexDirection:'row'}}>
    //                   <Image source={require('../../images/sj-01.png')} style={{width:setWidth(263),height:setWidth(201)}}></Image>
    //                   <Image source={require('../../images/sj-01.png')} style={{width:setWidth(263),height:setWidth(201),marginLeft:setWidth(20)}}></Image>
    //               </View>
    //           </View>
    //         </View>
    //         <View style={{width:setWidth(840),height:setWidth(384),marginTop:setWidth(130)}}>
    //           <View style={styles.shoucelbbk}>
    //               <Text style={styles.runStateDeviceName1}>装配图</Text>
    //               <TouchableOpacity  style={styles.xzckbut}>
    //                     <Text style={{fontSize:setText(40),color:'#446bf8'}}>点击查看</Text>
    //               </TouchableOpacity>
    //           </View>
    //           <View style={{marginTop:setWidth(20)}}>
    //               <View style={{flexDirection:'row'}}>
    //                   <Image source={require('../../images/sj-01.png')} style={{width:setWidth(263),height:setWidth(201)}}></Image>
    //                   <Image source={require('../../images/sj-01.png')} style={{width:setWidth(263),height:setWidth(201),marginLeft:setWidth(20)}}></Image>
    //                 </View>

    //             </View>
    //         </View>
    //         </ScrollView>
    //     </SafeAreaView>
    //   </TabView.Item>
    //   {/* 视频资料 */}
    //   <TabView.Item >
    //     <SafeAreaView style={styles.container2}>
    //       <ScrollView style={styles.scrollView2}>
    //       <View style={{width:setWidth(840),height:setWidth(184),marginTop:setWidth(48)}}>
    //         <View style={styles.shoucelbbk}>
    //             <Text style={styles.runStateDeviceName1}>视频资料</Text>
    //             <TouchableOpacity  style={styles.xzckbut}>
    //                   <Text style={{fontSize:setText(40),color:'#446bf8'}}>下载查看</Text>
    //             </TouchableOpacity>
    //         </View>
    //         <View style={{marginTop:setWidth(20)}}>
    //             <View style={{flexDirection:'row',borderLeftWidth:setWidth(6),borderLeftColor:'#446bf8'}}>
    //                 <Text style={[styles.runStateComAddText,{marginRight:setWidth(20)}]}>完成日期:</Text>
    //                   <Text style={[styles.runStateComAddText,{marginRight:setWidth(20)}]}>2019-02-13 16:37:09</Text>
    //               </View>
    //               <View style={{flexDirection:'row',borderLeftWidth:setWidth(6),borderLeftColor:'#446bf8'}}>
    //                   <Text style={[styles.runStateComAddText,{marginRight:setWidth(20)}]}>更新日期:</Text>
    //                   <Text style={styles.runStateComAddText}>2019-02-13 16:37:09</Text>
    //               </View>
    //           </View>
    //       </View>
    //       <View style={{width:setWidth(840),height:setWidth(184),marginTop:setWidth(18)}}>
    //         <View style={styles.shoucelbbk}>
    //             <Text style={styles.runStateDeviceName1}>视频资料</Text>
    //             <TouchableOpacity  style={styles.xzckbut}>
    //                   <Text style={{fontSize:setText(40),color:'#446bf8'}}>下载查看</Text>
    //             </TouchableOpacity>
    //         </View>
    //         <View style={{marginTop:setWidth(20)}}>
    //             <View style={{flexDirection:'row',borderLeftWidth:setWidth(6),borderLeftColor:'#446bf8'}}>
    //                 <Text style={[styles.runStateComAddText,{marginRight:setWidth(20)}]}>完成日期:</Text>
    //                   <Text style={[styles.runStateComAddText,{marginRight:setWidth(20)}]}>2019-02-13 16:37:09</Text>
    //               </View>
    //               <View style={{flexDirection:'row',borderLeftWidth:setWidth(6),borderLeftColor:'#446bf8'}}>
    //                   <Text style={[styles.runStateComAddText,{marginRight:setWidth(20)}]}>更新日期:</Text>
    //                   <Text style={styles.runStateComAddText}>2019-02-13 16:37:09</Text>
    //               </View>
    //           </View>
    //       </View>
    //       <View style={{width:setWidth(840),height:setWidth(184),marginTop:setWidth(18)}}>
    //         <View style={styles.shoucelbbk}>
    //             <Text style={styles.runStateDeviceName1}>视频资料</Text>
    //             <TouchableOpacity  style={styles.xzckbut}>
    //                   <Text style={{fontSize:setText(40),color:'#446bf8'}}>下载查看</Text>
    //             </TouchableOpacity>
    //         </View>
    //         <View style={{marginTop:setWidth(20)}}>
    //             <View style={{flexDirection:'row',borderLeftWidth:setWidth(6),borderLeftColor:'#446bf8'}}>
    //                 <Text style={[styles.runStateComAddText,{marginRight:setWidth(20)}]}>完成日期:</Text>
    //                   <Text style={[styles.runStateComAddText,{marginRight:setWidth(20)}]}>2019-02-13 16:37:09</Text>
    //               </View>
    //               <View style={{flexDirection:'row',borderLeftWidth:setWidth(6),borderLeftColor:'#446bf8'}}>
    //                   <Text style={[styles.runStateComAddText,{marginRight:setWidth(20)}]}>更新日期:</Text>
    //                   <Text style={styles.runStateComAddText}>2019-02-13 16:37:09</Text>
    //               </View>
    //           </View>
    //       </View>
    //       <View style={{width:setWidth(840),height:setWidth(184),marginTop:setWidth(18)}}>
    //         <View style={styles.shoucelbbk}>
    //             <Text style={styles.runStateDeviceName1}>视频资料</Text>
    //             <TouchableOpacity  style={styles.xzckbut}>
    //                   <Text style={{fontSize:setText(40),color:'#446bf8'}}>下载查看</Text>
    //             </TouchableOpacity>
    //         </View>
    //         <View style={{marginTop:setWidth(20)}}>
    //             <View style={{flexDirection:'row',borderLeftWidth:setWidth(6),borderLeftColor:'#446bf8'}}>
    //                 <Text style={[styles.runStateComAddText,{marginRight:setWidth(20)}]}>完成日期:</Text>
    //                   <Text style={[styles.runStateComAddText,{marginRight:setWidth(20)}]}>2019-02-13 16:37:09</Text>
    //               </View>
    //               <View style={{flexDirection:'row',borderLeftWidth:setWidth(6),borderLeftColor:'#446bf8'}}>
    //                   <Text style={[styles.runStateComAddText,{marginRight:setWidth(20)}]}>更新日期:</Text>
    //                   <Text style={styles.runStateComAddText}>2019-02-13 16:37:09</Text>
    //               </View>
    //           </View>
    //       </View>
    //       </ScrollView>
    //     </SafeAreaView>
    //   </TabView.Item>
    //   </TabView>
    //   </View>
    //   </View>
    //   </MyFrameWork>

