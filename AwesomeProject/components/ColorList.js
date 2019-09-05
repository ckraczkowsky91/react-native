import React, { Component } from 'react';
import {
  Alert,
  AsyncStorage,
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
import PropTypes from 'prop-types';

// when we moved the custom ColorList component from App.js to the components folder, the ColorList is now in the same directory as the ColorButton and ColorForm
// import ColorButton from './components/ColorButton'
// import ColorForm from './components/ColorForm'
import ColorButton from './ColorButton'
import ColorForm from './ColorForm'

export default class ColorList extends Component {

// sending a title to the App Container which expects a JSON object called navigationOptions for things like the title of the view
  static navigationOptions = {
    title: 'Available Colors'
  };

  constructor() {
    super();
    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    const availableColors = [];
// need availableColors and ds to be available before adding to state because those variable are not yet defined
    this.state = {
      // backgroundColor: 'lightblue',
      availableColors,
      dataSource: this.ds.cloneWithRows(availableColors)
    };
    //this.changeColor = this.changeColor.bind(this);
// it is required to bind newColor to the constructor only if newColor is not written as an arrow function because arrow functions take 'this' from the outer lexical scope
    //this.newColor = this.newColor.bind(this);
  };

// invoking the componentDidMount method of the Component to load the saved colors
// AsyncStorage has a getItem() method to get the items persisted with setItem()
// the first argument is required and it is a string that identifies the key of the item to fetch
// the second argument is optional and it is a callback function to handle errors and the data that is fetched
  componentDidMount(){
    AsyncStorage.getItem(
      '@ColorListStore:Colors',
      (error, data) => {
        if (error) {
          console.log('Error loading colors', error);
        } else {
          const availableColors = JSON.parse(data);
          this.setState({
            availableColors,
            dataSource: this.ds.cloneWithRows(availableColors)
          });
        }
      }
    );
  };

// adding a saveColor method which invokes AsyncStorage to persist data on the device
// the setItem() method is the method used to save data to the device
// the first argument is the key that we want to save the data under
// the second argument is the data to be saved
  saveColors(colors){
    AsyncStorage.setItem(
      '@ColorListStore:Colors',
      JSON.stringify(colors)
    )
  };

  // changeColor(backgroundColor) {
  //   this.setState({
  //     backgroundColor: backgroundColor
  //   })
  // };

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
    this.saveColors(availableColors)
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
        onSelect={this.props.onColorSelected}/>
      )}
      renderHeader={() => (
        <ColorForm onNewColor={this.newColor}/>
      )}>

      </ListView>
    )
  }
};

// we ensure that a function is passed to the child by setting the property to an empty function
ColorList.defaultProps = {
  onColorSelected: f=>f
};

// use PropTypes for checking the type of data that is passed from the parent to the child
// in this case, we are checking that the data is a function
ColorList.propTypes = {
  onColorSelected: PropTypes.func
};

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
