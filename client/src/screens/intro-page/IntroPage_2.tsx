import React from 'react';
import Intro_2 from '../../assets/images/IntroPage_2.png';
import IntroPageButton from '../../components/button/IntroPageButton';
import DotsIndicator from '../../components/mark/DotsIndicator';
import IntroSubtitle from '../../components/text/IntroSubTitle';
import IntroTitle from '../../components/text/IntroTitle';
import ImageFrame from '../../components/view/ImageFrame';
import IntroPageView from '../../components/view/IntroPageView';
import useReset from '../../hooks/useReset';
import { PaddingView } from './IntroPage_1';

export default function IntroPage_2() {
  const goToPrevious = useReset({ screenName: 'IntroPage_1' });
  const goToNext = useReset({ screenName: 'IntroPage_3' });

  return (
    <IntroPageView>
      <ImageFrame resizeMode="center" source={Intro_2} />
      <PaddingView>
        <IntroTitle text="경기 일정 알림" />
        <IntroSubtitle
          text={
            '전화, 갠톡으로 참석 독려하기 힘드셨죠?\n일정을 등록하면, 알림톡이 자동으로 발송됩니다.\n팀원은 쉽게 참석 여부를 응답할 수 있어요!'
          }
        />
        <DotsIndicator total={5} current={2} />
        <IntroPageButton onPressPrevious={goToPrevious} onPressNext={goToNext} />
      </PaddingView>
    </IntroPageView>
  );
}
