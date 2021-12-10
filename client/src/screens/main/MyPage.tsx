import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import MainTitle from '../../components/text/MainTitle';
import { colors } from '../../theme/colors';
import { Bold, Light, Regular } from '../../theme/fonts';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import ColoredScrollView from '../../components/view/ColoredScrollView';
import { CommonModal, CommonModalTitle } from '../../components/modal/CommonModal';
import CommonModalButton from '../../components/button/CommonModalButton';
import { useDispatch, useSelector } from 'react-redux';
import { clearAll } from '../../store/actions/propsAction';
import { RootState } from '../../store/reducers';

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

const Line = styled.View`
  margin-top: 15px;
  margin-bottom: 35px;
`;

export default function MyPage() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const { phone, name } = useSelector((state: RootState) => state.userReducer);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(clearAll());
    });
    return unsubscribe;
  }, [navigation, dispatch]);

  const showErrorModal = () => {
    setModalVisible(true);
  };

  const hideErrorModal = () => {
    setModalVisible(false);
  };

  const checkCanDelete = () => {
    // 소속된 팀이 있는지 확인
    // 있으면, 에러 모달
    // showErrorModal();
    // 없으면, 탈퇴 진행
    navigation.navigate('DeleteAccount_1');
  };

  return (
    <>
      <CommonModal visible={modalVisible} setVisible={hideErrorModal}>
        <CommonModalTitle>
          <Bold size={17}>탈퇴할 수 없습니다.</Bold>
          <Line>
            <Regular gray size={13}>
              소속된 팀이 없어야 탈퇴가 가능합니다.
            </Regular>
          </Line>
        </CommonModalTitle>
        <CommonModalButton text="돌아가기  >" onPress={hideErrorModal} />
      </CommonModal>
      <ColoredScrollView titleColor={colors.white}>
        <MainTitle marginBottom="5px">
          <>
            <Bold size={22}>{name}</Bold>
            <Light size={22}>님</Light>
          </>
          <Light size={22}>안녕하세요 👋</Light>
        </MainTitle>
        <>
          <PhoneContainer>
            <Regular>{phone}</Regular>
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
          <MenuButton onPress={() => navigation.navigate('CustomerService')}>
            <Regular gray>고객센터</Regular>
            <MaterialIcons name="keyboard-arrow-right" size={23} color={colors.gray} />
          </MenuButton>
          <MenuButton onPress={() => navigation.navigate('LogOutSelect')}>
            <Regular lightGray>로그아웃</Regular>
            <MaterialIcons name="keyboard-arrow-right" size={23} color={colors.gray} />
          </MenuButton>
          <MenuButton onPress={() => checkCanDelete()}>
            <Regular lightGray>탈퇴하기</Regular>
            <MaterialIcons name="keyboard-arrow-right" size={23} color={colors.gray} />
          </MenuButton>
        </>
      </ColoredScrollView>
    </>
  );
}
