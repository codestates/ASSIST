import React from 'react';
import styled from 'styled-components/native';
import Button from '../../components/button/CommonButton';
import { colors } from '../../theme/colors';
import { Medium } from '../../theme/fonts';

const ButtonText = styled(Medium)`
  color: ${colors.white};
`;

type NextButtonProps = {
  onPress: () => void;
  text?: string;
};

export default function NextButton({ onPress, text }: NextButtonProps) {
  return (
    <Button bgColor={colors.blue} bgWidth={'100%'} onPress={onPress}>
      <ButtonText>{text || '다음'}</ButtonText>
    </Button>
  );
}
