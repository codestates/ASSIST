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
    day: '???',
    startTime: '18:00',
    endTime: '20:00',
    address: '??????????????? ????????? ????????????12??????',
    address2: '3, 4???',
    condition: '?????? ?????? ???',
    reason: '',
    deadline: '',
    vote: false,
  };

  return (
    <>
      <LoggedInHeader />
      <CardScrollView home>
        <NextMatchCard onLayout={onLayout} conditions="?????? ?????? ???" nextMatch={dummyData} />
        <AddOnsCard />
      </CardScrollView>
      {layout ? (
        <ShadeView>
          <FakeNextMatchCard fadeAnim={fadeAnim} layout={layout} />
          <BubbleView
            fadeAnim={fadeAnim}
            layout={layout}
            title="?????? ??????: ??? ?????? ???"
            description={
              <Regular>
                ????????? ???????????? ????????? ?????? ????????????!{'\n'}
                <Bold>[????????????]</Bold>??? ????????? ????????? ????????? ??? ??? ?????????. ?????? ?????? ??????, ??????
                ?????? ?????? ??? ??????????
              </Regular>
            }
            pointerLeftVal={25}
            onPressNext={onPressNext}
            onPressPrevious={onPressPrevious}
            nextBtnText="??????"
          />
        </ShadeView>
      ) : (
        <ShadeView />
      )}
    </>
  );
}
