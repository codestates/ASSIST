import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { colors } from '../../theme/colors';

const CommonModal = (props) => {
  return (
    <View style={styles.talkBubbleContainer}>
      <View style={styles.talkBubbleTriangle} />
      <View style={styles.talkBubbleSquare}>
        <View style={styles.contentsContainer}>
          <Text style={styles.title}>1. 팀등록하기</Text>
          <Text style={styles.content}>
            팀의 주장이라면 [팀 등록하기]를 눌러 어시스트에 팀을 등록 해 주세요!
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonPrev}>
            <Button title="이전" color={colors.white} />
          </View>
          <View style={styles.buttonNext}>
            <Button title="다음" color={colors.darkGray} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  talkBubbleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  talkBubbleTriangle: {
    width: 16,
    height: 32,
    top: 0,
    left: -100,
    borderLeftWidth: 16,
    borderLeftColor: 'transparent',
    borderRightWidth: 16,
    borderRightColor: 'transparent',
    borderBottomWidth: 16,
    borderBottomColor: colors.darkGray,
  },
  talkBubbleSquare: {
    width: 304,
    height: 164,
    backgroundColor: colors.darkGray,
    borderRadius: 16,
    paddingHorizontal: 32,
    paddingVertical: 24,
  },
  contentsContainer: {
    width: 240,
    height: 68,
  },
  title: {
    fontSize: 14,
    color: colors.white,
    paddingBottom: 8,
  },
  content: {
    fontSize: 12,
    color: colors.white,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
  },
  buttonPrev: {
    width: 64,
    fontSize: 12,
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 8,
    marginRight: 16,
  },
  buttonNext: {
    width: 64,
    fontSize: 12,
    backgroundColor: colors.white,
    borderRadius: 8,
  },
});

export default CommonModal;
