import { StatusBar } from 'expo-status-bar';
import React from 'react';
import styled, { ThemeProvider } from 'styled-components/native';

import Button from './src/components/CustomButton/index';
import { colors, fonts } from './src/theme/index';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: flex-end;
  margin: 10px 5px;
`;
const Text = styled.Text`
  font-family: ${fonts.primary};
  font-size: 16px;
  text-align: center;
  color: #fff;
`;

export default function App() {
  return (
    <ThemeProvider theme={colors}>
      <Container>
        <StatusBar style="auto" />
        <Button
          onPress={() => console.log('good')}
          bgColor={colors.lightGray}
          bgWidth="100%"
          bgBorder={`1px solid ${colors.blue}`}>
          <Text>버튼</Text>
        </Button>
      </Container>
    </ThemeProvider>
  );
}
