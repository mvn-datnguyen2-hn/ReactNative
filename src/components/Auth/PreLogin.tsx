import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React, { FunctionComponent } from 'react'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackParams } from '../../../App'
import StyleCommon from '../../Common/CommonStyles'
import Colors from '../../Common/Colors'
import Button from '../../Common/Button'

const Login: FunctionComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
    return (
        <View style={[StyleCommon.container, Colors.backgroundColor]}>
            <View style={styles.content}>
                <Text style={[StyleCommon.title, { opacity: 0.87 }, Colors.white]}>Welcome to UpTodo</Text>
                <Text numberOfLines={2} ellipsizeMode='tail'
                    style={[
                        StyleCommon.description,
                        { width: 300, marginTop: 50, opacity: 0.47 },
                        Colors.white]}>
                    Please login to your account or create new account to continue
                </Text>
            </View>
            <View style={styles.bottomButton}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Login')
                }} style={[Button.largeButton, Colors.mainButton,{marginBottom: 50}]}>
                    <Text style={[StyleCommon.normalText]}>LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Register')
                }} style={[Button.largeButton,{borderWidth: 2}, Colors.borderColor]}>
                    <Text style={[StyleCommon.normalText]}>CREATE ACCOUNT</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    content: {
        flex: 0.4,
        marginTop: 100,
        alignItems: 'center',
    },
    bottomButton: {
        marginTop: 350
    },
})