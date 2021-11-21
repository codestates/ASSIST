import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

type ButtonProps = {
  title: string;
  onPress: () => void;
  buttonColor: string;
  titleColor: string;
  buttonStyle: object;
  titleStyle: object;
};

const Button = ({
  title,
  onPress,
  buttonColor,
  titleColor,
  buttonStyle,
  titleStyle,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={{ ...styles.container, ...buttonStyle, backgroundColor: buttonColor || '#006FAD' }}
      onPress={onPress}>
      <Text style={{ ...styles.title, ...titleStyle, color: titleColor || '#fff' }}>{title}</Text>
    </TouchableOpacity>
  );
};
export default Button;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#006FAD',
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 12,
  },
});
