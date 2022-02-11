import { ASSIST_SERVER_URL } from '@env';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import axios, { AxiosResponse } from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import NextButton from '../../components/button/NextButton';
import NextPageView from '../../components/view/NextPageView';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { getSelectedTeam } from '../../store/actions/userAction';
import { RootState } from '../../store/reducers';
import { colors } from '../../theme/colors';
import { Bold, Regular } from '../../theme/fonts';

const Circle = styled.View`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: ${colors.blue};
  position: relative;
`;

const ExclamationMark = styled.View`
  position: absolute;
  top: 20px;
  left: 20px;
`;

const Wrapper = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled(Regular)`
  font-size: 19px;
  margin: 40px 0px 60px 0px;
`;

const Item = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  margin-bottom: 40px;
`;

const Value = styled.View`
  flex-direction: row;
`;

const Arrow = styled(Bold)`
  line-height: 19px;
  margin-left: 20px;
  color: ${colors.lightGray};
  font-size: 18px;
`;

export default function CreateTeam_5() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { name, paymentDay, accountBank, accountNumber, dues } = useSelector(
    (state: RootState) => state.propsReducer.createTeam,
  );
  const { token } = useSelector((state: RootState) => state.userReducer);
  const dispatch = useDispatch();

  const getPaymentDay = () => {
    if (!paymentDay) {
      return <Bold lightGray>미입력</Bold>;
    } else if (paymentDay === 32) {
      return <Bold blue>매월 말일</Bold>;
    } else {
      return <Bold blue>매월 {String(paymentDay)}일</Bold>;
    }
  };

  const getAccount = () => {
    if (!accountBank && !accountNumber) {
      return <Bold lightGray>미입력</Bold>;
    } else {
      return (
        <Bold blue>
          {accountBank} {accountNumber}
        </Bold>
      );
    }
  };

  const getDues = () => {
    if (!dues) {
      return <Bold lightGray>미입력</Bold>;
    } else {
      return <Bold blue>{dues}</Bold>;
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

  return (
    <>
      <NextPageView isFinish>
        <Wrapper>
          <Circle>
            <ExclamationMark>
              <MaterialCommunityIcons name="exclamation-thick" size={80} color={colors.white} />
            </ExclamationMark>
          </Circle>
          <Text>
            입력 하신 정보를 <Bold size={19}>확인 해 주세요!</Bold>
          </Text>
          <Item onPress={() => navigation.navigate('CreateTeam_1')}>
            <Regular gray>팀 이름</Regular>
            <Value>
              <Bold blue>{name}</Bold>
              <Arrow>&gt;</Arrow>
            </Value>
          </Item>
          <Item onPress={() => navigation.navigate('CreateTeam_2')}>
            <Regular gray>회비 납부일</Regular>
            <Value>
              {getPaymentDay()}
              <Arrow>&gt;</Arrow>
            </Value>
          </Item>
          <Item onPress={() => navigation.navigate('CreateTeam_3')}>
            <Regular gray>계좌번호</Regular>
            <Value>
              {getAccount()}
              <Arrow>&gt;</Arrow>
            </Value>
          </Item>
          <Item onPress={() => navigation.navigate('CreateTeam_4')}>
            <Regular gray>월 회비 금액</Regular>
            <Value>
              {getDues()}
              <Arrow>&gt;</Arrow>
            </Value>
          </Item>
        </Wrapper>
      </NextPageView>
      <NextButton onPress={createTeam} />
    </>
  );
}
