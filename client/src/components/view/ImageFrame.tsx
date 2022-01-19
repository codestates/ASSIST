import React from 'react';
import { ImageResizeMode, ImageSourcePropType } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
  flex: 1;
`;

type ImageFrameProps = {
  source: ImageSourcePropType;
  resizeMode: ImageResizeMode;
};

export default function ImageFrame({ source, resizeMode }: ImageFrameProps) {
  return (
    <Container>
      <Image resizeMode={resizeMode} source={source} />
    </Container>
  );
}
