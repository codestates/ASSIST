import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import NextPageView from '../../components/view/NextPageView';
import NextButton from '../../components/button/NextButton';
import LineSelect from '../../components/input/LineSelect';
import MainTitle from '../../components/text/MainTitle';
import { Bold, Light } from '../../theme/fonts';
import LineInput from '../../components/input/LineInput';
import { addScheduleManage } from '../../store/actions/propsAction';
import useProps from '../../hooks/useProps';
import useLineSelect from '../../hooks/useLineSelect';
import useReset from '../../hooks/useReset';

const schema = yup.object({
  address2: yup.string(),
});

export default function ScheduleManage_2() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const reset = useReset({ screenName: 'StadiumSelect' });
  const dispatch = useDispatch();
  const {
    scheduleManage: { address, address2 },
  } = useProps();
  const { isPressed, onPress } = useLineSelect();
  const { control, getValues } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: { address2 },
  });

  const [errorMessage, setErrorMessage] = useState('');

  const clearErrorMessage = () => setErrorMessage('');

  const handleStadium = () => {
    onPress();
    if (address) {
      navigation.navigate('StadiumSelect');
    } else {
      reset();
    }
  };

  const goToNext = () => {
    dispatch(
      addScheduleManage({
        address2: String(getValues('address2')),
      }),
    );
    navigation.navigate('ScheduleManage_3');
  };

  const checkValid = () => {
    if (!errorMessage && address) {
      return true;
    }
    return false;
  };

  return (
    <>
      <NextPageView>
        <MainTitle>
          <Bold size={22}>
            경기 장소<Light size={22}>를</Light>
          </Bold>
          <Light size={22}>입력해 주세요 🏟</Light>
        </MainTitle>
        <LineSelect
          title="주소"
          isPressed={isPressed}
          selected={address}
          onPress={() => handleStadium()}
          reset={addScheduleManage({ address: '' })}
        />
        <LineInput
          control={control}
          title="상세주소"
          name="address2"
          placeholder="직접입력"
          errorMessage={errorMessage}
          clearErrorMessage={clearErrorMessage}
        />
      </NextPageView>
      <NextButton disabled={!checkValid()} onPress={goToNext} />
    </>
  );
}
