import React from 'react';
import styled from 'styled-components/native';
import { Bold, Regular } from '../../theme/fonts';
import CommonModalButton from '../button/CommonModalButton';
import GatheringMark from '../mark/GatheringMark';
import Card from './Card';
import { LayoutType } from '../../../@types/global/types';

const TitleView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 26px;
`;

const SubtitleView = styled.View`
  justify-content: space-between;
  height: 103px;
  margin-bottom: 35px;
`;

type FakeNextMatchCardProps = {
  layout?: LayoutType;
};

export default function FakeNextMatchCard({ layout }: FakeNextMatchCardProps) {
  return (
    <Card layout={layout}>
      <TitleView>
        <Bold size={20}>🗓 다음 경기</Bold>
        <GatheringMark />
      </TitleView>
      <SubtitleView>
        <Regular size={17}>2021-08-18 (수)</Regular>
        <Bold size={17}>시작 18:00 → 20:00 종료</Bold>
        <Regular gray>서울특별시 용산구 용산대로12번길</Regular>
        <Regular gray>3, 4층</Regular>
      </SubtitleView>
      <CommonModalButton onPress={() => {}} disabled isFake text="투표하기" color="blue" />
    </Card>
  );
}
