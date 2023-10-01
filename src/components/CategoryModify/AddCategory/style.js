import { StyleSheet} from 'react-native'
import Colors from '../../../common/Colors'
const styles = StyleSheet.create({
    container: {
      backgroundColor: Colors.BLACK,
      paddingHorizontal: 20
    },
    fileNotSelect: {
      backgroundColor: Colors.OVERLAY, 
      width: 42, 
      height: 42, 
      borderRadius: 6, 
      justifyContent: 'center', 
      alignItems: 'center' 
    },
    fileSelected: {
      backgroundColor: Colors.OVERLAY, 
      width: 154, 
      height: 37, 
      borderRadius: 6, 
      justifyContent: 'center',
    },
    cateColor: {
      width: 36,
      height: 36,
      borderRadius: 18,
      borderColor: 'white',
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 3
    },
    categoryButton: {
      flexDirection: 'row',
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
      justifyContent: 'space-between',
      height: 50,
      bottom: -400
    },
    cancelText: {
      color: Colors.PRIMARY2
    },
    cateIcon: {
        width: 15,
        height: 15
    }
  })
export default styles
