import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React, { FunctionComponent } from 'react'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackParams } from '../../../App'
import StyleCommon from '../../common/CommonStyles'
import Colors from '../../common/Colors'
import Button from '../../common/Button'
import Spacing from '../../common/Spacing'

const Login: FunctionComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
    return (
        <View style={[StyleCommon.container, StyleCommon.blackBackground, StyleCommon.alignItemCenter]}>
            <View style={styles.content}>
                <Text style={[StyleCommon.title, StyleCommon.opacity87, StyleCommon.whiteText]}>Welcome to UpTodo</Text>
                <Text numberOfLines={2} ellipsizeMode='tail'
                    style={[
                        StyleCommon.description,
                        styles.question,
                        StyleCommon.whiteText]}>
                    Please login to your account or create new account to continue
                </Text>
            </View>
            <View style={Spacing.marginTop350}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Login')
                }} style={[Button.largeButton, StyleCommon.mainButtonColor,{marginBottom: 50}]}>
                    <Text style={[StyleCommon.normalText]}>LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Register')
                }} style={[Button.largeButton,styles.createButton]}>
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
    createButton: {
        borderWidth: 2,
        backgroundColor: Colors.PRIMARY1
    },
    question: {
        width: 300, marginTop: 50, opacity: 0.47
    },
    
})