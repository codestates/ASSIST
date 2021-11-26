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
};

export default function SkipButton({ onPress, text }: NextButtonProps) {
  return (
    <Button bgColor={colors.white} bgWidth={'100%'} onPress={onPress}>
      <ButtonText>{text || '다음에 입력할게요  >'}</ButtonText>
    </Button>
  );
}
