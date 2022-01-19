import React from 'react';
import Intro_3 from '../../assets/images/IntroPage_3.png';
import IntroPageButton from '../../components/button/IntroPageButton';
import DotsIndicator from '../../components/mark/DotsIndicator';
import IntroSubtitle from '../../components/text/IntroSubTitle';
import IntroTitle from '../../components/text/IntroTitle';
import ImageFrame from '../../components/view/ImageFrame';
import IntroPageView from '../../components/view/IntroPageView';
import useReset from '../../hooks/useReset';
import { PaddingView } from './IntroPage_1';

export default function IntroPage_3() {
  const goToPrevious = useReset({ screenName: 'IntroPage_2' });
  const goToNext = useReset({ screenName: 'IntroPage_4' });

  return (
    <IntroPageView>
      <ImageFrame resizeMode="center" source={Intro_3} />
      <PaddingView>
        <IntroTitle text="참석 인원 확인" />
        <IntroSubtitle
          text={
            '참석, 불참, 미정 인원을 한 눈에 확인할 수 있어요.\n팀원 이름을 클릭해 전화를 걸 수도 있구요!'
          }
        />
        <DotsIndicator total={5} current={3} />
        <IntroPageButton onPressPrevious={goToPrevious} onPressNext={goToNext} />
      </PaddingView>
    </IntroPageView>
  );
}
