import React, { ReactElement } from 'react';
import { Animated, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { LayoutType } from '../../../@types/global/types';
import { colors } from '../../theme/colors';
import { Bold, Regular } from '../../theme/fonts';

const { width } = Dimensions.get('window');

const getTopLocation = (layout?: LayoutType) => {
  if (layout) {
    return layout.top + layout.height + 30;
  }
};

const Container = styled(Animated.View)`
  width: ${width - 20}px;
  align-self: center;
  top: ${(props: { top?: number }) => (props.top ? `${props.top}px` : 'auto')};
`;

const Bubble = styled.View`
  position: relative;
  background: ${colors.white};
  border-radius: 17px;
  width: ${width - 20}px;
  padding: ${width / 11}px ${width / 12}px;
`;

const Title = styled.View`
  margin-bottom: 18px;
`;

const Description = styled(Regular)`
  margin-bottom: 24px;
  line-height: 160%;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

const TipsButton = styled.TouchableOpacity`
  padding: 8px 20px;
  border-radius: 8px;
  margin-left: 16px;
`;

const PreviousButton = styled(TipsButton)`
  border: 1px solid ${colors.lightGray};
`;

const NextButton = styled(TipsButton)`
  border: 1px solid ${colors.darkGray};
  background-color: ${colors.darkGray};
`;

const Pointer = styled.View`
  ${(props: PointerProps) => (props.isPointerDown ? 'bottom: -25px;' : 'top: -25px')}
  left: ${(props: PointerProps) =>
    props.layout ? `${props.layout.left + (props.pointerLeftVal || 0)}px` : '80%'};
  position: absolute;
  width: 0;
  height: 0;
  background-color: transparent;
  border-left-color: transparent;
  border-right-color: transparent;
  border-style: solid;
  border-left-width: 15px;
  border-right-width: 15px;
  border-bottom-width: 25px;
  border-bottom-color: ${colors.white};
  transform: ${(props: PointerProps) => (props.isPointerDown ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

interface PointerProps {
  pointerLeftVal?: number;
  isPointerDown?: boolean;
  layout?: LayoutType;
}

interface BubbleViewProps extends PointerProps {
  title: string;
  description: ReactElement<string>;
  nextBtnText?: string;
  previousBtnText?: string;
  isFirst?: boolean;
  onPressNext: () => void;
  onPressPrevious: () => void;
  fadeAnim?: Animated.Value;
}

export default function BubbleView({
  layout,
  title,
  description,
  isFirst,
  previousBtnText,
  nextBtnText,
  onPressNext,
  onPressPrevious,
  pointerLeftVal,
  isPointerDown,
  fadeAnim,
}: BubbleViewProps) {
  return (
    <Container style={{ opacity: fadeAnim }} top={getTopLocation(layout)}>
      <Bubble>
        <Title>
          <Bold size={18}>{title}</Bold>
        </Title>
        <Description>{description}</Description>
        <ButtonContainer>
          {isFirst || (
            <PreviousButton onPress={onPressPrevious}>
              <Regular>{previousBtnText || '이전'}</Regular>
            </PreviousButton>
          )}
          <NextButton onPress={onPressNext}>
            <Regular white>{nextBtnText || '다음'}</Regular>
          </NextButton>
        </ButtonContainer>
      </Bubble>
      <Pointer isPointerDown={isPointerDown} pointerLeftVal={pointerLeftVal} layout={layout} />
    </Container>
  );
}
