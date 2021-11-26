import React from 'react';
import styled from 'styled-components/native';
import { Modal } from 'react-native';

import { colors } from '../../theme/colors';

const Container = styled.View`
  flex: 1px;
  position: relative;
  background-color: ${colors.whiteSmoke};
`;

type ModalProps = {
  animationType: 'fade' | 'slide' | 'none';
  children: React.ReactNode;
};

const CommonModal = (props: ModalProps) => {
  const { animationType, children } = props;
  return (
    <Modal animationType={animationType}>
      <Container>{children}</Container>
    </Modal>
  );
};

export default CommonModal;
