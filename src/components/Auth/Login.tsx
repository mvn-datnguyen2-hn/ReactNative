import { StyleSheet, Text, View, Dimensions, TouchableOpacity, TextInput, Image } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackParams } from '../../../App'
import StyleCommon from '../../Common/CommonStyles'
import Colors from '../../Common/Colors'
import Button from '../../Common/Button'
const { width } = Dimensions.get('screen')
const Login = () => {
    const [focusUsername, setFocusUsername] = useState(false)
    const [focusPassword, setFocusPassword] = useState(false)
    const [loginEnable, setLoginEnable] = useState(false)
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
    return (
        <View style={[StyleCommon.container, Colors.backgroundColor, {alignItems:'center'}]}>
            <View style={styles.content}>
                <Text style={[StyleCommon.title, { opacity: 0.87 }, Colors.white]}>Login</Text>
                <View style={styles.username}>
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
                        }}
                        style={focusUsername == true ? [StyleCommon.formInput,{opacity: 1}] : [StyleCommon.formInput]}
                        placeholderTextColor='white'
                        placeholder='Enter your Username'
                    />
                </View>
                <View style={styles.password}>
                    <Text style={[StyleCommon.formLabel]}>Password</Text>
                    <TextInput
                        style={focusPassword == true ? [StyleCommon.formInput,{opacity: 1, letterSpacing: 3}] : [StyleCommon.formInput, {letterSpacing: 3}]}
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
                        }}
                    />
                </View>
            </View>
            <View style={styles.bottomButton}>
                {loginEnable ?
                    <TouchableOpacity onPress={() => { navigation.navigate('Home')}} style={[Button.largeButton, Colors.mainButton,{marginBottom: 50}]}>
                        <Text style={[StyleCommon.normalText]}>Login</Text>
                    </TouchableOpacity> :
                    <TouchableOpacity disabled={true} style={[Button.largeButton, Colors.mainButton,{marginBottom: 50, opacity: 0.5}]}>
                        <Text style={[StyleCommon.normalText]}>Login</Text>
                    </TouchableOpacity>
                }

            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', width: 327 }}>
                <View style={{ flex: 1, height: 1, backgroundColor: 'white' }} />
                <View>
                    <Text style={{ width: 20, textAlign: 'center', color: 'white' }}>or</Text>
                </View>
                <View style={{ flex: 1, height: 1, backgroundColor: 'white' }} />
            </View>
            <View style={styles.bottomButtonLogin3th}>
                <TouchableOpacity onPress={() => { }} style={[Button.buttonAuth3th, {marginBottom: 20}]}>
                    <Image
                        source={require('../../assets/3thLogo/gglogo.png')}
                        resizeMode='contain'
                        style={[StyleCommon.icon]}
                    />
                    <Text style={[StyleCommon.normalText, {marginHorizontal: 3}]}>Login with Google</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { }} style={[Button.buttonAuth3th, {marginBottom: 20}]}>
                    <Image
                        source={require('../../assets/3thLogo/appleicon.png')}
                        resizeMode='contain'
                        style={[StyleCommon.icon]}
                    />
                    <Text style={[StyleCommon.normalText, {marginHorizontal: 3}]}>Login with Apple</Text>
                </TouchableOpacity>
            </View>
            <View style={[StyleCommon.bottomTextBox]}>
                <Text style={[StyleCommon.bottomText, {opacity: 0.87}]}>Don't have an account? </Text>
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
    bottomButton: {
        marginTop: 80
    },
    username: {
        marginTop: 50
    },
    password: {
        marginTop: 20
    },
    bottomButtonLogin3th: {
        marginTop: 30
    }
})