import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
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
import { useDispatch } from 'react-redux';
import { addCreateTeam } from '../../store/actions/propsAction';
import useProps from '../../hooks/useProps';
import useLineSelect from '../../hooks/useLineSelect';

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
    createTeam: { accountBank, accountNumber },
  } = useProps();
  const {
    control,
    formState: { isValid },
    getValues,
    watch,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: { accountNumber },
  });
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('');
  const { isPressed, onPress } = useLineSelect();

  const clearErrorMessage = () => setErrorMessage('');

  const goToSelect = () => {
    onPress();
    navigation.navigate('BankSelect', { name: 'CreateTeam_3' });
  };

  const addProps = () =>
    dispatch(
      addCreateTeam({
        accountBank,
        accountNumber: String(getValues('accountNumber')),
      }),
    );

  const goToNext = () => {
    addProps();
    navigation.navigate('CreateTeam_4');
  };

  const skipToEnd = () => {
    addProps();
    navigation.navigate('CreateTeam_5');
  };

  const checkValid = () => {
    if ((!errorMessage && !watch('accountNumber') && !accountBank) || (isValid && accountBank)) {
      return true;
    }
    return false;
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
          selected={accountBank}
          onPress={() => goToSelect()}
          reset={addCreateTeam({ accountBank: '' })}
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
      {checkValid() && <SkipButton onPress={skipToEnd} />}
      <NextButton disabled={!checkValid()} onPress={goToNext} />
    </>
  );
}
