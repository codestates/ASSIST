import React, { useState, useEffect } from 'react';

import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import styled from 'styled-components/native';

import MainTitle from '../../components/text/MainTitle';
import { colors } from '../../theme/colors';
import { Bold, Regular } from '../../theme/fonts';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import ColoredScrollView from '../../components/view/ColoredScrollView';
import CloseHeader from '../../components/header/CloseHeader';
import NextButton from '../../components/button/NextButton';
import LineInput from '../../components/input/LineInput';
import LineSelect from '../../components/input/LineSelect';
import * as yup from 'yup';
import useTeamInfo from '../../hooks/useTeamInfo';
import LoadingView from '../../components/view/LoadingView';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import { ASSIST_SERVER_URL } from '@env';
import { CommonModal, CommonModalTitle } from '../../components/modal/CommonModal';
import CommonModalButton from '../../components/button/CommonModalButton';
import { useToast } from 'react-native-toast-notifications';

const InputSpaceInput = styled.View`
  width: 100%;
  height: 35px;
`;

const Space = styled.View`
  width: 100%;
  height: 16px;
`;

const ContentContainer = styled.View`
  width: 100%;
`;

const Line = styled.View`
  margin-top: 13px;
  margin-bottom: 35px;
`;

const nameSchema = yup.object({
  name: yup.string().required(),
});

const dateSchema = yup.object({
  date: yup
    .string()
    .matches(/^(0?[1-9]|[12][0-9])$/)
    .required(),
});

const moneySchema = yup.object({
  money: yup.string().required(),
});

const bankAccountSchema = yup.object({
  bankAccount: yup
    .string()
    .matches(/^^[0-9]+(-[0-9]+)+$$/)
    .required(),
});

type AddOnsProps = StackScreenProps<RootStackParamList, 'AddOns_3'>;

