import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { colors } from '../../theme/colors';

export default function CreateTeamFour() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity onPress={() => navigation.navigate('CreateTeamEnd')}>
        <Text>팀의 월 회비는 얼마인가요?</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
