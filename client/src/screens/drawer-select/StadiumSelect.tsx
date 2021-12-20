import React, { useState } from 'react';
import { Platform, Dimensions, Modal } from 'react-native';
import Postcode from '@actbase/react-daum-postcode';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import styled from 'styled-components/native';
import { RootStackParamList } from '../../navigation/RootStackParamList';

const Container = styled(Modal)`
  width: 100%;
  height: 100%;
`;

const Post = styled(Postcode)`
  margin-top: 50px;
  width: 100%;
  height: 100%;
`;

type StadiumSelectProps = StackScreenProps<RootStackParamList, 'StadiumSelect'>;

export default function StadiumSelect({ route }: StadiumSelectProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [isModal, setIsModal] = useState(route.params?.modal);

  const onSelected = (address: string) => {
    setIsModal(false);
    navigation.navigate('ScheduleManage_2', { modal: false, stadiumAddr: address });
  };
  const onError = () => {
    console.error();
  };
  return (
    <Container visible={isModal}>
      {Platform.OS === 'ios' ? (
        <Post
          jsOptions={{ animation: true, hideMapBtn: true }}
          onSelected={(data) => onSelected(data.address)}
          onError={onError}
        />
      ) : (
        <Postcode
          style={{ display: 'flex' }}
          jsOptions={{ animation: true, hideMapBtn: true }}
          onSelected={(data) => onSelected(data.address)}
          onError={onError}
        />
      )}
    </Container>
  );
}
