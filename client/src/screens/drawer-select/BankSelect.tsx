/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import styled from 'styled-components/native';
import BottomDrawer from '../../components/drawer/BottomDrawer';
import { Bold } from '../../theme/fonts';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { FlatList } from 'react-native';
import BankItem from '../../components/view/BankItem';
import { StackScreenProps } from '@react-navigation/stack';
import kakao from '../../assets/images/bank-kakao.png';
import shinhan from '../../assets/images/bank-shinhan.png';
import ibk from '../../assets/images/bank-IBK.png';
import kookmin from '../../assets/images/bank-kookmin.png';
import woori from '../../assets/images/bank-woori.png';
import jeil from '../../assets/images/bank-jeil.png';
import busan from '../../assets/images/bank-busan.png';
import daegu from '../../assets/images/bank-daegu.png';
import gwangju from '../../assets/images/bank-gwangju.png';
import saemaeul from '../../assets/images/bank-saemaeul.png';
import woochekuk from '../../assets/images/bank-woochekuk.png';
import shinhyup from '../../assets/images/bank-shinhyup.png';
import suhyup from '../../assets/images/bank-suhyup.png';
import nonghyup from '../../assets/images/bank-nonghyup.png';
import sanup from '../../assets/images/bank-sanup.png';
import kbank from '../../assets/images/bank-kbank.png';
import toss from '../../assets/images/bank-toss.png';

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
    { name: '카카오뱅크', source: kakao },
    { name: '농협', source: nonghyup },
    { name: '신한은행', source: shinhan },
    { name: 'IBK기업은행', source: ibk },
    { name: '국민은행', source: kookmin },
    { name: '우리은행', source: woori },
    { name: 'SC제일은행', source: jeil },
    { name: '부산은행', source: busan },
    { name: '대구은행', source: daegu },
    { name: '광주은행', source: gwangju },
    { name: '새마을금고', source: saemaeul },
    { name: '우체국', source: woochekuk },
    { name: '신협', source: shinhyup },
    { name: '수협', source: suhyup },
    { name: '경남은행', source: busan },
    { name: '전북은행', source: gwangju },
    { name: '제주은행', source: shinhan },
    { name: '산업은행', source: sanup },
    { name: '케이뱅크', source: kbank },
    { name: '토스뱅크', source: toss },
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
              source={bankList.source}
            />
          )}
          style={{ width: '100%', height: '100%', flexGrow: 0 }}
        />
      </BankList>
    </BottomDrawer>
  );
}
