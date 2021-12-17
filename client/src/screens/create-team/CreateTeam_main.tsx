import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import CommonButton from '../../components/button/CommonButton';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { colors } from '../../theme/colors';
import { Medium, Regular } from '../../theme/fonts';
import { useDispatch } from 'react-redux';
import { clearAll } from '../../store/actions/propsAction';
import CardScrollView from '../../components/view/CardScrollView';
import AddTeamCard from '../../components/card/AddTeamCard';
import AddOnsCard from '../../components/card/AddOnsCard';

const Container = styled.SafeAreaView`
  flex: 1;
`;

const CenteredView = styled.View`
  justify-content: center;
  align-items: center;
`;

const TopView = styled(CenteredView)`
  flex: 0.4;
  background-color: ${colors.lightGray};
`;

const BottomView = styled(CenteredView)`
  flex: 0.4;
  background-color: ${colors.whiteSmoke};
`;

const BannerSpace = styled.View`
  flex: 0.2;
  background-color: ${colors.gray};
`;

const TextContainer = styled(CenteredView)`
  height: 50px;
  justify-content: space-between;
`;

const ButtonContainer = styled.View`
  margin-top: 35px;
`;

export default function CreateTeam_main() {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(clearAll());
    });
    return unsubscribe;
  }, [navigation, dispatch]);

  return (
    <CardScrollView home>
      <AddTeamCard />
      <AddOnsCard />
    </CardScrollView>
  );
}
