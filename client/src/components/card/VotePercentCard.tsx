import React from 'react';
import styled from 'styled-components/native';
import { Regular } from '../../theme/fonts';

const VotePercentContainer = styled.View`
  width: 100%;
  height: 30px;
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;

const VotePercentBlock = styled.View`
  background-color: ${(props: { blockColor: string }) => props.blockColor}
  width: 16px;
  height: 16px;
  margin-right: 7px;
  border-radius: 4px;
`;

const VotePercentTitle = styled(Regular)`
  font-size: 17px;
  width: 64px;
  margin-right: 35px;
`;

const VotePercentPerson = styled(Regular)`
  font-size: 17px;
  width: 64px;
  margin-right: 35px;
`;

const VotePercent = styled(Regular)`
  font-size: 17px;
  width: 64px;
`;

type VotePercentCardProps = {
  blockColor: string;
  title: string;
  person: number;
  percent: string;
};

export default function VotePercentCard(props: VotePercentCardProps) {
  const { blockColor, title, person, percent } = props;

  return (
    <VotePercentContainer>
      <VotePercentBlock blockColor={blockColor} />
      <VotePercentTitle>{title}</VotePercentTitle>
      <VotePercentPerson>{person}명</VotePercentPerson>
      <VotePercent>{percent}%</VotePercent>
    </VotePercentContainer>
  );
}
