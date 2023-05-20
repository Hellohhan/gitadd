
import React, { Component,useEffect} from 'react'
import { View, Text, Platform, TouchableOpacity } from "react-native";
 import MyFrame from '../../components/MyFrame'
import { connect} from 'react-redux';
import Message from './Message'
import Service from './Service/Service';
import CustomerService from './CustomerService/index'
import styles from './styles';
import svg from "../../assets/svg/svg";
import { SvgXml } from "react-native-svg";
import axios from 'axios';
import { setWidth } from '../../utils/styleAdb';

 class Index extends Component {
    componentDidMount() {
      this._unsubscribe = this.props.navigation.addListener('blur', () => {
          this.props.dispatch({type:'NewsHeaderFalse'})
      });
    }
  render() {
    let {isNews,dispatch,navigation}=this.props
    const Goback=()=>{
      if(isNews){
        navigation.navigate('TabMine')
      }else{
        navigation.navigate('TabMain')
      }
    }
    return (
      <MyFrame>
      <View>
        <View style={[isNews?styles.titleWraper2:styles.titleWraper]}>
             <TouchableOpacity onPress={Goback} style={{width:setWidth(170)}}>
             <SvgXml xml={svg.goBack} style={styles.Svg} 
                fill={"black"}>
              </SvgXml> 
              </TouchableOpacity> 
         <View style={isNews?styles.box:styles.box2}><Text style={styles.title}>{isNews?'人工客服':'消息'}</Text></View>
             </View>
        <View>
      {isNews?<CustomerService basic={this.props}/>:<Message basic={this.props}/>}
    </View>
    </View>
     </MyFrame>

    )
  }
}
const mapStatetoProps=(state)=>{
  return{
    isNews:state.news.isNews
  }
}
export default connect (mapStatetoProps,null)(Index)
