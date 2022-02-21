import React from 'react';
import { Platform } from 'react-native';
import Postcode from '@actbase/react-daum-postcode';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { useDispatch } from 'react-redux';
import { addScheduleManage } from '../../store/actions/propsAction';
import { colors } from '../../theme/colors';
import { OnCompleteParams } from '@actbase/react-daum-postcode/lib/types';
import DotsHeader from '../../components/header/DotsHeader';

const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${colors.whiteSmoke};
`;

const Post = styled(Postcode)`
  margin-top: 50px;
  width: 100%;
  height: 100%;
`;

export default function StadiumSelect() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();

  const addAddress = ({ address }: { address: string }) => dispatch(addScheduleManage({ address }));

  const shortenAddress = (address: string) => {
    if (address.includes('특별자치')) {
      const state = address.split('특별자치')[0];
      const addressArr = address.split(' ').slice(1);
      const newAddress = [state, ...addressArr];
      return newAddress.join(' ');
    }
    return address;
  };

  const onSelected = ({ userSelectedType, jibunAddress, roadAddress }: OnCompleteParams) => {
    if (userSelectedType === 'R') {
      addAddress({ address: shortenAddress(roadAddress) });
    } else if (userSelectedType === 'J') {
      addAddress({ address: shortenAddress(jibunAddress) });
    }
    navigation.navigate('ScheduleManage_2');
  };

  const onError = () => {
    console.error();
  };

  const jsOptions = { animation: true, hideMapBtn: true, theme: { bgColor: colors.whiteSmoke } };

  return (
    <Container>
      <DotsHeader navigate="ScheduleManage_2" current={0} total={0} />
      {Platform.OS === 'ios' ? (
        <Post jsOptions={jsOptions} onSelected={(data) => onSelected(data)} onError={onError} />
      ) : (
        <Postcode
          style={{ display: 'flex' }}
          jsOptions={jsOptions}
          onSelected={(data) => onSelected(data)}
          onError={onError}
        />
      )}
    </Container>
  );
}
