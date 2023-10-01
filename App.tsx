import { SafeAreaView, StyleSheet, Text, View, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import Onboading from './src/screens/Intro/Onboading'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Start from './src/screens/Auth/Start';
import Login from './src/screens/Auth/Login';
import Register from './src/screens/Auth/Register';
import Home from './src/screens/Home/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddTask from './src/components/TaskModify/Add/AddTask';
import AddCategory from './src/components/CategoryModify/AddCategory/AddCategory';
import Task from './src/screens/Home/Task';
import EditTask from './src/components/TaskModify/Edit/EditTask';
export type StackParams = {
  Home: any;
  Start: any;
  Login: any;
  Register: any;
  Onboading: any;
  Edit: any;
}
const Stack = createNativeStackNavigator<StackParams>();

const App = () => {
  const [appUsed, setAppUsed] = useState(false);
  useEffect(() => {
    const getUsedStatus = async () => {
      let temp = await AsyncStorage.getItem("HasLauched")
      if (temp) {
        setAppUsed(true)
      }
      else {
        await AsyncStorage.setItem("HasLauched", "abc")
      }
    };
    getUsedStatus().catch((err) => console.log(err));
  }, [])

  return (
    <NavigationContainer>
      <StatusBar barStyle='light-content' />
      <Stack.Navigator>
        {appUsed == true ?
          <Stack.Screen name='Start' component={Start}
            options={{
              title: '',
              headerStyle: { backgroundColor: 'black' },
              headerTintColor: 'white'
            }} />
          :
          <>
            <Stack.Screen name='Onboading' component={Onboading}
              options={{
                title: '',
                headerStyle: { backgroundColor: 'black' },
              }} />
            <Stack.Screen name='Start' component={Start}
              options={{
                title: '',
                headerStyle: { backgroundColor: 'black' },
                headerTintColor: 'white'
              }} />
          </>
        }
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
        <Stack.Screen name='Edit' component={EditTask}
          options={{
            title: '',
            headerStyle: { backgroundColor: 'black' },
            headerTintColor: 'white'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    // <SafeAreaView>
    //   <EditTask></EditTask>
    // </SafeAreaView>

  )
}

export default App

const styles = StyleSheet.create({})