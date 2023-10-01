import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
    search: {
        flexDirection: 'row',
        borderWidth: 1,
        opacity: 0.8,
        borderColor: 'white',
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    tag: {
        width: 76,
        height: 31,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    completeTag: {
        width: 102,
        height: 31,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cateTag: {
        width: 87,
        height: 29,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    priorityTag: {
        width: 42,
        height: 29,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#8875FF'
    },
    dot: {
        width: 16,
        height: 16,
        borderRadius: 50,
        borderColor: '#fff',
        borderWidth: 1,
        marginLeft: 10,
    },
    task: {
        height: 72,
        borderRadius: 5,
        justifyContent: 'center',
        marginBottom: 20
    },
    cateIcon: {
        width: 12.25,
        height: 9.29
    },
    completeTask: {
        height: 72,
        borderRadius: 5,
        justifyContent: 'center',
        marginTop: 10
    }
})
export default styles
