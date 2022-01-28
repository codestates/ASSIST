import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NextMatch } from '../../../@types/global/types';
import AddOnsCard from '../../components/card/AddOnsCard';
import FakeNextMatchCard from '../../components/card/FakeNextMatchCard';
import NextMatchCard from '../../components/card/NextMatchCard';
import LoggedInHeader from '../../components/header/LoggedInHeader';
import BubbleView from '../../components/view/BubbleView';
import CardScrollView from '../../components/view/CardScrollView';
import ShadeView from '../../components/view/ShadeView';
import useEditProfile from '../../hooks/useEditProfile';
import useFadeAnim from '../../hooks/useFadeAnim';
import useOnLayout from '../../hooks/useOnLayout';
import useReset from '../../hooks/useReset';
import { changeRole } from '../../store/actions/userAction';
import { RootState } from '../../store/reducers';
import { Bold, Regular } from '../../theme/fonts';

export default function TeamTips_5() {
  const { layout, onLayout } = useOnLayout();
  const dispatch = useDispatch();
  const { leader: isLeader } = useSelector((state: RootState) => state.userReducer.selectedTeam);
  const goLeaderScreen = useReset({ screenName: 'TeamTips_3' });
  const goFollowerScreen = useReset({ screenName: 'TeamTips_4' });
  const editProfile = useEditProfile({ role: 'complete' });
  const goToNext = useReset({ screenName: 'TeamTips_6' });
  const { fadeAnim, fadeIn, fadeOut } = useFadeAnim({ duration: 200 });

  useEffect(() => {
    fadeIn();
  }, []);

  const onPressPrevious = () => {
    fadeOut();
    setTimeout(() => goToPrevious(), 200);
  };

  const goToPrevious = () => {
    if (isLeader) {
      goLeaderScreen();
    } else {
      goFollowerScreen();
    }
  };

  const onPressNext = async () => {
    await editProfile();
    dispatch(changeRole('complete'));
    fadeOut();
    setTimeout(() => {
      goToNext();
    }, 200);
  };

  const dummyData: NextMatch = {
    id: 1,
    date: '2021-08-18',
    day: '수',
    startTime: '18:00',
    endTime: '20:00',
    address: '서울특별시 용산구 용산대로12번길',
    address2: '3, 4층',
    condition: '인원 모집 중',
    reason: '',
    deadline: '',
    vote: false,
  };

  return (
    <>
      <LoggedInHeader />
      <CardScrollView home>
        <NextMatchCard onLayout={onLayout} conditions="인원 모집 중" nextMatch={dummyData} />
        <AddOnsCard />
      </CardScrollView>
      {layout ? (
        <ShadeView>
          <FakeNextMatchCard fadeAnim={fadeAnim} layout={layout} />
          <BubbleView
            fadeAnim={fadeAnim}
            layout={layout}
            title="다음 경기: ② 등록 후"
            description={
              <Regular>
                경기가 등록되면 이렇게 표시 된답니다!{'\n'}
                <Bold>[투표하기]</Bold>를 누르면 상세한 정보를 볼 수 있어요. 경기 일정 등록, 이제
                직접 하실 수 있겠죠?
              </Regular>
            }
            pointerLeftVal={25}
            onPressNext={onPressNext}
            onPressPrevious={onPressPrevious}
            nextBtnText="완료"
          />
        </ShadeView>
      ) : (
        <ShadeView />
      )}
    </>
  );
}
