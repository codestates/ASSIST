import { ASSIST_SERVER_URL } from '@env';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import axios, { AxiosResponse } from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NextButton from '../../components/button/NextButton';
import SummaryItem from '../../components/view/SummaryItem';
import SummaryView from '../../components/view/SummaryView';
import useProps from '../../hooks/useProps';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { getSelectedTeam } from '../../store/actions/userAction';
import { RootState } from '../../store/reducers';

export default function CreateTeam_5() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {
    createTeam: { name, paymentDay, accountBank, accountNumber, dues },
  } = useProps();
  const { token } = useSelector((state: RootState) => state.userReducer);
  const dispatch = useDispatch();

  const getPaymentDay = () => {
    if (paymentDay === 32) {
      return '매월 말일';
    } else if (paymentDay > 0) {
      return `매월 ${paymentDay}일`;
    }
  };

  const getAccount = () => {
    if (accountBank && accountNumber) {
      return `${accountBank} ${accountNumber}`;
    } else if (accountBank) {
      return accountBank;
    } else if (accountNumber) {
      return accountNumber;
    }
  };

  const createTeam = () => {
    axios
      .post(
        `${ASSIST_SERVER_URL}/team`,
        { name, paymentDay, accountBank, accountNumber, dues },
        { headers: { authorization: `Bearer ${token}` } },
      )
      .then(({ data: { id, inviteCode } }: AxiosResponse<{ id: number; inviteCode: string }>) => {
        dispatch(getSelectedTeam({ id, name, leader: true }));
        navigation.navigate('CreateTeam_6', { inviteCode });
      })
      .catch((error) => console.log(error));
  };

  const onPressTeamName = () => navigation.navigate('CreateTeam_1');
  const onPressPaymentDay = () => navigation.navigate('CreateTeam_2');
  const onPressAccount = () => navigation.navigate('CreateTeam_3');
  const onPressDues = () => navigation.navigate('CreateTeam_4');

  return (
    <>
      <SummaryView>
        <SummaryItem title="팀 이름" onPress={onPressTeamName} value={name} />
        <SummaryItem title="회비 납부일" onPress={onPressPaymentDay} value={getPaymentDay()} />
        <SummaryItem title="계좌번호" onPress={onPressAccount} value={getAccount()} />
        <SummaryItem title="팀 이름" onPress={onPressDues} value={dues} />
      </SummaryView>
      <NextButton onPress={createTeam} />
    </>
  );
}
