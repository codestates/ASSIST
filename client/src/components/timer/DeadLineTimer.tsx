import React, { useEffect } from 'react';
import { useTimer } from 'react-timer-hook';
import styled from 'styled-components/native';
import { Bold, Regular } from '../../theme/fonts';

const Container = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-bottom: 20px;
`;

type DeadLineTimerProps = {
  deadLine: string;
};

export default function DeadLineTimer({ deadLine }: DeadLineTimerProps) {
  const timeArr = deadLine.split('-').map((el) => Number(el));
  const currentTime = new Date();
  const deadLineTime = new Date(timeArr[0], timeArr[1] - 1, timeArr[2], 19, 0, 0, 0);
  const timeLeft = Math.abs((deadLineTime.getTime() - currentTime.getTime()) / 1000);

  if (timeLeft) {
    currentTime.setSeconds(currentTime.getSeconds() + timeLeft);
  }

  const { seconds, minutes, hours, days, start } = useTimer({
    expiryTimestamp: currentTime,
    autoStart: false,
  });

  useEffect(() => {
    start();
  }, []);

  const getTime = (days: number, hours: number, minutes: number, seconds: number) => {
    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
      return '완료';
    } else if (days === 0 && hours === 0 && minutes === 0) {
      return `${seconds}초 후`;
    } else if (days === 0 && hours === 0) {
      return `${minutes}분 ${seconds}초 후`;
    } else if (days === 0) {
      return `${hours}시간 ${minutes}분 ${seconds}초 후 `;
    } else {
      return `${days}일 ${hours}시간 ${minutes}분 후 `;
    }
  };

  return (
    <Container>
      <Regular red>모집 마감 : </Regular>
      <Bold red>{getTime(days, hours, minutes, seconds)}</Bold>
    </Container>
  );
}
