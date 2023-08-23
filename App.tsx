import { SafeAreaView, StyleSheet, Text, View, StatusBar } from 'react-native'
import React from  'react'
import Onboading from './src/components/Intro/Onboading'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Start from './src/components/Auth/Start';
import Login from './src/components/Auth/Login';
import Register from './src/components/Auth/Register';
import Home from './src/components/Home/Home';

export type StackParams = {
  Home: any;
  Start: any;
  Login: any;
  Register: any;
  Onboading: any;
}
const Stack = createNativeStackNavigator<StackParams>();
const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle='light-content'/>
      <Stack.Navigator>
      <Stack.Screen name='Onboading' component={Onboading}
      options={{
        title: '',
        headerStyle: { backgroundColor: 'black' },
      }}
      />
     <Stack.Screen name='Start' component={Start}
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
      <Stack.Screen name='Home' component={Home}
      options={{
        title: '',
        headerStyle: { backgroundColor: 'black' },
        headerTintColor: 'white'
      }}
      />
      </Stack.Navigator>
    </NavigationContainer>
    // <SafeAreaView>
    //   <Home />
    // </SafeAreaView>
      
  )
}

export default App

const styles = StyleSheet.create({})