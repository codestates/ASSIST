import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../../theme/colors';
import { Light } from '../../theme/fonts';
import Toast from 'react-native-easy-toast';

const Container = styled.View`
  background-color: ${colors.darkGray};
  width: ${(props: { width: number }) => props.width * 0.9}px;
  height: 57px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

type ToastMessageProps = {
  toastRef: React.MutableRefObject<null>;
  height: number;
};

type showToastMessageType = {
  toastRef: React.MutableRefObject<null>;
  width: number;
  text: string;
};

export function ToastMessage({ toastRef, height }: ToastMessageProps) {
  return (
    <Toast
      ref={toastRef}
      positionValue={height * 0.25}
      fadeInDuration={200}
      fadeOutDuration={600}
      style={{ backgroundColor: 'transparent' }}
    />
  );
}

export function showToastMessage({ toastRef, width, text }: showToastMessageType) {
  toastRef.current.show(
    <Container width={width}>
      <Light white>{text}</Light>
    </Container>,
    1000,
  );
}
