/**
 * 筛选组件
 */
import React from "react";
import {connect} from 'react-redux'
import {
  Text,
  View,
  ImageBackground,
  Platform,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  Button,
  Dialog,
} from '@rneui/themed';
import { Input } from "@rneui/base";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import styles from "./style"
import {asyncGetAlarmData} from "../redux/actions/alarm"
import { setWidth } from "../../utils/styleAdb";
import FocusAwareStatusBar from "../../components/FocusAwareStatusBar";
import { SafeAreaView, useSafeAreaFrame } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import MyButton from "../../components/MyButton";

 class index extends React.Component {
  state = {
    // isFilter:false, //是否弹出筛选页面
    filterObj:{ //筛选弹出层的对象
      // name:"研山筛四车间1号",//设备名称
      // deviceModel:"2LKBB3673",//规格型号
      // productionDate:new Date('2018-10-01'),//生产日期
      // isShowInstallDate:false,
      // installationDate:new Date('2018-10-01'),//安装日期
      //    //省
      //    province: '',
      //    //市
      //    city: '',
      //    //区
      //    county: '',
      //    //详细地址
      //    detailedAddress: '',
      // address:'河北省滦州市响嘡镇',//所在地区
      // companyName:'河北钢铁集团司家营研山铁矿公司',//客户名称
    },
    filterObj:{ //筛选弹出层的对象
      name:'',//设备名称
      deviceModel:'',//规格型号
      productionDate:new Date(),//生产日期
      isShowInstallDate:false,
      installationDate:new Date(),//安装日期
         //省
         province: '',
         //市
         city: '',
         //区
         county: '',
         //详细地址
         detailedAddress: '',
      address:'',//所在地区
      companyName:'',//客户名称
    },
  }
//   componentDidMount() {
//     //初次获取报警信息
//     // this.props.asyncGetAlarmData()
//     //标题栏右边按钮
//     this.headerRightButton()
//   }
//   headerRightButton=()=>{
//     this.props.navigation.setOptions({
//       headerRight: () => (
//         <TouchableOpacity onPress={()=>{
//           this.setState(({isFilter})=>({isFilter:!isFilter}))
//         }}>
//           <Text style={{color:"black"}}>筛选</Text>
//         </TouchableOpacity>
//       ),
//     });
//   }
    //弹出层的筛选功能
    handleFilter= async()=>{
        // //1.获取对应的数据
        const {filterObj} = this.state
        let productionDate,installDate
        if (typeof filterObj.productionDate === 'object'){
          productionDate=new Date(filterObj.productionDate).getTime()
          installDate=new Date(filterObj.installDate).getTime()
        }
        // //处理地址
        var pattern = /([\u4e00-\u9fa5]+省)|([\u4e00-\u9fa5]+市)|(([\u4e00-\u9fa5]+区)|([\u4e00-\u9fa5]+县))|([\u4e00-\u9fa5|\d]+)/
        if (pattern.test(filterObj.address)) {
          let county =''
          let province =filterObj.address.match(/[\u4e00-\u9fa5]+省/) != null ? filterObj.address.match(/[\u4e00-\u9fa5]+省/)[0] : ''
           let city = filterObj.address.match(/[\u4e00-\u9fa5]+市/) != null ? filterObj.address.match(/省[\u4e00-\u9fa5]+市/)[0].replace('省', '') : ''
           if( filterObj.address.match(/[\u4e00-\u9fa5]+县/) != null ){
            county= filterObj.address.match(/市[\u4e00-\u9fa5]+县/)[0].replace('市', '') 
           }else if(filterObj.address.match(/[\u4e00-\u9fa5]+区/) != null){
            county=filterObj.address.match(/市[\u4e00-\u9fa5]+区/)[0].replace('市', '')
           }else{
            county=filterObj.address.match(/市[\u4e00-\u9fa5]+镇/)[0].replace('市', '')
           }
          // let countys = filterObj.address.match(/[\u4e00-\u9fa5]+县/) != null ? filterObj.address.match(/市[\u4e00-\u9fa5]+县/)[0].replace('市', '') : ''
          // let county = filterObj.address.match(/[\u4e00-\u9fa5]+区/) != null ? filterObj.address.match(/市[\u4e00-\u9fa5]+区/)[0].replace('市', '') : ''
          let detailedAddress = filterObj.address&&filterObj.address.match(/[\u4e00-\u9fa5|\d\w]+/) != null ? filterObj.address.match(/[\u4e00-\u9fa5|\d\w]+/)[0].replace(filterObj.address.match(/[\u4e00-\u9fa5]+区/), '').replace(filterObj.address.match(/[\u4e00-\u9fa5]+县/), '').replace(filterObj.address.match(/[\u4e00-\u9fa5]+市/),'').replace(filterObj.address.match(/[\u4e00-\u9fa5]+省/),'') : ''
         if(this.state.filterObj.address&&this.state.filterObj.companyName){
         await this.setState({
            filterObj:{...filterObj,province:province,city,county,detailedAddress}
           })
         }

        }
           
          //  const {filterObj} = this.state
            console.log(filterObj);
           let filterState=this.props.filterState
           let user=this.props.user
           console.log(user);
           console.log(filterState+'123321');
           //生产日期
           let productionDates=filterObj.productionDate.getFullYear() + '-' + (filterObj.productionDate.getMonth() + 1) + '-' +filterObj. productionDate.getDate()
           //安装日期
           let installationDate=filterObj.installationDate.getFullYear() + '-' + (filterObj.installationDate.getMonth() + 1) + '-' + filterObj.installationDate.getDate()
           console.log(installationDate);
           switch(filterState){
            case 1: /* 远程视频&&设备管理 */
             const value = {
               'jsonEntity': {
                 "userId":user.id,
                 'name': filterObj.name,
                 'deviceModel': filterObj.deviceModel,
                 'produceBeginTime': '',
                 'produceEndTime': productionDates,
                 'installBeginTime': '',
                 'installEndTime': installationDate,
                 'province': filterObj.province,
                 'city': filterObj.city,
                 'county': filterObj.county,
                 'detailedAddress': filterObj.detailedAddress,
                 'companyName': this.companyName,
                 "deleted":"0"
               },
               'page': {
                 'size': 10,
                 'current': 1
               },
               'token': user.token
             }
             console.log(value);
        
             return(
                 /* 此处调用 父组件传来的回调函数 */
                 this.props.dispatch({type:'changeFilter'}),
                 this.props.handleClick(value)
             )
             case 2: /* 报警信息(未处理的异常页面) */
             const result = {
               'jsonEntity': {
                 'groupId': user.groupId,
                 'name':  filterObj.name,
                 'deviceModel': filterObj.deviceModel,
                 'produceBeginTime': '',
                 'produceEndTime': productionDates,
                 'installBeginTime': '',
                 'installEndTime': installationDate,
                 'province': filterObj.province,
                 'city': filterObj.city,
                 'county': filterObj.county,
                 'detailedAddress': filterObj.detailedAddress,
                 'companyName': filterObj.companyName,
                 'alarmStatus': 1
               },
               'page': {
                 'size': 10,
                 'current': 1
               }
             }
             return(
                 /* 此处调用 父组件传来的回调函数 */
                 this.props.dispatch({type:'changeFilter'}),
                 this.props.handleClick(result)
             )
             case 3: /* 已处理完成的页面 */
             const alarmData = {
               'jsonEntity': {
                 'groupId': user.groupId,
                 'name': filterObj.name,
                 'deviceModel': filterObj.deviceModel,
                 'produceBeginTime': '',
                 'produceEndTime': productionDates,
                 'installBeginTime': '',
                 'installEndTime': installationDate,
                 'province': filterObj.province,
                 'city': filterObj.city,
                 'county': filterObj.county,
                 'detailedAddress': filterObj.detailedAddress,
                 'companyName': filterObj.companyName,
                 'alarmStatus': 0
               },
               'page': {
                 'size': 10,
                 'current': 1
               }
             }
             return(
                 /* 此处调用 父组件传来的回调函数 */
                 this.props.dispatch({type:'changeFilter'}),
                 this.props.handleClick(alarmData)
             )
          }
        
        // //3.关闭弹出层
        this.setState(({filterObj})=>({filterObj:{ //筛选弹出层的对象
            deviceName:'',//设备名称
            modelNumber:'',//规格型号
            isShowProductionDate:false,
            productionDate:new Date(),//生产日期
            isShowInstallDate:false,
            installationDate:new Date(),//安装日期
            address:'',//所在地区
            customerName:'',//客户名称
          }}))
          console.log(this.props.isFilter);
      }
      
      //打开生产日期弹出层
      openProductionDate=(name)=>{
        this.setState(({filterObj})=>({filterObj:{...filterObj,[name]:true}}))
      }
      //日期的确定按钮
      handleDateChange=(date,name,dateName)=>{
        let newData=date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
        this.setState(({filterObj})=>({filterObj:{...filterObj,[name]:false,[dateName]:new Date(newData)}}))
        console.log(date);
      }
      //日期取消按钮
      handleDateCancel=(name)=>{
        this.setState(({filterObj})=>({filterObj:{...filterObj,[name]:false}}))
      }
      // componentDidMount(){
      //   var pattern = /([\u4e00-\u9fa5]+省)|([\u4e00-\u9fa5]+市)|(([\u4e00-\u9fa5]+区)|([\u4e00-\u9fa5]+县))|([\u4e00-\u9fa5|\d]+)/
      //  console.log(pattern);
      // }
  render() {
    let{isFilter,dispatch}=this.props
    let {filterObj}=this.state

    return (
      <View>
       
       <Dialog
            isVisible={isFilter}
            onBackdropPress={()=>{dispatch({type:'changeFilter'})}}
            overlayStyle={styles.filterItemWrap}
          >
            <View style={styles.filterItem}>
              <Text style={styles.filterItemName}>设备名称:</Text>
              <Input
                containerStyle={styles.filterItemInputWrap}
                inputContainerStyle={styles.filterItemInputContainerWrap}
                inputStyle={styles.filterItemInput}
                value={filterObj.name}
                onChangeText={text => this.setState({filterObj:{...filterObj,name:text}})}
              />
            </View>
            <View style={styles.filterItem}>
              <Text style={styles.filterItemName}>规格型号:</Text>
              <Input
                containerStyle={styles.filterItemInputWrap}
                inputContainerStyle={styles.filterItemInputContainerWrap}
                inputStyle={styles.filterItemInput}
                value={filterObj.deviceModel}
                onChangeText={text => this.setState({filterObj:{...filterObj,deviceModel:text}})}
              />
            </View>
            <View style={styles.filterItem}>
              <Text style={styles.filterItemName}>生产日期:</Text>
              <TouchableOpacity style={styles.openDateModel} onPress={()=>{this.openProductionDate('isShowProductionDate')}}>
                <Text>{moment(filterObj.productionDate).format("YYYY年MM月DD日")}</Text>
              </TouchableOpacity>
              {Platform.OS=='android'&&(
                <DateTimePickerModal
                  isVisible={filterObj.isShowProductionDate}
                  mode="date"
                  date={filterObj.productionDate}
                  onConfirm={(date => this.handleDateChange(date,'isShowProductionDate',"productionDate"))}
                  onCancel={()=>this.handleDateCancel('isShowProductionDate')}
                />
              )}
              {Platform.OS=='ios'&&(
                <DateTimePickerModal
                  isVisible={filterObj.isShowProductionDate}
                  mode="date"
                  date={filterObj.productionDate}
                  onConfirm={(date => this.handleDateChange(date,'isShowProductionDate',"productionDate"))}
                  onCancel={()=>this.handleDateCancel('isShowProductionDate')}
                  confirmTextIOS='确认'
                  cancelTextIOS='取消'
                />
              )}
            </View>
            <View style={styles.filterItem}>
              <Text style={styles.filterItemName}>安装日期:</Text>
              <TouchableOpacity style={styles.openDateModel} onPress={()=>{this.openProductionDate('isShowInstallDate')}}>
                <Text>{moment(filterObj.installDate).format("YYYY年MM月DD日")}</Text>
              </TouchableOpacity>
              {Platform.OS=='android'&&(
                <DateTimePickerModal
                  isVisible={filterObj.isShowInstallDate}
                  mode="date"
                  date={filterObj.installationDate}
                  onConfirm={(date => this.handleDateChange(date,'isShowInstallDate',"installDate"))}
                  onCancel={()=>this.handleDateCancel('isShowInstallDate')}
                />
              )}
              {Platform.OS=='ios'&&(
                <DateTimePickerModal
                  isVisible={filterObj.isShowInstallDate}
                  mode="date"
                  date={filterObj.installationDate}
                  onConfirm={(date => this.handleDateChange(date,'isShowInstallDate',"installDate"))}
                  onCancel={()=>this.handleDateCancel('isShowInstallDate')}
                  confirmTextIOS='确认'
                  cancelTextIOS='取消'
                />
              )}
            </View>
            <View style={styles.filterItem}>
              <Text style={styles.filterItemName}>所在地区:</Text>
              <Input
                containerStyle={styles.filterItemInputWrap}
                inputContainerStyle={styles.filterItemInputContainerWrap}
                inputStyle={styles.filterItemInput}
                value={filterObj.address}
                onChangeText={text => this.setState({filterObj:{...filterObj,address:text}})}
              />
            </View>
            <View style={styles.filterItem}>
              <Text style={styles.filterItemName}>客户名称:</Text>
              <Input
                containerStyle={styles.filterItemInputWrap}
                inputContainerStyle={styles.filterItemInputContainerWrap}
                inputStyle={styles.filterItemInput}
                value={filterObj.companyName}
                onChangeText={text => this.setState({filterObj:{...filterObj,companyName:text}})}
              />
            </View>
            <Button title='确认' onPress={this.handleFilter}/>
          </Dialog>
      </View>
    )
  }
}
const mapStateToprops=(state)=>{
  return{
    isFilter:state.isFilter.Filter,
    user:state.user
  }
}
export default connect(mapStateToprops,null)(index)