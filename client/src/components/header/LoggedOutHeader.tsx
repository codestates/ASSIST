import React from 'react';
import { Text } from 'react-native';
import HeaderContainer from './HeaderContainer';
import TopContainer from './TopContainer';

export default function LoggedOutHeader() {
  return (
    <HeaderContainer>
      <TopContainer>
        <Text>시작하기</Text>
      </TopContainer>
    </HeaderContainer>
  );
}
