import React from 'react';
import styled from 'styled-components/native';
import { Bold, Regular } from '../../theme/fonts';

const Container = styled.View`
  align-items: flex-start;
  width: 100%;
`;

const SubtitleView = styled.View`
  margin-top: 15px;
  margin-bottom: 35px;
`;

const TitleSpace = styled.View`
  height: 35px;
`;

type CommonModalTitleProps = {
  title: string;
  subtitle?: string;
};

export default function CommonModalTitle({ title, subtitle }: CommonModalTitleProps) {
  return (
    <Container>
      <Bold size={17}>{title}</Bold>
      {subtitle ? (
        <SubtitleView>
          <Regular gray size={13}>
            {subtitle}
          </Regular>
        </SubtitleView>
      ) : (
        <TitleSpace />
      )}
    </Container>
  );
}
