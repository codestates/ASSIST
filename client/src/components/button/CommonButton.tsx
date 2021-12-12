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
  border-color: ${colors.blue}
  border-width: ${(props: ButtonProps) => (props.blueText ? '1.2px' : '0')};
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
}: ButtonProps) => {
  return (
    <ButtonContainer
      blueText={blueText}
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
