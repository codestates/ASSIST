/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { ImageSourcePropType } from 'react-native';
import styled from 'styled-components/native';
import { Regular } from '../../theme/fonts';

const Container = styled.TouchableOpacity`
  margin: 15px 0px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ImageFrame = styled.View`
  margin-right: 4px;
  width: 18px;
  height: 18px;
`;

const Image = styled.Image`
  flex: 1;
  width: 100%;
  height: 100%;
`;

type BankItemProps = {
  name: string;
  onPress: () => void;
  source: ImageSourcePropType;
};

export default function BankItem({ name, source, onPress }: BankItemProps) {
  return (
    <Container onPress={onPress}>
      <Regular>{name}</Regular>
      <ImageFrame>
        <Image resizeMode="contain" source={source} />
      </ImageFrame>
    </Container>
  );
}
