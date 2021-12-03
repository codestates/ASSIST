import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../../theme/colors';
import { Medium } from '../../theme/fonts';

const ButtonText = styled(Medium)`
  color: ${(props: { transparent?: boolean }) =>
    props.transparent ? colors.gray : colors.darkGray};
`;

type styleProps = {
  width?: string;
  height?: string;
  isKakao: boolean;
  borderRadius?: string;
  transparent?: boolean;
};

const getBackgroundColor = (props: styleProps) => {
  if (props.transparent) return 'transparent';
  if (props.isKakao) return colors.yellow;
  return colors.whiteSmoke;
};

const Container = styled.TouchableOpacity`
  width: ${(props: styleProps) => props.width || '100%'};
  height: ${(props: styleProps) => props.height || '55px'};
  background-color: ${(props: styleProps) => getBackgroundColor(props)};
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
  transparent?: boolean;
};

export default function KakaoButton({
  onPress,
  text,
  isKakao,
  width,
  height,
  borderRadius,
  transparent,
}: KakaoButtonProps) {
  return (
    <Container
      onPress={onPress}
      isKakao={isKakao}
      width={width}
      height={height}
      borderRadius={borderRadius}
      transparent={transparent}>
      <ButtonText transparent={transparent}>{text}</ButtonText>
    </Container>
  );
}
