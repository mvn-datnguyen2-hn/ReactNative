import { Dimensions, StyleSheet } from 'react-native'

const { width, height } = Dimensions.get('screen')

const StyleCommon = StyleSheet.create({
    container : {
        width,
        height,
        alignItems: 'center'
    },
    introImg : {
        width: '50%',
        height: '40%'
    },
    icon : {
        width: '10%',
        height: '50%'
    },
    title : {
        fontSize: 32,
        fontWeight: 'bold',
    },
    description :{
        textAlign: 'center',
        fontSize: 16,
    },
    normalText: {
        fontSize: 16,
        textAlign: 'center',
        color: 'white'
    },
    formLabel: {
        color: 'white',
        marginBottom: 10,
        fontSize: 15
    },
    formInput: {
        borderWidth: 0.5,
        opacity: 0.5,
        borderColor: 'white',
        borderRadius: 3,
        height: 48,
        width: 327,
        color: 'white',
        paddingLeft: 10,
        fontSize: 16,
    },
    bottomTextBox: {
        alignItems: 'center',
        marginTop: 30,
        flexDirection: 'row'
    },
    bottomText: {
        color: 'white',
        fontSize: 12
    }
})
export default StyleCommon
