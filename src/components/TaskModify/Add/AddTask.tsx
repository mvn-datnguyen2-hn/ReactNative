import { Text, View, TextInput, TouchableOpacity, Image, FlatList, TouchableWithoutFeedback, Touchable } from 'react-native'
import React, { useEffect, useState } from 'react'
import StyleCommon from '../../../common/CommonStyles'
import { Calendar } from 'react-native-calendars'
import { Overlay } from '@rneui/themed';
import styles from './style'
import Button from '../../../common/Button';
import DatePicker from 'react-native-date-picker';
import priority from '../../../constant/priority';
import addCateIcon from '../../../assets/CategoryIcon/addCategory.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParams } from '../../../../App';
import AddCategory from '../../CategoryModify/AddCategory/AddCategory';
import Font from '../../../common/Font';
import Spacing from '../../../common/Spacing';

interface Props {
  toggleOverlay: () => void
}
const AddTask: React.FC<Props> = ({ toggleOverlay }) => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  //visible overlay
  const [visibleAdd, setVisibleAdd] = useState(true);
  const [visibleCalendar, setVisibleCalendar] = useState(false);
  const [visibleTimePicker, setVisibleTimePicker] = useState(false);
  const [visiblePriority, setVisiblePriority] = useState(false);
  const [visibleCategory, setVisibleCategory] = useState(false);
  const [visibleAddCategory, setVisibleAddCategory] = useState(false);
  //
  const [date, setDate] = useState(new Date())
  const [selected, setSelected] = useState('');
  const [focusWork, setFocusWork] = useState(false)
  const [focusDescript, setFocusDescript] = useState(false)
  const [focusPriority, setFocusPriority] = useState(0)
  const [focusCategory, setFocusCategory] = useState(0)
  const [cate, setCategory] = useState(0)
  const [categories, setCategories] = useState<any[]>([])
  const [work, setWork] = useState('')
  const [descript, setDescript] = useState('')
  const [visibleAddCategoryButton, setVisibleAddCategoryButton] = useState(false);

  //
  const toggleCalendar = () => {
    setVisibleAdd(!visibleAdd);
    setVisibleCalendar(!visibleCalendar);
  };
  const toggleAdd = () => {
    setVisibleAdd(!visibleAdd);
  };
  let temp: any = []
  const toggleAddCategory = () => {
    setVisibleAddCategory(!visibleAddCategory);
    setVisibleCategory(!visibleCategory);
  };
  const togglePriority = () => {
    setVisibleAdd(!visibleAdd);
    setVisiblePriority(!visiblePriority);
  };
  const switchVisibleAddCategoryButton = async () => {
    setVisibleAddCategoryButton(false);
    let userData = await AsyncStorage.getItem('loginUser')
    if (userData !== null) {
      let user = JSON.parse(userData)
      await AsyncStorage.getItem('categories').then((c) => {
        temp = c ? JSON.parse(c) : [];
        let index = temp.findIndex((c: any) => c.username == user);
        temp[index].categories.push(
          {
            id: 0,
            name: 'Create new',
            color: '#88FFD1',
            icon: Image.resolveAssetSource(addCateIcon).uri
          }
        )
        setCategories(temp[index].categories)
      })
    }
  };
  const toggleCategory = async () => {
    setVisibleAdd(!visibleAdd);
    setVisibleCategory(!visibleCategory);
    let userData = await AsyncStorage.getItem('loginUser')
    if (userData !== null) {
      let user = JSON.parse(userData)
      await AsyncStorage.getItem('categories').then((c) => {
        temp = c ? JSON.parse(c) : [];
        console.log(temp);

        if (!temp.some((s: any) => s.username == user)) {
          setVisibleAddCategoryButton(true)
          return;
        }
        let index = temp.findIndex((c: any) => c.username == user);

        temp[index].categories.push(
          {
            id: 0,
            name: 'Create new',
            color: '#88FFD1',
            icon: Image.resolveAssetSource(addCateIcon).uri
          }
        )
        setCategories(temp[index].categories)
        console.log(temp[index].categories);

      })
    }
  };
  let tasks: any[] = []
  const handleAddTask = async () => {
    let userData = await AsyncStorage.getItem('loginUser')
    await AsyncStorage.getItem('userTasks')
      .then(async (t) => {
        tasks = t ? JSON.parse(t) : [];
        console.log(tasks);

        if (userData !== null) {
          let user = JSON.parse(userData)
          if (!tasks.some((c) => c.username == user)) {
            tasks.push({
              username: user,
              todos: [{
                id: 1,
                name: work,
                descript: descript,
                time: date.getHours() + ':' + date.getMinutes(),
                date: selected,
                priority: focusPriority,
                category: cate,
                status: 0
              }]
            })
            await AsyncStorage.setItem('userTasks', JSON.stringify(tasks))
            return
          }
          let index = tasks.findIndex(c => c.username == user);
          tasks[index].todos.push({
            id: tasks[index].todos.length + 1,
            name: work,
            descript: descript,
            time: date.getHours() + ':' + date.getMinutes(),
            date: selected,
            priority: focusPriority,
            category: cate,
            status: 0
          })
        }
        await AsyncStorage.setItem('userTasks', JSON.stringify(tasks))
      });
    toggleOverlay()
    setVisibleAdd(false)
  }
  return (
    <View>
      <Overlay isVisible={visibleAdd} overlayStyle={[StyleCommon.greyBackground, { borderRadius: 8 }]}
        onBackdropPress={() => {
          toggleOverlay()
          toggleAdd
        }}>
        <View style={styles.addTask}>
          <Text style={[StyleCommon.title, Font.fontSize20]}>Add Task</Text>
          <View style={Spacing.marginTop20}>
            <TextInput
              onChangeText={text => {
                setFocusWork(true)
                if (text.length === 0) {
                  setFocusWork(false)
                }
                setWork(text)
              }}
              style={focusWork == true ? [StyleCommon.formInput, StyleCommon.defaultOpacity] : [StyleCommon.formInput]}
              placeholderTextColor='white'
              placeholder='Your task'
              defaultValue={work}
            />
          </View>
          <View style={Spacing.marginTop20}>
            <TextInput
              onChangeText={text => {
                setFocusDescript(true)
                if (text.length === 0) {
                  setFocusDescript(false)
                }
                setDescript(text)
              }}
              style={focusDescript == true ? [StyleCommon.formInput, StyleCommon.defaultOpacity] : [StyleCommon.formInput]}
              placeholderTextColor='white'
              placeholder='Description'
              defaultValue={descript}
            />
          </View>
          <View style={styles.bottomNav}>
            <View style={styles.settingProp}>
              <TouchableOpacity onPress={toggleCalendar}>
                <Image style={[StyleCommon.iconNav]} source={require('../../../assets/NavigationIcon/clock.png')} />
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleCategory}>
                <Image style={[StyleCommon.iconNav]} source={require('../../../assets/NavigationIcon/tag.png')} />
              </TouchableOpacity>
              <TouchableOpacity onPress={togglePriority}>
                <Image style={[StyleCommon.iconNav]} source={require('../../../assets/NavigationIcon/priority.png')} />
              </TouchableOpacity>
            </View>
            <View style={{ width: '10%' }}>
              <TouchableOpacity onPress={handleAddTask}>
                <Image style={[StyleCommon.iconNav]} source={require('../../../assets/NavigationIcon/done.png')} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Overlay>
      <Overlay isVisible={visibleCalendar} overlayStyle={StyleCommon.greyBackground}>
        <View style={styles.calendar}>
          <Calendar
            minDate={new Date().toISOString().slice(0, 10)}
            disableAllTouchEventsForDisabledDays={true}
            onDayPress={day => {
              setSelected(day.dateString);
            }}
            style={{
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
              height: 330,
              width: 330
            }}
            theme={{
              calendarBackground: '#363636',
              dayTextColor: '#fff',
              textDisabledColor: '#AFAFAF',
              monthTextColor: '#fff',
            }}
            markedDates={{
              [selected]: { selected: true, disableTouchEvent: true }
            }}>

          </Calendar>
          <View style={styles.calendarButton}>
            <TouchableOpacity onPress={toggleCalendar} style={[Button.buttonCrud]}>
              <Text style={[StyleCommon.normalText, styles.cancelText]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setVisibleTimePicker(true) }} style={[Button.buttonCrud, StyleCommon.mainButtonColor]}>
              <Text style={[StyleCommon.normalText]}>Choose Time</Text>
            </TouchableOpacity>
          </View>
          <View>
          </View>
        </View>
      </Overlay>
      <Overlay isVisible={visibleTimePicker} overlayStyle={StyleCommon.greyBackground}>
        <DatePicker
          modal
          open={visibleTimePicker}
          date={date}
          mode='time'
          onConfirm={(date) => {
            setVisibleTimePicker(false)
            setDate(date)
            setVisibleAdd(!visibleAdd);
            setVisibleCalendar(!visibleCalendar);
          }}
          onCancel={() => {
            setVisibleTimePicker(false)
          }}
        />
      </Overlay>
      <Overlay isVisible={visiblePriority} overlayStyle={StyleCommon.greyBackground}>
        <View style={styles.priority}>
          <Text style={[StyleCommon.normalText, StyleCommon.textBold]}>Task Priority</Text>
          <View style={StyleCommon.spaceLineWrap}>
            <View style={StyleCommon.spaceLine} />
          </View>
          <View>
            <FlatList
              data={priority}
              numColumns={4}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => {
                  setFocusPriority(item.id)
                }} style={[Button.buttonPriorCate, styles.priorityItem, focusPriority === item.id ? StyleCommon.mainButtonColor : styles.priorityBackground]}>
                  <Image style={styles.priorityIcon} source={require('../../../assets/NavigationIcon/priority.png')} />
                  <Text style={[StyleCommon.normalText, { marginTop: 8 }]}>{item.priority}</Text>
                </TouchableOpacity>
              )
              }
              showsHorizontalScrollIndicator={false}
            />
            <View style={styles.priorityButton}>
              <TouchableOpacity onPress={togglePriority} style={[Button.buttonCrud]}>
                <Text style={[StyleCommon.normalText, styles.cancelText]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={togglePriority} style={[Button.buttonCrud, StyleCommon.mainButtonColor]}>
                <Text style={[StyleCommon.normalText]}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Overlay>
      <Overlay isVisible={visibleCategory} overlayStyle={StyleCommon.greyBackground}>
        <View style={styles.category}>
          <Text style={[StyleCommon.normalText, StyleCommon.textBold]}>Choose Category</Text>
          <View style={StyleCommon.spaceLineWrap}>
            <View style={StyleCommon.spaceLine} />
          </View>
          <View>
            {visibleAddCategoryButton == true ?
              <View style={StyleCommon.alignItemCenter}>
                <TouchableOpacity onPress={() => {
                  setVisibleAddCategory(true)
                  setVisibleCategory(false)
                }} style={
                  [Button.buttonPriorCate,
                  styles.categoryItem,
                  styles.createCateNewButton]}>
                  <Image style={styles.categoryIcon} source={{ uri: Image.resolveAssetSource(addCateIcon).uri }} />
                </TouchableOpacity>
                <Text style={[StyleCommon.normalText, styles.createCateNewText]}>Create new</Text>
              </View> :
              <FlatList
                data={categories}
                numColumns={3}
                renderItem={({ item }) => (
                  <View>
                    <TouchableOpacity onPress={() => {
                      setFocusCategory(item.id)
                      if (item.id == 0) {
                        setVisibleCategory(!visibleCategory);
                        toggleAddCategory()
                      }
                    }} style={
                      [Button.buttonPriorCate,
                      styles.categoryItem,
                      focusCategory === item.id ? styles.cateBorder : {},
                      { backgroundColor: item.color }]}>
                      <Image style={styles.categoryIcon} source={{ uri: item.icon }} />
                    </TouchableOpacity>
                    <Text style={[StyleCommon.normalText, styles.createCateNewText]}>{item.name}</Text>
                  </View>
                )
                }
                showsHorizontalScrollIndicator={false}
              />}
            <View style={Spacing.marginTop20}>
              <TouchableOpacity onPress={() => {
                setCategory(focusCategory)
                setVisibleAdd(!visibleAdd);
                setVisibleCategory(!visibleCategory);
              }} style={[Button.largeButton, StyleCommon.mainButtonColor]}>
                <Text style={[StyleCommon.normalText]}>Add Category</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Overlay>
      {visibleAddCategory && <AddCategory switchVisibleAddCategoryButton={switchVisibleAddCategoryButton} visibleAddCategory={toggleAddCategory} />}

    </View>
  )
}

export default AddTask
