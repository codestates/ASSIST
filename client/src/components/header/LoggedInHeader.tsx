import React from 'react';
import HeaderContainer from './HeaderContainer';
import TopContainer from './TopContainer';
import BottomContainer from './BottomContainer';
import Menu from '../button/Menu';
import { LayoutChangeEvent } from 'react-native';

type LoggedInHeaderProps = {
  isNewTeam?: boolean;
  isTestSelect?: boolean;
  isTestTeam?: boolean;
  isTestLeader?: boolean;
};

export default function LoggedInHeader({
  isNewTeam,
  isTestSelect,
  isTestTeam,
  isTestLeader,
}: LoggedInHeaderProps) {
  return (
    <HeaderContainer>
      <TopContainer>
        <Menu isTestLeader={isTestLeader} />
      </TopContainer>
      <BottomContainer isNewTeam={isNewTeam} isTestTeam={isTestTeam} isTestSelect={isTestSelect} />
    </HeaderContainer>
  );
}
