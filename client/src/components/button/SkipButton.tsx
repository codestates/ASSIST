import React from 'react';
import styled from 'styled-components/native';
import Button from '../../components/button/CommonButton';
import { colors } from '../../theme/colors';
import { Regular } from '../../theme/fonts';

const ButtonText = styled(Regular)`
  color: ${colors.gray};
`;

type NextButtonProps = {
  onPress: () => void;
  text?: string;
  color?: string;
};

export default function SkipButton({ onPress, text, color }: NextButtonProps) {
  return (
    <Button buttonBgColor={color || colors.white} width={'100%'} height={'70px'} onPress={onPress}>
      <ButtonText>{text || '다음에 입력할게요  >'}</ButtonText>
    </Button>
  );
}
