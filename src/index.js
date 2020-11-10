import React, { useState, useEffect } from 'react'
import {SafeAreaView, View, FlatList, Text, StatusBar, TouchableOpacity } from 'react-native';
import ProgressBar from 'react-native-progress/Bar'
import Icon from 'react-native-vector-icons/Ionicons';
import SnackBar from 'react-native-snackbar'
import tailwind from 'tailwind-rn';
import api from './services/api'

export default function App () {
  
  const [users, setUsers] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    api.get('/users').then(response => {
      setUsers(response.data)
    }).catch(error => {
      setError(true)
      showSnackbar()
    })
  }

  const handleAddUser = () => {
    console.log("Clicou em adicionar novo usuário")
  }

  const showSnackbar = () => {
    SnackBar.show({
      text: "Erro ao buscar usuários",
      duration: SnackBar.LENGTH_LONG
    })
  }

  return (
    <>
      <StatusBar backgroundColor="#000" />
      <SafeAreaView style={tailwind('h-full bg-black')}>
        <View style={tailwind('pt-12 items-center')}>
          
          <Text style={tailwind('text-white font-bold text-2xl')}>
            Usuários
          </Text>
        </View>

        {users && !error && (
          <FlatList 
            style={tailwind('mt-8')}
            data={users}
            keyExtractor={user => user.id}
            renderItem={({ item }) => (
              <View style={tailwind('mx-4 my-1 flex flex-row border-2 border-gray-800 rounded-lg')}>
                <View style={tailwind('flex flex-col py-1')}>
                  <Text style={tailwind('pl-4 text-white font-bold')}>
                    {item.name}
                  </Text>
                  <Text style={tailwind('pl-4 text-white')}>
                    {item.username}
                  </Text>

                </View>
              </View>
            )}
          />
        )}

        {!users && !error && (
          <View style={tailwind('flex-1 items-center mt-32')}>
            <ProgressBar color="#FFF" size={25} indeterminate={true} />
          </View>
        )}

        {error && (
          <View style={tailwind('flex-1 items-center mt-32')}>
            <Icon name="ios-sad-outline" size={60} color="#FFF" />
            <Text style={tailwind('mt-2 text-white')}>Erro ao buscar usuários</Text>
          </View>
        )}

        <TouchableOpacity 
          style={tailwind('items-center my-2 mx-8 py-4 bg-white rounded-full')}
          onPress={handleAddUser}
        >
          <Text style={tailwind('text-black')}>Adicionar usuário</Text>
        </TouchableOpacity>

        {/* <ScrollView style={tailwind('mt-8')}>
          { users && (
            users.map( user => (
              <View key={user.id} style={tailwind('mx-4 my-1 flex flex-row border-2 border-gray-800 rounded-lg')}>
                <View style={tailwind('flex flex-col py-8')}>
                  <Text style={tailwind('pl-4 text-white font-bold')}>
                    {user.name}
                  </Text>
                  <Text style={tailwind('pl-4 text-white')}>
                    {user.username}
                  </Text>

                </View>
              </View>
            ))
          )}
        </ScrollView> */}
      </SafeAreaView>
    </>
  )
} 
