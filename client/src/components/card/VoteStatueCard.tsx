import React from 'react';
import { Linking, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { Bold, Regular } from '../../theme/fonts';
import LoadingView from '../view/LoadingView';
import { RootState } from '../../store/reducers';
const Space = styled.View`
  width: 16px;
  height; 100%;
`;

const VoteStatusContainer = styled.View`
  width: 100%;
  padding: 24px 16px 8px 16px;
`;

const VoteStatusTitle = styled.View`
  width: 100%;
  flex-direction: row;
  padding-bottom: 16px;
`;

const VoteStatusMembersContainer = styled.View`
  flex-direction: row;
  margin-right: 5%;
`;

const UserNameContainer = styled.View`
  flex-direction: row;
  width: 90%;
  flex-wrap: wrap;
`;

const VoteStatusMember = styled.TouchableOpacity`
  flex-direction: row;
  width: 100%;
  padding-vertical: 6px;
  margin: 8px 8px 8px 0;
`;

type UserProps = {
  id: number;
  name: string;
  phone: string;
};
type DataProps = {
  condition: string;
  id: number;
  user: UserProps;
};

type VoteStatusCardProps = {
  title: string;
  data: DataProps[];
};

export default function VoteStatusCard({ title, data }: VoteStatusCardProps) {
  const { id } = useSelector((state: RootState) => state.userReducer);
  const handlePhoneCall = (user: UserProps) => {
    if (Platform.OS === 'ios') {
      Linking.openURL(`tel://${user.phone}`).catch((err) => console.log(err));
    } else {
      Linking.openURL(`tel:${user.phone}`).catch((err) => console.log(err));
    }
  };

  if (!data) {
    return <LoadingView />;
  }
  console.log(data);
  return (
    <VoteStatusContainer>
      <VoteStatusTitle>
        <Bold size={18}>{title}</Bold>
        <Space />
        <Regular size={18}>{data?.length}명</Regular>
      </VoteStatusTitle>
      <UserNameContainer>
        {data.length ? (
          data?.map((el) => {
            return (
              <VoteStatusMembersContainer key={el.id}>
                <VoteStatusMember
                  onPress={() => {
                    handlePhoneCall(el.user);
                  }}>
                  <Regular blue={el.user?.id === id} size={15}>
                    {el.user?.name}
                  </Regular>
                </VoteStatusMember>
              </VoteStatusMembersContainer>
            );
          })
        ) : (
          <VoteStatusMembersContainer>
            <VoteStatusMember>
              <Regular size={15}> ...</Regular>
            </VoteStatusMember>
          </VoteStatusMembersContainer>
        )}
      </UserNameContainer>
    </VoteStatusContainer>
  );
}
