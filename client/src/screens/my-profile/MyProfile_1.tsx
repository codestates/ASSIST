import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import MainTitle from '../../components/text/MainTitle';
import { colors } from '../../theme/colors';
import { Bold, Regular } from '../../theme/fonts';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import ColoredScrollView from '../../components/view/ColoredScrollView';
import NextButton from '../../components/button/NextButton';
import LineSelect from '../../components/input/LineSelect';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LineInput from '../../components/input/LineInput';
import { StackScreenProps } from '@react-navigation/stack';

const ContentContainer = styled.View`
  padding: 30px 15px;
`;

const InfoMessage = styled.View`
  margin: 9px 0px 5px 10px;
`;

const Seperator = styled.View`
  height: 15px;
`;

const schema = yup.object({
  name: yup.string().required(),
});

type MyProfileProps = StackScreenProps<RootStackParamList, 'MyProfile_1'>;

export default function MyProfile_1({ route }: MyProfileProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: { name: '홍길동' },
  });

  const [isPressed, setIsPressed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (isPressed) {
        setIsPressed(false);
      }
    });
    return unsubscribe;
  }, [navigation, isPressed]);

  const clearErrorMessage = () => setErrorMessage('');

  const onSubmit = (data: string) => {
    console.log(data);
  };

  const goToNext = () => {
    setIsPressed(true);
    navigation.navigate('GenderSelect', { screenName: 'MyProfile_1' });
  };

  return (
    <>
      <ColoredScrollView titleColor={colors.whiteSmoke}>
        <MainTitle marginBottom="15px">
          <Bold size={22}>내 프로필</Bold>
          <Regular>홍길동</Regular>
        </MainTitle>
        <ContentContainer>
          <LineSelect isFixed title="이메일" selected="messi10@team-assist.kr" />
          <InfoMessage>
            <Regular size={12} gray>
              메일 주소는 변경이 불가능합니다.
            </Regular>
          </InfoMessage>
          <LineInput
            control={control}
            title="이름"
            name="name"
            placeholder="이름을 입력해주세요"
            errorMessage={errorMessage}
            clearErrorMessage={clearErrorMessage}
          />
          <Seperator />
          <LineSelect
            title="성별"
            isPressed={isPressed}
            onPress={() => goToNext()}
            selected={route.params?.gender || '남성'}
          />
        </ContentContainer>
      </ColoredScrollView>
      <NextButton text="수정하기  >" onPress={() => console.log('hello')} />
    </>
  );
}