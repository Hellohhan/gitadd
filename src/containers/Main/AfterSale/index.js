import React from "react";
import {connect} from 'react-redux'

import { Text, View } from "react-native";

import {ImageBackground, Image, TouchableOpacity, SafeAreaView,ScrollView, Platform } from "react-native";
import {Input} from '@rneui/themed';
import MyFrameWork from "../../../components/MyFrameWork";
import { setWidth, setText, setHeight } from "../../../utils/styleAdb";
import styles from "./styles"
import MyFrame from '../../../components/MyFrame'
import QueryByDeviceId from '../../../components/QueryByDeviceId'
import {getDevicePointsBysnCode} from '../../../api/requestPath'
import { store } from "../../../redux/store";
class Alarm extends React.PureComponent{
  state={
    filterdata:[]
  }
  componentDidMount(){
    this.setState({filterdata:this.props.devices})
  }
  //处理扫一扫按钮
  handleScan=()=>{
    this.props.navigation.navigate('Scan',{device:'AfterSale'})
  }
  //处理搜索按钮
  handleSearch=async(params)=>{
    try{
      let result= await getDevicePointsBysnCode(params)
      if(params.jsonEntity.snCode===''){
        alert('设备编号不能为空')
        store.dispatch({type:'loading',data:false})
         return
      }
      if(result.data.message==='ok'){
          if(result.data.data.records.length){
            let data=result.data.data.records;
            this.setState({filterData:data},()=>{
              console.log(this.state.filterData);
            })
          }else{
            alert('出厂设备编号错误,请重新输入!')
          }
     }
    }
     catch(e){
     console.log(e);
     }
    }
     /* 刷新按钮 */
      refresh=()=>{
     this.props.dispatch({type:'clearCode'})
      this.setState({
        filterdata:this.props.devices
      })
     }
     //loading为fasle
     componentWillUnmount(){
      store.dispatch({type:'loading',data:false})
     }
  render() {
    let{devices}=this.props
    let{filterdata}=this.state
    console.log(this.state.filterdata);
    return (
     <MyFrame>
     {/*扫一扫&根据设备标识查询组件*/}
     <QueryByDeviceId handleScan={this.handleScan} handleSearch={(data)=>{this.handleSearch(data)}} handleStatus={1}/>
  {/*  设备列表*/}
          <View style={styles.deviceListWrap}>
          {/*头部*/}
          <View style={styles.deviceListHeader}>
            <View style={styles.headerWrap}>
              <View style={styles.headerLeft}>
                <Image source={require('../../Main/DeviceManager/images/deviceList.png')} style={{width:setWidth(51),height:setWidth(71)}}/>
                <Text style={styles.headerLeftText}>全部设备</Text>
              </View>
              <TouchableOpacity onPress={this.refresh}>
                <Image source={require('../../Main/DeviceManager/images/refresh.png')} style={{width:setWidth(51),height:setWidth(54)}}/>
              </TouchableOpacity>
            </View>
          </View>
          {/* 身体 */}
        {
       filterdata.map(device=>{
            return(
              <TouchableOpacity key={device.id} style={styles.itemWrap} onPress={()=>{this.props.navigation.navigate('Salescontent',{deviceData:device.jsonEntity})}}>
              {/*左边*/}
              <View style={styles.itemLeftWrap}>
                {/*<Image source={require('')}/>*/}
                <View ></View>
                <View ><Image source={require('../images/sjimg.png')} style={{width:setWidth(140),height:setWidth(90),marginTop:setWidth(30)}} /></View>
              </View>
              {/*  中间*/}
              <View style={styles.itemMidWrap}>
                <Text>{device.name}</Text>
                <View style={styles.itemMidInWrap}>
                  <View style={styles.verticalLine}></View>
                  <View>
                      <Text style={{fontSize:setText(30),color:'#94949A'}}>{device.snCode}</Text>
                    <View style={styles.itemMidIn}>
                      <Text style={styles.itemMidInText}>运行时长:</Text>
                      <Text style={styles.itemMidInTextValue}>{device.time}h</Text>
                    </View>
                  </View>
                </View>
              </View>
              {/* 右边*/}
              <Image source={require('../DeviceManager/images/toRight.png')} style={{width:setWidth(25),height:setWidth(45)}}/>
            </TouchableOpacity>
            )
          })
        }
      </View>
     </MyFrame>
    )
  }
}
export default connect(state => (
  {devices:state.devices,
  user:state.user}
  ),null)(Alarm)
  
