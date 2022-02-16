import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../../theme/colors';
import { Bold, Regular } from '../../theme/fonts';
import NextPageView from './NextPageView';

const Circle = styled.View`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: ${colors.blue};
  position: relative;
`;

const ExclamationMark = styled.View`
  position: absolute;
  top: 20px;
  left: 20px;
`;

const Wrapper = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled(Regular)`
  font-size: 19px;
  margin: 40px 0px 60px 0px;
`;

type SummaryViewProps = {
  children: React.ReactNode;
};

export default function SummaryView({ children }: SummaryViewProps) {
  return (
    <NextPageView isFinish>
      <Wrapper>
        <Circle>
          <ExclamationMark>
            <MaterialCommunityIcons name="exclamation-thick" size={80} color={colors.white} />
          </ExclamationMark>
        </Circle>
        <Text>
          입력 하신 정보를 <Bold size={19}>확인 해 주세요!</Bold>
        </Text>
        {children}
      </Wrapper>
    </NextPageView>
  );
}
