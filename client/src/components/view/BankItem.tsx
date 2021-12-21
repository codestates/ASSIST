import React from 'react';
import styled from 'styled-components/native';
import { Regular } from '../../theme/fonts';

const Container = styled.TouchableOpacity`
  margin: 15px 0px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

type BankItemProps = {
  name: string;
  onPress: () => void;
};

export default function BankItem({ name, onPress }: BankItemProps) {
  return (
    <Container onPress={onPress}>
      <Regular>{name}</Regular>
    </Container>
  );
}
