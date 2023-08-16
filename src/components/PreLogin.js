import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
const { width, height } = Dimensions.get('screen')

const Login = () => {
  return (
    <View style={styles.container}>
        <View style={styles.content}>
            <Text style={styles.title}>Welcome to UpTodo</Text>
            <Text numberOfLines={2} ellipsizeMode='tail' style={styles.description}>Please login to your account or create new account to continue</Text>
        </View>
        <View style={styles.bottomButton}>
                <TouchableOpacity onPress={() => {}} style={styles.buttonLogin}>
                    <Text style={styles.login}>LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonCreate}>
                    <Text style={styles.create}>CREATE ACCOUNT</Text>
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
        flex: 0.4,
        marginTop: 100,
        alignItems: 'center',
    },
    description: {
        textAlign: 'center',
        width: 300,
        fontSize: 15,
        marginTop: 50,
        opacity: 0.47,
        color: 'white',
    },
    title: {
        fontSize: 30,
        opacity: 0.87,
        fontWeight: 'bold',
        color: 'white',
    },
    bottomButton: {
        marginTop:350
    },
    login: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    },
    create: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    buttonLogin: {
        backgroundColor: '#8875FF',
        width: 327,
        height: 48,
        justifyContent: 'center',
        borderRadius: 3,
        marginBottom: 50
    },
    buttonCreate: {
        width: 327,
        height: 48,
        justifyContent: 'center',
        borderRadius: 3,
        borderWidth: 2,
        borderColor: '#8875FF'
    }
})