/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { forwardRef, useEffect } from 'react';
import { FlatList, ListRenderItem, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { ListType } from '../../../@types/global/types';

const DataList = styled.FlatList`
  width: 100%;
  height: 100%;
  flex-grow: 0;
`;

type ListPickerProps = {
  data: ListType[];
  renderItem: ListRenderItem<any>;
  scrollCenter?: () => void;
  isInverted?: boolean;
};

const ListPicker = forwardRef<FlatList, ListPickerProps>(
  ({ data, renderItem, scrollCenter, isInverted }, ref) => {
    const dummies = [{ value: '' }, { value: '' }];
    const list = [...dummies, ...data, ...dummies];
    const ITEM_HEIGHT = 60;

    useEffect(() => {
      if (scrollCenter) {
        scrollCenter();
      }
    }, []);

    return (
      <DataList
        inverted={isInverted}
        ref={ref}
        data={list}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        snapToAlignment="center"
        snapToInterval={Dimensions.get('window').height / 5}
        getItemLayout={(_, index) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index })}
      />
    );
  },
);

export default ListPicker;
