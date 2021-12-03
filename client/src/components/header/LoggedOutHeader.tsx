import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { colors } from '../../theme/colors';
import { Regular } from '../../theme/fonts';
import CommonButton from '../button/CommonButton';
import HeaderContainer from './HeaderContainer';
import TopContainer from './TopContainer';

export default function LoggedOutHeader() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <HeaderContainer height={100}>
      <TopContainer>
        <CommonButton
          width="105px"
          height="35px"
          buttonBgColor={colors.blue}
          buttonRadius="20px"
          onPress={() => navigation.navigate('GetStarted')}>
          <Regular white>시작하기</Regular>
        </CommonButton>
      </TopContainer>
    </HeaderContainer>
  );
}
