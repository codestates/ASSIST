import { MaterialIcons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import styled from 'styled-components/native';
import NextButton from '../../components/button/NextButton';
import MainTitle from '../../components/text/MainTitle';
import NextPageView from '../../components/view/NextPageView';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { colors } from '../../theme/colors';
import { BoldText, LightText } from '../../components/text/SharedText';

const Container = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const CheckMark = styled.View`
  margin-bottom: 30px;
`;

export default function CreateTeamSix() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <>
      <NextPageView>
        <Container>
          <CheckMark>
            <MaterialIcons name="check-circle" size={150} color={colors.blue} />
          </CheckMark>
          <MainTitle>
            <>
              <BoldText size={20}>팀 생성이 완료</BoldText>
              <LightText size={20}>되었어요!</LightText>
            </>
          </MainTitle>
        </Container>
      </NextPageView>
      <NextButton text="팀 화면으로 이동  &gt;" onPress={() => navigation.navigate('Home')} />
    </>
  );
}
