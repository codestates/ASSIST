import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import QuickTips_1 from '../screens/quick-tips/QuickTips_1';
import QuickTips_3 from '../screens/quick-tips/QuickTips_3';
import QuickTips_2 from '../screens/quick-tips/QuickTips_2';
import QuickTips_4 from '../screens/quick-tips/QuickTips_4';
import QuickTips_5 from '../screens/quick-tips/QuickTips_5';
import QuickTips_6 from '../screens/quick-tips/QuickTips_6';
import QuickTips_7 from '../screens/quick-tips/QuickTips_7';
import QuickTips_8 from '../screens/quick-tips/QuickTips_8';
import QuickTips_9 from '../screens/quick-tips/QuickTips_9';
import QuickTips_10 from '../screens/quick-tips/QuickTips_10';
import QuickTips_11 from '../screens/quick-tips/QuickTips_11';
import QuickTips_12 from '../screens/quick-tips/QuickTips_12';

const QuickTips = createStackNavigator();

export default function QuickTipsNav() {
  return (
    <QuickTips.Navigator>
      <QuickTips.Screen
        name="QuickTips_1"
        options={{
          headerShown: false,
        }}
        component={QuickTips_1}
      />
      <QuickTips.Screen
        name="QuickTips_2"
        options={{
          headerShown: false,
        }}
        component={QuickTips_2}
      />
      <QuickTips.Screen
        name="QuickTips_3"
        options={{
          headerShown: false,
        }}
        component={QuickTips_3}
      />
      <QuickTips.Screen
        name="QuickTips_4"
        options={{
          headerShown: false,
        }}
        component={QuickTips_4}
      />
      <QuickTips.Screen
        name="QuickTips_5"
        options={{
          headerShown: false,
        }}
        component={QuickTips_5}
      />
      <QuickTips.Screen
        name="QuickTips_6"
        options={{
          headerShown: false,
        }}
        component={QuickTips_6}
      />
      <QuickTips.Screen
        name="QuickTips_7"
        options={{
          headerShown: false,
        }}
        component={QuickTips_7}
      />
      <QuickTips.Screen
        name="QuickTips_8"
        options={{
          headerShown: false,
        }}
        component={QuickTips_8}
      />
      <QuickTips.Screen
        name="QuickTips_9"
        options={{
          headerShown: false,
        }}
        component={QuickTips_9}
      />
      <QuickTips.Screen
        name="QuickTips_10"
        options={{
          headerShown: false,
        }}
        component={QuickTips_10}
      />
      <QuickTips.Screen
        name="QuickTips_11"
        options={{
          headerShown: false,
        }}
        component={QuickTips_11}
      />
      <QuickTips.Screen
        name="QuickTips_12"
        options={{
          headerShown: false,
        }}
        component={QuickTips_12}
      />
    </QuickTips.Navigator>
  );
}
