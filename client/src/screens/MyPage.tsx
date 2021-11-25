import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import { colors } from '../theme/colors';

export default function MyPage() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.whiteSmoke,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopColor: colors.lightGray,
        borderTopWidth: '1.5px',
      }}>
      <Text>MyPage</Text>
    </SafeAreaView>
  );
}
