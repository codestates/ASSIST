import React from 'react';
import styled from 'styled-components/native';

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
`;

type ButtonProps = {
  onPress: () => void;
  width: string;
  height: string;
  buttonBorder?: string;
  buttonRadius?: string;
  buttonBgColor: string;
  disabled?: boolean;
  children: React.ReactNode;
};
const CommonButton = (props: ButtonProps) => {
  const { onPress, buttonRadius, children, buttonBorder, buttonBgColor, width, height, disabled } =
    props;

  return (
    <ButtonContainer
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
