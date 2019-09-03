//used to collect data from the user
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import PropTypes from 'prop-types';

export default class ColorForm extends Component {
  constructor() {
    super();
    this.state={
      textColor: ''
    };
// we need to bind the submit() method to the constructor in order to use ths within submit()
    this.submit=this.submit.bind(this);
  };

  submit() {
// passes the new color to the parent by
// using two-way binding
    this.props.onNewColor(this.state.textColor.toLowerCase());
    this.setState({textColor: ''});
  };

  render(){
    return (
      <View style={styles.container}>
        <TextInput style={styles.textInput}
        placeholder='Enter a color'
        onChangeText={(textColor) => this.setState({textColor})}
        value={this.state.textColor}/>
        <Text style={styles.button}
        onPress={this.submit}>Add</Text>
      </View>
    )
  };
};

ColorForm.propTypes = {
  onNewColor: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'lightgrey',
    justifyContent: 'space-around',
    height: 70,
    paddingTop: 20
  },
  textInput: {
    flex: 1,
    margin: 5,
    padding: 5,
    borderWidth: 2,
    fontSize: 20,
    borderRadius: 5,
    backgroundColor: 'snow'
  },
  button:{
    backgroundColor: 'green',
    margin: 5,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: 20
  }
});
