import { SafeAreaView, StyleSheet, Text, View, StatusBar } from 'react-native'
import React from  'react'
import Slider from './src/components/Slider'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PreLogin from './src/components/PreLogin';
import Login from './src/components/Login';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    // <NavigationContainer>
    //   <StatusBar barStyle='light-content'/>
    //   <Stack.Navigator>
    //   <Stack.Screen name='Home' component={Slider}
    //   options={{
    //     title: '',
    //     headerStyle: { backgroundColor: 'black' },
    //   }}
    //   />
    //  <Stack.Screen name='PreLogin' component={PreLogin}
    //   options={{
    //     title: '',
    //     headerStyle: { backgroundColor: 'black' },
    //   }}
    //   />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <SafeAreaView>
      <Login/>
    </SafeAreaView>
      
  )
}

export default App

const styles = StyleSheet.create({})