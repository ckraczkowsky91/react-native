import React from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import ColorTools from 'color';

// when using ( the function is imedaitely invoked
const ColorInfo = ({navigation}) => {
  const colorTools = ColorTools(navigation.state.params.color);
  return(
    <View style={[styles.container, {backgroundColor: colorTools}]}>
      <Text style={[styles.text, {color: colorTools.negate()}]}>
        {colorTools.hex()}
      </Text>
      <Text style={[styles.text, {color: colorTools.negate()}]}>
        {colorTools.rgb().string()}
      </Text>
    </View>
  );
};

ColorInfo.navigationOptions = ({navigation}) => ({
  title: navigation.state.params.color
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
    margin: 10
  }
});

export default ColorInfo;
