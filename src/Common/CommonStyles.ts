import { Dimensions, StyleSheet } from 'react-native'
import Colors from './Colors'

const { width, height } = Dimensions.get('screen')

const StyleCommon = StyleSheet.create({
    container : {
        width,
        height
    },
    introImg : {
        width: '50%',
        height: '40%',
    },
    icon : {
        width: '10%',
        height: '50%'
    },
    title : {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white'
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
    },
    homeTitleText: {
        color: 'white',
        fontSize: 20
    },
    homeHeaderNav: {
        width: 42,
        height: 42
    },
    homeHeader: {
        flexDirection: 'row',
        justifyContent:'space-between',
        marginHorizontal: 20,
        alignItems: 'center'
    },
    iconNav : {
        width: 25,
        height: 25
    },
    textBold: {
        fontWeight: 'bold'
    },
    spaceLineWrap: {
        flexDirection: 'row',
        alignItems: 'center', 
        width: 327, 
        marginTop: 8 
    },
    spaceLine: {
        flex: 1, 
        height: 0.5, 
        backgroundColor: 'white'
    },
    alignItemCenter: {
        alignItems: 'center'
    },
    fontSize20: {
        fontSize: 20
    },
    centerItemWrap: {
        flexDirection: 'row',
        justifyContent: 'space-between' 
    },
    rowItemCenter: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    height37: {
        height: 37
    },
    defaultOpacity: {
        opacity: 1
    },
    blackBackground: {
        backgroundColor: Colors.BLACK
    },
    opacity87: {
        opacity: 0.87
    },
    halfOpacity: {
        opacity: 0.5
    },
    lineSeperateWrap: {
        flexDirection: 'row', alignItems: 'center', width: 327
    },
    lineSeparate: {
        flex: 1, height: 1, backgroundColor: 'white'
    },
    orText: {
        width: 20,
        textAlign: 'center',
        color: Colors.WHITE
    },
    whiteText: {
        color: Colors.WHITE
    },
    textError: {
        color: Colors.RED
    },
    mainButtonColor: {
        backgroundColor: Colors.PRIMARY1
    },
    greyBackground: {
        backgroundColor: Colors.OVERLAY
    },
    borderRadius8: {
        borderRadius: 8
    },
    borderRadius21: {
        borderRadius: 21
    },
    flexDirectionRow: {
        flexDirection: 'row'
    }
})
export default StyleCommon
