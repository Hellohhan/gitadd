/* 走势图模块 */
import { View, Text, TouchableOpacity, ImageBackground, Dimensions, TextInput, Keyboard, TouchableWithoutFeedback, ActivityIndicator, Alert } from 'react-native'
import React, { ToastAndroid } from 'react'
import svg from "../../../../assets/svg/svg";
import { SvgXml } from "react-native-svg";
import styles from './style';
import { setWidth, setText, setHeight } from '../../../../utils/styleAdb';
import { pointEcharts,PointEcharts } from '../../../../api/requestPath'
import Echarts from 'native-echarts';
import { Tab, TabView } from '@rneui/themed';
import renderChart from 'native-echarts/src/components/Echarts/renderChart';
import { TabViewItem } from '@rneui/base/dist/TabView/TabView.Item';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { connect } from 'react-redux';
import Toast from 'react-native-root-toast';
import { debounce } from 'lodash';
import axios from '../../../../api';
class index extends React.PureComponent {
    /* 状态区域 */
    state = {
        index: 2,
        tabs: ['1小时', '1天', '7天', '15天'],
        isModal: false,
        startDate: new Date(),
        isanimation:false,
        //15天
        fifteenDayStartInput: '',
        fifteenDayStartMt: this.getSpecifyDateBefore(new Date(), 15),
        fifteenDayEndInput: '',
        fifteenDayEndDate: new Date(),
        //7天
        sevenDayStartInput: '',
        sevenDayStartMt: this.getSpecifyDateBefore(new Date(), 7),
        sevenDayEndInput: '',
        sevenDayendDate: new Date(),
        //1天
        oneDayStartInput: '',
        oneDayStartMt: new Date(),
        oneDayEndInput: '',
        oneDayendDate: new Date(),
        //1小时
        oneHourStartInput: '',
        oneHourStartMt: ((new Date().getHours() - 1 > 9) ? (new Date().getHours() - 1) : ('0' + (new Date().getHours() - 1))) + ':' + ((new Date().getMinutes() > 9) ? new Date().getMinutes() : ('0' + new Date().getMinutes())),
        oneHourEndInput: '',
        oneHourEndHour: Number(((new Date().getHours() - 1 > 9) ? ('' + new Date().getHours() - 1) : ('0' + new Date().getHours() - 1))),
        //下拉框选择的值
        value: '',
        //最大值
        maxValue: '',
        //最小值
        minValue: '',
        //平均值
        avgValue: '',
        //走势图x轴的值
        datetime: [],
        //走势图y轴的值
        data: [],
    }

