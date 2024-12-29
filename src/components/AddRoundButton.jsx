import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import theme from '../theme/index';

const RoundButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: theme.colors.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  text: {
    color: theme.colors.white,
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default RoundButton;