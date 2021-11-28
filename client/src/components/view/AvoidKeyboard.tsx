import React from 'react';
import { KeyboardAvoidingView } from 'react-native';

function AvoidKeyboard({ children }: { children: React.ReactNode }) {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={70}>
      {children}
    </KeyboardAvoidingView>
  );
}

export default AvoidKeyboard;
