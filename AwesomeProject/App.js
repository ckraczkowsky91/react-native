import React, { Component } from 'react';
import {
  Alert,
  Button,
  Image,
  ListView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import ColorButton from './components/ColorButton'
import ColorForm from './components/ColorForm'

export default class ColorList extends Component {

  constructor() {
    super();
    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    const availableColors = [
      'red',
      'yellow',
      'blue',
      'lightpink',
      'grey',
      'purple'];
// need availableColors and ds to be available before adding to state because those variable are not yet defined
    this.state = {
      backgroundColor: 'lightblue',
      availableColors,
      dataSource: this.ds.cloneWithRows(availableColors)
    };
    //this.changeColor = this.changeColor.bind(this);
// it is required to bind newColor to the constructor only if newColor is not written as an arrow function because arrow functions take 'this' from the outer lexical scope
    //this.newColor = this.newColor.bind(this);
  };

  changeColor(backgroundColor) {
    this.setState({
      backgroundColor: backgroundColor
    })
  };

// this is the function that is evoked when the user presses the 'Add' Text component
  newColor = (color) => {
    const availableColors = [
      ...this.state.availableColors,
      color
    ]
    this.setState({
      availableColors,
      dataSource: this.ds.cloneWithRows(availableColors)
    })
  }

  render() {
    return(
      <ListView style={[
        styles.container,
        {
          backgroundColor: this.state.backgroundColor
        }
      ]}
      dataSource={this.state.dataSource}
      renderRow={(color) => (
        <ColorButton backgroundColor={color}
        onSelect={(color) => this.changeColor(color)}/>
      )}
      renderHeader={() => (
        <ColorForm onNewColor={this.newColor}/>
      )}>

      </ListView>
    )
  }
}  ;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    backgroundColor: 'lightgrey',
    paddingTop: 20,
    padding: 10,
    fontSize: 30,
    textAlign: 'center'
  }
});
