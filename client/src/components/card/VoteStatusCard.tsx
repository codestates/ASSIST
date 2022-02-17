import React from 'react';
import { Linking, ListRenderItem, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { Bold, Regular } from '../../theme/fonts';
import LoadingView from '../view/LoadingView';
import { RootState } from '../../store/reducers';
import { VoteUser } from '../../../@types/global/types';
import { FlatList } from 'react-native';

const VoteStatusContainer = styled.View`
  width: 100%;
  padding: 25px 16px 10px 16px;
`;

const VoteStatusTitle = styled.View`
  width: 100%;
  flex-direction: row;
  margin-bottom: 16px;
`;

const Title = styled(Bold)`
  margin-right: 16px;
  font-size: 18px;
`;

const UserItem = styled.TouchableOpacity`
  width: 25%;
  height: 40px;
  justify-content: center;
`;

type VoteStatusCardProps = {
  title: string;
  data: VoteUser[];
};

export default function VoteStatusCard({ title, data }: VoteStatusCardProps) {
  const { id } = useSelector((state: RootState) => state.userReducer);

  const callUser = (phone: string) => {
    if (Platform.OS === 'ios') {
      Linking.openURL(`tel://${phone}`).catch((err) => console.log(err));
    } else {
      Linking.openURL(`tel:${phone}`).catch((err) => console.log(err));
    }
  };

  const numColumns = 4;

  const renderItem: ListRenderItem<VoteUser> = ({ item }) => (
    <UserItem onPress={() => callUser(item.user.phone)}>
      {item.user.id === id ? (
        <Bold blue>{item.user.name}</Bold>
      ) : (
        <Regular>{item.user.name}</Regular>
      )}
    </UserItem>
  );

  return !data ? (
    <LoadingView />
  ) : (
    <VoteStatusContainer>
      <VoteStatusTitle>
        <Title>{title}</Title>
        <Regular size={18}>{data?.length}명</Regular>
      </VoteStatusTitle>
      <FlatList
        style={{ minHeight: '20px' }}
        keyExtractor={(_, index) => index.toString()}
        data={data}
        numColumns={numColumns}
        renderItem={renderItem}
      />
    </VoteStatusContainer>
  );
}
