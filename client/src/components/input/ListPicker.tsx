/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { forwardRef } from 'react';
import { FlatList, ListRenderItem, Dimensions } from 'react-native';
import styled from 'styled-components/native';

const DataList = styled.FlatList`
  width: 100%;
  height: 100%;
  flex-grow: 0;
`;

type ListPickerProps = {
  data: {
    value: string;
  }[];
  renderItem: ListRenderItem<any>;
};

const ListPicker = forwardRef<FlatList, ListPickerProps>(({ data, renderItem }, ref) => {
  const dummies = [{ value: '' }, { value: '' }];
  const list = [...dummies, ...data, ...dummies];
  return (
    <DataList
      ref={ref}
      data={list}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      keyExtractor={(_, index) => index.toString()}
      snapToAlignment="center"
      snapToInterval={Dimensions.get('window').height / 5}
    />
  );
});

export default ListPicker;
