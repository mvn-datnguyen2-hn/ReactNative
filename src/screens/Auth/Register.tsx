import { StyleSheet, Text, View, Dimensions, TouchableOpacity, TextInput, Image } from 'react-native'
import React, { FunctionComponent, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackParams } from '../../../App'
import StyleCommon from '../../common/CommonStyles'
import Button from '../../common/Button'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spacing from '../../common/Spacing'


const { width } = Dimensions.get('screen')
const Register: FunctionComponent = () => {
    const [focusUsername, setFocusUsername] = useState(false)
    const [focusPassword, setFocusPassword] = useState(false)
    const [focusConfirmPassword, setFocusConfirmPassword] = useState(false)
    const [registerEnable, setRegisterEnable] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [notMatchPassword, setNotMatchPassword] = useState(false)
    const [matchedUsername, setMatchedUsername] = useState(false)
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
    let newData: any[] = [];
    const handleRegister = async () => {
        //await AsyncStorage.removeItem('userData');
        setMatchedUsername(false)
        setNotMatchPassword(false)
        if (password != confirmPassword) {
            setNotMatchPassword(true)
            return;   
        }
        let tempUserData = []
        let userData = await AsyncStorage.getItem('userData');
        if (userData !== null) {
            newData = [];
            tempUserData = JSON.parse(userData);      
            console.log(tempUserData);
                  
            Object.values(tempUserData).map((value) => {
                newData.push(value)
            });
        }
        if (newData.find((c) => c.username == username)) {
            setMatchedUsername(true)
            setNotMatchPassword(false)
            return;
        }
        newData.push({username: username, password: password});
        console.log(newData);
        
        await AsyncStorage.setItem('userData', JSON.stringify(newData))
            
        navigation.navigate('Login')
    }
    return (
        <View style={[StyleCommon.container, StyleCommon.blackBackground, {alignItems:'center'}]}>
            <View style={styles.content}>
                <Text style={[StyleCommon.title, StyleCommon.opacity87, StyleCommon.whiteText]}>Register</Text>
                <View style={Spacing.marginTop30}>
                    <Text style={[StyleCommon.formLabel]}>Username</Text>
                    <TextInput
                        onChangeText={text => {
                            setFocusUsername(true)
                            if (focusPassword && focusConfirmPassword) {
                                setRegisterEnable(true)
                            }
                            if (text.length === 0) {
                                setFocusUsername(false)
                                setRegisterEnable(false)
                            }
                            setUsername(text)
                        }}
                        style={focusUsername == true ? [StyleCommon.formInput,StyleCommon.defaultOpacity] : [StyleCommon.formInput]}
                        placeholderTextColor='white'
                        placeholder='Enter your Username'
                        value={username}
                    />
                </View>
                <View style={Spacing.marginTop20}>
                    <Text style={[StyleCommon.formLabel]}>Password</Text>
                    <TextInput
                        style={[styles.letterSpacing3, focusPassword == true ? [StyleCommon.formInput, StyleCommon.defaultOpacity] : [StyleCommon.formInput]]}
                        placeholderTextColor='white'
                        placeholder='••••••••••••'
                        secureTextEntry={true}
                        onChangeText={text => {
                            setFocusPassword(true)
                            if (focusUsername && focusConfirmPassword) {
                                setRegisterEnable(true)
                            }
                            if (text.length === 0) {
                                setFocusPassword(false)
                                setRegisterEnable(false)
                            }
                            setPassword(text)
                        }}
                        value={password}
                    />
                </View>
                <View style={Spacing.marginTop20}>
                    <Text style={[StyleCommon.formLabel]}>ConfirmPassword</Text>
                    <TextInput
                        style={[styles.letterSpacing3, focusConfirmPassword == true ? [StyleCommon.formInput, StyleCommon.defaultOpacity] : [StyleCommon.formInput]]}
                        placeholderTextColor='white'
                        placeholder='••••••••••••'
                        secureTextEntry={true}
                        onChangeText={text => {
                            setFocusConfirmPassword(true)
                            if (focusUsername && focusPassword) {
                                setRegisterEnable(true)
                            }
                            if (text.length === 0) {
                                setFocusConfirmPassword(false)
                                setRegisterEnable(false)
                            }
                            setConfirmPassword(text)
                        }}
                    />
                </View>
                { matchedUsername == true && 
                    <Text style={StyleCommon.textError}>Username is already used</Text>
                    }
                { notMatchPassword == true && 
                    <Text style={StyleCommon.textError}>Password do not match.</Text>
                    }
            </View>
            <View style={Spacing.marginTop50}>
                {registerEnable ?
                    <TouchableOpacity onPress={handleRegister} style={[Button.largeButton, StyleCommon.mainButtonColor,Spacing.marginBottom50]}>
                        <Text style={[StyleCommon.normalText]}>Register</Text>
                    </TouchableOpacity> :
                    <TouchableOpacity disabled={true} style={[Button.largeButton, StyleCommon.mainButtonColor,styles.loginDisable]}>
                        <Text style={[StyleCommon.normalText]}>Register</Text>
                    </TouchableOpacity>
                }

            </View>
            <View style={StyleCommon.lineSeperateWrap}>
                <View style={StyleCommon.lineSeparate} />
                <View>
                    <Text style={StyleCommon.orText}>or</Text>
                </View>
                <View style={StyleCommon.lineSeparate} />
            </View>
            <View style={Spacing.marginTop30}>
                <TouchableOpacity onPress={() => { }} style={[Button.buttonAuth3th, {marginBottom: 20}]}>
                    <Image
                        source={require('../../assets/3thLogo/gglogo.png')}
                        resizeMode='contain'
                        style={[StyleCommon.icon]}
                    />
                    <Text style={[StyleCommon.normalText, {marginHorizontal: 3}]}>Register with Google</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { }} style={[Button.buttonAuth3th, {marginBottom: 20}]}>
                    <Image
                        source={require('../../assets/3thLogo/appleicon.png')}
                        resizeMode='contain'
                        style={[StyleCommon.icon]}
                    />
                    <Text style={[StyleCommon.normalText, Spacing.marginHorizontal3]}>Register with Apple</Text>
                </TouchableOpacity>
            </View>
            <View style={[StyleCommon.bottomTextBox]}>
                <Text style={[StyleCommon.bottomText, StyleCommon.opacity87]}>Already have an account? </Text>
                <TouchableOpacity onPress={() => { navigation.navigate('Login') }}>
                    <Text style={[StyleCommon.bottomText]}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Register

const styles = StyleSheet.create({
    content: {
        width,
        marginLeft: 60,
        textAlign: 'left'
    },
    letterSpacing3: {
        letterSpacing: 3
    },
    loginDisable: {
        marginBottom: 50, opacity: 0.5
    },
})