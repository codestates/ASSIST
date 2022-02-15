import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import LineInput from '../../components/input/LineInput';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { Bold, Light } from '../../theme/fonts';
import NextPageView from '../../components/view/NextPageView';
import NextButton from '../../components/button/NextButton';
import MainTitle from '../../components/text/MainTitle';
import SubTitle from '../../components/text/SubTitle';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { addCreateTeam } from '../../store/actions/propsAction';
import useProps from '../../hooks/useProps';

const schema = yup.object({
  dues: yup.string().required(),
});

export default function CreateTeam_4() {
  const {
    createTeam: { dues },
  } = useProps();

  const {
    control,
    formState: { isValid },
    getValues,
    watch,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: { dues },
  });

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [errorMessage, setErrorMessage] = useState('');
  const clearErrorMessage = () => setErrorMessage('');
  const dispatch = useDispatch();

  const goToNext = () => {
    dispatch(
      addCreateTeam({
        dues: String(getValues('dues')),
      }),
    );
    navigation.navigate('CreateTeam_5');
  };

  const checkValid = () => {
    if ((!watch('dues') && !errorMessage) || isValid) {
      return true;
    }
    return false;
  };

  return (
    <>
      <NextPageView>
        <MainTitle>
          <>
            <Bold size={22}>팀의 월 회비</Bold>
            <Light size={22}>는</Light>
          </>
          <Light size={22}>얼마인가요? 💰</Light>
        </MainTitle>
        <SubTitle>
          <Light>회비 납부 1일전, 팀원들에게 납부 정보를 보내드려요.</Light>
        </SubTitle>
        <LineInput
          type="money"
          control={control}
          title="월 회비 금액"
          name="dues"
          placeholder="회비 금액을 입력해주세요"
          errorMessage={errorMessage}
          clearErrorMessage={clearErrorMessage}
        />
      </NextPageView>
      <NextButton disabled={!checkValid()} onPress={goToNext} />
    </>
  );
}
