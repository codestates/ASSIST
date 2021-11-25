import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { colors } from '../../theme/colors';

export default function CreateTeamOne() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity onPress={() => navigation.navigate('CreateTeamTwo')}>
        <Text>팀 이름을 알려주세요</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
