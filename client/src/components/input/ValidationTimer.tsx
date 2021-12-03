import React, { useEffect } from 'react';
import { useTimer } from 'react-timer-hook';
import styled from 'styled-components/native';
import { colors } from '../../theme/colors';
import { Regular } from '../../theme/fonts';

const Validation = styled.View`
  position: absolute;
  right: 0;
  bottom: 2px;
  top: 0;
  width: 29%;
  height: 60px;
  padding: 5px 8px;
  justify-content: space-between;
  align-items: flex-end;
`;

const ResendButton = styled.TouchableOpacity`
  width: 100%;
  height: 20px;
  background-color: ${colors.blue};
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;

type ValidationTimerProps = {
  setErrorMessage?: React.Dispatch<React.SetStateAction<string>>;
  clearInput?: () => void;
};

export default function ValidationTimer({ setErrorMessage, clearInput }: ValidationTimerProps) {
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 5);

  const { seconds, minutes, start, restart } = useTimer({
    expiryTimestamp,
    autoStart: false,
    onExpire: () => {
      if (setErrorMessage) {
        setErrorMessage("'재전송'을 누르고, 새 번호를 입력해 주세요.");
      }
    },
  });

  useEffect(() => {
    start();
  }, []);

  const getTime = (minutes: number, seconds: number) => {
    if (minutes === 0 && seconds === 0) {
      return '입력 시간 초과';
    } else if (seconds < 10) {
      return `${minutes}:0${seconds} 남음`;
    } else {
      return `${minutes}:${seconds} 남음`;
    }
  };

  const restartTimer = () => {
    if (setErrorMessage && clearInput) {
      setErrorMessage('');
      clearInput();
    }
    restart(expiryTimestamp);
  };

  return (
    <Validation>
      <Regular size={14} red>
        {getTime(minutes, seconds)}
      </Regular>
      <ResendButton onPress={() => restartTimer()}>
        <Regular size={13} white>
          재전송
        </Regular>
      </ResendButton>
    </Validation>
  );
}
