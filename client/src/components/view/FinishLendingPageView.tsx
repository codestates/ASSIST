import React from 'react';
import styled from 'styled-components/native';
import MainTitle from '../../components/text/MainTitle';
import CommonButton from '../button/CommonButton';
import LendingPageView from '../../components/view/LendingPageView';
import { colors } from '../../theme/colors';
import { Light } from '../../theme/fonts';

const Container = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const CheckMark = styled.Image`
  margin-bottom: 30px;
`;

const ButtonText = styled(Light)`
  color: ${colors.white};
`;

type FinishLendingPageViewProps = {
  children: React.ReactNode | React.ReactNode[];
  onPress: () => void;
};

export default function FinishLendingPageView({ children, onPress }: FinishLendingPageViewProps) {
  return (
    <>
      <LendingPageView>
        <Container>
          <CheckMark source={require('../../assets/images/lending_8.png')} />
          <MainTitle>{children}</MainTitle>
          <CommonButton
            onPress={onPress}
            width="100%"
            height="7%"
            buttonRadius="16px"
            buttonBgColor={colors.blue}>
            <ButtonText>네, 좋아요 😆</ButtonText>
          </CommonButton>
        </Container>
      </LendingPageView>
    </>
  );
}
