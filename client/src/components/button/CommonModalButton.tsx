import React from 'react';
import { LayoutChangeEvent } from 'react-native';
import { colors } from '../../theme/colors';
import { Regular } from '../../theme/fonts';
import CommonButton from './CommonButton';

type ButtonProps = {
  color?: 'blue' | 'transparent' | 'whiteSmoke';
  text: string;
  onPress: () => void;
  disabled?: boolean;
  blueText?: boolean;
  grayText?: boolean;
  height?: number;
  isFake?: boolean;
  onLayout?: (event: LayoutChangeEvent) => void;
};

export default function CommonModalButton({
  color,
  text,
  onPress,
  disabled,
  blueText,
  grayText,
  height,
  onLayout,
  isFake,
}: ButtonProps) {
  const backgroundColor =
    color === 'blue' ? colors.blue : color === 'transparent' ? 'transparent' : colors.whiteSmoke;
  return (
    <CommonButton
      onLayout={onLayout}
      blueText={blueText}
      grayText={grayText}
      disabled={disabled}
      onPress={onPress}
      buttonRadius="15px"
      buttonBgColor={disabled && !isFake ? colors.gray : backgroundColor}
      width="100%"
      height={`${height || 50}px`}>
      <Regular
        blue={blueText}
        gray={color !== 'blue'}
        white={color === 'blue'}
        size={(height || 50) / 3.84}>
        {text}
      </Regular>
    </CommonButton>
  );
}
