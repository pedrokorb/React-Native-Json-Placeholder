import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import UserDetails from '../pages/UserDetails'
import UserList from '../pages/UserList'

const User = createStackNavigator();

const UserRoutes = () => {
  return (
    <User.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <User.Screen name="UserList" component={UserList} />
      <User.Screen name="UserDetails" component={UserDetails} />
    </User.Navigator>
  )
}

export default UserRoutes