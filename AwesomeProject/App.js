import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';

// playing around with the props and state of a Component
class BlinkingText extends Component {
  componentDidMount(){
    setInterval(() => (
      this.setState(previousState => (
        { isShowingText: !previousState.isShowingText }
      ))
    ), 1000)
  }

  state = { isShowingText: true };

  render() {
    if (!this.state.isShowingText){
      return null;
    }

    return(
      <Text>Hello {this.props.name}!</Text>
    );
  }
};

export default class HelloWorldApp extends Component {
  render() {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    return(
// using in-line CSS to format the View, we could also import the StyleSheets object from react-native
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <BlinkingText name='world'/>
        <Text>Hello galaxy!</Text>
        <BlinkingText name='universe'/>
    {/* the brackets around {pic} allow us to embed a JS expression in the JSX */}
    {/* need to add props to Image for it to render */}
        <Image source={pic} style={{width: 50, height: 50}}/>
      </View>
    );
  }
};
