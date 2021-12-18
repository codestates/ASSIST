import React from 'react';
import styled from 'styled-components/native';
import NextPageView from '../../components/view/NextPageView';
import MainTitle from '../../components/text/MainTitle';
import NextButton from '../../components/button/NextButton';
import { Bold, Light } from '../../theme/fonts';
import { useDispatch } from 'react-redux';
import { logOutUser } from '../../store/actions/userAction';
import useReset from '../../hooks/useReset';

const Container = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const HandMark = styled.View`
  margin-bottom: 50px;
`;

const TextContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
  margin: 2px 0px;
`;

export default function DeleteAccount_2() {
  const dispatch = useDispatch();
  const reset = useReset({ screenName: 'Guest' });

  const logUserOut = () => {
    dispatch(logOutUser());
    reset();
  };

  return (
    <>
      <NextPageView>
        <Container>
          <HandMark>
            <Bold size={100}>👋</Bold>
          </HandMark>
          <MainTitle>
            <TextContainer>
              <Bold size={20}>탈퇴가 완료</Bold>
              <Light size={20}>되었어요.</Light>
            </TextContainer>
            <TextContainer>
              <Light size={20}>다음에 더 좋은 모습으로 만나요!</Light>
            </TextContainer>
          </MainTitle>
        </Container>
      </NextPageView>
      <NextButton text="어시스트 홈페이지로 이동  >" onPress={() => logUserOut()} />
    </>
  );
}
