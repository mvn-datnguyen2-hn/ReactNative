import { StyleSheet } from 'react-native'
import Colors from '../../../common/Colors'
const styles = StyleSheet.create({
    addTask: {
        width: 375,
        height: 228,
        paddingHorizontal: 20
    },
    content: {
        justifyContent: 'center',
        marginHorizontal: 20,
        marginVertical: 30
    },
    dot: {
        width: 16,
        height: 16,
        borderRadius: 50,
        borderColor: '#fff',
        borderWidth: 1,
        marginTop: 5,
    },
    tag: {
        width: 108,
        height: 37,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cateTag: {
        width: 118,
        height: 40,
        borderRadius: 6,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    priorityTag: {
        width: 70,
        height: 37,
        borderRadius: 6,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
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
        backgroundColor: Colors.PRIMARY2
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
    background: {
        backgroundColor: Colors.BLACK
    },
    editTitleButton: {
        backgroundColor: Colors.OVERLAY,
        flexDirection: 'row',
        borderRadiusp: 5,
        marginHorizontal: 20,
        marginTop: 10
    },
    navigate: {
        justifyContent: 'space-between'
    },
    cancelEdit: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        borderRadius: 4
    },
    reset: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    },
    workWrap: {
        flexDirection: 'row', marginBottom: 10
    },
    work: {
        fontSize: 20, marginLeft: 20
    },
    descript: {
        textAlign: 'left', opacity: 0.8, marginLeft: 37
    },
    time: {
        fontSize: 16, marginLeft: 8
    },
    editTaskTitleWrap: {
        borderRadius: 8
    },
    cateShow: {
        width: 12.25, height: 9.29, marginRight: 10
    },
    priorityShow: {
        width: 14, height: 14, marginRight: 5
    },
    deleteText: {
        fontSize: 16,
        marginLeft: 8,
        color: Colors.RED
    },
    completeText: {
        fontSize: 16,
        marginLeft: 8,
        color: Colors.GREEN
    },
    editButton: {
        height: 48,
        justifyContent: 'center',
        borderRadius: 3,
    }
})
export default styles
