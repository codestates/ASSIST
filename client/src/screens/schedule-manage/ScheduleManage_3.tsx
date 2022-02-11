import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import NextPageView from '../../components/view/NextPageView';
import NextButton from '../../components/button/NextButton';
import MainTitle from '../../components/text/MainTitle';
import { Bold, Light, Regular } from '../../theme/fonts';
import SubTitle from '../../components/text/SubTitle';
import { RootState } from '../../store/reducers';
import { addScheduleManage } from '../../store/actions/propsAction';
import CounterInput from '../../components/input/CounterInput';
import { useForm } from 'react-hook-form';
import { Dimensions } from 'react-native';
import toNumber from '../../functions/toNumber';

const CounterContainer = styled.View`
  margin-top: 64px;
  width: ${Dimensions.get('window').width - 40}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const CounterField = styled.View`
  width: ${Dimensions.get('window').width / 2}px;
`;

export default function ScheduleManage_3() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const { date } = useSelector((state: RootState) => state.propsReducer.scheduleManage);
  const { control, getValues } = useForm({ mode: 'onChange' });
  const matchDate = new Date(date);
  const year = matchDate.getFullYear();
  const month = matchDate.getMonth();
  const day = matchDate.getDate();

  const onPress = () => {
    dispatch(
      addScheduleManage({
        deadline: new Date(year, month, day + 1 - toNumber(getValues('deadline')))
          .toISOString()
          .slice(0, 10),
      }),
    );
    navigation.navigate('ScheduleManage_4');
  };

  return (
    <>
      <NextPageView>
        <MainTitle>
          <Bold size={22}>
            투표 마감 시간<Light size={22}>을</Light>
          </Bold>
          <Light size={22}>선택해 주세요</Light>
        </MainTitle>
        <SubTitle>
          <Light size={14}>마감 시간 후 참석 여부가 바뀌는 팀원이 생기면 알려드려요</Light>
        </SubTitle>
        <CounterContainer>
          <Regular size={18}>경기 시작 </Regular>
          <CounterField>
            <CounterInput control={control} name="deadline" />
          </CounterField>
          <Regular size={18}> 마감</Regular>
        </CounterContainer>
      </NextPageView>
      <NextButton disabled={false} onPress={onPress} />
    </>
  );
}
