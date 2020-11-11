import 'react-native-gesture-handler';
import React from 'react'
import { View, StatusBar } from 'react-native';
import tailwind from 'tailwind-rn';

import { NavigationContainer } from '@react-navigation/native'
import Routes from './routes'

export default function App () {

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#000" />
      <View style={tailwind('flex-1 bg-black')}>
        <Routes />
      </View>
    </NavigationContainer>
  )
} 
