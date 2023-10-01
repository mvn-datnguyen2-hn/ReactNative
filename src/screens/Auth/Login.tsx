import { StyleSheet, Text, View, Dimensions, TouchableOpacity, TextInput, Image } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackParams } from '../../../App'
import StyleCommon from '../../common/CommonStyles'
import Spacing from '../../common/Spacing'
import Colors from '../../common/Colors'
import Button from '../../common/Button'
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('screen')
const Login = () => {
    const [focusUsername, setFocusUsername] = useState(false)
    const [focusPassword, setFocusPassword] = useState(false)
    const [loginEnable, setLoginEnable] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [invalid, setInvalid] = useState(false)
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
    const handleLogin = async () => {
        setInvalid(false)
        let tempUserData: any[] = []
        let userData = await AsyncStorage.getItem('userData')
        if (userData !== null) {
            tempUserData = JSON.parse(userData)
        }
        if (tempUserData.find((c) => c.username == username && c.password !== password) || !tempUserData.some((c) => c.username == username)) {
            setInvalid(true)
            return;
        }
        await AsyncStorage.setItem('loginUser', JSON.stringify(username))
        navigation.navigate('Home')

    }
    return (
        <View style={
            [StyleCommon.container,
            StyleCommon.blackBackground,
            StyleCommon.alignItemCenter]
        }
        >
            <View style={styles.content}>
                <Text style={
                    [StyleCommon.title,
                    styles.textLogin
                    ]}>Login</Text>
                <View style={Spacing.marginTop50}>
                    <Text style={[StyleCommon.formLabel]}>Username</Text>
                    <TextInput
                        onChangeText={text => {
                            setFocusUsername(true)
                            if (focusPassword) {
                                setLoginEnable(true)
                            }
                            if (text.length === 0) {
                                setFocusUsername(false)
                                setLoginEnable(false)
                            }
                            setUsername(text)
                        }}
                        style={focusUsername == true ? [StyleCommon.formInput, StyleCommon.defaultOpacity] : [StyleCommon.formInput]}
                        placeholderTextColor='white'
                        placeholder='Enter your Username'
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
                            if (focusUsername) {
                                setLoginEnable(true)
                            }
                            if (text.length === 0) {
                                setFocusPassword(false)
                                setLoginEnable(false)
                            }
                            setPassword(text)
                        }}
                    />
                </View>
                {invalid == true &&
                    <Text style={StyleCommon.textError}>Invalid username or password</Text>
                }
            </View>
            <View style={Spacing.marginTop80}>
                {loginEnable ?
                    <TouchableOpacity onPress={handleLogin} style={[Button.largeButton, StyleCommon.mainButtonColor, Spacing.marginBottom50]}>
                        <Text style={[StyleCommon.normalText]}>Login</Text>
                    </TouchableOpacity> :
                    <TouchableOpacity disabled={true} style={[Button.largeButton, StyleCommon.mainButtonColor, styles.loginDisable]}>
                        <Text style={[StyleCommon.normalText]}>Login</Text>
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
                <TouchableOpacity onPress={() => { }} style={[Button.buttonAuth3th, Spacing.marginBottom20]}>
                    <Image
                        source={require('../../assets/3thLogo/gglogo.png')}
                        resizeMode='contain'
                        style={[StyleCommon.icon]}
                    />
                    <Text style={[StyleCommon.normalText, Spacing.marginHorizontal3]}>Login with Google</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { }} style={[Button.buttonAuth3th, Spacing.marginBottom20]}>
                    <Image
                        source={require('../../assets/3thLogo/appleicon.png')}
                        resizeMode='contain'
                        style={[StyleCommon.icon]}
                    />
                    <Text style={[StyleCommon.normalText, Spacing.marginHorizontal3]}>Login with Apple</Text>
                </TouchableOpacity>
            </View>
            <View style={[StyleCommon.bottomTextBox]}>
                <Text style={[StyleCommon.bottomText, StyleCommon.opacity87]}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => { navigation.navigate('Register') }}>
                    <Text style={[StyleCommon.bottomText]}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    content: {
        width,
        marginLeft: 60,
        marginTop: 50,
        textAlign: 'left'
    },
    textLogin: {
        opacity: 0.87,
        color: Colors.WHITE
    },
    loginDisable: {
        marginBottom: 50, opacity: 0.5
    },
    letterSpacing3: {
        letterSpacing: 3
    }
})