export default function AddOns_3({ route }: AddOnsProps) {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { token, selectedTeam } = useSelector((state: RootState) => state.userReducer);
  const { isLoading, data } = useTeamInfo();

  const [isPressed, setIsPressed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const toast = useToast();
  const {
    control: nameControl,
    formState: { isValid: isNameValid },
    getValues: getName,
    setValue: setName,
    watch: watchName,
  } = useForm({
    mode: 'onChange',
    defaultValues: { name: '' },
    resolver: yupResolver(nameSchema),
  });

  const {
    control: dateControl,
    formState: { isValid: isDateValid },
    getValues: getDate,
    setValue: setDate,
    watch: watchDate,
  } = useForm({
    mode: 'onChange',
    defaultValues: { date: '' },
    resolver: yupResolver(dateSchema),
  });

  const {
    control: moneyControl,
    formState: { isValid: isMoneyValid },
    setValue: setMoney,
    getValues: getMoney,
    watch: watchMoney,
  } = useForm({
    mode: 'onChange',
    defaultValues: { money: '' },
    resolver: yupResolver(moneySchema),
  });

  const {
    control: bankAccountControl,
    formState: { isValid: isbankAccountValid },
    setValue: setbankAccount,
    getValues: getBankAccount,
    watch: watchBankAccount,
  } = useForm({
    mode: 'onChange',
    defaultValues: { bankAccount: '' },
    resolver: yupResolver(bankAccountSchema),
  });

  useEffect(() => {
    if (data !== undefined) {
      setName('name', data.name);
      setDate('date', data.paymentDay === 0 ? '' : String(data.paymentDay));
      setMoney('money', data.dues);
      setbankAccount('bankAccount', data.accountNumber);
    }
  }, [data]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (isPressed) {
        setIsPressed(false);
      }
    });
    return unsubscribe;
  }, [navigation, isPressed]);

  const clearErrorMessage = () => setErrorMessage('');

  const handleModifyTeamInfo = async () => {
    try {
      await axios.patch(
        `${ASSIST_SERVER_URL}/team/${selectedTeam.id}`,
        {
          name: getName('name'),
          paymentDay: Number(getDate('date')) || 0,
          dues: getMoney('money'),
          accountNumber: getBankAccount('bankAccount'),
          accountBank: route.params?.bank,
        },
        { headers: { authorization: `Bearer ${token}` } },
      );
      navigation.replace('AddOns_3', { teamId: selectedTeam.id });
      setModalVisible(false);
      toast.show('팀 수정이 완료되었습니다');
    } catch (err) {
      console.log(err);
    }
  };

  const goToNext = () => {
    setIsPressed(true);
    navigation.navigate('BankSelect', { name: 'AddOns_3' });
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const checkValid = () => {
    if (data?.name !== watchName('name') && isNameValid) {
      return true;
    } else if (String(data?.paymentDay) !== watchDate('date') && isDateValid) {
      return true;
    } else if (data?.dues !== watchMoney('money') && isMoneyValid) {
      return true;
    } else if (data?.accountNumber !== watchBankAccount('bankAccount') && isbankAccountValid) {
      return true;
    } else if (data?.accountBank !== route.params?.bank && route.params?.bank) {
      return true;
    } else {
      return false;
    }
  };

  return isLoading ? (
    <LoadingView />
  ) : (
    <>
      <CommonModal visible={modalVisible} setVisible={handleCloseModal}>
        <CommonModalTitle>
          <Bold size={17}>정보 수정</Bold>
          <Line>
            <Regular gray size={13}>
              팀 정보를 수정 하시겠습니까?
            </Regular>
          </Line>
        </CommonModalTitle>
        <CommonModalButton color="blue" text="수정하기" onPress={handleModifyTeamInfo} />
        <Space />
        <CommonModalButton color="whiteSmoke" text="이전 화면으로 >" onPress={handleCloseModal} />
      </CommonModal>
      <CloseHeader color={colors.whiteSmoke} />
      <ColoredScrollView titleColor={colors.whiteSmoke}>
        <MainTitle marginBottom="15px">
          <Bold size={22}>팀 정보</Bold>
          <Regular size={17}>{data?.name}</Regular>
        </MainTitle>
        <ContentContainer>
          {selectedTeam.leader ? (
            <LineInput
              name="name"
              control={nameControl}
              title="팀 이름"
              placeholder="팀 이름을 입력 해 주세요"
              errorMessage={errorMessage}
              clearErrorMessage={clearErrorMessage}
            />
          ) : (
            <LineSelect isFixed title="팀 이름" selected={data?.name} />
          )}
          <InputSpaceInput />
          {selectedTeam.leader ? (
            <LineInput
              name="date"
              type="date"
              control={dateControl}
              title="팀 회비 납부일"
              placeholder="납부일을 입력 해 주세요"
              errorMessage={errorMessage}
              clearErrorMessage={clearErrorMessage}
              conditions={[
                {
                  name: '숫자',
                  regex: /^\d+$/,
                },
                {
                  name: '1~29 사이',
                  regex: /^(0?[1-9]|[12][0-9])$/,
                },
              ]}
            />
          ) : (
            <LineSelect
              title="팀 회비 납부일"
              selected={data?.paymentDay !== 0 ? String(data?.paymentDay) : '미정'}
              isFixed
            />
          )}
          <InputSpaceInput />
          {selectedTeam.leader ? (
            <LineInput
              name="money"
              type="money"
              control={moneyControl}
              title="월 회비 금액"
              placeholder="회비 금액을 입력 해 주세요"
              errorMessage={errorMessage}
              clearErrorMessage={clearErrorMessage}
            />
          ) : (
            <LineSelect title="월 회비 금액" selected={data?.dues || '미정'} isFixed />
          )}
          <InputSpaceInput />
          {selectedTeam.leader ? (
            <LineSelect
              title="은행"
              isPressed={isPressed}
              selected={route.params?.bank || data?.accountBank}
              onPress={() => goToNext()}
            />
          ) : (
            <LineSelect title="은행" selected={data?.accountBank || '미정'} isFixed />
          )}
          <InputSpaceInput />
          {selectedTeam.leader ? (
            <LineInput
              name="bankAccount"
              control={bankAccountControl}
              title="계좌번호"
              placeholder="계좌번호를 입력해주세요"
              errorMessage={errorMessage}
              clearErrorMessage={clearErrorMessage}
              conditions={[
                {
                  name: '숫자, 하이픈(-)만 사용',
                  regex: /^^[0-9]+(-[0-9]+)+$$/,
                },
              ]}
            />
          ) : (
            <LineSelect title="계좌번호" selected={data?.accountNumber || '미정'} isFixed />
          )}
          <InputSpaceInput />
        </ContentContainer>
      </ColoredScrollView>
      {selectedTeam.leader && (
        <NextButton disabled={!checkValid()} text="팀 정보 수정하기 >" onPress={handleOpenModal} />
      )}
    </>
  );
}
