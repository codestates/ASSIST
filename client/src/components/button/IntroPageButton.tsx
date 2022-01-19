import React from 'react';
import styled from 'styled-components/native';
import CommonModalButton from './CommonModalButton';

const Container = styled.View`
  flex-direction: row;
`;

const LeftButton = styled.View`
  flex: 1;
  padding-right: 5px;
`;

const RightButton = styled.View`
  flex: 1;
  padding-left: 5px;
`;

type IntroPageButtonProps = {
  onPressNext: () => void;
  onPressPrevious: () => void;
  isFirst?: boolean;
  nextBtnText?: string;
  previousBtnText?: string;
};

export default function IntroPageButton({
  onPressNext,
  onPressPrevious,
  isFirst,
  nextBtnText,
  previousBtnText,
}: IntroPageButtonProps) {
  return isFirst ? (
    <Container>
      <CommonModalButton
        onPress={onPressNext}
        height={60}
        color="blue"
        text={nextBtnText || '다음  >'}
      />
    </Container>
  ) : (
    <Container>
      <LeftButton>
        <CommonModalButton
          onPress={onPressPrevious}
          height={60}
          color="whiteSmoke"
          text={previousBtnText || '<  이전'}
        />
      </LeftButton>
      <RightButton>
        <CommonModalButton
          onPress={onPressNext}
          height={60}
          color="blue"
          text={nextBtnText || '다음  >'}
        />
      </RightButton>
    </Container>
  );
}
