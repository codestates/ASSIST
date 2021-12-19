import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import styled from 'styled-components/native';
import NextButton from '../../components/button/NextButton';
import MainTitle from '../../components/text/MainTitle';
import NextPageView from '../../components/view/NextPageView';
import { colors } from '../../theme/colors';

const Container = styled.View`
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const CheckMark = styled.View`
  margin-bottom: 30px;
`;

type FinishPageViewProps = {
  children: React.ReactNode | React.ReactNode[];
  buttonText?: string;
  onPress: () => void;
};

export default function FinishPageView({ children, buttonText, onPress }: FinishPageViewProps) {
  return (
    <>
      <NextPageView isFinish>
        <Container>
          <CheckMark>
            <MaterialIcons name="check-circle" size={150} color={colors.blue} />
          </CheckMark>
          <MainTitle>{children}</MainTitle>
        </Container>
      </NextPageView>
      <NextButton text={buttonText || '팀 화면으로 이동  >'} onPress={onPress} />
    </>
  );
}
