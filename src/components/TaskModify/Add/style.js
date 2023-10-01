import { StyleSheet } from 'react-native'
import Colors from '../../../common/Colors'
const styles = StyleSheet.create({
    addTask: {
        width: 375,
        height: 228,
        paddingHorizontal: 20
    },
    bottomNav: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    settingProp: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '40%'
    },
    calendar: {
        width: 327
    },
    calendarButton: {
        backgroundColor: '#363636',
        flexDirection: 'row',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        justifyContent: 'space-between',
        height: 50,
        paddingHorizontal: 3
    },
    priority: {
        width: 327,
        height: 350,
    },
    category: {
        width: 327,
        height: 530,
    },
    priorityIcon: {
        width: 24,
        height: 24,
        marginTop: 8
    },
    categoryIcon: {
        width: 32,
        height: 32
    },
    priorityButton: {
        backgroundColor: '#363636',
        flexDirection: 'row',
        borderRadiusp: 5,
        justifyContent: 'space-between',
        paddingHorizontal: 3,
        marginTop: 20
    },
    categoryItem: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginHorizontal: 22,
    },
    cancelText: {
        color: Colors.PRIMARY2
    },
    priorityBackground: {
        backgroundColor: Colors.PRIORITYITEMBACKGROUND,
    },
    priorityItem: {
        alignItems: 'center',
        marginTop: 20,
        marginHorizontal: 9
    },
    createCateNewButton: {
        backgroundColor: Colors.GREENSOFT
    },
    createCateNewText: {
        fontSize: 14,
        marginTop: 8
    },
    cateBorder: {
        borderWidth: 3,
        borderColor: Colors.PRIMARY1
    },
})
export default styles
