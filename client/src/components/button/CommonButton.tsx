import React from 'react';
import styled from 'styled-components/native';

const ButtonContainer = styled.TouchableOpacity`
  background-color: ${(props: ButtonProps) => props.bgColor};
  border: ${(props: ButtonProps) => (props.bgBorder ? props.bgBorder : 'none')};
  width: ${(props: ButtonProps) => props.bgWidth};
  height: 64px;
  align-items: center;
  justify-content: center;
`;

interface ButtonProps {
  onPress(): void;
  bgColor: string;
  bgBorder?: string;
  bgWidth: string;
  children: React.ReactNode;
}
function Button({ bgColor, bgBorder, bgWidth, onPress, children }: ButtonProps) {
  return (
    <ButtonContainer onPress={onPress} bgColor={bgColor} bgBorder={bgBorder} bgWidth={bgWidth}>
      {children}
    </ButtonContainer>
  );
}

export default Button;
