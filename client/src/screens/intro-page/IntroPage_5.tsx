import React from 'react';
import { useDispatch } from 'react-redux';
import Intro_5 from '../../assets/images/IntroPage_5.png';
import IntroPageButton from '../../components/button/IntroPageButton';
import DotsIndicator from '../../components/mark/DotsIndicator';
import IntroSubtitle from '../../components/text/IntroSubTitle';
import IntroTitle from '../../components/text/IntroTitle';
import ImageFrame from '../../components/view/ImageFrame';
import IntroPageView from '../../components/view/IntroPageView';
import useEditProfile from '../../hooks/useEditProfile';
import useReset from '../../hooks/useReset';
import { changeRole } from '../../store/actions/userAction';
import { PaddingView } from './IntroPage_1';

export default function IntroPage_5() {
  const goToPrevious = useReset({ screenName: 'IntroPage_4' });
  const dispatch = useDispatch();
  const editProfile = useEditProfile({ role: 'tips' });
  const reset = useReset({ screenName: 'QuickTips' });

  const goToNext = async () => {
    await editProfile();
    dispatch(changeRole('tips'));
    reset();
  };

  return (
    <IntroPageView>
      <ImageFrame resizeMode="center" source={Intro_5} />
      <PaddingView>
        <IntroTitle text="회비 정보 안내" />
        <IntroSubtitle
          text={
            '매월 회비 공지 귀찮고 부담스러웠죠?\n회비 날짜, 금액, 계좌번호를 입력해 주세요.\n매월 알림톡으로 팀원에게 회비 정보를 보내드릴게요!'
          }
        />
        <DotsIndicator total={5} current={5} />
        <IntroPageButton
          onPressPrevious={goToPrevious}
          onPressNext={goToNext}
          nextBtnText="시작하기 😆"
        />
      </PaddingView>
    </IntroPageView>
  );
}
