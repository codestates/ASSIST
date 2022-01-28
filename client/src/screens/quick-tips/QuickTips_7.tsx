import { CommonActions, NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { useDispatch } from 'react-redux';
import AddTeamCard from '../../components/card/AddTeamCard';
import LoggedInHeader from '../../components/header/LoggedInHeader';
import BubbleView from '../../components/view/BubbleView';
import CardScrollView from '../../components/view/CardScrollView';
import ShadeView from '../../components/view/ShadeView';
import useEditProfile from '../../hooks/useEditProfile';
import useFadeAnim from '../../hooks/useFadeAnim';
import useReset from '../../hooks/useReset';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { changeRole } from '../../store/actions/userAction';
import { Regular } from '../../theme/fonts';

export default function QuickTips_7() {
  const goToPrevious = useReset({ screenName: 'QuickTips_6' });
  const editProfile = useEditProfile({ role: 'tips2' });
  const dispatch = useDispatch();
  const backgroundFadeAnim = useRef(new Animated.Value(1)).current;
  const { fadeAnim, fadeIn, fadeOut } = useFadeAnim({ duration: 200 });
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const reset = () => {
    navigation.dispatch({
      ...CommonActions.reset({
        index: 0,
        routes: [{ name: 'User', state: { routes: [{ name: 'CreateOrJoin' }] } }],
      }),
    });
  };

  useEffect(() => {
    fadeIn();
  }, []);

  const backgroundFadeOut = () => {
    Animated.timing(backgroundFadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const onPressNext = async () => {
    await editProfile();
    dispatch(changeRole('tips2'));
    fadeOut();
    setTimeout(() => {
      backgroundFadeOut();
    }, 200);
    setTimeout(() => {
      reset();
    }, 1200);
  };

  const onPressPrevious = () => {
    fadeOut();
    setTimeout(() => goToPrevious(), 200);
  };

  return (
    <>
      <LoggedInHeader isNewTeam />
      <CardScrollView home>
        <AddTeamCard />
      </CardScrollView>
      <ShadeView fadeAnim={backgroundFadeAnim} isNoLayout>
        <BubbleView
          fadeAnim={fadeAnim}
          isPointerDown
          nextBtnText="좋아요"
          title="잘 이해 하셨죠?"
          description={<Regular>이제, 본격적으로 어시스트를 시작 해 보자구요😁</Regular>}
          onPressPrevious={onPressPrevious}
          onPressNext={onPressNext}
        />
      </ShadeView>
    </>
  );
}
