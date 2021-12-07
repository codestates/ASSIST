import React from 'react';
import styled from 'styled-components/native';
import { Bold, Regular } from '../../theme/fonts';

const Space = styled.View`
  width: 16px;
  height; 100%;
`;

const VoteStatusContainer = styled.View`
  width: 100%;
  padding: 24px 16px 8px 16px;
`;

const VoteStatusTitle = styled.View`
  width: 100%;
  flex-direction: row;
  padding-bottom: 16px;
`;

const VoteStatusMembersContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const VoteStatusMember = styled.View`
  width: 22%;
  padding-vertical: 6px;
  margin: 8px 8px 8px 0;
`;

type VoteStatusCardProps = {
  title: string;
  person: number;
  name: string;
};

export default function VoteStatusCard(props: VoteStatusCardProps) {
  const { title, person, name } = props;

  return (
    <VoteStatusContainer>
      <VoteStatusTitle>
        <Bold size={20}>{title}</Bold>
        <Space />
        <Regular size={20}>{person} 명</Regular>
      </VoteStatusTitle>
      <VoteStatusMembersContainer>
        <VoteStatusMember>
          <Regular size={17}>{name}</Regular>
        </VoteStatusMember>
      </VoteStatusMembersContainer>
    </VoteStatusContainer>
  );
}
