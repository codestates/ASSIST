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
  disabled?: boolean;
};

export default function NextButton({ onPress, text, disabled }: NextButtonProps) {
  return (
    <Button
      disabled={disabled}
      buttonBgColor={disabled ? colors.gray : colors.blue}
      width={'100%'}
      height={'70px'}
      onPress={onPress}>
      <ButtonText>{text || '다음'}</ButtonText>
    </Button>
  );
}
