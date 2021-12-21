import React from 'react';
import styled from 'styled-components/native';
import BottomDrawer from '../../components/drawer/BottomDrawer';
import { Bold, Light } from '../../theme/fonts';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { StackScreenProps } from '@react-navigation/stack';
import { FlatList } from 'react-native';
import BankItem from '../../components/view/BankItem';

const TitleContainer = styled.View`
  margin: 15px 0px;
`;

const Title = styled(Bold)`
  font-size: 20px;
`;

const BankList = styled.View`
  width: 100%;
  height: 300px;
`;

const Bank = styled(Light)`
  font-size: 15px;
`;

type BankSelectProps = StackScreenProps<RootStackParamList, 'BankSelect'>;

export default function BankSelect({ route }: BankSelectProps) {
  const bankList = [
    '카카오뱅크',
    '농협',
    '신한은행',
    'IBK기업은행',
    '국민은행',
    'SC제일은행',
    '부산은행',
    '대구은행',
    '광주은행',
    '새마을금고',
    '우체국',
    '신협',
    '수협',
    '경남은행',
    '전북은행',
    '제주은행',
    '산업은행',
    '케이뱅크',
    '토스뱅크',
  ];

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <BottomDrawer>
      <TitleContainer>
        <Title>은행 선택</Title>
      </TitleContainer>
      <BankList>
        <FlatList
          data={bankList}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item: bank }) => (
            <BankItem
              onPress={() => navigation.navigate(route.params?.name, { bank })}
              name={bank}
            />
          )}
          style={{ width: '100%', height: '100%', flexGrow: 0 }}
        />
      </BankList>
    </BottomDrawer>
  );
}
