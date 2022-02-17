import React from 'react';
import styled from 'styled-components/native';
import { Regular } from '../../theme/fonts';

const VotePercentContainer = styled.View`
  width: 100%;
  height: 46px;
  flex-direction: row;
  align-items: center;
`;

const VotePercentBlock = styled.View`
  background-color: ${(props: { blockColor: string }) => props.blockColor};
  width: 16px;
  height: 16px;
  margin-right: 9px;
  border-radius: 4px;
`;

const BlockTitle = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

const Person = styled(Regular)`
  flex: 0.7;
`;

const Percent = styled(Regular)`
  flex: 0.3;
`;

type VotePercentCardProps = {
  blockColor: string;
  title: string;
  person: number;
  percent: number;
};

export default function VotePercentCard(props: VotePercentCardProps) {
  const { blockColor, title, person, percent } = props;

  return (
    <VotePercentContainer>
      <BlockTitle>
        <VotePercentBlock blockColor={blockColor} />
        <Regular size={17}>{title}</Regular>
      </BlockTitle>
      <Person size={17}>{person}명</Person>
      <Percent size={17}>{percent}%</Percent>
    </VotePercentContainer>
  );
}
