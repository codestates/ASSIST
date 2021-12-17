import React from 'react';
import HeaderContainer from './HeaderContainer';
import TopContainer from './TopContainer';
import Menu from '../button/Menu';
import SelectContainer from './SelectContainer';

export default function SelectTeamHeader() {
  return (
    <HeaderContainer>
      <TopContainer>
        <Menu />
      </TopContainer>
      <SelectContainer />
    </HeaderContainer>
  );
}
