import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../../theme/colors';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootStackParamList';

const getColor = (color?: string) => {
  const { blue, red, darkGray, gray } = colors;
  if (color === blue || color === red || color === darkGray || color === gray) {
    return colors.white;
  }
  return colors.darkGray;
};

const Container = styled.SafeAreaView`
  width: 100%;
  height: 100px;
  justify-content: center;
  background-color: ${(props: ColseHeaderProps) => props.color || colors.white};
`;

const CloseContainer = styled.View`
  width: 100%;
  justify-content: center;
`;

const CloseButton = styled.TouchableOpacity`
  margin-left: 20px;
`;

type ColseHeaderProps = {
  color?: string;
};

export default function CloseHeader({ color }: ColseHeaderProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <Container color={color}>
      <CloseContainer>
        <CloseButton onPress={() => navigation.goBack()}>
          <MaterialIcons name="close" size={24} color={getColor(color)} />
        </CloseButton>
      </CloseContainer>
    </Container>
  );
}
