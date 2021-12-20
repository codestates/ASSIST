import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import MainTitle from '../../components/text/MainTitle';
import NextPageView from '../../components/view/NextPageView';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import SkipButton from '../../components/button/SkipButton';
import styled from 'styled-components/native';
import { colors } from '../../theme/colors';
import { Bold, Light, Regular } from '../../theme/fonts';
import { MaterialIcons } from '@expo/vector-icons';
import KakaoButton from '../../components/button/KakaoButton';
import * as Clipboard from 'expo-clipboard';
import { useToast } from 'react-native-toast-notifications';
import { StackScreenProps } from '@react-navigation/stack';
import useTeamCode from '../../hooks/useTeamCode';
import LoadingView from '../../components/view/LoadingView';
import useInviteKakao from '../../hooks/useKakaoInvite';
import useInviteSms from '../../hooks/useSmsInvite';

const CodeContainer = styled.TouchableOpacity`
  width: 100%;
  height: 90px;
  padding: 10px 12px 10px 8px;
  background-color: ${colors.whiteSmoke};
  margin-top: 70px;
  justify-content: space-between;
`;

const CodeTitle = styled(Regular)`
  color: ${colors.darkGray};
`;

const FlexBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ButtonContainer = styled.View`
  margin-top: 50px;
  height: 130px;
  justify-content: space-between;
`;

type CreateTeamProps = StackScreenProps<RootStackParamList, 'CreateTeam_5'>;

export default function CreateTeam_5({ route }: CreateTeamProps) {
  const { data, isLoading } = useTeamCode({ inviteCode: route.params?.inviteCode || '' });
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const inviteCode = String(route.params?.inviteCode);
  const toast = useToast();
  const inviteKakao = useInviteKakao({
    teamName: data?.name,
    inviteCode: data?.inviteCode,
    leader: data?.leaderName,
  });
  const inviteSms = useInviteSms({
    teamName: data?.name,
    inviteCode: data?.inviteCode,
    leader: data?.leaderName,
  });

  const copyToClipboard = () => {
    Clipboard.setString(inviteCode);
    toast.show('클립보드에 복사되었습니다.');
  };

  return isLoading ? (
    <LoadingView />
  ) : (
    <>
      <NextPageView>
        <MainTitle>
          <Light size={22}>팀원을</Light>
          <Bold size={22}>초대 할 차례에요 📩</Bold>
        </MainTitle>
        <CodeContainer onPress={copyToClipboard}>
          <CodeTitle>팀 초대 코드</CodeTitle>
          <FlexBox>
            <Bold size={22}>{inviteCode}</Bold>
            <MaterialIcons name="content-copy" size={24} color={colors.gray} />
          </FlexBox>
        </CodeContainer>
        <ButtonContainer>
          <KakaoButton text="카카오톡으로 초대하기  >" isKakao onPress={() => inviteKakao()} />
          <KakaoButton
            text="문자메시지로 초대하기  >"
            isKakao={false}
            onPress={() => inviteSms()}
          />
        </ButtonContainer>
      </NextPageView>
      <SkipButton text="다음에 초대할게요" onPress={() => navigation.navigate('CreateTeam_6')} />
    </>
  );
}