    //----------------------------------------------------//
    Goback = () => {
        this.props.navigation.goBack()
    }
    ToTime = () => {
        let { oneHourStartInput, oneHourEndInput, oneDayStartInput, oneDayEndInput, sevenDayStartInput, sevenDayEndInput, fifteenDayStartInput, fifteenDayEndInput } = this.state
        switch (this.state.index) {
            case 0:
                return (
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: setWidth(30) }}>
                        <TouchableOpacity onPress={() => { this.setState({ isModal: true }) }}>
                            <TextInput style={styles.times} editable={false} placeholder='开始日期' value={oneHourStartInput} />
                        </TouchableOpacity>
                        <Text style={styles.zhi}>至</Text>
                        <TextInput style={styles.times} value={oneHourEndInput} placeholder='结束日期'  onChangeText={(e)=>{this.setState({oneHourEndInput:e})}}/>
                    </View>
                )
            case 1:
                return (
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: setWidth(30) }}>
                        <TouchableOpacity onPress={() => { this.setState({ isModal: true }) }}>
                            <TextInput style={styles.times} editable={false} value={oneDayStartInput} placeholder='开始日期' />
                        </TouchableOpacity>
                        <Text style={styles.zhi}>至</Text>
                        <TextInput style={styles.times} value={oneDayEndInput} placeholder='结束日期'  onChangeText={(e)=>{this.setState({oneDayEndInput:e})}}/>
                    </View>
                )
            case 2:
                return (
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: setWidth(30) }}>
                        <TouchableOpacity onPress={() => { this.setState({ isModal: true }) }}>
                            <TextInput style={styles.times} placeholder='开始日期' editable={false} value={sevenDayStartInput} />
                        </TouchableOpacity>
                        <Text style={styles.zhi}>至</Text>
                        <TextInput style={styles.times} placeholder='结束日期' value={sevenDayEndInput}  onChangeText={(e)=>{this.setState({sevenDayEndInput:e})}}/>
                    </View>
                )
            case 3:
                return (
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: setWidth(30) }}>
                        <TouchableOpacity onPress={() => { this.setState({ isModal: true }) }}>
                            <TextInput style={styles.times} editable={false} value={fifteenDayStartInput} placeholder='开始日期' />
                        </TouchableOpacity>
                        <Text style={styles.zhi}>至</Text>
                        <TextInput style={styles.times} value={fifteenDayEndInput} placeholder='结束日期' onChangeText={(e)=>{this.setState({fifteenDayEndInput:e})}}/>
                    </View>
                )
        }
    }
    /* 处理时间弹出框 */
    operationModal = () => {
        let { index, tabs, isModal, oneHourStartMt, oneHourEndHour, oneDayStartMt, oneDayendDate, sevenDayStartMt, sevenDayendDate, fifteenDayStartMt, fifteenDayEndDate } = this.state
        console.log(oneHourStartMt);
        switch (this.state.index) {
            case 0:/* 1小时 */
                return (
                    Platform.OS == 'android' ? (
                        <DateTimePickerModal
                            isVisible={isModal}
                            mode="time"
                            locale="zh-CN"
                            data={oneHourStartMt}
                            maximumDate={oneHourEndHour}
                            onConfirm={(date => {
                                let hours = date.getHours();
                                let minutes = date.getMinutes();
                                let timeString = '';
                                if (hours < 9) {
                                    timeString += '0';
                                }
                                timeString += hours.toString() + ':';
                                if (minutes < 9) {
                                    timeString += '0';
                                }
                                timeString += minutes.toString();
                                this.setState({ isModal: false })
                                   this.oneHourStartMtConfirm(timeString)
                            })}
                            onCancel={() => this.setState({ isModal: false })}
                        />
                    ) :
                        Platform.OS == 'ios' && (
                            <DateTimePickerModal
                            isVisible={isModal}
                            mode="time"
                            locale="zh-CN"
                            data={oneHourStartMt}
                            maximumDate={oneHourEndHour}
                            onConfirm={(date => {
                                let hours = date.getHours();
                                let minutes = date.getMinutes();
                                let timeString = '';
                                if (hours < 9) {
                                    timeString += '0';
                                }
                                timeString += hours.toString() + ':';
                                if (minutes < 9) {
                                    timeString += '0';
                                }
                                timeString += minutes.toString();
                                alert(timeString);
                                this.setState({ isModal: false })
                                   this.oneHourStartMtConfirm(timeString)
                            })}
                            onCancel={() => this.setState({ isModal: false })}
                        />
                        )
                )
            case 1:/* 1天 */
                return (
                    Platform.OS == 'android' ? (
                        <DateTimePickerModal
                            isVisible={isModal}
                            defaultDate={oneDayStartMt}
                            mode="date"
                            locale="zh-CN"
                            maximumDate={oneDayendDate}
                            onConfirm={(date => {
                                this.oneDayStartMtConfirm(date)
                                this.setState({ isModal: false })
                            })}
                            onCancel={() => this.setState({ isModal: false })}
                        />
                    ) :
                        Platform.OS == 'ios' && (
                            <DateTimePickerModal
                                isVisible={isModal}
                                data={oneDayStartMt}
                                mode="time"
                                locale="zh-CN"
                                maximumDate={oneDayendDate}
                                onConfirm={(date => {
                                    this.oneDayStartMtConfirm(date)
                                    this.setState({ isModal: false })
                                })}
                                onCancel={() => this.setState({ isModal: false })}
                            />
                        )
                )
            case 2:/* 7天 */
                return (
                    Platform.OS == 'android' ? (
                        <DateTimePickerModal
                            isVisible={isModal}
                            data={sevenDayStartMt}
                            mode="date"
                            locale="zh-CN"
                            maximumDate={sevenDayendDate}
                            onConfirm={(date => {
                                this.sevenDayStartMtConfirm(date)
                                this.setState({ isModal: false })
                            })}
                            onCancel={() => this.setState({ isModal: false })}
                        />
                    ) :
                        Platform.OS == 'ios' && (
                            <DateTimePickerModal
                                isVisible={isModal}
                                data={sevenDayStartMt}
                                mode="time"
                                locale="zh-CN"
                                maximumDate={sevenDayendDate}
                                onConfirm={(date => {
                                    this.sevenDayStartMtConfirm(date)
                                    this.setState({ isModal: false })
                                })}
                                onCancel={() => this.setState({ isModal: false })}
                            />
                        )
                )
             case 3:/* 15天 */
                return (
                    Platform.OS == 'android' ? (
                        <DateTimePickerModal
                            isVisible={isModal}
                            initialDate={fifteenDayStartMt[0]}
                            mode="date"
                            locale="zh-CN"
                            maximumDate={fifteenDayEndDate}
                            onConfirm={(date => {
            
                                this.fifteenDayStartMtConfirm(date)
                                this.setState({ isModal: false })
                            })}
                            onCancel={() => this.setState({ isModal: false })}
                        />
                    ) :
                        Platform.OS == 'ios' && (
                            <DateTimePickerModal
                                isVisible={isModal}
                                // data={fifteenDayStartMt}
                                initialDate={fifteenDayStartMt}
                                mode="time"
                                locale="zh-CN"
                                maximumDate={fifteenDayEndDate}
                                onConfirm={(date => this.fifteenDayStartMtConfirm(date,'isShowProductionDate', "productionDate"))}
                                onCancel={() => this.setState({ isModal: false })}
                            />
                     )
                )
        }
    }
    componentDidMount() {
        this.operationsTime2()
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.index !== prevState.index) {
            this.operationsTime2();
        }
    }
    /* 点击tab栏处理时间 */
    operationsTime2 = () => {
        let time = new Date()
        switch (this.state.index) {
            case 0:
                let start = ((time.getHours() - 1) > 9 ? (time.getHours() - 1) : ('0' + (time.getHours() - 1))) + ":" + (time.getMinutes() > 9 ? time.getMinutes() : ('0' + time.getMinutes()))
                this.oneHourStartMtConfirm(start)
                break
            case 1:
                this.oneDayStartMtConfirm(time)
                break
            case 2:
                let t = this.getSpecifyDateBefore(new Date(), 7)
                console.log(t);
                t.setHours('00')
                t.setMinutes('00')
                t.setSeconds('00')
             
                this.sevenDayStartMtConfirm(t)
                break
            case 3:
                let d = this.getSpecifyDateBefore(new Date(), 15)
                d.setHours('00')
                d.setMinutes('00')
                d.setSeconds('00')
                
                this.fifteenDayStartMtConfirm(d)
        }
    }
    //获取指定天数之后的日期
    getSpecifyDate(value, day) {
        let currentValue = new Date(value);
        currentValue.setDate(value.getDate() + day);
        return currentValue;
    }
    //获取指定天数之前的日期
    getSpecifyDateBefore(value, day) {
        let currentValue = new Date(value);
        currentValue.setDate(value.getDate() - day);
        return currentValue;
    }
    /* ------------------------------------------------------------ */
    /* 处理 1个小时 */
    oneHourStartMtConfirm = (value) => {
        let date = new Date();
        let dateBeafor = date.getFullYear() + '-' + (((date.getMonth() + 1) > 9) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + ((date.getDate() > 9) ? (date.getDate()) : ('0' + (date.getDate())))
        //1小时前
        let startResult = dateBeafor + ' ' + value
        let nowTime = new Date()
        nowTime.setHours(parseInt(value.split(':')[0]) + 1)
        nowTime.setMinutes(parseInt(value.split(':')[1]))
        //1小时后
        let endREsult = dateBeafor + ' ' + ((nowTime.getHours() > 9) ? nowTime.getHours() : ('0' + nowTime.getHours())) + ':' + ((nowTime.getMinutes() > 9) ? nowTime.getMinutes() : ('0' + nowTime.getMinutes()))
        return (
            this.setState({ oneHourStartInput: startResult, oneHourEndInput: endREsult }, () => {
                console.log(this.state.oneHourStartInput);
                this.getValueOneHour(new Date(startResult.replace(/-/g,'/')).getTime(), new Date(endREsult.replace(/-/g,'/')).getTime())
            })
        )
    }
    /* 处理1天 */
    oneDayStartMtConfirm(value) {
        //开始时间
        let oneDayStartInput = value.getFullYear() + '-' + (((value.getMonth() + 1) > 9) ? (value.getMonth() + 1) : ('0' + (value.getMonth() + 1))) + '-' + ((value.getDate() > 9) ? (value.getDate()) : ('0' + (value.getDate())))+' 00:00'
        //结束时间
        let oneDayEndInput = value.getFullYear() + '-' + (((value.getMonth() + 1) > 9) ? (value.getMonth() + 1) : ('0' + (value.getMonth() + 1))) + '-' + ((value.getDate() > 9) ? (value.getDate()) : ('0' + (value.getDate())))+' 23:59'
        this.setState({ oneDayStartInput: oneDayStartInput, oneDayEndInput: oneDayEndInput }, () => {
            this.getValueOneDay(new Date(oneDayStartInput.replace(/-/g,'/')).getTime(), new Date(oneDayEndInput.replace(/-/g,'/')).getTime())
        })
       }
    /* 处理7天 */
   async sevenDayStartMtConfirm (value) {
        //开始时间
        let sevenDayStartInput = value.getFullYear() + '-' + (((value.getMonth() + 1) > 9) ? (value.getMonth() + 1) : ('0' + (value.getMonth() + 1))) + '-' + ((value.getDate() > 9) ? (value.getDate()) : ('0' + (value.getDate())))
        let valueAfter = this.getSpecifyDate(value, 7);
        //结束时间
        let sevenDayEndInput
        if (valueAfter.getTime() > new Date().getTime()) {
            sevenDayEndInput = new Date().getFullYear() + '-' + (((new Date().getMonth() + 1) > 9) ? (new Date().getMonth() + 1) : ('0' + (new Date().getMonth() + 1))) + '-' + ((new Date().getDate() > 9) ? (new Date().getDate()) : ('0' + (new Date().getDate()))) 
        } else {
            sevenDayEndInput = valueAfter.getFullYear() + '-' + (((valueAfter.getMonth() + 1) > 9) ? (valueAfter.getMonth() + 1) : ('0' + (valueAfter.getMonth() + 1))) + '-' + ((valueAfter.getDate() > 9) ? (valueAfter.getDate()) : ('0' + (valueAfter.getDate()))) 
        }

        await  this.setState({ sevenDayStartInput, sevenDayEndInput })
        this.getValueSevenDay(new Date(this.state.sevenDayStartInput).getTime() ,new Date(this.state.sevenDayEndInput).getTime());
    }
    /* 处理15天 */
    fifteenDayStartMtConfirm(value) {
        //开始时间
        let fifteenDayStartInput = value.getFullYear() + '-' + (((value.getMonth() + 1) > 9) ? (value.getMonth() + 1) : ('0' + (value.getMonth() + 1))) + '-' + ((value.getDate() > 9) ? (value.getDate()) : ('0' + (value.getDate()))) 
        let valueAfter = this.getSpecifyDate(value, 15);
        //结束时间
        let fifteenDayEndInput
        if (valueAfter.getTime() > new Date().getTime()) {
            fifteenDayEndInput = new Date().getFullYear() + '-' + (((new Date().getMonth() + 1) > 9) ? (new Date().getMonth() + 1) : ('0' + (new Date().getMonth() + 1))) + '-' + ((new Date().getDate() > 9) ? (new Date().getDate()) : ('0' + (new Date().getDate())))
        } else {
            fifteenDayEndInput = valueAfter.getFullYear() + '-' + (((valueAfter.getMonth() + 1) > 9) ? (valueAfter.getMonth() + 1) : ('0' + (valueAfter.getMonth() + 1))) + '-' + ((valueAfter.getDate() > 9) ? (valueAfter.getDate()) : ('0' + (valueAfter.getDate())))
        }
        this.setState({ fifteenDayStartInput, fifteenDayEndInput }, () => {
            this.getValueFifteenDay(new Date(this.state.fifteenDayStartInput).getTime(), new Date(this.state.fifteenDayEndInput).getTime());
        })
    }
    /* -------------------------------------------------------------- */
    /* 获取一个小时的数据 */
    getValueOneHour(startTime, endTime) {
        let params = {
            "deviceId": this.props.route.params.deviceId,
            "pointId": this.props.route.params.pointId,
            "format": "minute",
            "startTime": startTime,
            "endTime": endTime,
        }
        this.getPointEcharts(params);
    }
    /* 处理1天的数据 */
    getValueOneDay(startTime, endTime) {
        console.log(startTime,endTime,'99999999999999999999');
        let params = {
            "deviceId": this.props.route.params.deviceId,
            "pointId": this.props.route.params.pointId,
            "format": "hour",
            "startTime": startTime,
            "endTime": endTime,
        }
        this.getPointEcharts(params);
    }
    /* 处理7天的数据 */
    getValueSevenDay(startTime, endTime) {
        // console.log(startTime,endTime,'16161616116');
        // let newstartTime=new Date('2023-05-09').getTime()
        // let newendTime=new Date('2023-05-16').getTime()
        // console.log(newstartTime,newendTime,'888888888888888888888');
        let params = {
            "deviceId": this.props.route.params.deviceId,
            "pointId": this.props.route.params.pointId,
            "format": "hour",
            "startTime":startTime,
            "endTime": endTime,
        }
        this.getPointEcharts(params);
    }
    /* 处理15天的数据 */
    getValueFifteenDay(startTime, endTime) {
        let params = {
            "deviceId": this.props.route.params.deviceId,
            "pointId": this.props.route.params.pointId,
            "format": "hour",
            "startTime": startTime,
            "endTime": endTime,
        }
        this.getPointEcharts(params);
    }
    /* --------------------------------------------------------------- */
    //走势图接口
    async getPointEcharts(params) {
        try{
            console.log(params,'111111111111111111111111111');
         this.props.dispatch({ type: 'loading', data: true })
          let result=await pointEcharts(params)
          console.log(result,'2222222222222222222222222222');
              if(result.data.message==='ok'){
            this.props.dispatch({ type: 'loading', data: false })
            let echartsValue = result.data.data;
            console.log(echartsValue)
            let maxValue = echartsValue.valueData.maxValue;
            let minValue = echartsValue.valueData.minValue;
            let temp = echartsValue.valueData.avgValue.toString()
            let avgValue = temp.slice(0, temp.indexOf('.') + 3);
            //更改数据
            this.setState({ maxValue, minValue, avgValue })
            if (echartsValue.listData.length > 0) {
                let data = echartsValue.listData.reverse();
                let date = [];
                let value = [];
                let t
                for (let i = 0; i < data.length; i++) {
                    date.push(data[i].formatTime);
                    t = data[i].avgValue
                    value.push(t.slice(0, t.indexOf('.') + 3));
                }
                // this.datetime.splice(0,this.datetime.length);
                // this.data.splice(0,this.datetime.length);
                let datetime = date;
                let Ydata = value;
                this.setState({ datetime: datetime, data: Ydata })
                this.getEcharts()
          console.log(result);
    }else{
        alert('当前传感器还没有数据')
        this.props.dispatch({ type: 'loading', data: false })
    }
}else{
    alert('请更换日期区间')
    this.props.dispatch({ type: 'loading', data: false })
}
        }
        catch(e){
            console.log('走势图请求失败',e);
            this.props.dispatch({ type: 'loading', data: false })
        }
    }
    /* --------------------------------------------------------------------- */
    getEcharts = () => {
        let option = {
            color: '#00FF00', // changed to green
            tooltip: {
                show: true,
                trigger: 'axis',
                extraCssText: 'z-index: 2'
            },
            xAxis: {
                type: 'category',
                data: this.state.datetime,
                boundaryGap: false,
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: '#b2b2b2',
                    align: 'center',
                    fontSize: setWidth(20),
                    margin: 10
                },
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                type: 'value',
                boundaryGap: false,
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: '#b2b2b2'
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: 'dashed'
                    }
                }
            },
            series: [{
                data: this.state.data,
                type: 'line',
                smooth: false,
            }],
            grid: {
                left: 50 + 'px',
            },
            dataZoom: {
                type: 'inside',
            }
        }
        return option;
    }
    render() {
        let { index, tabs, isModal, oneHourStartMt, oneHourEndHour, oneDayStartMt, oneDayendDate, sevenDayStartMt, sevenDayendDate, fifteenDayStartMt, } = this.state
        return (
            <View>
                <ImageBackground source={require('./image/background.png')} style={styles.bgc}>
                    {/* 头部区域 */}
                    <View style={styles.titleWraper2}>
                        <TouchableOpacity onPress={this.Goback} style={{ width: setWidth(170) }}>
                            <SvgXml xml={svg.goBack} style={styles.Svg}
                                fill={"#fff"}>
                            </SvgXml>
                        </TouchableOpacity>
                        <View style={styles.box2}><Text style={styles.title}>{this.props.route.params.pointName}</Text></View>
                    </View>
                    <View>
                    </View>

                    {/* <View style={{ width: Dimensions.get('window').width, alignItems: 'center' }}>
                        <Text style={{ fontSize: setText(50), color: '#fff' }} >2020.03.07-13</Text>
                    </View> */}
                    {/* 图表 */}
                    <Echarts option={this.getEcharts()} height={270} />

                    {/* 折线图下面的部分 */}
                    <View style={{ alignItems: 'center', paddingHorizontal: setWidth(50) }}>
                        {/* tab菜单 */}
                        <Tab
                            value={index}
                            onChange={(e) => this.setState({ index: e })}
                            indicatorStyle={{
                                backgroundColor: 'blue',

                            }}
                        /* 点击tab栏时处理时间 */
                        >
                            {
                                tabs.map((item, indexs) => {
                                    return (
                                        <Tab.Item key={indexs}>
                                            <View style={styles.buttonWraper} >
                                                <Text style={[{ color: index === indexs ? 'blue' : 'white' }]}>{item}</Text>
                                            </View>
                                        </Tab.Item>
                                    )
                                })
                            }
                        </Tab>
                        {/* 处理时间 */}
                        {this.ToTime()}
                        {/* 底部信息 */}
                        <View style={styles.footerContext}>
                            <View style={styles.left}>
                            <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.left_content_title}>当前值</Text>

                                    <View style={styles.left_content_wraper}>
                                        <Text style={{ color: '#fff',fontSize:setText(40) }}>{this.props.route.params.value}</Text>    
                                        <Text style={{ color: '#fff',fontSize:setText(30),textAlignVertical:'top' }}>{this.props.route.params.unit}</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row' }} >
                                    <Text style={styles.left_content_title}>位    置</Text>{/* 此处有4个空格 */}

                                    <View style={styles.left_content_wraper}>
                                        <Text style={{ color: '#fff' }}>测上</Text>
                                    </View>
                                </View>
                              
                            </View>
                            <View style={styles.middle}></View>
                            <View style={styles.right}>
                                <Text style={{ color: '#fff' }}>最大值：{this.state.maxValue}</Text>
                                <Text style={{ color: '#fff' }}>平均值：{this.state.avgValue}</Text>
                                <Text style={{ color: '#fff' }}>最小值：{this.state.minValue}</Text>
                            </View>
                        </View>
                        {/* 处理开始时间弹出框*/}
                        {this.operationModal()}

                    </View>
                </ImageBackground>
            </View>
        )
    }
}
const mapStatetoProps = (state) => {
    return {
        isloading: state.loading.isLoading
    }
}
export default connect(mapStatetoProps, null)(index)

