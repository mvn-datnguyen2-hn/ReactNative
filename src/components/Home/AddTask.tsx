import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, FlatList, TouchableWithoutFeedback, Touchable } from 'react-native'
import React, { useState } from 'react'
import StyleCommon from '../../Common/CommonStyles'
import { Calendar } from 'react-native-calendars'
import { Overlay } from '@rneui/themed';
import Colors from '../../Common/Colors';
import Button from '../../Common/Button';
import DatePicker from 'react-native-date-picker';
import priority from '../../data/priority';
import category from '../../data/category';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  toggleOverlay: () => void
}
const AddTask: React.FC<Props> = ({ toggleOverlay }) => {
  //visible overlay
  const [visibleAdd, setVisibleAdd] = useState(true);
  const [visibleCalendar, setVisibleCalendar] = useState(false);
  const [visibleTimePicker, setVisibleTimePicker] = useState(false);
  const [visiblePriority, setVisiblePriority] = useState(false);
  const [visibleCategory, setVisibleCategory] = useState(false);
  //
  const [date, setDate] = useState(new Date())
  const [selected, setSelected] = useState('');
  const [focusWork, setFocusWork] = useState(false)
  const [focusDescript, setFocusDescript] = useState(false)
  const [focusPriority, setFocusPriority] = useState(0)
  const [focusCategory, setFocusCategory] = useState(0)
  const [cate, setCategory] = useState(0)
  const [work, setWork] = useState('')
  const [descript, setDescript] = useState('')
  //
  const toggleCalendar = () => {
    setVisibleAdd(!visibleAdd);
    setVisibleCalendar(!visibleCalendar);
  };
  const toggleAdd = () => {
    setVisibleAdd(!visibleAdd);
  };
  const togglePriority = () => {
    setVisibleAdd(!visibleAdd);
    setVisiblePriority(!visiblePriority);
  };
  const toggleCategory = () => {
    setVisibleAdd(!visibleAdd);
    setVisibleCategory(!visibleCategory);
    setCategory(focusCategory);
  };
  let tasks: any[] = []
  const handleAddTask = async () => {
    //await AsyncStorage.removeItem('userTasks');

    let userData = await AsyncStorage.getItem('loginUser')
    AsyncStorage.getItem('userTasks')
      .then( async (t) => {
        tasks = t ? JSON.parse(t) : [];
        if (userData !== null) {
          let user = JSON.parse(userData)
            if (!tasks.some((c) => c.username == user)) { 
              tasks.push({
                username: user,
                todos: [{
                  name: work,
                  descript: descript,
                  time: date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(),
                  date: selected,
                  priority: focusPriority,
                  category: cate
                }]
              })
              await AsyncStorage.setItem('userTasks', JSON.stringify(tasks))
              return
            }
            let index = tasks.findIndex(c => c.username == user);
            tasks[index].todos.push({
              name: work,
              descript: descript,
              time: date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(),
              date: selected,
              priority: focusPriority,
              category: cate
            })
        }
        await AsyncStorage.setItem('userTasks', JSON.stringify(tasks))
      });
  }
  return (
    <View>
      <Overlay isVisible={visibleAdd} overlayStyle={[Colors.popUp, { borderRadius: 8 }]}
        onBackdropPress={() => {
          toggleOverlay()
          toggleAdd
        }}>
        <View style={styles.addTask}>
          <Text style={[StyleCommon.title, { fontSize: 20 }]}>Add Task</Text>
          <View style={styles.work}>
            <TextInput
              onChangeText={text => {
                setFocusWork(true)
                if (text.length === 0) {
                  setFocusWork(false)
                }
                setWork(text)
              }}
              style={focusWork == true ? [StyleCommon.formInput, { opacity: 1 }] : [StyleCommon.formInput]}
              placeholderTextColor='white'
              placeholder='Your task'
              defaultValue={work}
            />
          </View>
          <View style={styles.work}>
            <TextInput
              onChangeText={text => {
                setFocusDescript(true)
                if (text.length === 0) {
                  setFocusDescript(false)
                }
                setDescript(text)
              }}
              style={focusDescript == true ? [StyleCommon.formInput, { opacity: 1 }] : [StyleCommon.formInput]}
              placeholderTextColor='white'
              placeholder='Description'
              defaultValue={descript}
            />
          </View>
          {/* <Text style={[StyleCommon.normalText]}>{date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()}</Text>
          <Text style={[StyleCommon.normalText]}>{selected}</Text> */}
          <View style={styles.bottomNav}>
            <View style={styles.settingProp}>
              <TouchableOpacity onPress={toggleCalendar}>
                <Image style={[StyleCommon.iconNav]} source={require('../../assets/NavigationIcon/clock.png')} />
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleCategory}>
                <Image style={[StyleCommon.iconNav]} source={require('../../assets/NavigationIcon/tag.png')} />
              </TouchableOpacity>
              <TouchableOpacity onPress={togglePriority}>
                <Image style={[StyleCommon.iconNav]} source={require('../../assets/NavigationIcon/priority.png')} />
              </TouchableOpacity>
            </View>
            <View style={{ width: '10%' }}>
              <TouchableOpacity onPress={handleAddTask}>
                <Image style={[StyleCommon.iconNav]} source={require('../../assets/NavigationIcon/done.png')} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Overlay>
      <Overlay isVisible={visibleCalendar} overlayStyle={[Colors.popUp]}>
        <View style={styles.calendar}>
          <Calendar
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
              <Text style={[StyleCommon.normalText, Colors.cancelText]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setVisibleTimePicker(true) }} style={[Button.buttonCrud, Colors.mainButton]}>
              <Text style={[StyleCommon.normalText]}>Choose Time</Text>
            </TouchableOpacity>
          </View>
          <View>
          </View>
        </View>
      </Overlay>
      <Overlay isVisible={visibleTimePicker} overlayStyle={[Colors.popUp]}>
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
      <Overlay isVisible={visiblePriority} overlayStyle={[Colors.popUp]}>
        <View style={styles.priority}>
          <Text style={[StyleCommon.normalText, { fontWeight: 'bold' }]}>Task Priority</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', width: 327, marginTop: 8 }}>
            <View style={{ flex: 1, height: 0.5, backgroundColor: 'white' }} />
          </View>
          <View>
            <FlatList
              data={priority}
              numColumns={4}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => {
                  setFocusPriority(item.id)
                }} style={[Button.buttonPriorCate, focusPriority === item.id ? Colors.mainButton : Colors.priorityBackground, { alignItems: 'center', marginTop: 20, marginHorizontal: 9 }]}>
                  <Image style={styles.priorityIcon} source={require('../../assets/NavigationIcon/priority.png')} />
                  <Text style={[StyleCommon.normalText, { marginTop: 8 }]}>{item.priority}</Text>
                </TouchableOpacity>
              )
              }
              showsHorizontalScrollIndicator={false}
            />
            <View style={styles.priorityButton}>
              <TouchableOpacity onPress={togglePriority} style={[Button.buttonCrud]}>
                <Text style={[StyleCommon.normalText, Colors.cancelText]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={togglePriority} style={[Button.buttonCrud, Colors.mainButton]}>
                <Text style={[StyleCommon.normalText]}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Overlay>
      <Overlay isVisible={visibleCategory} overlayStyle={[Colors.popUp]}>
        <View style={styles.category}>
          <Text style={[StyleCommon.normalText, { fontWeight: 'bold' }]}>Choose Category</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', width: 327, marginTop: 8 }}>
            <View style={{ flex: 1, height: 0.5, backgroundColor: 'white' }} />
          </View>
          <View>
            <FlatList
              data={category}
              numColumns={3}
              renderItem={({ item }) => (
                <View>
                  <TouchableOpacity onPress={() => {
                    setFocusCategory(item.id)
                  }} style={
                    [Button.buttonPriorCate,
                    styles.categoryItem,
                    focusCategory === item.id ? { borderWidth: 3, borderColor: '#8875FF' } : {},
                    { backgroundColor: item.color }]}>
                    <Image style={styles.categoryIcon} source={item.icon} />
                  </TouchableOpacity>
                  <Text style={[StyleCommon.normalText, { fontSize: 14, marginTop: 8 }]}>{item.name}</Text>
                </View>
              )
              }
              showsHorizontalScrollIndicator={false}
            />
            <View style={{ marginTop: 20 }}>
              <TouchableOpacity onPress={toggleCategory} style={[Button.largeButton, Colors.mainButton]}>
                <Text style={[StyleCommon.normalText]}>Add Category</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Overlay>
    </View>
  )
}

export default AddTask

const styles = StyleSheet.create({
  addTask: {
    width: 375,
    height: 228,
    paddingHorizontal: 20
  },
  work: {
    marginTop: 20
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
  }
})