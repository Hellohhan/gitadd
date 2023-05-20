import { View, Text,Platform } from 'react-native'
import React,{useState} from 'react'
import MyFrame from '../../../components/MyFrame/'
import SelectDropdown from 'react-native-select-dropdown'
import styles from './style'
import { TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function Index() {
  const [dataSelect, setdataSelect] = useState(['电压','电流','气压','电压','电流','气压'])
  const [equipmentName, setequipmentName] = useState('landsky')
  const [StartProductionDate, setStartProductionDate] = useState(false)
  const [EndProductionDate, setEndProductionDate] = useState(false)
  const [startDate, setstartState] = useState(new Date())
  const [endDate, setendDate] = useState(new Date())
  console.log(EndProductionDate);

  //起始时间确定按钮
  const StartDateChange=(data)=>{
    setstartState(data)
    setStartProductionDate(false)
  }
  //结束时间确定按钮
  const EndDateChange=(data)=>{
    setendDate(data)
    setEndProductionDate(false)
  }
  return (
    <MyFrame>
      <View style={styles.wraper} >
       <View style={styles.contentBox}>
        <Text style={styles.contentTitle}>设备名称:</Text>
        <TextInput style={styles.contentInput} value={equipmentName} onChangeText={(e)=>{setequipmentName(e)}}></TextInput>
       </View>

        {/* 数据选择 */}
       <View style={styles.contentBox}>
        <Text style={styles.contentTitle}>数据选择:</Text>
        <SelectDropdown
        defaultValue=''
        data={dataSelect}
        buttonStyle={styles.buttonStyle}
        defaultButtonText='气压'
        buttonTextStyle={styles.buttonTextStyle}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index)
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem
        }}
        rowTextForSelection={(item, index) => {
          return item
        }}
        >
       </SelectDropdown>
       </View>

       {/* 生产日期 */}
       <View style={[styles.contentBox, styles.productionBox]}>
        <Text style={[styles.contentTitle]}>生产日期:</Text>
        <TouchableOpacity onPress={()=>{setStartProductionDate(true)}} style={{position:'relative'}}>
          <Text style={styles.productionDate}>{moment(startDate).format('YYYY年MM月DD日')}</Text>
          <Ionicons name="calendar-outline" style={styles.startIcon}></Ionicons>
        </TouchableOpacity>
        <View style={styles.line}></View>
        <TouchableOpacity onPress={()=>{setEndProductionDate(true)}} style={{position:'relative'}}>
          <Text style={styles.productionDate}>{moment(endDate).format('YYYY年MM月DD日')}</Text>
          <Ionicons name="calendar-outline" style={styles.EndIcon}></Ionicons>
        </TouchableOpacity>
        {Platform.OS=='android'&&(
                <DateTimePickerModal
                  isVisible={StartProductionDate}
                  mode="date"
                  date={startDate}
                  onConfirm={(date => StartDateChange(date,'isShowProductionDate',"productionDate"))}
                  onCancel={()=>setStartProductionDate(false)}
                />
              )}
                {Platform.OS=='ios'&&(
                <DateTimePickerModal
                isVisible={StartProductionDate}
                mode="date"
                date={startDate}
                onConfirm={(date => StartDateChange(date,'isShowProductionDate',"productionDate"))}
                onCancel={()=>setStartProductionDate(false)}
              />
              )}
          {/* ------------------------------------------------------------------------------------- */}   
          {Platform.OS=='android'&&(
                <DateTimePickerModal
                  isVisible={EndProductionDate}
                  mode="date"
                  date={startDate}
                  onConfirm={(date => EndDateChange(date,'isShowProductionDate',"productionDate"))}
                  onCancel={()=>EndDateCancel(setEndProductionDate(false))}
                />
              )}
                {Platform.OS=='ios'&&(
                <DateTimePickerModal
                isVisible={EndProductionDate}
                mode="date"
                date={startDate}
                onConfirm={(date => EndDateChange(date,'isShowProductionDate',"productionDate"))}
                onCancel={()=>EndDateCancel(setEndProductionDate(false))}
              />
              )}
       </View>
        {/* 同意拒绝 */}
        <View style={styles.BottomButton}>
          <TouchableOpacity>
            <View style={[styles.BtmBox,styles.agree]}>
              <Text style={[styles.BtmBoxText]} >同意</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity>
            <View style={styles.BtmBox}>
            <Text style={styles.BtmBoxText} >拒绝</Text>
            </View>
            </TouchableOpacity>
          </View>
      </View>
    </MyFrame>
  )
}

