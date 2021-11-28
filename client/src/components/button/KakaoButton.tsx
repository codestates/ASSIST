import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../../theme/colors';
import { Medium } from '../../theme/fonts';

const ButtonText = styled(Medium)`
  color: ${colors.darkGray};
`;

type styleProps = {
  width?: string;
  height?: string;
  isKakao: boolean;
  borderRadius?: string;
};

const Container = styled.TouchableOpacity`
  width: ${(props: styleProps) => props.width || '100%'};
  height: ${(props: styleProps) => props.height || '55px'};
  background-color: ${(props: styleProps) => (props.isKakao ? colors.yellow : colors.whiteSmoke)};
  border-radius: ${(props: styleProps) => props.borderRadius || '15px'};
  justify-content: center;
  align-items: center;
`;

type KakaoButtonProps = {
  onPress: () => void;
  text: string;
  width?: string;
  height?: string;
  isKakao: boolean;
  borderRadius?: string;
};

export default function KakaoButton({
  onPress,
  text,
  isKakao,
  width,
  height,
  borderRadius,
}: KakaoButtonProps) {
  return (
    <Container
      onPress={onPress}
      isKakao={isKakao}
      width={width}
      height={height}
      borderRadius={borderRadius}>
      <ButtonText>{text}</ButtonText>
    </Container>
  );
}
