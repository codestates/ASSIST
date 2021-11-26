import React from 'react';
import styled from 'styled-components/native';
import BottomDrawer from '../../components/drawer/BottomDrawer';
import { Bold, Light } from '../../theme/fonts';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootStackParamList';

const TitleContainer = styled.View`
  margin: 15px 0px;
`;

const Title = styled(Bold)`
  font-size: 20px;
`;

const BankContainer = styled.TouchableOpacity`
  margin: 15px 0px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Bank = styled(Light)`
  font-size: 15px;
`;

const BankList = ['카카오뱅크', '농협', '신한은행', 'IBK기업은행', '하나은행', '우리은행'];

export default function BankSelect() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <BottomDrawer>
      <TitleContainer>
        <Title>은행 선택</Title>
      </TitleContainer>
      {BankList.map((bank) => (
        <BankContainer key={bank} onPress={() => navigation.navigate('CreateTeam_3', { bank })}>
          <Bank>{bank}</Bank>
        </BankContainer>
      ))}
    </BottomDrawer>
  );
}
