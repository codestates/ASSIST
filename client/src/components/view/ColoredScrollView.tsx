import React from 'react';
import { useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../../theme/colors';

const Container = styled.ScrollView`
  background-color: ${(props: { isCard?: boolean }) =>
    props.isCard ? colors.whiteSmoke : colors.white};
`;

const TitleContainer = styled.View`
  padding: 70px 20px 0px 20px;
  background-color: ${(props: { titleColor: string }) => props.titleColor};
`;

const ContentContainer = styled.View`
  background-color: ${colors.white};
  padding: 0px 20px;
`;

const CardView = styled.View`
  position: relative;
  flex-direction: row;
  width: 100%;
  background-color: ${(props: SpaceProps) => (props.fake ? props.titleColor : colors.whiteSmoke)};
`;

type SpaceProps = {
  fake?: boolean;
  titleColor?: string;
};

const Space = styled.View`
  width: 20px;
  background-color: ${(props: SpaceProps) => (props.fake ? props.titleColor : colors.whiteSmoke)};
  height: ${(props: SpaceProps) => (props.fake ? '30px' : 'auto')};
  z-index: 1;
`;

type CardContainerProps = {
  width: number;
  fake?: boolean;
};

const CardContainer = styled.View`
  z-index: 2;
  padding: ${(props: CardContainerProps) => (props.fake ? '0px' : '0px 35px 35px 35px')};
  width: ${(props: CardContainerProps) => props.width - 40}px;
  height: ${(props: CardContainerProps) => (props.fake ? '30px' : 'auto')};
  background-color: ${colors.white};
  border-top-left-radius: ${(props: CardContainerProps) => (props.fake ? '15px' : '0px')};
  border-top-right-radius: ${(props: CardContainerProps) => (props.fake ? '15px' : '0px')};
  border-bottom-left-radius: ${(props: CardContainerProps) => (props.fake ? '0px' : '15px')};
  border-bottom-right-radius: ${(props: CardContainerProps) => (props.fake ? '0px' : '15px')};
  box-shadow: ${(props: CardContainerProps) =>
    props.fake ? '0px 0px 5px rgba(0, 0, 0, 0.2)' : '0px 5px 3px rgba(0, 0, 0, 0.2)'};
`;

type ColoredScrollViewProps = {
  children: React.ReactNode[];
  titleColor: string;
  isCard?: boolean;
  isMyPage?: boolean;
};

export default function ColoredScrollView({
  children,
  titleColor,
  isCard,
  isMyPage,
}: ColoredScrollViewProps) {
  const { width } = useWindowDimensions();
  return (
    <Container isCard={isCard} bounces={false}>
      <TitleContainer titleColor={titleColor}>{children[0]}</TitleContainer>
      {!isCard ? (
        <ContentContainer>{children[1]}</ContentContainer>
      ) : (
        <>
          <CardView fake titleColor={titleColor}>
            <Space fake titleColor={titleColor} />
            <CardContainer fake width={width} />
            <Space fake titleColor={titleColor} />
          </CardView>
          <CardView>
            <Space />
            <CardContainer width={width}>{children[1]}</CardContainer>
            <Space />
          </CardView>
        </>
      )}
    </Container>
  );
}
