import { StyleSheet, Text, View, Dimensions,TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
const { width, height } = Dimensions.get('screen')
const Login = () => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Login</Text>
                <View style={styles.username}>
                    <Text style={styles.usernameLabel}>Username</Text>
                    <TextInput
                    style = {styles.usernameInput}
                    placeholderTextColor='white'
                    placeholder='Enter your Username'
                    />
                </View>
                <View style={styles.password}>
                    <Text style={styles.passwordLabel}>Password</Text>
                    <TextInput
                    style = {styles.passwordInput}
                    placeholderTextColor='white'
                    placeholder='••••••••••••'
                    secureTextEntry={true}
                    />
                </View>
            </View>
            <View style={styles.bottomButton}>
                <TouchableOpacity onPress={() => { }} style={styles.buttonLogin}>
                    <Text style={styles.login}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        width,
        height,
        alignItems: 'center',
        backgroundColor: 'black'
    },
    content: {
        width,
        marginLeft: 60,
        marginTop: 50,
        textAlign: 'left'
    },
    bottomButton: {
        marginTop:80
    },
    login: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    },
    buttonLogin: {
        backgroundColor: '#8875FF',
        width: 327,
        height: 48,
        justifyContent: 'center',
        borderRadius: 3,
        marginBottom: 50
    },
    title: {
        fontSize: 32,
        opacity: 0.87,
        fontWeight: 'bold',
        color: 'white',
    },
    username:{
        marginTop: 50
    },
    usernameLabel:{
        color: 'white',
        marginBottom: 10,
        fontSize: 15
    },
    usernameInput:{
        borderWidth: 0.5,
        opacity: 0.5,
        borderColor: 'white',
        borderRadius: 3,
        height: 48,
        width: 327,
        color: 'white',
        paddingLeft: 10,
        fontSize: 16
    },
    password:{
        marginTop: 20
    },
    passwordLabel:{
        color: 'white',
        marginBottom: 10,
        fontSize: 15
    },
    passwordInput:{
        borderWidth: 0.5,
        opacity: 0.5,
        borderColor: 'white',
        borderRadius: 3,
        height: 48,
        width: 327,
        color: 'white',
        paddingLeft: 10,
        fontSize: 16,
        letterSpacing: 3
    }
})