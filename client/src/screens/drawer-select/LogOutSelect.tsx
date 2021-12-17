import React from 'react';
import styled from 'styled-components/native';
import BottomDrawer from '../../components/drawer/BottomDrawer';
import { Bold, Regular } from '../../theme/fonts';
import CommonModalButton from '../../components/button/CommonModalButton';
import { useDispatch } from 'react-redux';
import { logOutUser } from '../../store/actions/userAction';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootStackParamList';

const TitleContainer = styled.View`
  margin: 15px 0px;
`;

const SubtitleContainer = styled.View`
  margin: 10px 0px 30px 0px;
`;

const Wrapper = styled.View`
  padding: 0px 10px 25px 10px;
`;

export default function LogOutSelect() {
  const dispatch = useDispatch();

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const handleLogout = () => {
    dispatch(logOutUser());
    navigation.reset({
      routes: [
        {
          name: 'Guest',
        },
      ],
    });
  };

  return (
    <BottomDrawer>
      <Wrapper>
        <TitleContainer>
          <Bold size={20}>로그아웃</Bold>
        </TitleContainer>
        <SubtitleContainer>
          <Regular gray>어시스트에서 로그아웃 하시겠습니까?</Regular>
        </SubtitleContainer>
        <CommonModalButton
          color="blue"
          text="로그아웃  >"
          onPress={() => {
            handleLogout();
          }}
        />
      </Wrapper>
    </BottomDrawer>
  );
}
