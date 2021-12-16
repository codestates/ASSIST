import { ASSIST_SERVER_URL } from '@env';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import CommonModalButton from '../../components/button/CommonModalButton';
import BottomDrawer from '../../components/drawer/BottomDrawer';
import { RootState } from '../../store/reducers';
import { colors } from '../../theme/colors';
import { Bold, Regular } from '../../theme/fonts';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useController, useForm } from 'react-hook-form';
import { Keyboard, Platform } from 'react-native';
import useMatchVote from '../../hooks/useMatchVote';

type VoteButton = {
  isPressed: boolean;
};

type ClearButtonType = {
  value: string;
  isFocused: boolean;
};

const Title = styled(Bold)`
  font-size: 19px;
  margin-bottom: 18px;
`;

const SubTitle = styled(Regular)`
  margin-bottom: 30px;
  color: ${colors.gray};
`;

const Wrapper = styled.View`
  padding: 20px 15px 30px 15px;
`;

const Vote = styled.TouchableOpacity`
  border: ${(props: VoteButton) =>
    props.isPressed ? `1px solid ${colors.blue}` : `1px solid ${colors.lightGray}`};
`;

const VoteInput = styled.View`
  border: ${(props: VoteButton) =>
    props.isPressed ? `1px solid ${colors.blue}` : `1px solid ${colors.lightGray}`};
`;

const VoteCheck = styled(Vote)`
  flex-direction: row;
  justify-content: space-between;
`;

const VoteContent = styled.View`
  padding: 20px 18px 20px 16px;
`;

const ButtonSpace = styled.View`
  height: 12px;
`;

const LastSpace = styled.View`
  height: 30px;
`;

const TextInput = styled.TextInput`
  padding: 20px 45px 20px 16px;
  width: 100%;
  color: ${colors.darkGray};
  font-family: 'SpoqaHanSansNeo-Regular';
  font-size: 15px;
  ${Platform.OS === 'web' && 'outline-width: 0px;'}
`;

const getClearButton = ({ value, isFocused }: ClearButtonType) => {
  if (value !== 'undefined' && value.length > 0 && isFocused) return 'flex';
  return 'none';
};

const ClearButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 15px;
  right: 15px;
  display: ${(props: ClearButtonType) => getClearButton(props)};
`;

const schema = yup.object({
  reason: yup.string().required(),
});

export default function CancelSelect() {
  const { matchId } = useSelector((state: RootState) => state.propsReducer);
  const { token } = useSelector((state: RootState) => state.userReducer);
  const [isNotEnough, setIsNotEnough] = useState(false);
  const [isBadWeather, setIsBadWeather] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const matchVote = useMatchVote();

  const {
    control,
    getValues,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const { field } = useController({ control, defaultValue: '', name: 'reason' });

  const loseFocus = () => {
    if (!isValid) {
      setTimeout(() => {
        setIsFocused(false);
      });
    }
  };

  const clearInput = () => field.onChange('');

  const pressEnough = () => {
    if (Platform.OS !== 'web') {
      Keyboard.dismiss();
    }
    setIsNotEnough(true);
    setIsBadWeather(false);
    setIsFocused(false);
    clearInput();
  };

  const pressWeather = () => {
    if (Platform.OS !== 'web') {
      Keyboard.dismiss();
    }
    setIsNotEnough(false);
    setIsBadWeather(true);
    setIsFocused(false);
    clearInput();
  };

  const getFocus = () => {
    setIsNotEnough(false);
    setIsBadWeather(false);
    setIsFocused(true);
  };

  const checkValid = () => {
    if (isNotEnough || isBadWeather || isValid) {
      return false;
    }
    return true;
  };

  const getReason = () => {
    if (isNotEnough) {
      return '경기 인원 부족';
    } else if (isBadWeather) {
      return '기상 악화';
    } else if (isValid) {
      return String(getValues('reason'));
    }
  };

  const cancelMatch = async () => {
    try {
      await axios.patch(
        `${ASSIST_SERVER_URL}/match/${matchId}`,
        { condition: '경기 취소', reason: getReason() },
        { headers: { authorization: `Bearer ${token}` } },
      );
      matchVote();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BottomDrawer>
      <Wrapper>
        <Title>경기 취소 하기</Title>
        <SubTitle>경기를 취소하는 이유를 선택 해 주세요.</SubTitle>
        <VoteCheck isPressed={isNotEnough} onPress={() => pressEnough()}>
          <VoteContent>
            <Regular>경기 인원 부족</Regular>
          </VoteContent>
          {isNotEnough && (
            <VoteContent>
              <MaterialIcons name="check" size={18} color={colors.blue} />
            </VoteContent>
          )}
        </VoteCheck>
        <ButtonSpace />
        <VoteCheck isPressed={isBadWeather} onPress={() => pressWeather()}>
          <VoteContent>
            <Regular>기상 악화</Regular>
          </VoteContent>
          {isBadWeather && (
            <VoteContent>
              <MaterialIcons name="check" size={18} color={colors.blue} />
            </VoteContent>
          )}
        </VoteCheck>
        <ButtonSpace />
        <VoteInput isPressed={isFocused}>
          <TextInput
            placeholderTextColor={colors.lightGray}
            value={String(field.value)}
            onChangeText={(text) => field.onChange(text)}
            placeholder="기타 (직접 입력)"
            onFocus={getFocus}
            onBlur={loseFocus}
          />
          <ClearButton
            onPress={() => clearInput()}
            isFocused={isFocused}
            value={String(field.value)}>
            <Ionicons name="close-circle" size={22} color={colors.lightGray} />
          </ClearButton>
        </VoteInput>
        <LastSpace />
        <CommonModalButton
          text="경기 취소 하기"
          height={58}
          disabled={checkValid()}
          color="blue"
          onPress={() => cancelMatch()}
        />
      </Wrapper>
    </BottomDrawer>
  );
}
