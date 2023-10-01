import { FlatList, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import styles from './style'
import StyleCommon from '../../../common/CommonStyles'
import Spacing from '../../../common/Spacing'
import colorCode from '../../../constant/colorCode'
import Button from '../../../common/Button'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Font from '../../../common/Font'
interface Props {
  visibleAddCategory: () => void
  switchVisibleAddCategoryButton: () => void
}
const AddCategory: React.FC<Props> = ({ visibleAddCategory, switchVisibleAddCategoryButton }) => {
  const [focusCategory, setFocusCategory] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [categoryColor, setCategoryColor] = useState('');
  const [filePath, setFilePath] = useState(null);
  const navigator = useNavigation();
  useFocusEffect(() => {
    navigator.setOptions({
      header: ({ }) => null, // Ẩn nút "Back"
    });
  });
  const chooseFile = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false
    };
    // @ts-ignore
    launchImageLibrary(options, (response: any) => {

      if (response.didCancel) {
        setFilePath(null);
      } else if (response.error) {
        setFilePath(null);
      } else if (response.customButton) {
        console.log(
          'User tapped custom button: ',
          response.customButton
        );
      } else {
        let source = response.uri || response.assets?.[0]?.uri;
        setFilePath(source);
      }
    });
  };
  const handleCreate = async () => {
    let tempCate: any[] = []
    let userData = await AsyncStorage.getItem('loginUser')
   await AsyncStorage.getItem('categories').then(async (c) => {
      tempCate = c ? JSON.parse(c) : [];
      if (userData !== null) {
        let user = JSON.parse(userData)
        let index = tempCate.findIndex(c => c.username == user);
        if (!tempCate.some((s) => s.username == user)) {
          tempCate.push({
            username: user,
            categories: [{
              id: 1,
              name: categoryName,
              color: categoryColor,
              icon: filePath
            }]
          })
        }
        else{
          tempCate[index].categories.push({
            id: tempCate[index].categories.length + 1,
            name: categoryName,
            color: categoryColor,
            icon: filePath
          })
        }
        await AsyncStorage.setItem('categories', JSON.stringify(tempCate))
        switchVisibleAddCategoryButton()
        visibleAddCategory()
      }
    })
    
  }
  return (
    <View style={[ StyleCommon.container, styles.container]}>
      <View style={Spacing.marginTop70}>
        <Text style={[StyleCommon.title, StyleCommon.fontSize20]}>Create new category</Text>
        <View style={Spacing.marginVertical15}>
          <Text style={[StyleCommon.formLabel]}>Category name:</Text>
          <TextInput
            onChangeText={text => {
              setFocusCategory(true)
              if (text.length === 0) {
                setFocusCategory(false)
              }
              setCategoryName(text)
            }}
            style={focusCategory == true ? [StyleCommon.formInput, StyleCommon.defaultOpacity] : [StyleCommon.formInput]}
            placeholderTextColor='white'
            placeholder='Category name'
            defaultValue={categoryName}
          />
        </View>
        <View style={Spacing.marginVertical15}>
          <Text style={[StyleCommon.formLabel]}>Category icon:</Text>
          <TouchableOpacity onPress={chooseFile}>
            {filePath !== null ?
              <View style={styles.fileNotSelect}>
                <Image style={[StyleCommon.iconNav]} source={{ uri: filePath }} />
              </View> :
              <View style={styles.fileSelected}>
                <Text style={[StyleCommon.normalText, Font.fontSize12]}>Choose icon from library</Text>
              </View>
            }

          </TouchableOpacity>
        </View>
        <View>
          <Text style={[StyleCommon.formLabel]}>Category color: </Text>
          <FlatList
            data={colorCode}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={(color) => (
              <TouchableOpacity onPress={() => {
                setCategoryColor(color.item)
              }}>
                <View style={[styles.cateColor, { backgroundColor: `${color.item}` }]}>
                  {categoryColor == color.item && <Image source={require('../../../assets/CategoryIcon/tick.png')} style={styles.cateIcon} />}
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={styles.categoryButton}>
          <TouchableOpacity onPress={() => { visibleAddCategory() }} style={[Button.buttonCrud]}>
            <Text style={[StyleCommon.normalText, styles.cancelText]}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCreate} style={[Button.buttonCrud, StyleCommon.mainButtonColor]}>
            <Text style={[StyleCommon.normalText]}>Create Category</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  )
}

export default AddCategory