// <MyFrameWork>
// <View style={styles.sousuobg}>
//      <View style={styles.sousuobutton1}>
//        <TouchableOpacity >
//          <Image source={require('../images/smimg.png')} style={styles.icon1}/>
//        </TouchableOpacity>
//      </View>
//      <View style={styles.verticalLine1}>
//              <Input
//                keyboardType='numeric'
//                maxLength={20}
//                inputContainerStyle={{borderBottomWidth:0,height:'100%'}}
//                inputStyle={{fontSize:setText(40),color:'#9F9FA0'}}
//                containerStyle={{height:'100%'}}
//                placeholder='输入待查询设备编号'
//                placeholderTextColor='#9F9FA0'
//              />        
//      </View>
//        <View style={styles.sousuobt}>
//          <TouchableOpacity >
//             <Text style={styles.sousuoTxt}>搜索</Text>
//          </TouchableOpacity>
//        </View>
      
//  </View>
//  <View style={styles.gundongback1}>
//      <View style={[styles.shebeihead1,{flexDirection:'row',justifyContent:'space-between'}]}>
//              <View style={{flexDirection:'row'}}>
//                <Image source={require('../images/sblb-01.png')} style={styles.shebeimge1} />
//                <Text style={styles.shebeTxt1}>全部设备</Text>
//              </View>
//              <TouchableOpacity >
//                <Image source={require('../images/reload.png')} style={styles.shebeiReload1} />
//              </TouchableOpacity>
//      </View>
//      <SafeAreaView style={styles.container1}>
//        <ScrollView style={styles.scrollView1}>
//            <TouchableOpacity style={styles.shebeiStateItem1} onPress={()=>{
//                this.props.navigation.navigate('Salescontent')
//            }}>
//              <View style={styles.shebeiItemimg}>
//                <Image source={require('../images/reload.png')} style={{width:setWidth(149),height:setWidth(109),marginTop:setWidth(26)}}/>
//              </View>
//            <View style={{marginLeft:setWidth(15),width:setWidth(587)}}>
//              <Text style={styles.runStateDeviceName}>直线筛1</Text>
//              <View style={{flexDirection:'row',borderLeftWidth:setWidth(6),borderLeftColor:'#446bf8'}}>
//                <Text style={[styles.runStateComAddText,{marginRight:setWidth(20)}]}>LKLB367300-00</Text>
               
//              </View>
//              <View style={{flexDirection:'row',borderLeftWidth:setWidth(6),borderLeftColor:'#446bf8'}}>
//                <Text style={[styles.runStateComAddText,{marginRight:setWidth(20)}]}>首保时间:</Text>
//                <Text style={styles.runStateComAddText}>2023-01-09</Text>
//              </View>
//            </View>
//            <View style={{width:setWidth(117),alignItems:'center'}}>
//              <Image source={require('../images/jinrhui-01.png')} style={{width:setWidth(24),height:setWidth(45)}} />
            
//            </View>
//          </TouchableOpacity>
//          <TouchableOpacity style={styles.shebeiStateItem1} onPress={()=>{
//                this.props.navigation.navigate('Video')
//            }}>
//              <View style={styles.shebeiItemimg}>
//                <Image source={require('../images/reload.png')} style={{width:setWidth(149),height:setWidth(109),marginTop:setWidth(26)}}/>
              
//              </View>
//            <View style={{marginLeft:setWidth(15),width:setWidth(587)}}>
//              <Text style={styles.runStateDeviceName}>直线筛1</Text>
//              <View style={{flexDirection:'row',borderLeftWidth:setWidth(6),borderLeftColor:'#446bf8'}}>
//                <Text style={[styles.runStateComAddText,{marginRight:setWidth(20)}]}>LKLB367300-00</Text>
               
//              </View>
//              <View style={{flexDirection:'row',borderLeftWidth:setWidth(6),borderLeftColor:'#446bf8'}}>
//                <Text style={[styles.runStateComAddText,{marginRight:setWidth(20)}]}>首保时间:</Text>
//                <Text style={styles.runStateComAddText}>2023-01-09</Text>
//              </View>
//            </View>
//            <View style={{width:setWidth(117),alignItems:'center'}}>
//              <Image source={require('../images/jinrhui-01.png')} style={{width:setWidth(24),height:setWidth(45)}} />
            
