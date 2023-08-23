import { StyleSheet, Text, View, Dimensions, TouchableOpacity, TextInput, Image } from 'react-native'
import React, { FunctionComponent, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackParams } from '../../../App'
import StyleCommon from '../../Common/CommonStyles'
import Colors from '../../Common/Colors'
import Button from '../../Common/Button'
const { width, height } = Dimensions.get('screen')
const Register: FunctionComponent = () => {
    const [focusUsername, setFocusUsername] = useState(false)
    const [focusPassword, setFocusPassword] = useState(false)
    const [focusConfirmPassword, setConfirmPassword] = useState(false)
    const [registerEnable, setRegisterEnable] = useState(false)
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
    return (
        <View style={[StyleCommon.container, Colors.backgroundColor]}>
            <View style={styles.content}>
                <Text style={[StyleCommon.title, { opacity: 0.87 }, Colors.white]}>Register</Text>
                <View style={styles.username}>
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
                            if (focusUsername && focusConfirmPassword) {
                                setRegisterEnable(true)
                            }
                            if (text.length === 0) {
                                setFocusPassword(false)
                                setRegisterEnable(false)
                            }
                        }}
                    />
                </View>
                <View style={styles.password}>
                    <Text style={[StyleCommon.formLabel]}>ConfirmPassword</Text>
                    <TextInput
                        style={focusConfirmPassword == true ? [StyleCommon.formInput,{opacity: 1, letterSpacing: 3}] : [StyleCommon.formInput, {letterSpacing: 3}]}
                        placeholderTextColor='white'
                        placeholder='••••••••••••'
                        secureTextEntry={true}
                        onChangeText={text => {
                            setConfirmPassword(true)
                            if (focusUsername && focusPassword) {
                                setRegisterEnable(true)
                            }
                            if (text.length === 0) {
                                setConfirmPassword(false)
                                setRegisterEnable(false)
                            }
                        }}
                    />
                </View>
            </View>
            <View style={styles.bottomButton}>
                {registerEnable ?
                    <TouchableOpacity onPress={() => { }} style={[Button.largeButton, Colors.mainButton,{marginBottom: 50}]}>
                        <Text style={[StyleCommon.normalText]}>Register</Text>
                    </TouchableOpacity> :
                    <TouchableOpacity disabled={true} style={[Button.largeButton, Colors.mainButton,{marginBottom: 50, opacity: 0.5}]}>
                        <Text style={[StyleCommon.normalText]}>Register</Text>
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
            <View style={styles.bottomButtonRegister3th}>
                <TouchableOpacity onPress={() => { }} style={[Button.buttonAuth3th, {marginBottom: 20}]}>
                    <Image
                        source={require('../../assets/gglogo.png')}
                        resizeMode='contain'
                        style={[StyleCommon.icon]}
                    />
                    <Text style={[StyleCommon.normalText, {marginHorizontal: 3}]}>Register with Google</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { }} style={[Button.buttonAuth3th, {marginBottom: 20}]}>
                    <Image
                        source={require('../../assets/appleicon.png')}
                        resizeMode='contain'
                        style={[StyleCommon.icon]}
                    />
                    <Text style={[StyleCommon.normalText, {marginHorizontal: 3}]}>Register with Apple</Text>
                </TouchableOpacity>
            </View>
            <View style={[StyleCommon.bottomTextBox]}>
                <Text style={[StyleCommon.bottomText, {opacity: 0.87}]}>Already have an account? </Text>
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
    bottomButton: {
        marginTop: 50
    },
    username: {
        marginTop: 30
    },
    password: {
        marginTop: 20
    },
    bottomButtonRegister3th: {
        marginTop: 30
    }
})