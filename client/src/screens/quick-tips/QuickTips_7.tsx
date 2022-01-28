import React from 'react';
import { useDispatch } from 'react-redux';
import AddTeamCard from '../../components/card/AddTeamCard';
import LoggedInHeader from '../../components/header/LoggedInHeader';
import BubbleView from '../../components/view/BubbleView';
import CardScrollView from '../../components/view/CardScrollView';
import ShadeView from '../../components/view/ShadeView';
import useEditProfile from '../../hooks/useEditProfile';
import useReset from '../../hooks/useReset';
import { changeRole } from '../../store/actions/userAction';
import { Regular } from '../../theme/fonts';

export default function QuickTips_7() {
  const goToPrevious = useReset({ screenName: 'QuickTips_6' });
  const editProfile = useEditProfile({ role: 'tips2' });
  const reset = useReset({ screenName: 'User' });
  const dispatch = useDispatch();

  const goToNext = async () => {
    await editProfile();
    dispatch(changeRole('tips2'));
    reset();
  };

  return (
    <>
      <LoggedInHeader isNewTeam />
      <CardScrollView home>
        <AddTeamCard />
      </CardScrollView>
      <ShadeView isNoLayout>
        <BubbleView
          isPointerDown
          nextBtnText="좋아요"
          title="잘 이해 하셨죠?"
          description={<Regular>이제, 본격적으로 어시스트를 시작 해 보자구요😁</Regular>}
          onPressPrevious={goToPrevious}
          onPressNext={goToNext}
        />
      </ShadeView>
    </>
  );
}