//            </View>
//          </TouchableOpacity>
//          <TouchableOpacity style={styles.shebeiStateItem1} onPress={()=>{
//                this.props.navigation.navigate('Video')
//            }}>
//              <View style={styles.shebeiItemimg}>
//                <Image source={require('../images/reload.png')} style={{width:setWidth(149),height:setWidth(109),marginTop:setWidth(26)}}/>
              
//              </View>
//            <View style={{marginLeft:setWidth(15),width:setWidth(587)}}>
//              <Text style={styles.runStateDeviceName}>直线筛1</Text>
//              <View style={{flexDirection:'row',borderLeftWidth:setWidth(6),borderLeftColor:'#446bf8'}}>
//                <Text style={[styles.runStateComAddText,{marginRight:setWidth(20)}]}>LKLB367300-00</Text>
               
//              </View>
//              <View style={{flexDirection:'row',borderLeftWidth:setWidth(6),borderLeftColor:'#446bf8'}}>
//                <Text style={[styles.runStateComAddText,{marginRight:setWidth(20)}]}>首保时间:</Text>
//                <Text style={styles.runStateComAddText}>2023-01-09</Text>
//              </View>
//            </View>
//            <View style={{width:setWidth(117),alignItems:'center'}}>
//              <Image source={require('../images/jinrhui-01.png')} style={{width:setWidth(24),height:setWidth(45)}} />
            
//            </View>
//          </TouchableOpacity>
//          <TouchableOpacity style={styles.shebeiStateItem1} onPress={()=>{
//                this.props.navigation.navigate('Video')
//            }}>
//              <View style={styles.shebeiItemimg}>
//                <Image source={require('../images/reload.png')} style={{width:setWidth(149),height:setWidth(109),marginTop:setWidth(26)}}/>
              
//              </View>
//            <View style={{marginLeft:setWidth(15),width:setWidth(587)}}>
//              <Text style={styles.runStateDeviceName}>直线筛1</Text>
//              <View style={{flexDirection:'row',borderLeftWidth:setWidth(6),borderLeftColor:'#446bf8'}}>
//                <Text style={[styles.runStateComAddText,{marginRight:setWidth(20)}]}>LKLB367300-00</Text>
               
//              </View>
//              <View style={{flexDirection:'row',borderLeftWidth:setWidth(6),borderLeftColor:'#446bf8'}}>
//                <Text style={[styles.runStateComAddText,{marginRight:setWidth(20)}]}>首保时间:</Text>
//                <Text style={styles.runStateComAddText}>2023-01-09</Text>
//              </View>
//            </View>
//            <View style={{width:setWidth(117),alignItems:'center'}}>
//              <Image source={require('../images/jinrhui-01.png')} style={{width:setWidth(24),height:setWidth(45)}} />
            
//            </View>
//          </TouchableOpacity>
//          <TouchableOpacity style={styles.shebeiStateItem1} onPress={()=>{
//                this.props.navigation.navigate('Video')
//            }}>
//              <View style={styles.shebeiItemimg}>
//                <Image source={require('../images/reload.png')} style={{width:setWidth(149),height:setWidth(109),marginTop:setWidth(26)}}/>
              
//              </View>
//            <View style={{marginLeft:setWidth(15),width:setWidth(587)}}>
//              <Text style={styles.runStateDeviceName}>直线筛1</Text>
//              <View style={{flexDirection:'row',borderLeftWidth:setWidth(6),borderLeftColor:'#446bf8'}}>
//                <Text style={[styles.runStateComAddText,{marginRight:setWidth(20)}]}>LKLB367300-00</Text>
               
//              </View>
//              <View style={{flexDirection:'row',borderLeftWidth:setWidth(6),borderLeftColor:'#446bf8'}}>
//                <Text style={[styles.runStateComAddText,{marginRight:setWidth(20)}]}>首保时间:</Text>
//                <Text style={styles.runStateComAddText}>2023-01-09</Text>
//              </View>
//            </View>
//            <View style={{width:setWidth(117),alignItems:'center'}}>
//              <Image source={require('../images/jinrhui-01.png')} style={{width:setWidth(24),height:setWidth(45)}} />
            
