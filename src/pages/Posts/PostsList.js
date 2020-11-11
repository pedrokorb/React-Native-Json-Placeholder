import React, { useState, useEffect } from 'react'
import {SafeAreaView, View, FlatList, Text, StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import ProgressBar from 'react-native-progress/Bar'
import Icon from 'react-native-vector-icons/Ionicons';
import SnackBar from 'react-native-snackbar'
import tailwind from 'tailwind-rn';
import api from '../../services/api'

export default function PostsList () {

  const navigation = useNavigation()
  
  const [posts, setPosts] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    api.get('/posts').then(response => {
      setPosts(response.data)
    }).catch(error => {
      setError(true)
      showSnackbar()
    })
  }

  const showSnackbar = () => {
    SnackBar.show({
      text: "Error fetching Posts",
      duration: SnackBar.LENGTH_LONG
    })
  }

  return (
    <>
      <StatusBar backgroundColor="#000" />
      <SafeAreaView style={tailwind('h-full bg-black')}>

        {posts && !error && (
          <FlatList 
            style={tailwind('mt-4')}
            data={posts}
            keyExtractor={post => post.id}
            renderItem={({ item }) => (
              <View style={tailwind('mx-4 my-1 flex flex-row justify-between border-2 bg-gray-800 rounded-lg')}>
                <View style={tailwind('flex flex-col py-2 flex-1')}>
                  <Text style={tailwind('px-4 mb-2 text-white font-bold text-lg')}>
                    {item.title}
                  </Text>
                  <Text style={tailwind('px-4 mb-2 text-gray-300')}>
                    {item.body}
                  </Text>

                  <TouchableOpacity 
                    style={tailwind('mr-2 justify-end items-end flex-row')}
                    onPress={() => {navigation.navigate('PostDetails', {post: item})}}
                  >
                    <Text style={tailwind('mr-2 mb-2 text-white font-bold')}>
                      Read More
                    </Text>
                    <Icon name="ios-arrow-forward" size={30} color="#FFF" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}

        {!posts && !error && (
          <View style={tailwind('flex-1 items-center justify-center')}>
            <ProgressBar color="#FFF" size={25} indeterminate={true} />
          </View>
        )}

        {error && (
          <View style={tailwind('flex-1 items-center justify-center')}>
            <Icon name="ios-sad-outline" size={60} color="#FFF" />
            <Text style={tailwind('mt-2 text-white')}>Error fetching Posts</Text>
          </View>
        )}
      </SafeAreaView>
    </>
  )
} 
