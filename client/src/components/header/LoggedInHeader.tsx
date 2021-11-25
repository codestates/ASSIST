import React from 'react';
import HeaderContainer from './HeaderContainer';
import TopContainer from './TopContainer';
import BottomContainer from './BottomContainer';
import Menu from '../button/Menu';

export default function LoggedInHeader() {
  return (
    <HeaderContainer>
      <TopContainer>
        <Menu />
      </TopContainer>
      <BottomContainer />
    </HeaderContainer>
  );
}
