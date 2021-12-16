import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../../theme/colors';

const ButtonContainer = styled.TouchableOpacity`
  width: ${(props: ButtonProps) => props.width};
  height: ${(props: ButtonProps) => props.height};
  border: ${(props: ButtonProps) =>
    props.buttonBorder ? `1px solid ${props.buttonBorder}` : 'none'};
  border-radius: ${(props: ButtonProps) => (props.buttonRadius ? props.buttonRadius : '0px')};
  background-color: ${(props: ButtonProps) => (props.buttonBgColor ? props.buttonBgColor : 'none')};
  align-items: center;
  justify-content: center;
  flex-direction: row;
  border-color: ${(props: ButtonProps) => (props.blueText ? colors.blue : colors.lightGray)};
  border-width: ${(props: ButtonProps) => (props.blueText || props.grayText ? '1.2px' : '0')};
`;

type ButtonProps = {
  onPress: () => void;
  width: string;
  height: string;
  buttonBorder?: string;
  buttonRadius?: string;
  buttonBgColor: string;
  disabled?: boolean;
  blueText?: boolean;
  grayText?: boolean;
  children: React.ReactNode;
};
const CommonButton = ({
  onPress,
  buttonRadius,
  children,
  buttonBorder,
  buttonBgColor,
  width,
  height,
  disabled,
  blueText,
  grayText,
}: ButtonProps) => {
  return (
    <ButtonContainer
      blueText={blueText}
      grayText={grayText}
      disabled={disabled}
      onPress={onPress}
      width={width}
      height={height}
      buttonBorder={buttonBorder}
      buttonRadius={buttonRadius}
      buttonBgColor={buttonBgColor}>
      {children}
    </ButtonContainer>
  );
};

export default CommonButton;
