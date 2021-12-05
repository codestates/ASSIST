import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CloseHeader from '../components/header/CloseHeader';
import { colors } from '../theme/colors';
import CustomerService_1 from '../screens/customer-service/CustomerService_1';

const CustomerService = createStackNavigator();

export default function CustomerServiceNav() {
  return (
    <CustomerService.Navigator>
      <CustomerService.Screen
        name="CustomerService_1"
        options={{
          header: () => <CloseHeader color={colors.whiteSmoke} />,
        }}
        component={CustomerService_1}
      />
    </CustomerService.Navigator>
  );
}
