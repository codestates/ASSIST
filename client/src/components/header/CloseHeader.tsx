import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../../theme/colors';
import { MaterialIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import useGoHome from '../../hooks/useGoHome';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const getColor = (color?: string) => {
  const { blue, red, darkGray, gray, lightBlue } = colors;
  if (color === blue || color === red || color === darkGray || color === gray) {
    return colors.white;
  } else if (color === lightBlue) {
    return colors.blue;
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
  goBack?: boolean;
  action?: boolean;
};

export default function CloseHeader({ color, goBack, action }: ColseHeaderProps) {
  const goHome = useGoHome();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const getNavigation = () => {
    if (action) {
      navigation.navigate('MatchVote_Main');
    }
    if (goBack) {
      navigation.goBack();
    } else {
      goHome();
    }
  };

  return (
    <Container color={color}>
      <CloseContainer>
        <CloseButton onPress={() => getNavigation()}>
          <MaterialIcons name="close" size={24} color={getColor(color)} />
        </CloseButton>
      </CloseContainer>
    </Container>
  );
}
