import React from 'react';
import styled from 'styled-components/native';
import MainTitle from '../../components/text/MainTitle';
import { colors } from '../../theme/colors';
import { Bold, Light, Regular } from '../../theme/fonts';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import ColoredScrollView from '../../components/view/ColoredScrollView';

const PhoneContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0px 10px 0px;
`;

const ChangeButton = styled.TouchableOpacity`
  width: 90px;
  height: 28px;
  background-color: ${colors.blue};
  justify-content: center;
  align-items: center;
  border-radius: 15px;
`;

const Seperator = styled.View`
  margin: 25px 0px;
  border: 0.8px;
  border-color: ${colors.lightGray};
`;

const MenuButton = styled.TouchableOpacity`
  margin: 12px 0px;
  padding: 0px 5px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export default function MyPage() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <ColoredScrollView titleColor={colors.white}>
      <MainTitle marginBottom="5px">
        <>
          <Bold size={22}>홍길동</Bold>
          <Light size={22}>님</Light>
        </>
        <Light size={22}>안녕하세요 👋</Light>
      </MainTitle>
      <>
        <PhoneContainer>
          <Regular>010-1234-1234</Regular>
          <ChangeButton onPress={() => navigation.navigate('NewPhone')}>
            <Regular size={14} white>
              변경하기
            </Regular>
          </ChangeButton>
        </PhoneContainer>
        <Seperator />
        <MenuButton onPress={() => navigation.navigate('MyProfile')}>
          <Regular>내 프로필</Regular>
          <MaterialIcons name="keyboard-arrow-right" size={23} color={colors.gray} />
        </MenuButton>
        <MenuButton
          onPress={() => navigation.navigate('ChangePassword', { screenName: 'MyPage_Main' })}>
          <Regular>비밀번호 재설정</Regular>
          <MaterialIcons name="keyboard-arrow-right" size={23} color={colors.gray} />
        </MenuButton>
        <Seperator />
        <MenuButton>
          <Regular gray>고객센터</Regular>
          <MaterialIcons name="keyboard-arrow-right" size={23} color={colors.gray} />
        </MenuButton>
        <MenuButton>
          <Regular lightGray>로그아웃</Regular>
          <MaterialIcons name="keyboard-arrow-right" size={23} color={colors.gray} />
        </MenuButton>
        <MenuButton>
          <Regular lightGray>탈퇴하기</Regular>
          <MaterialIcons name="keyboard-arrow-right" size={23} color={colors.gray} />
        </MenuButton>
      </>
    </ColoredScrollView>
  );
}
