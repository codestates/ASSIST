import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useCardAnimation } from '@react-navigation/stack';
import React from 'react';
import { Animated } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { colors } from '../../theme/colors';
import DismissKeyboard from '../view/DismissKeyboard';

const AvoidKeyboard = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  background-color: transparent;
`;

const AnimatedView = styled(Animated.View)`
  padding: 16px;
  padding-top: 0px;
  width: 100%;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  background-color: ${colors.white};
`;

const DismissDrawer = styled.Pressable`
  flex: 1;
  flex-direction: column-reverse;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
`;

const Wrapper = styled.View`
  padding: 22px 7px 0px 7px;
`;

const AvoidTouch = styled.TouchableWithoutFeedback`
  width: 100%;
`;

type BottomDrawerProps = {
  children: React.ReactNode;
};

export default function BottomDrawer({ children }: BottomDrawerProps) {
  const { current } = useCardAnimation();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <>
      <AvoidKeyboard behavior="padding">
        <DismissDrawer onPress={() => navigation.goBack()}>
          <DismissKeyboard>
            <AnimatedView
              style={{
                transform: [
                  {
                    translateY: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [100, 0],
                    }),
                  },
                ],
              }}>
              <AvoidTouch>
                <Wrapper>{children}</Wrapper>
              </AvoidTouch>
            </AnimatedView>
          </DismissKeyboard>
        </DismissDrawer>
      </AvoidKeyboard>
    </>
  );
}
