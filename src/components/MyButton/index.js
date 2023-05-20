import React from "react";
import {TouchableHighlight} from "react-native"
import { setWidth } from "../../utils/styleAdb";


export default class MyButton extends React.PureComponent{
  render() {
    return (
      <TouchableHighlight underlayColor='#ddd' {...this.props}>
        {this.props.children}
      </TouchableHighlight>
    );
  }

}
