import React from 'react';
import HeaderContainer from './HeaderContainer';
import TopContainer from './TopContainer';
import BottomContainer from './BottomContainer';
import Menu from '../button/Menu';

type LoggedInHeaderProps = {
  isNewTeam?: boolean;
};

export default function LoggedInHeader({ isNewTeam }: LoggedInHeaderProps) {
  return (
    <HeaderContainer>
      <TopContainer>
        <Menu />
      </TopContainer>
      <BottomContainer isNewTeam={isNewTeam} />
    </HeaderContainer>
  );
}
