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
import { useDispatch } from 'react-redux';
import { addAddOns, addCreateTeam } from '../../store/actions/propsAction';

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
  const dispatch = useDispatch();
  const bankList = [
    { name: '???????????????', source: kakao },
    { name: '??????', source: nonghyup },
    { name: '????????????', source: shinhan },
    { name: 'IBK????????????', source: ibk },
    { name: '????????????', source: kookmin },
    { name: '????????????', source: woori },
    { name: 'SC????????????', source: jeil },
    { name: '????????????', source: busan },
    { name: '????????????', source: daegu },
    { name: '????????????', source: gwangju },
    { name: '???????????????', source: saemaeul },
    { name: '?????????', source: woochekuk },
    { name: '??????', source: shinhyup },
    { name: '??????', source: suhyup },
    { name: '????????????', source: busan },
    { name: '????????????', source: gwangju },
    { name: '????????????', source: shinhan },
    { name: '????????????', source: sanup },
    { name: '????????????', source: kbank },
    { name: '????????????', source: toss },
  ];

  const getNavigation = (accountBank: string) => {
    const screenName = route.params.name;
    if (screenName === 'CreateTeam_3') {
      dispatch(addCreateTeam({ accountBank }));
    } else if (screenName === 'AddOns_3') {
      dispatch(addAddOns({ accountBank }));
    }
    navigation.navigate(screenName);
  };

  return (
    <BottomDrawer>
      <TitleContainer>
        <Title>?????? ??????</Title>
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
