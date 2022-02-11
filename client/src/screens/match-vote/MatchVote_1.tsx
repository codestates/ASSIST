import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import MainTitle from '../../components/text/MainTitle';
import { colors } from '../../theme/colors';
import { Bold, Regular } from '../../theme/fonts';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import ColoredScrollView from '../../components/view/ColoredScrollView';
import CloseHeader from '../../components/header/CloseHeader';
import { StackScreenProps } from '@react-navigation/stack';

const MainTitleSpaceContents = styled.View`
  width: 100%;
  height: 30px;
`;

const TextSpaceText = styled.View`
  width: 100%;
  height: 8px;
`;

const CardSpaceButton = styled.View`
  width: 100%;
  height: 35px;
`;

const ButtonSpace = styled.View`
  height: 12px;
`;

const ContentContainer = styled.View`
  width: 100%;
`;

const MainTitleText = styled(Bold)`
  font-size: 22px;
  color: ${colors.white};
`;

const MatchInfoDetailStadium = styled(Regular)`
  font-size: 15px;
  color: ${colors.gray};
`;

const Vote = styled.TouchableOpacity`
  padding: 16px;
  border: 1px solid ${colors.lightGray};
`;

type MatchVoteProps = StackScreenProps<RootStackParamList, 'MatchVote_1'>;

export default function MatchVote_1({ route }: MatchVoteProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <>
      <CloseHeader color={colors.gray} />
      <ColoredScrollView isCard={true} titleColor={colors.gray}>
        <MainTitle marginBottom="15px">
          <MainTitleText size={22}>인원 모집 중 💬</MainTitleText>
        </MainTitle>
        <ContentContainer>
          <Bold size={20}>경기 정보</Bold>
          <MainTitleSpaceContents />
          <Regular size={17}>
            {route.params?.data?.date}({route.params?.data?.day})
          </Regular>
          <TextSpaceText />
          <Bold size={17}>
            시작 {route.params?.data?.startTime} →{' '}
            {route.params?.data?.daypassing && <Bold size={13}>익일 </Bold>}
            {route.params?.data?.endTime} 종료
          </Bold>
          <TextSpaceText />
          <MatchInfoDetailStadium>{route.params?.data?.address}</MatchInfoDetailStadium>
          <TextSpaceText />
          <MatchInfoDetailStadium>{route.params?.data?.address2}</MatchInfoDetailStadium>
          <CardSpaceButton />
          <Vote
            onPress={() =>
              navigation.navigate('VoteSelect', {
                vote: 'attend',
                matchId: route.params?.data?.id,
              })
            }>
            <Regular>😍 참석</Regular>
          </Vote>
          <ButtonSpace />
          <Vote
            onPress={() =>
              navigation.navigate('VoteSelect', { vote: 'absent', matchId: route.params?.data?.id })
            }>
            <Regular>😭 불참</Regular>
          </Vote>
          <ButtonSpace />
          <Vote
            onPress={() =>
              navigation.navigate('VoteSelect', { vote: 'hold', matchId: route.params?.data?.id })
            }>
            <Regular>😱 미정</Regular>
          </Vote>
        </ContentContainer>
      </ColoredScrollView>
    </>
  );
}
