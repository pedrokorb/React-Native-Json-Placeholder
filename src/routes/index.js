import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import UserDetails from '../pages/Users/UserDetails'
import UserList from '../pages/Users/UserList'
import PostsList from '../pages/Posts/PostsList'
import PostDetails from '../pages/Posts/PostDetails'

const User = createStackNavigator();

const UserRoutes = () => {
  return (
    <User.Navigator
      // screenOptions=
    >
      <User.Screen 
        name="PostsList" 
        component={PostsList} 
        options={
          { 
            title: "Posts", 
            headerTintColor: "#FFF", 
            headerStyle: {
              backgroundColor: '#000'
            }
          }
        }
      />
      <User.Screen 
        name="PostDetails" 
        component={PostDetails} 
        options={({ route }) => (
          { 
            title: 'Post Details',
            headerTintColor: "#FFF", 
            headerStyle: {
              backgroundColor: '#000'
            }
          }
        )}
      />
      <User.Screen 
        name="UserList" 
        component={UserList} 
        options={
          { 
            title: "Usuários", 
            headerTintColor: "#FFF", 
            headerStyle: {
              backgroundColor: '#000'
            }
          }
        }
      />
      <User.Screen 
        name="UserDetails" 
        component={UserDetails} 
        options={({ route }) => (
          { 
            title: route.params.user.name,
            headerTintColor: "#FFF", 
            headerStyle: {
              backgroundColor: '#000'
            }
          }
        )}
      />
    </User.Navigator>
  )
}

export default UserRoutes