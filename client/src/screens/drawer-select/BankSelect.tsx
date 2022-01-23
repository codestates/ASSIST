import React from 'react';
import styled from 'styled-components/native';
import BottomDrawer from '../../components/drawer/BottomDrawer';
import { Bold } from '../../theme/fonts';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { FlatList } from 'react-native';
import BankItem from '../../components/view/BankItem';
import { StackScreenProps } from '@react-navigation/stack';

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

type BankSelectProps = StackScreenProps<RootStackParamList, 'BankSelect'>;

export default function BankSelect({ route }: BankSelectProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const bankList = [
    { name: '카카오뱅크', dir: 'kakao' },
    { name: '농협', dir: 'nonghyup' },
    { name: '신한은행', dir: 'shinhan' },
    { name: 'IBK기업은행', dir: 'IBK' },
    { name: '국민은행', dir: 'kookmin' },
    { name: '우리은행', dir: 'woori' },
    { name: 'SC제일은행', dir: 'jeil' },
    { name: '부산은행', dir: 'busan' },
    { name: '대구은행', dir: 'daegu' },
    { name: '광주은행', dir: 'gwanju' },
    { name: '새마을금고', dir: 'saemaeul' },
    { name: '우체국', dir: 'woochekuk' },
    { name: '신협', dir: 'shinhyup' },
    { name: '수협', dir: 'suhyup' },
    { name: '경남은행', dir: 'busan' },
    { name: '전북은행', dir: 'gwanju' },
    { name: '제주은행', dir: 'shinhan' },
    { name: '산업은행', dir: 'sanup' },
    { name: '케이뱅크', dir: 'kbank' },
    { name: '토스뱅크', dir: 'toss' },
  ];

  const getNavigation = (bank: string) => {
    navigation.navigate({ name: route.params.name, params: { bank }, merge: true });
  };

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
          renderItem={({ item: bankList }) => (
            <BankItem
              onPress={() => getNavigation(bankList.name)}
              name={bankList.name}
              dir={bankList.dir}
            />
          )}
          style={{ width: '100%', height: '100%', flexGrow: 0 }}
        />
      </BankList>
    </BottomDrawer>
  );
}
