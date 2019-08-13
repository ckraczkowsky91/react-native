import React, { Component } from 'react';
import {
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
  } from 'react-native';

export default class HelloWorldApp extends Component {

  componentDidMount(){
    return fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.movies,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  };

  render() {
    return(
// using in-line CSS to format the View, we could also import the StyleSheets object from react-native
      <View style={styles.container}>
        <Button
        style={styles.button}
        onPress={_onButtonPress}
        title='Run PCACP'/>
        <TouchableHighlight
          style={styles.touchableButton}
          onPress={_onButtonPress}>
          <Text>Run PCAP</Text>
        </TouchableHighlight>
    {/* the brackets around {pic} allow us to embed a JS expression in the JSX */}
      </View>
    );
  }
};

const _onButtonPress = () => {
  var data = getDataFromApi();
  Alert.alert(data);
};

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkblue'
  },

  button: {
    flex: 2,
  },

  touchableButton: {
  alignItems: 'center',
  backgroundColor: 'powderblue',
  padding: 10
  }
}
);