//            </View>
//          </TouchableOpacity>
//          <TouchableOpacity style={styles.shebeiStateItem1} onPress={()=>{
//                this.props.navigation.navigate('Video')
//            }}>
//              <View style={styles.shebeiItemimg}>
//                <Image source={require('../images/reload.png')} style={{width:setWidth(149),height:setWidth(109),marginTop:setWidth(26)}}/>
              
//              </View>
//            <View style={{marginLeft:setWidth(15),width:setWidth(587)}}>
//              <Text style={styles.runStateDeviceName}>直线筛1</Text>
//              <View style={{flexDirection:'row',borderLeftWidth:setWidth(6),borderLeftColor:'#446bf8'}}>
//                <Text style={[styles.runStateComAddText,{marginRight:setWidth(20)}]}>LKLB367300-00</Text>
               
//              </View>
//              <View style={{flexDirection:'row',borderLeftWidth:setWidth(6),borderLeftColor:'#446bf8'}}>
//                <Text style={[styles.runStateComAddText,{marginRight:setWidth(20)}]}>首保时间:</Text>
//                <Text style={styles.runStateComAddText}>2023-01-09</Text>
//              </View>
//            </View>
//            <View style={{width:setWidth(117),alignItems:'center'}}>
//              <Image source={require('../images/jinrhui-01.png')} style={{width:setWidth(24),height:setWidth(45)}} />
            
//            </View>
//          </TouchableOpacity>
//          <TouchableOpacity style={styles.shebeiStateItem1} onPress={()=>{
//                this.props.navigation.navigate('Video')
//            }}>
//              <View style={styles.shebeiItemimg}>
//                <Image source={require('../images/reload.png')} style={{width:setWidth(149),height:setWidth(109),marginTop:setWidth(26)}}/>
              
//              </View>
//            <View style={{marginLeft:setWidth(15),width:setWidth(587)}}>
//              <Text style={styles.runStateDeviceName}>直线筛1</Text>
//              <View style={{flexDirection:'row',borderLeftWidth:setWidth(6),borderLeftColor:'#446bf8'}}>
//                <Text style={[styles.runStateComAddText,{marginRight:setWidth(20)}]}>LKLB367300-00</Text>
               
//              </View>
//              <View style={{flexDirection:'row',borderLeftWidth:setWidth(6),borderLeftColor:'#446bf8'}}>
//                <Text style={[styles.runStateComAddText,{marginRight:setWidth(20)}]}>首保时间:</Text>
//                <Text style={styles.runStateComAddText}>2023-01-09</Text>
//              </View>
//            </View>
//            <View style={{width:setWidth(117),alignItems:'center'}}>
//              <Image source={require('../images/jinrhui-01.png')} style={{width:setWidth(24),height:setWidth(45)}} />
            
//            </View>
//          </TouchableOpacity>
//          <TouchableOpacity style={styles.shebeiStateItem1} onPress={()=>{
//                this.props.navigation.navigate('Video')
//            }}>
//              <View style={styles.shebeiItemimg}>
//                <Image source={require('../images/reload.png')} style={{width:setWidth(149),height:setWidth(109),marginTop:setWidth(26)}}/>
              
//              </View>
//            <View style={{marginLeft:setWidth(15),width:setWidth(587)}}>
//              <Text style={styles.runStateDeviceName}>直线筛1</Text>
//              <View style={{flexDirection:'row',borderLeftWidth:setWidth(6),borderLeftColor:'#446bf8'}}>
//                <Text style={[styles.runStateComAddText,{marginRight:setWidth(20)}]}>LKLB367300-00</Text>
               
//              </View>
//              <View style={{flexDirection:'row',borderLeftWidth:setWidth(6),borderLeftColor:'#446bf8'}}>
//                <Text style={[styles.runStateComAddText,{marginRight:setWidth(20)}]}>首保时间:</Text>
//                <Text style={styles.runStateComAddText}>2023-01-09</Text>
//              </View>
//            </View>
//            <View style={{width:setWidth(117),alignItems:'center'}}>
//              <Image source={require('../images/jinrhui-01.png')} style={{width:setWidth(24),height:setWidth(45)}} />
            
//            </View>
//          </TouchableOpacity>
         
         
//        </ScrollView>
//      </SafeAreaView>

//  </View>
 
 
// </MyFrameWork>


