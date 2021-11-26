import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../../theme/colors';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.whiteSmoke};
  justify-content: center;
  align-items: center;
  border-top-color: ${colors.lightGray};
  border-top-width: 1.5px;
`;

export default function Lobby() {
  return (
    <Container>
      <Text>Lobby</Text>
    </Container>
  );
}
