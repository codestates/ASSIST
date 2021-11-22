import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from './src/components/CustomButton/index';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>배포테스트.</Text>
      <StatusBar style="auto" />
      <Button
        title="버튼"
        buttonColor="#006FAD"
        titleColor="#fff"
        buttonStyle={{ width: '100%', alignSelf: 'center' }}
        titleStyle={{ fontSize: 20 }}
        onPress={() => console.log('good')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
