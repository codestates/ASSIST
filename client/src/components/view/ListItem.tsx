/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React from 'react';
import styled from 'styled-components/native';
import { Bold, Regular } from '../../theme/fonts';

type ListItemProps = {
  text: string;
  onPress: () => void;
  length: number;
  index: number;
  selectedIdx: number;
};

const Container = styled.TouchableOpacity`
  width: 100%;
  height: 60px;
  justify-content: center;
  align-items: center;
`;

export default function ListItem({ selectedIdx, index, text, onPress, length }: ListItemProps) {
  const disableTouch = () => {
    if (index < 2 || index > length + 1) {
      return true;
    }
    return false;
  };

  return (
    <Container disabled={disableTouch()} onPress={onPress}>
      {selectedIdx === index ? (
        <Bold size={20} blue>
          {text}
        </Bold>
      ) : (
        <Regular size={20} lightGray>
          {text}
        </Regular>
      )}
    </Container>
  );
}
