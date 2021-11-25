import React from 'react';
import styled from 'styled-components/native';

const buttonSize = (type: string) => {
  switch (type) {
    case 'small':
      return 'width: 30%; height: 24px;';
    case 'medium':
      return 'width: 70%; height: 48px;';
    case 'large':
      return 'width: 100%; height: 64px;';
    default:
      return;
  }
};

const ButtonContainer = styled.Pressable`
  ${(props: ButtonProps) => buttonSize(props.type)}
  border: ${(props: ButtonProps) =>
    props.buttonBorder ? `1px solid ${props.buttonBorder}` : 'none'}
  border-radius: ${(props: ButtonProps) => (props.buttonBorder ? '16px' : 'none')}
  background-color: ${(props: ButtonProps) =>
    props.buttonBgColor ? props.buttonBgColor : 'none'}};
  align-items: center;
  justify-content: center;
`;

type ButtonProps = {
  onPress(): void;
  type: string;
  buttonBorder: string;
  buttonBgColor: string;
  children: React.ReactNode;
};
const CommonButton = (props: ButtonProps) => {
  const { onPress, type, children, buttonBorder, buttonBgColor } = props;
  return (
    <ButtonContainer
      onPress={onPress}
      type={type}
      buttonBorder={buttonBorder}
      buttonBgColor={buttonBgColor}>
      {children}
    </ButtonContainer>
  );
};

export default CommonButton;
