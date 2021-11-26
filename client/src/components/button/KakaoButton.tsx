import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../../theme/colors';
import { Medium } from '../../theme/fonts';

const ButtonText = styled(Medium)`
  color: ${colors.darkGray};
`;

const Container = styled.TouchableOpacity`
  width: 100%;
  border-radius: 15px;
  background-color: ${(props: { color: string }) => props.color};
  justify-content: center;
  align-items: center;
  padding: 19px;
`;

type KakaoButtonProps = {
  onPress: () => void;
  text?: string;
  color: string;
};

export default function KakaoButton({ onPress, text, color }: KakaoButtonProps) {
  return (
    <Container onPress={onPress} color={color}>
      <ButtonText>{text}</ButtonText>
    </Container>
  );
}
