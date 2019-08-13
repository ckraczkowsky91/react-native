import React, { Component } from 'react';
import {
  Alert,
  Button,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import ColorButton from './components/ColorButton'

export default class ColorList extends Component {

  constructor() {
    super();
    this.state = {
      backgroundColor: 'lightblue'
    };
    //this.changeColor = this.changeColor.bind(this);
  };

  changeColor(backgroundColor) {
    this.setState({
      backgroundColor: backgroundColor
    })
  };

  render() {
    return(
      <ScrollView style={[
        styles.container,
        {
          backgroundColor: this.state.backgroundColor
        }
      ]}>

        <ColorButton backgroundColor='red'
        onSelect={(color) => this.changeColor(color)}/>
        <ColorButton backgroundColor='green'
        onSelect={(color) => this.changeColor(color)}/>
        <ColorButton backgroundColor='salmon'
        onSelect={(color) => this.changeColor(color)}/>
        <ColorButton backgroundColor='#567876'
        onSelect={(color) => this.changeColor(color)}/>

      </ScrollView>
    )
  }
}  ;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20
  }
});
