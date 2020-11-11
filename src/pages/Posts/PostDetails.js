import React, { useEffect, useState } from 'react'
import {SafeAreaView, Text, View, Image, StatusBar, TouchableOpacity } from 'react-native';
import tailwind from 'tailwind-rn';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Icon from 'react-native-vector-icons/Ionicons';
import Collapsible from 'react-native-collapsible';
import user from '../../assets/images/user.png'
import api from '../../services/api'

export default function PostDetails ({ route }) {

  const { post } = route.params
  const [userName, setUserName] = useState(false)
  const [comments, setComments] = useState(false)
  const [isCollapse, setIsCollapse] = useState(true)

  useEffect(() => {
    getPostUser()
    getPostComments()
  }, [])

  const getPostUser = () => {
    api.get(`/users/${post.userId}`).then(response => {
      setUserName(response.data.name)
    }).catch(error => {
      // setError(true)
      // showSnackbar()
    })
  }

  const getPostComments = () => {
    api.get(`/posts/${post.userId}/comments`).then(response => {
      setComments(response.data)
    }).catch(error => {
      // setError(true)
      // showSnackbar()
    })
  }

  return (
    <>
      <StatusBar backgroundColor="#000" />
      <SafeAreaView style={tailwind('h-full bg-black')}>
        <Text style={tailwind('px-4 mt-4 text-white text-center text-2xl font-bold')}>
          {post.title}
        </Text>
        {userName ? (
          <View style={tailwind('mt-4 justify-center items-center flex-row')}>
            <Image source={user} style={tailwind('h-8 w-8')} />
            <Text style={tailwind('ml-2 text-white')}>
              {userName}
            </Text>
          </View>
        ) : (
          <View style={tailwind('mt-4 justify-center items-center flex-row')}>
            <SkeletonPlaceholder>
              <View style={tailwind('mr-2')}>
                <SkeletonPlaceholder.Item width={35} height={35} borderRadius={25}/>
              </View>
              <SkeletonPlaceholder.Item width={120} height={16} borderRadius={5}/>
            </SkeletonPlaceholder>
          </View>
        )}

        <Text style={tailwind('px-4 mt-4 text-gray-300 text-justify')}>
          {post.body}
        </Text>
        
        <TouchableOpacity 
          style={tailwind('px-4 mt-4 flex-row items-center')}
          onPress={() => setIsCollapse(!isCollapse)}
        >
          <Text style={tailwind('text-white font-bold mr-2')}>
            Comments
          </Text>
          {isCollapse ? (
            <Icon name="ios-arrow-down" size={30} color="#FFF" />
          ) : (
            <Icon name="ios-arrow-up" size={30} color="#FFF" />
          )}
        </TouchableOpacity>

        <Collapsible collapsed={isCollapse}>
          {comments.map(comment => (
            <Text style={tailwind('text-gray-300 px-4 py-4')}>{comment.name}</Text>
          ))}
        </Collapsible>

      </SafeAreaView>
    </>
  )
} 
