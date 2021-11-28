import React from 'react';
import styled from 'styled-components/native';
import { Modal } from 'react-native';

import { colors } from '../../theme/colors';

const CenteredView = styled.Pressable`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

const AvoidTouch = styled.TouchableWithoutFeedback`
  width: 100%;
`;

const ModalView = styled.View`
  margin: 20px;
  background-color: ${colors.white};
  border-radius: 20px;
  width: 80%;
  align-items: center;
  justify-content: center;
  padding: 30px 25px 35px 25px;
`;

type ModalProps = {
  children: React.ReactNode;
  visible: boolean;
  setVisible: () => void;
};

export const CommonModalTitle = styled.View`
  align-items: flex-start;
  width: 100%;
`;

export function CommonModal({ children, visible, setVisible }: ModalProps) {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <CenteredView onPress={setVisible}>
        <AvoidTouch>
          <ModalView>{children}</ModalView>
        </AvoidTouch>
      </CenteredView>
    </Modal>
  );
}
