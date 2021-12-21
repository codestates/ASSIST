import React, { useState, useEffect } from 'react';

import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { StackScreenProps } from '@react-navigation/stack';
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

const schema = yup.object().shape({
  teamInfo: yup.object().shape({
    date: yup
      .string()
      .matches(/^(0?[1-9]|[12][0-9])$/)
      .required(),
    money: yup.string().required(),
    name: yup.string().required(),
    bankAccount: yup
      .string()
      .matches(/^^[0-9]+(-[0-9]+)+$$/)
      .required(),
  }),
});

type AddOnsProps = StackScreenProps<RootStackParamList, 'AddOns_3'>;

export default function AddOns_3({ route }: AddOnsProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { token, selectedTeam } = useSelector((state: RootState) => state.userReducer);
  const { isLoading, data } = useTeamInfo();

  const [isPressed, setIsPressed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const toast = useToast();
  const {
    control,
    handleSubmit,
    formState: { isValid },
    getValues,
    setValue,
  } = useForm({
    mode: 'onChange',
    defaultValues: { teamInfo: { name: '', date: '', money: '', bankAccount: '' } },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (data !== undefined) {
      setValue('teamInfo', {
        name: data.name,
        date: String(data.paymentDay),
        money: data.dues,
        bankAccount: data.accountNumber,
      });
    }
  }, [data, setValue]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (isPressed) {
        setIsPressed(false);
      }
    });
    return unsubscribe;
  }, [navigation, isPressed]);

  const clearErrorMessage = () => setErrorMessage('');
  const onSubmit = (data: string) => {
    console.log(data);
  };

  const handleModifyTeamInfo = async () => {
    const modifyTeamInfo = getValues([
      'teamInfo.name',
      'teamInfo.date',
      'teamInfo.money',
      'teamInfo.bankAccount',
    ]);

    try {
      await axios.patch(
        `${ASSIST_SERVER_URL}/team/${selectedTeam.id}`,
        {
          name: modifyTeamInfo[0],
          paymentDay: Number(modifyTeamInfo[1]),
          dues: modifyTeamInfo[2],
          accountNumber: modifyTeamInfo[3],
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
    if (isValid || route.params?.bank) {
      return true;
    }
    return false;
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
          <LineInput
            name="teamInfo.name"
            control={control}
            title="팀 이름"
            placeholder="팀 이름을 입력 해 주세요"
            errorMessage={errorMessage}
            clearErrorMessage={clearErrorMessage}
          />
          <InputSpaceInput />
          <LineInput
            name="teamInfo.date"
            type="date"
            control={control}
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
          <InputSpaceInput />
          <LineInput
            name="teamInfo.money"
            type="money"
            control={control}
            title="월 회비 금액"
            placeholder="회비 금액을 입력 해 주세요"
            errorMessage={errorMessage}
            clearErrorMessage={clearErrorMessage}
          />
          <InputSpaceInput />
          <LineSelect
            title="은행"
            isPressed={isPressed}
            selected={route.params?.bank || data?.accountBank}
            onPress={() => goToNext()}
          />
          <InputSpaceInput />
          <LineInput
            name="teamInfo.bankAccount"
            control={control}
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
          <InputSpaceInput />
        </ContentContainer>
      </ColoredScrollView>
      {selectedTeam.leader && (
        <NextButton disabled={!checkValid()} text="팀 정보 수정하기 >" onPress={handleOpenModal} />
      )}
    </>
  );
}
