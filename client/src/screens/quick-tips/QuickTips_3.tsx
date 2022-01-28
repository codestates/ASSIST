import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import CommonModalButton from '../../components/button/CommonModalButton';
import FakeButton from '../../components/button/FakeButton';
import Card from '../../components/card/Card';
import LoggedInHeader from '../../components/header/LoggedInHeader';
import BubbleView from '../../components/view/BubbleView';
import CardScrollView from '../../components/view/CardScrollView';
import ShadeView from '../../components/view/ShadeView';
import useFadeAnim from '../../hooks/useFadeAnim';
import useOnLayout from '../../hooks/useOnLayout';
import useReset from '../../hooks/useReset';
import { colors } from '../../theme/colors';
import { Bold, Regular } from '../../theme/fonts';

const TitleText = styled(Bold)`
  font-size: 18px;
  margin-bottom: 13px;
`;

const SubtitleText = styled(Regular)`
  font-size: 13px;
  margin-bottom: 26px;
  color: ${colors.gray};
`;

const Seperator = styled.View`
  height: 16px;
`;

export default function QuickTips_3() {
  const { layout, onLayout } = useOnLayout();
  const goToNext = useReset({ screenName: 'QuickTips_4' });
  const goToPrevious = useReset({ screenName: 'QuickTips_2' });
  const { fadeAnim, fadeIn, fadeOut } = useFadeAnim({ duration: 200 });

  useEffect(() => {
    fadeIn();
  }, []);

  const onPressNext = () => {
    fadeOut();
    setTimeout(() => goToNext(), 200);
  };

  const onPressPrevious = () => {
    fadeOut();
    setTimeout(() => goToPrevious(), 200);
  };

  return (
    <>
      <LoggedInHeader isNewTeam />
      <CardScrollView home>
        <Card>
          <TitleText>소속팀을 추가해주세요 🤔</TitleText>
          <SubtitleText>새 팀을 등록하거나, 등록된 팀에 가입 해 주세요.</SubtitleText>
          <CommonModalButton
            onLayout={onLayout}
            text="팀 등록하기  >"
            color="blue"
            onPress={() => {}}
          />
          <Seperator />
          <CommonModalButton blueText color="transparent" text="팀 가입하기" onPress={() => {}} />
        </Card>
      </CardScrollView>
      {layout ? (
        <ShadeView>
          <FakeButton fadeAnim={fadeAnim} layout={layout} text="팀 등록하기  >" color="blue" />
          <BubbleView
            fadeAnim={fadeAnim}
            layout={layout}
            title="1.팀 등록하기"
            description={
              <Regular>
                팀의 주장이라면 <Bold>[팀 등록하기]</Bold>를 눌러 어시스트에 팀을 등록 해 주세요!
              </Regular>
            }
            pointerLeftVal={25}
            onPressNext={onPressNext}
            onPressPrevious={onPressPrevious}
          />
        </ShadeView>
      ) : (
        <ShadeView />
      )}
    </>
  );
}
