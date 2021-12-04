import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Menu() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('MyPage')}>
      <Ionicons name="person-circle-outline" size={35} color={colors.blue} />
    </TouchableOpacity>
  );
}
