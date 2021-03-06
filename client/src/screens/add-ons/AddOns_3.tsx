/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
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
import useProps from '../../hooks/useProps';
import useLineSelect from '../../hooks/useLineSelect';
import { addAddOns } from '../../store/actions/propsAction';

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

  const {
    addOns: { paymentDay, accountBank },
  } = useProps();

  const { isPressed: isPaymentDayPressed, onPress: onPressPaymentDay } = useLineSelect();
  const { isPressed: isAccountBankPressed, onPress: onPressAccountBank } = useLineSelect();

  useEffect(() => {
    if (data !== undefined) {
      setName('name', data.name);
      setMoney('money', data.dues);
      setbankAccount('bankAccount', data.accountNumber);
    }
  }, [data]);

  const clearErrorMessage = () => setErrorMessage('');

  const getDateData = (value?: number) => {
    if (value === 32) {
      return '??????';
    } else if (!value) {
      return undefined;
    }
    return String(value) + '???';
  };

  const handleModifyTeamInfo = async () => {
    try {
      await axios.patch(
        `${ASSIST_SERVER_URL}/team/${selectedTeam.id}`,
        {
          name: getName('name'),
          paymentDay,
          dues: getMoney('money'),
          accountNumber: getBankAccount('bankAccount'),
          accountBank,
        },
        { headers: { authorization: `Bearer ${token}` } },
      );
      navigation.replace('AddOns_3', { teamId: selectedTeam.id });
      setModalVisible(false);
      toast.show('??? ????????? ?????????????????????');
    } catch (err) {
      console.log(err);
    }
  };

  const goBankSelect = () => {
    onPressAccountBank();
    navigation.navigate('BankSelect', { name: 'AddOns_3' });
  };

  const goPaymentDaySelect = () => {
    onPressPaymentDay();
    navigation.navigate('PaymentDaySelect', { name: 'AddOns_3' });
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const checkValid = () => {
    if (watchName('name').length === 0) {
      return false;
    } else if (data?.name !== watchName('name') && isNameValid) {
      return true;
    } else if (data?.paymentDay !== paymentDay) {
      return true;
    } else if (!watchMoney('money') || (data?.dues !== watchMoney('money') && isMoneyValid)) {
      return true;
    } else if (
      !watchBankAccount('bankAccount') ||
      (data?.accountNumber !== watchBankAccount('bankAccount') && isbankAccountValid)
    ) {
      return true;
    } else if (data?.accountBank !== accountBank) {
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
          <Bold size={17}>?????? ??????</Bold>
          <Line>
            <Regular gray size={13}>
              ??? ????????? ?????? ???????????????????
            </Regular>
          </Line>
        </CommonModalTitle>
        <CommonModalButton color="blue" text="????????????" onPress={handleModifyTeamInfo} />
        <Space />
        <CommonModalButton color="whiteSmoke" text="?????? ???????????? >" onPress={handleCloseModal} />
      </CommonModal>
      <CloseHeader color={colors.whiteSmoke} />
      <ColoredScrollView titleColor={colors.whiteSmoke}>
        <MainTitle marginBottom="15px">
          <Bold size={22}>??? ??????</Bold>
          <Regular size={17}>{data?.name}</Regular>
        </MainTitle>
        <ContentContainer>
          {selectedTeam.leader ? (
            <LineInput
              name="name"
              control={nameControl}
              title="??? ??????"
              placeholder="??? ????????? ?????? ??? ?????????"
              errorMessage={errorMessage}
              clearErrorMessage={clearErrorMessage}
              type="teamName"
            />
          ) : (
            <LineSelect isFixed title="??? ??????" selected={data?.name} />
          )}
          <InputSpaceInput />
          {selectedTeam.leader ? (
            <LineSelect
              title="?????? ?????????"
              isPressed={isPaymentDayPressed}
              selected={getDateData(paymentDay)}
              reset={addAddOns({ paymentDay: 0 })}
              onPress={() => goPaymentDaySelect()}
            />
          ) : (
            <LineSelect
              title="?????? ?????????"
              selected={data?.paymentDay !== 0 ? getDateData(data?.paymentDay) : '??????'}
              isFixed
            />
          )}
          <InputSpaceInput />
          {selectedTeam.leader ? (
            <LineInput
              name="money"
              type="money"
              control={moneyControl}
              title="??? ?????? ??????"
              placeholder="?????? ????????? ?????? ??? ?????????"
              errorMessage={errorMessage}
              clearErrorMessage={clearErrorMessage}
            />
          ) : (
            <LineSelect title="??? ?????? ??????" selected={data?.dues || '??????'} isFixed />
          )}
          <InputSpaceInput />
          {selectedTeam.leader ? (
            <LineSelect
              title="??????"
              isPressed={isAccountBankPressed}
              selected={accountBank}
              reset={addAddOns({ accountBank: '' })}
              onPress={() => goBankSelect()}
            />
          ) : (
            <LineSelect title="??????" selected={data?.accountBank || '??????'} isFixed />
          )}
          <InputSpaceInput />
          {selectedTeam.leader ? (
            <LineInput
              name="bankAccount"
              control={bankAccountControl}
              title="????????????"
              placeholder="??????????????? ??????????????????"
              errorMessage={errorMessage}
              clearErrorMessage={clearErrorMessage}
              conditions={[
                {
                  name: '??????, ?????????(-)??? ??????',
                  regex: /^^[0-9]+(-[0-9]+)+$$/,
                },
              ]}
            />
          ) : (
            <LineSelect title="????????????" selected={data?.accountNumber || '??????'} isFixed />
          )}
          <InputSpaceInput />
        </ContentContainer>
      </ColoredScrollView>
      {selectedTeam.leader && (
        <NextButton disabled={!checkValid()} text="??? ?????? ???????????? >" onPress={handleOpenModal} />
      )}
    </>
  );
}
