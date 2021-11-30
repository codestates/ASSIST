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
  width: 27%;
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

export default function ValidationTimer() {
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 120);

  const { seconds, minutes, start, restart } = useTimer({
    expiryTimestamp,
    autoStart: false,
  });

  useEffect(() => {
    start();
  }, []);

  const getSeconds = (seconds: number) => {
    if (seconds < 10) return `0${seconds}`;
    return seconds;
  };

  return (
    <Validation>
      <Regular size={14} red>
        {`${minutes}:${getSeconds(seconds)} 남음`}
      </Regular>
      <ResendButton onPress={() => restart(expiryTimestamp)}>
        <Regular size={13} white>
          재전송
        </Regular>
      </ResendButton>
    </Validation>
  );
}
