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
import axios from 'axios';
import { ASSIST_SERVER_URL } from '@env';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import { CommonModal, CommonModalTitle } from '../../components/modal/CommonModal';

const TitleContainer = styled.View`
  margin: 15px 0px;
`;

const SubtitleContainer = styled.View`
  margin-top: 10px;
`;

const ButtonContainer = styled.View`
  margin-top: ${(props: { passwordError?: string }) => (props.passwordError ? '10px' : '40px')};
`;

const Wrapper = styled.View`
  padding: 0px 10px 25px 10px;
`;

const DeleteWrapper = styled(Wrapper)`
  display: ${(props: { isUser: boolean }) => (props.isUser ? 'flex' : 'none')};
`;

const PasswordWrapper = styled(Wrapper)`
  display: ${(props: { isUser: boolean }) => (props.isUser ? 'none' : 'flex')};
`;

const Line = styled.View`
  margin-top: 13px;
  margin-bottom: 35px;
`;

const deleteSchema = yup.object({
  deleteAccount: yup
    .string()
    .matches(/^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{1,50}$/)
    .required(),
});

const passwordSchema = yup.object({
  password: yup.string().required(),
});

export default function DeleteAccount_1() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {
    control: deleteControl,
    watch,
    formState: { isValid: isDeleteValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(deleteSchema),
  });
  const {
    control: passwordControl,
    formState: { isValid: isPasswordValid },
    reset,
    getValues,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(passwordSchema),
  });
  const [isUser, setIsUser] = useState(false);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const { token, provider } = useSelector((state: RootState) => state.userReducer);

  const setError = () => setPasswordError(' ');
  const clearDeleteErrorMessage = () => setDeleteErrorMessage('');
  const clearPasswordError = () => setPasswordError('');

  const deleteAccount = async () => {
    try {
      await axios.delete(`${ASSIST_SERVER_URL}/user`, {
        headers: { authorization: `Bearer ${token}` },
      });
      navigation.navigate('DeleteAccount_2');
    } catch (error) {
      console.log(error);
    }
  };
  const showErrorModal = () => {
    setError();
    setModalVisible(true);
  };

  const hideErrorModal = () => {
    setModalVisible(false);
  };

  const checkUser = async () => {
    try {
      await axios.post(
        `${ASSIST_SERVER_URL}/user`,
        { password: String(getValues('password')) },
        { headers: { authorization: `Bearer ${token}` } },
      );
      reset({ password: '' });
      setIsUser(true);
    } catch (error) {
      showErrorModal();
      console.log(error);
    }
  };

  return (
    <>
      {provider !== 'kakao' ? (
        <>
          <CommonModal visible={modalVisible} setVisible={hideErrorModal}>
            <CommonModalTitle>
              <Bold size={17}>비밀번호를 잘못 입력 하셨어요</Bold>
              <Line>
                <Regular gray size={13}>
                  오타는 없는지 다시 한 번 확인해 주세요.
                </Regular>
              </Line>
            </CommonModalTitle>
            <CommonModalButton color="whiteSmoke" text="돌아가기" onPress={hideErrorModal} />
          </CommonModal>
          <BottomDrawer>
            <DeleteWrapper isUser={isUser}>
              <TitleContainer>
                <Bold size={20}>탈퇴하기</Bold>
              </TitleContainer>
              <SubtitleContainer>
                <Regular gray>탈퇴 하시려는 이유를 알려주세요 😢</Regular>
              </SubtitleContainer>
              <LineInput
                marginTop="20px"
                control={deleteControl}
                name="deleteAccount"
                placeholder="직접 입력"
                errorMessage={deleteErrorMessage}
                clearErrorMessage={clearDeleteErrorMessage}
                conditions={[
                  {
                    name: `글자수 ${String(watch('deleteAccount') || '').length}/50`,
                    regex: /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{1,50}$/,
                  },
                ]}
              />
              <ButtonContainer>
                <CommonModalButton
                  disabled={!isDeleteValid}
                  color="blue"
                  text="탈퇴하기  >"
                  onPress={() => deleteAccount()}
                />
              </ButtonContainer>
            </DeleteWrapper>
            <PasswordWrapper isUser={isUser}>
              <TitleContainer>
                <Bold size={20}>본인 확인</Bold>
              </TitleContainer>
              <SubtitleContainer>
                <Regular gray>본인 확인을 위해 비밀번호를 입력해주세요.</Regular>
              </SubtitleContainer>
              <LineInput
                type="password"
                marginTop="20px"
                control={passwordControl}
                name="password"
                placeholder="비밀번호를 입력해주세요"
                errorMessage={passwordError}
                clearErrorMessage={clearPasswordError}
              />
              <ButtonContainer passwordError={passwordError}>
                <CommonModalButton
                  disabled={!isPasswordValid || Boolean(passwordError)}
                  color="blue"
                  text="다음  >"
                  onPress={() => checkUser()}
                />
              </ButtonContainer>
            </PasswordWrapper>
          </BottomDrawer>
        </>
      ) : (
        <>
          <BottomDrawer>
            <DeleteWrapper isUser={true}>
              <TitleContainer>
                <Bold size={20}>탈퇴하기</Bold>
              </TitleContainer>
              <SubtitleContainer>
                <Regular gray>탈퇴 하시려는 이유를 알려주세요 😢</Regular>
              </SubtitleContainer>
              <LineInput
                marginTop="20px"
                control={deleteControl}
                name="deleteAccount"
                placeholder="직접 입력"
                errorMessage={deleteErrorMessage}
                clearErrorMessage={clearDeleteErrorMessage}
                conditions={[
                  {
                    name: `글자수 ${String(watch('deleteAccount') || '').length}/50`,
                    regex: /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{1,50}$/,
                  },
                ]}
              />
              <ButtonContainer>
                <CommonModalButton
                  disabled={!isDeleteValid}
                  color="blue"
                  text="탈퇴하기  >"
                  onPress={() => deleteAccount()}
                />
              </ButtonContainer>
            </DeleteWrapper>
          </BottomDrawer>
        </>
      )}
    </>
  );
}
