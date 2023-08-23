import { SafeAreaView, StyleSheet, Text, View, StatusBar } from 'react-native'
import React from  'react'
import Slider from './src/components/Home/Slider'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PreLogin from './src/components/Auth/PreLogin';
import Login from './src/components/Auth/Login';
import Register from './src/components/Auth/Register';

export type StackParams = {
  Home: any;
  PreLogin: any;
  Login: any;
  Register: any;
}
const Stack = createNativeStackNavigator<StackParams>();
const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle='light-content'/>
      <Stack.Navigator>
      <Stack.Screen name='Home' component={Slider}
      options={{
        title: '',
        headerStyle: { backgroundColor: 'black' },
      }}
      />
     <Stack.Screen name='PreLogin' component={PreLogin}
      options={{
        title: '',
        headerStyle: { backgroundColor: 'black' },
        headerTintColor: 'white'
      }}
      />
      <Stack.Screen name='Login' component={Login}
      options={{
        title: '',
        headerStyle: { backgroundColor: 'black' },
        headerTintColor: 'white'
      }}
      />
      <Stack.Screen name='Register' component={Register}
      options={{
        title: '',
        headerStyle: { backgroundColor: 'black' },
        headerTintColor: 'white'
      }}
      />
      </Stack.Navigator>
    </NavigationContainer>
    // <SafeAreaView>
    //   <Register />
    // </SafeAreaView>
      
  )
}

export default App

const styles = StyleSheet.create({})