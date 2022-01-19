import React from 'react';
import styled from 'styled-components/native';
import Intro_1 from '../../assets/images/IntroPage_1.png';
import IntroPageButton from '../../components/button/IntroPageButton';
import DotsIndicator from '../../components/mark/DotsIndicator';
import IntroSubtitle from '../../components/text/IntroSubTitle';
import IntroTitle from '../../components/text/IntroTitle';
import ImageFrame from '../../components/view/ImageFrame';
import IntroPageView from '../../components/view/IntroPageView';
import useReset from '../../hooks/useReset';

export const PaddingView = styled.View`
  padding: 20px;
`;

export default function IntroPage_1() {
  const goToNext = useReset({ screenName: 'IntroPage_2' });

  return (
    <IntroPageView>
      <ImageFrame resizeMode="center" source={Intro_1} />
      <PaddingView>
        <IntroTitle text={'간편한 풋살팀 관리 서비스,\n어시스트 ASSIST'} />
        <IntroSubtitle
          text={
            '어시스트에서 경기 일정을 등록하면,\n팀원들의 경기 참석 여부를 손쉽게 확인할 수 있어요.'
          }
        />
        <DotsIndicator total={5} current={1} />
        <IntroPageButton isFirst onPressPrevious={() => {}} onPressNext={goToNext} />
      </PaddingView>
    </IntroPageView>
  );
}
