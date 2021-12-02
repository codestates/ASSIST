import React from 'react';
import styled from 'styled-components/native';
import BottomDrawer from '../../components/drawer/BottomDrawer';
import { Bold, Light } from '../../theme/fonts';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootStackParamList';

const TitleContainer = styled.View`
  margin: 20px 0px;
`;

const Title = styled(Bold)`
  font-size: 20px;
`;

const GenderContainer = styled.TouchableOpacity`
  margin: 20px 0px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Gender = styled(Light)`
  font-size: 15px;
`;

const GenderList = ['남성', '여성'];

export default function GenderSelect() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <BottomDrawer>
      <TitleContainer>
        <Title>성별 선택</Title>
      </TitleContainer>
      {GenderList.map((gender) => (
        <GenderContainer
          key={gender}
          onPress={() => navigation.navigate('GetStarted_5', { gender })}>
          <Gender>{gender}</Gender>
        </GenderContainer>
      ))}
    </BottomDrawer>
  );
}
