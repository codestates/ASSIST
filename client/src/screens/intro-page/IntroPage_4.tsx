import React from 'react';
import Intro_4 from '../../assets/images/IntroPage_4.png';
import IntroPageButton from '../../components/button/IntroPageButton';
import DotsIndicator from '../../components/mark/DotsIndicator';
import IntroSubtitle from '../../components/text/IntroSubTitle';
import IntroTitle from '../../components/text/IntroTitle';
import ImageFrame from '../../components/view/ImageFrame';
import IntroPageView from '../../components/view/IntroPageView';
import useReset from '../../hooks/useReset';
import { PaddingView } from './IntroPage_1';

export default function IntroPage_4() {
  const goToPrevious = useReset({ screenName: 'IntroPage_3' });
  const goToNext = useReset({ screenName: 'IntroPage_5' });

  return (
    <IntroPageView>
      <ImageFrame resizeMode="center" source={Intro_4} />
      <PaddingView>
        <IntroTitle text="용병 구하기" />
        <IntroSubtitle
          text={
            '커뮤니티에 글 올리고, 수소문하기 귀찮으셨죠?\n이제 용병 구인 신청만 하세요.\n저희가 좋은 용병을 대신 구해 드릴게요!'
          }
        />
        <DotsIndicator total={5} current={4} />
        <IntroPageButton onPressPrevious={goToPrevious} onPressNext={goToNext} />
      </PaddingView>
    </IntroPageView>
  );
}
