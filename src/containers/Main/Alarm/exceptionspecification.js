import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity,Modal } from 'react-native'
import MyFrame from '../../../components/MyFrame'
import { setWidth,setHeight } from '../../../utils/styleAdb'
import baseUrl from '../../../api/index'
import styles from './styles'
import {store} from '../../../redux/store'
import Lightbox from 'react-native-lightbox';
import ImageViewer from 'react-native-image-zoom-viewer';
import { getAlarmInfoByAlarmId,GetAlarmInfoByAlarmId,SHOW_IMGS} from '../../../api/requestPath'
import axios from '../../../api'
export default class ExceptionSpecification extends Component {
  state={
    alarmInfo:{},
    ImageList:[],
  }
  componentDidMount(){
    let alarmId=this.props.route.params.alarmId
    console.log(alarmId);
    this.getAlarm(alarmId)
  }
  componentWillUnmount(){
    store.dispatch({type:'loading',data:false})
  }
  /* 获取报警信息 */
  //根据alarmId获取报警信息
  getAlarm = async (alarmId) => {
    let { alarmForm, alarmInfo } = this.state
      try{
       store.dispatch({ type: 'loading', data: true })
       let result= await axios.authGet(GetAlarmInfoByAlarmId.replace(":alarmId", alarmId))
        console.log(result);
        let data = result.data
        if(result.message==='ok'){
         store.dispatch({ type: 'loading', data: false })
         this.setState({alarmInfo:data})
         let srcList1=[] 
               if(data.alarmImages){
                  srcList1=data.alarmImages.split(",");
               }
                let srcList2=[]
                for(let i=0;i<srcList1.length;i++){
                 let temp = {}
                 temp.src = SHOW_IMGS() + '?relative=' + srcList1[i];
                 temp.w = setWidth(200);
                 temp.h = setHeight(200) ;
                 srcList2.push(temp)
                }
                this.setState({ImageList:srcList2})
             }else{
               alert('报警异常联系管理员')
               store.dispatch({type:'loading',data:false})
             }
        }
      catch(e){
       console.log('获取报警信息失败',e);
       store.dispatch({ type: 'loading', data: false })
      }
   }




  // getAlarminfo=async(alarmid)=>{
  //   console.log(alarmid);
  //   try{
  //     store.dispatch({type:'loading',data:true})
  //     let alarmInfo=await getAlarmInfoByAlarmId(alarmid)
  //     let data=alarmInfo.data.data
  //     if(alarmInfo.data.message==='ok'){
  //       store.dispatch({type:'loading',data:false})
  //       this.setState({alarmInfo:data})
  //       let srcList1=[] 
  //       if(data.alarmImages){
  //          srcList1=data.alarmImages.split(",");
  //       }
  //        let srcList2=[]
  //        for(let i=0;i<srcList1.length;i++){
  //         let temp = {}
  //         temp.src = SHOW_IMGS() + '?relative=' + srcList1[i];
  //         temp.w = setWidth(200);
  //         temp.h = setHeight(200) ;
  //         srcList2.push(temp)
  //        }
  //        this.setState({ImageList:srcList2})
  //     }else{
  //       alert('报警异常联系管理员')
  //       store.dispatch({type:'loading',data:false})
  //     }
  //   }
  //   catch(e){
  //     console.log('获取异常处理说明错误',e);
  //     store.dispatch({type:'loading',data:false})
  //   }
  // }
  render() {
    let {alarmInfo,ImageList,ImageList2}=this.state
    console.log(ImageList);
    return (
        <View>

<MyFrame style={styles.images_url}>  
   {/* 头部盒子*/}
   <View style={styles.container}>
            {/* 筛机信息 */}
            <View style={styles.leftWraper}>
              <Image source={require('./images/sjimg.png')} style={{ width: setWidth(150), height: setHeight(156) }} />
              <View style={{ justifyContent: 'space-around', marginLeft: setWidth(30) }}>
                <Text style={{ fontSize: setWidth(40), color: 'black' }}>{alarmInfo.deviceName}</Text>
                <View style={{ borderLeftColor: 'blue', borderLeftWidth: 2, paddingLeft: setWidth(10) }}>
                  {/* <Text style={styles.alemINfoText}>LKBB367300-00</Text> */}
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.alemINfoText}>异常说明: </Text>
                    <Text style={{ color: 'red', fontSize: setWidth(26) }}>{alarmInfo.pointName}</Text>
                  </View>
                </View>
              </View>
            </View>
            {/* 上报人信息 */}
            <View style={styles.RightWraper}>
              <View>
                <View style={{ flexDirection: 'row', marginBottom: setWidth(50)  }}>
                  <Text style={[styles.alemINfoText]}>处理人员:</Text>
                 <Text style={[styles.alemINfoText]}>{alarmInfo.alarmHandleName}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[styles.alemINfoText]}>联系电话:</Text>
                  <Text style={[styles.alemINfoText]}>{alarmInfo.alarmHandleTel}</Text>
                </View>
              </View>
            </View>
          </View>

  {/*  报警列表*/}
  <View style={styles.deviceListWrap}>
        {/*头部*/}
        <View style={styles.deviceListHeader}>
          <View style={styles.headerWrap}>
            <View style={styles.headerLeft}>
              <Image source={require('./images/figureout.png')} style={{width:setWidth(51),height:setWidth(71)}}/>
              <Text style={styles.headerLeftText}>处理过程</Text>
            </View>
          </View>
        </View>
        <View style={styles.border_distance}>
          <View style={{flexDirection: 'row'}}>
          <View style={styles.error_line}></View>
        <Text style={{color : 'black',marginLeft: setWidth(24),fontSize: setWidth(30)}}>产生异常原因说明:</Text>
      
        </View>
        <View style={styles.shadow_container}>
        <View style={styles.border_Shadow}>
            <Text style={styles.border_fontSize}>{alarmInfo.alarmReason}</Text>
          </View>
        </View>
        </View>
        <View style={styles.border_distance}>
           <View style={{flexDirection: 'row'}}>
          <View style={styles.error_line}></View>
        <Text style={{color : 'black',marginLeft: setWidth(24),fontSize: setWidth(30)}}>异常处理的过程说明:</Text>
      
        </View>
        <View style={styles.shadow_container}>
          <View style={styles.border_Shadow}>
            <Text style={styles.border_fontSize}>{alarmInfo.alarmHandleDesc}</Text>
          </View>
        </View>
        </View>
        <View style={styles.border_distance}>
          <View style={{flexDirection: 'row'}}>
          <View style={styles.error_line}></View>
        <Text style={{color : 'black',marginLeft: setWidth(24),fontSize: setWidth(30)}}>图像资料上传:</Text>
        </View>
        </View>

       
        <View style={styles.shadow_container}>
        <View style={styles.exception}>
          {
            ImageList!=''?
            ImageList.map(item=>{
              return(
                < Lightbox key={item.src} underlayColor="white">
                  <Image source={{uri:item.src}} style={{width:item.w,height:item.h,marginRight:setWidth(30),marginBottom:setWidth(30)}}/>
                </Lightbox>
              
              )
            }):<Text style={{textAlign:'center'}}>暂无图片</Text>
           } 
           
        </View>
         
        </View>
        
      </View> 
      
  </MyFrame>   

  
      </View>
    )
  }
}



