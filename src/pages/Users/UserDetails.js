import React from 'react'
import {SafeAreaView, Text, StatusBar } from 'react-native';
import tailwind from 'tailwind-rn';

export default function UserDetails ({ route }) {

  const { user } = route.params

  return (
    <>
      <StatusBar backgroundColor="#000" />
      <SafeAreaView style={tailwind('h-full bg-black')}>
        <Text style={tailwind('text-white')}>
          Olá, sou uma página {user.name}
        </Text>
      </SafeAreaView>
    </>
  )
} 
