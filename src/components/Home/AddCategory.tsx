import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React, {useState} from 'react'
import Colors from '../../Common/Colors'
import StyleCommon from '../../Common/CommonStyles'
import colorCode from '../../data/colorCode'
import Button from '../../Common/Button'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddCategory = () => {
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
    launchImageLibrary(options ,(response: any) => {

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
    let tempCate = []
    let categories = await AsyncStorage.getItem('categories')
    if (categories !== null) {
      tempCate = JSON.parse(categories)
      tempCate.push({
        id: tempCate.length + 1,
        name: categoryName,
        color: categoryColor,
        icon: filePath
      })
      console.log(tempCate);
      await AsyncStorage.setItem('categories', JSON.stringify(tempCate))
      return
    }
    tempCate.push({
      id: 1,
      name: categoryName,
      color: categoryColor,
      icon: filePath
    })
    console.log(tempCate);
    
    await AsyncStorage.setItem('categories', JSON.stringify(tempCate))
  }
  return (
    <View style={[Colors.backgroundColor, StyleCommon.container, {paddingHorizontal: 20}]}>
        <Text style={[StyleCommon.title, {fontSize: 20}]}>Create new category</Text>
        <View style={{marginVertical: 15}}>
            <Text style={[StyleCommon.formLabel]}>Category name:</Text>
            <TextInput
              onChangeText={text => {
                setFocusCategory(true)
                if (text.length === 0) {
                  setFocusCategory(false)
                }
                setCategoryName(text)
              }}
              style={focusCategory == true ? [StyleCommon.formInput, { opacity: 1 }] : [StyleCommon.formInput]}
              placeholderTextColor='white'
              placeholder='Category name'
              defaultValue={categoryName}
            />
        </View>
        <View style={{marginVertical: 15}}>
            <Text style={[StyleCommon.formLabel]}>Category icon:</Text>
            <TouchableOpacity onPress={chooseFile}>
              {filePath !== null ? 
              <View style={[Colors.popUp, {width: 42, height: 42, borderRadius: 6, justifyContent: 'center', alignItems: 'center'}]}>
              <Image style={[StyleCommon.iconNav]} source={{ uri: filePath }}/>
              </View> : 
              <View style={[Colors.popUp, {width: 154, height: 37, borderRadius: 6, justifyContent: 'center'}]}>
              <Text style={[StyleCommon.normalText,{fontSize: 11}]}>Choose icon from library</Text>
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
              setCategoryColor(color.item)}}>
            <View style={[styles.cateColor,{backgroundColor:`${color.item}`}]}>
             {categoryColor == color.item && <Image source={require('../../assets/CategoryIcon/tick.png')} style={{width: 15, height: 15}}/>}
             </View>
            </TouchableOpacity>
          )}
          />
        </View>
        <View style={styles.categoryButton}>
            <TouchableOpacity onPress={() => {navigator.goBack()}} style={[Button.buttonCrud]}>
              <Text style={[StyleCommon.normalText, Colors.cancelText]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCreate} style={[Button.buttonCrud, Colors.mainButton]}>
              <Text style={[StyleCommon.normalText]}>Create Category</Text>
            </TouchableOpacity>
          </View>
    </View>
  )
}

export default AddCategory

const styles = StyleSheet.create({
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
    }
})