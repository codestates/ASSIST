import React, { useState } from 'react';
import styled from 'styled-components/native';
import BottomDrawer from '../../components/drawer/BottomDrawer';
import { Bold, Regular } from '../../theme/fonts';
import CommonModalButton from '../../components/button/CommonModalButton';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LineInput from '../../components/input/LineInput';
import * as yup from 'yup';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootStackParamList';

const TitleContainer = styled.View`
  margin: 15px 0px;
`;

const SubtitleContainer = styled.View`
  margin-top: 10px;
`;

const ButtonContainer = styled.View`
  margin-top: 40px;
`;

const Wrapper = styled.View`
  padding: 0px 10px 25px 10px;
`;

const schema = yup.object({
  deleteAccount: yup
    .string()
    .matches(/^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{1,50}$/)
    .required(),
});

export default function DeleteAccount_1() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const [errorMessage, setErrorMessage] = useState('');
  const clearErrorMessage = () => setErrorMessage('');
  const onSubmit = (data: string) => {
    console.log(data);
  };
  const deleteAccount = () => {
    // 계정 삭제 완료
    // 계정이 성공적으로 삭제 됐으면,
    navigation.navigate('DeleteAccount_2');
  };

  return (
    <BottomDrawer>
      <Wrapper>
        <TitleContainer>
          <Bold size={20}>탈퇴하기</Bold>
        </TitleContainer>
        <SubtitleContainer>
          <Regular gray>탈퇴 하시려는 이유를 알려주세요 😢</Regular>
        </SubtitleContainer>
        <LineInput
          marginTop="20px"
          control={control}
          name="deleteAccount"
          placeholder="직접 입력"
          errorMessage={errorMessage}
          clearErrorMessage={clearErrorMessage}
          conditions={[
            {
              name: `글자수 ${String(watch('deleteAccount') || '').length}/50`,
              regex: /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{1,50}$/,
            },
          ]}
        />
        <ButtonContainer>
          <CommonModalButton
            disabled={!isValid}
            color="blue"
            text="탈퇴하기  >"
            onPress={() => deleteAccount()}
          />
        </ButtonContainer>
      </Wrapper>
    </BottomDrawer>
  );
}
