import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import styled from 'styled-components/native';
import useGoHome from '../../hooks/useGoHome';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { colors } from '../../theme/colors';
import { Regular } from '../../theme/fonts';
import HeaderContainer from './HeaderContainer';

const BlueDot = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 10px;
  margin: 0px 3px;
  background-color: ${colors.blue};
`;

const GrayDot = styled(BlueDot)`
  background-color: ${colors.lightGray};
`;

const DotIndicator = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Wrapper = styled.View`
  width: 100%;
  justify-content: ${(props: { isIntro?: boolean }) =>
    props.isIntro ? 'center' : 'space-between'};
  flex-direction: row;
  padding: 15px 10px;
`;

const ReturnButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const ReturnText = styled(Regular)`
  color: ${colors.gray};
`;

type DotsHeaderProps = {
  current: number;
  total: number;
  isIntro?: boolean;
  reset?: keyof RootStackParamList;
  goHome?: boolean;
  navigate?: keyof RootStackParamList;
};

export default function DotsHeader({
  navigate,
  reset,
  goHome,
  current,
  total,
  isIntro,
}: DotsHeaderProps) {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const navigateToHome = useGoHome();

  const getNavigation = () => {
    if (reset) {
      navigation.reset({ routes: [{ name: reset }] });
    } else if (goHome) {
      navigateToHome();
    } else if (navigate) {
      navigation.navigate(navigate);
    } else {
      navigation.goBack();
    }
  };

  return (
    <HeaderContainer>
      <Wrapper isIntro={isIntro}>
        {isIntro || (
          <ReturnButton onPress={() => getNavigation()}>
            <MaterialIcons name="keyboard-arrow-left" size={19} color={colors.gray} />
            <ReturnText>이전</ReturnText>
          </ReturnButton>
        )}
        <DotIndicator>
          {Array.from(Array(total), (_, i) =>
            current - 1 === i ? <BlueDot key={i} /> : <GrayDot key={i} />,
          )}
        </DotIndicator>
      </Wrapper>
    </HeaderContainer>
  );
}
