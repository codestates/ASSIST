import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import NextButton from '../../components/button/NextButton';
import SkipButton from '../../components/button/SkipButton';
import LineInput from '../../components/input/LineInput';
import LineSelect from '../../components/input/LineSelect';
import MainTitle from '../../components/text/MainTitle';
import SubTitle from '../../components/text/SubTitle';
import NextPageView from '../../components/view/NextPageView';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { Bold, Light } from '../../theme/fonts';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addCreateTeam } from '../../store/actions/propsAction';
import { RootState } from '../../store/reducers';
import { ASSIST_SERVER_URL } from '@env';
import axios, { AxiosResponse } from 'axios';
import { getSelectedTeam } from '../../store/actions/userAction';

const schema = yup.object({
  accountNumber: yup
    .string()
    .matches(/^^[0-9]+(-[0-9]+)+$$/)
    .required(),
});

type CreateTeamProps = StackScreenProps<RootStackParamList, 'CreateTeam_3'>;

export default function CreateTeam_3({ route }: CreateTeamProps) {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {
    control,
    formState: { isValid },
    getValues,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const [isPressed, setIsPressed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const state = useSelector((state: RootState) => state);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (isPressed) {
        setIsPressed(false);
      }
    });
    return unsubscribe;
  }, [navigation, isPressed]);

  const clearErrorMessage = () => setErrorMessage('');

  const goToSelect = () => {
    setIsPressed(true);
    navigation.navigate('BankSelect', { name: 'CreateTeam_3' });
  };

  const goToNext = () => {
    dispatch(
      addCreateTeam({
        accountBank: route.params?.bank,
        accountNumber: String(getValues('accountNumber')),
      }),
    );
    navigation.navigate('CreateTeam_4');
  };

  const createTeam = () => {
    axios
      .post(
        `${ASSIST_SERVER_URL}/team`,
        { ...state.propsReducer.createTeam },
        { headers: { authorization: `Bearer ${state.userReducer.token}` } },
      )
      .then(({ data: { id, inviteCode } }: AxiosResponse<{ id: number; inviteCode: string }>) => {
        dispatch(getSelectedTeam({ id, name: state.propsReducer.createTeam.name, leader: true }));
        navigation.reset({ routes: [{ name: 'CreateTeam_5', params: { inviteCode } }] });
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <NextPageView>
        <MainTitle>
          <>
            <Bold size={22}>팀 회비 납부계좌</Bold>
            <Light size={22}>를</Light>
          </>
          <Light size={22}>알려 주세요 💳</Light>
        </MainTitle>
        <SubTitle>
          <Light>회비 납부 1일전, 팀원들에게 납부 정보를 보내드려요.</Light>
        </SubTitle>
        <LineSelect
          title="은행"
          isPressed={isPressed}
          selected={route.params?.bank}
          onPress={() => goToSelect()}
        />
        <LineInput
          control={control}
          title="계좌번호"
          name="accountNumber"
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
      </NextPageView>
      <SkipButton onPress={() => createTeam()} />
      <NextButton
        disabled={!isValid || route.params?.bank === undefined || Boolean(errorMessage)}
        onPress={() => goToNext()}
      />
    </>
  );
}
