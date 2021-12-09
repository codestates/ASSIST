import React, { useState } from 'react';
import { RadioButton } from 'react-native-paper';
import styled from 'styled-components/native';
import { colors } from '../../theme/colors';
import { Regular } from '../../theme/fonts';
import CaptainMark from '../mark/CaptainMark';

const ContentTitleBox = styled.View`
  width: 100%;
  flex-direction: row;
  padding-vertical: 16px;
`;

const ContentRole = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const ContentName = styled.View`
  flex: 2;
  align-items: center;
  justify-content: center;
`;

const ContentPhone = styled.View`
  flex: 3;
  align-items: center;
  justify-content: center;
`;

const ContentAction = styled.TouchableOpacity`
  flex: 2;
  align-items: center;
  justify-content: center;
`;

const TeamDeleteText = styled(Regular)`
  color: ${colors.gray}
  font-size: 16px;
`;

const MemberRejectionText = styled(Regular)`
  color: ${colors.red}
  font-size: 16px;
`;
export default function TeamMemberCard() {
  const [checked, setChecked] = useState('0');

  const handleRadioButton = () => {
    checked === '1' ? setChecked('0') : setChecked('1');
  };
  const MemberStatus = 'Captain';

  return (
    <>
      <ContentTitleBox>
        <ContentRole>
          <Regular size={13}>역할</Regular>
        </ContentRole>
        <ContentName>
          <Regular size={13}>이름</Regular>
        </ContentName>
        <ContentPhone>
          <Regular size={13}>전화번호</Regular>
        </ContentPhone>
        <ContentAction>
          <Regular size={13}>팀 행동</Regular>
        </ContentAction>
      </ContentTitleBox>
      <ContentTitleBox>
        <ContentRole>
          {MemberStatus === 'Captain' ? (
            <CaptainMark />
          ) : (
            <RadioButton.Android
              value="1"
              status={checked === '1' ? 'checked' : 'unchecked'}
              onPress={handleRadioButton}
            />
          )}
        </ContentRole>
        <ContentName>
          <Regular size={16}>홍길동</Regular>
        </ContentName>
        <ContentPhone>
          <Regular size={16}>010-1234-1234</Regular>
        </ContentPhone>
        <ContentAction>
          {MemberStatus === 'Captain' ? (
            <TeamDeleteText>팀 삭제하기</TeamDeleteText>
          ) : checked === '0' ? (
            <MemberRejectionText>강퇴하기</MemberRejectionText>
          ) : (
            <></>
          )}
        </ContentAction>
      </ContentTitleBox>
      <ContentTitleBox>
        <ContentRole>
          {MemberStatus !== 'Captain' ? (
            <CaptainMark />
          ) : (
            <RadioButton.Android
              value="1"
              status={checked === '1' ? 'checked' : 'unchecked'}
              onPress={handleRadioButton}
            />
          )}
        </ContentRole>
        <ContentName>
          <Regular size={16}>홍길동</Regular>
        </ContentName>
        <ContentPhone>
          <Regular size={16}>010-1234-1234</Regular>
        </ContentPhone>
        <ContentAction>
          {MemberStatus !== 'Captain' ? (
            <TeamDeleteText>팀 삭제하기</TeamDeleteText>
          ) : checked === '0' ? (
            <MemberRejectionText>강퇴하기</MemberRejectionText>
          ) : (
            <></>
          )}
        </ContentAction>
      </ContentTitleBox>
    </>
  );
}
