import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import StyleCommon from '../../../common/CommonStyles'
import Spacing from '../../../common/Spacing'
import styles from './style'
import Button from '../../../common/Button'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { Overlay } from '@rneui/themed';
import { Calendar } from 'react-native-calendars'
import DatePicker from 'react-native-date-picker';
import priority from '../../../constant/priority';
import addCateIcon from '../../../assets/CategoryIcon/addCategory.png';
import AsyncStorage from '@react-native-async-storage/async-storage'
import AddCategory from '../../CategoryModify/AddCategory/AddCategory'
import Font from '../../../common/Font'

interface Props {
    route: any
}

const EditTask = ({ route }: Props) => {
    let item = route.params;
    console.log(item);

    const [visibleTitleEdit, setVisibleTitle] = useState(false);
    const [focusWork, setFocusWork] = useState(false)
    const [focusDescript, setFocusDescript] = useState(false)
    const [visibleCalendar, setVisibleCalendar] = useState(false);
    const [visibleTimePicker, setVisibleTimePicker] = useState(false);
    let a = new Date(item.date)
    const [date, setDate] = useState(a)
    const [selected, setSelected] = useState(new Date(item.date).toISOString().slice(0, 10));
    const [visiblePriority, setVisiblePriority] = useState(false);
    const [focusPriority, setFocusPriority] = useState(item.priority);
    const [visibleCategory, setVisibleCategory] = useState(false);
    const [focusCategory, setFocusCategory] = useState(item.category)
    const [categories, setCategories] = useState<any[]>([])
    const [visibleAddCategory, setVisibleAddCategory] = useState(false);

    const [work, setWork] = useState(item.name)
    const [descript, setDescript] = useState(item.descript)

    const toggleTitleEdit = () => {
        setVisibleTitle(!visibleTitleEdit);
    };
    const toggleCalendar = () => {
        setVisibleCalendar(!visibleCalendar);
    };
    const togglePriority = () => {
        setVisiblePriority(!visiblePriority);
    };
    const toggleAddCategory = () => {
        setVisibleAddCategory(!visibleAddCategory);
        setVisibleCategory(!visibleCategory);
    };
    const switchVisibleAddCategoryButton = async () => {
        let temp = []
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
        let temp = []
        let userData = await AsyncStorage.getItem('loginUser')
        if (userData !== null) {
            let user = JSON.parse(userData)
            await AsyncStorage.getItem('categories').then((c) => {
                temp = c ? JSON.parse(c) : [];
                console.log(temp);
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
    const handleEdit = async () => {

        let tasks: any[] = []
        let userData = await AsyncStorage.getItem('loginUser')
        await AsyncStorage.getItem('userTasks')
            .then(async (t) => {
                tasks = t ? JSON.parse(t) : [];

                if (userData !== null) {
                    let user = JSON.parse(userData)
                    let index = tasks.findIndex(c => c.username == user);
                    let todosindex = tasks[index].todos.findIndex((c: any) => c.id == item.id);
                    const temp = tasks[index].todos[todosindex] || {};
                    tasks[index].todos[todosindex].name = work;
                    tasks[index].todos[todosindex].descript = descript;
                    if (date == a) {
                        tasks[index].todos[todosindex].time = item.time;
                    }
                    tasks[index].todos[todosindex].time = date.getHours() + ':' + date.getMinutes();
                    tasks[index].todos[todosindex].date = selected;
                    tasks[index].todos[todosindex].priority = focusPriority;
                    tasks[index].todos[todosindex].category = focusCategory;
                    tasks[index].todos[todosindex].status = 0;

                }
                await AsyncStorage.setItem('userTasks', JSON.stringify(tasks))
            });
        navigator.goBack()
    }
    const handleDelete = async () => {
        let tasks: any[] = []
        let userData = await AsyncStorage.getItem('loginUser')
        await AsyncStorage.getItem('userTasks')
            .then(async (t) => {
                tasks = t ? JSON.parse(t) : [];
                if (userData !== null) {
                    let user = JSON.parse(userData)
                    let index = tasks.findIndex(c => c.username == user);
                    let todosindex = tasks[index].todos.findIndex((c: any) => c.id == item.id);
                    tasks[index].todos.splice(todosindex, 1)

                }
                await AsyncStorage.setItem('userTasks', JSON.stringify(tasks))
            });
        navigator.goBack()

    }
    const handleComplete = async () => {
        let tasks: any[] = []
        let userData = await AsyncStorage.getItem('loginUser')
        await AsyncStorage.getItem('userTasks')
            .then(async (t) => {
                tasks = t ? JSON.parse(t) : [];
                if (userData !== null) {
                    let user = JSON.parse(userData)
                    let index = tasks.findIndex(c => c.username == user);
                    let todosindex = tasks[index].todos.findIndex((c: any) => c.id == item.id);
                    tasks[index].todos[todosindex].status = 1;
                }
                await AsyncStorage.setItem('userTasks', JSON.stringify(tasks))
            });
        navigator.goBack()

    }
    const navigator = useNavigation();
    useFocusEffect(() => {
        navigator.setOptions({
            header: ({ }) => null, // Ẩn nút "Back"
        });
    });
    return (
        <View style={[StyleCommon.container, styles.background]}>
            <View style={Spacing.marginTop50}>
                <View style={[StyleCommon.homeHeader, styles.navigate]}>
                    <TouchableOpacity onPress={() => { navigator.goBack() }}>
                        <View style={[StyleCommon.greyBackground, styles.cancelEdit]}>
                            <Text style={[StyleCommon.normalText]}>X</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={[StyleCommon.greyBackground, styles.reset]}>
                            <Image style={[StyleCommon.iconNav, {}]} source={require('../../../assets/NavigationIcon/editback.png')} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.content}>
                    <View style={StyleCommon.centerItemWrap}>
                        <View>
                            <View style={styles.workWrap}>
                                <View style={styles.dot}>
                                </View>
                                <Text style={[StyleCommon.normalText, styles.work]}>{work}</Text>
                            </View>
                            <Text style={[StyleCommon.normalText, styles.descript]}>{descript}</Text>
                        </View>
                        <TouchableOpacity onPress={toggleTitleEdit}>
                            <Image style={[StyleCommon.iconNav, {}]} source={require('../../../assets/NavigationIcon/editIcon.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={StyleCommon.height37}>
                        <View style={StyleCommon.centerItemWrap}>
                            <View style={StyleCommon.rowItemCenter}>
                                <Image style={[StyleCommon.iconNav, {}]} source={require('../../../assets/NavigationIcon/clock.png')} />
                                <Text style={[StyleCommon.normalText, styles.time]}>Task time: </Text>
                            </View>
                            <TouchableOpacity onPress={toggleCalendar}>
                                <View style={Spacing.marginVertical15}>
                                    <View style={[StyleCommon.greyBackground, styles.tag]}>
                                        <Text style={[StyleCommon.normalText, Font.fontSize12]}>Today At {item.time}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={StyleCommon.centerItemWrap}>
                            <View style={StyleCommon.rowItemCenter}>
                                <Image style={[StyleCommon.iconNav, {}]} source={require('../../../assets/NavigationIcon/tag.png')} />
                                <Text style={[StyleCommon.normalText, styles.time]}>Task Category: </Text>
                            </View>
                            <TouchableOpacity onPress={() => {
                                setVisibleCategory(true)
                                toggleCategory()
                            }}>
                                <View style={Spacing.marginVertical15}>
                                    <View style={[StyleCommon.greyBackground, styles.cateTag]}>
                                        <Image style={styles.cateShow} source={{ uri: item.cateIcon }} />
                                        <Text style={[StyleCommon.normalText, Font.fontSize12]}>{item.categoryName}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={StyleCommon.centerItemWrap}>
                            <View style={StyleCommon.rowItemCenter}>
                                <Image style={[StyleCommon.iconNav]} source={require('../../../assets/NavigationIcon/priority.png')} />
                                <Text style={[StyleCommon.normalText, styles.time]}>Task Priority: </Text>
                            </View>
                            <TouchableOpacity onPress={togglePriority}>
                                <View style={Spacing.marginVertical15}>
                                    <View style={[StyleCommon.greyBackground, styles.priorityTag]}>
                                        <Image style={styles.priorityShow} source={require('../../../assets/NavigationIcon/priority.png')} />
                                        <Text style={[StyleCommon.normalText, Font.fontSize12]}>{item.priority}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={Spacing.marginTop20} >
                            <TouchableOpacity onPress={handleDelete}>
                                <View style={StyleCommon.rowItemCenter}>
                                    <Image style={[StyleCommon.iconNav]} source={require('../../../assets/NavigationIcon/trash.png')} />
                                    <Text style={[StyleCommon.normalText, styles.deleteText]}>Delete Task</Text>
                                </View>
                            </TouchableOpacity>

                        </View><View style={Spacing.marginTop20} >
                            <TouchableOpacity onPress={handleComplete}>
                                <View style={StyleCommon.rowItemCenter}>
                                    <Image style={[StyleCommon.iconNav]} source={require('../../../assets/CategoryIcon/tick.png')} />
                                    <Text style={[StyleCommon.normalText, styles.completeText]}>Completed Task</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={Spacing.marginTop500}>
                        <TouchableOpacity onPress={handleEdit} style={[StyleCommon.mainButtonColor, styles.editButton]}>
                            <Text style={[StyleCommon.normalText]}>Edit Task</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Overlay isVisible={visibleTitleEdit} overlayStyle={[StyleCommon.greyBackground, styles.editTaskTitleWrap]}
                    onBackdropPress={toggleTitleEdit}>
                    <View style={styles.addTask}>
                        <Text style={[StyleCommon.title, StyleCommon.fontSize20]}>Edit Task Title</Text>
                        <View style={StyleCommon.spaceLineWrap}>
                            <View style={StyleCommon.spaceLine} />
                        </View>
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
                                onFocus={() => { setFocusWork(true) }}
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
                                onFocus={() => { setFocusDescript(true) }}
                            />
                        </View>
                        <View style={styles.editTitleButton}>
                            <TouchableOpacity onPress={() => {
                                setWork(item.name)
                                setDescript(item.descript)
                                setVisibleTitle(!visibleTitleEdit);
                                setFocusDescript(false)
                                setFocusWork(false)
                            }} style={[Button.buttonCrud]}>
                                <Text style={[StyleCommon.normalText, styles.cancelText, Spacing.marginRight20]}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                setVisibleTitle(!visibleTitleEdit);
                                setFocusDescript(false)
                                setFocusWork(false)
                            }} style={[Button.buttonCrud, StyleCommon.mainButtonColor]}>
                                <Text style={[StyleCommon.normalText]}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </Overlay>
                <Overlay isVisible={visibleCalendar} overlayStyle={[StyleCommon.greyBackground]}>
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
                                [selected]: { selected: true, disableTouchEvent: true },
                                [item.date]: { selected: true, disableTouchEvent: true },
                            }}>

                        </Calendar>
                        <View style={styles.calendarButton}>
                            <TouchableOpacity onPress={toggleCalendar} style={[Button.buttonCrud]}>
                                <Text style={[StyleCommon.normalText, styles.cancelText]}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setVisibleTimePicker(true) }} style={[Button.buttonCrud, StyleCommon.mainButtonColor]}>
                                <Text style={[StyleCommon.normalText]}>Edit Time</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                        </View>
                    </View>
                </Overlay>
                <Overlay isVisible={visibleTimePicker} overlayStyle={[StyleCommon.greyBackground]}>
                    <DatePicker
                        modal
                        open={visibleTimePicker}
                        date={date}
                        mode='time'
                        onConfirm={(date) => {
                            setVisibleTimePicker(false)
                            setDate(date)
                            setVisibleCalendar(!visibleCalendar);
                        }}
                        onCancel={() => {
                            setVisibleTimePicker(false)
                        }}

                    />
                </Overlay>
                <Overlay isVisible={visiblePriority} overlayStyle={[StyleCommon.greyBackground]}>
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
                                    }} style={[Button.buttonPriorCate, focusPriority === item.id ? StyleCommon.mainButtonColor : styles.priorityBackground, styles.priorityBackground]}>
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
                                    <Text style={[StyleCommon.normalText]}>Edit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Overlay>
                <Overlay isVisible={visibleCategory} overlayStyle={[StyleCommon.greyBackground]}>
                    <View style={styles.category}>
                        <Text style={[StyleCommon.normalText, StyleCommon.textBold]}>Choose Category</Text>
                        <View style={StyleCommon.spaceLineWrap}>
                            <View style={StyleCommon.spaceLine} />
                        </View>
                        <View>
                            <FlatList
                                data={categories}
                                numColumns={3}
                                renderItem={({ item }) => (
                                    <View>
                                        <TouchableOpacity onPress={() => {
                                            setFocusCategory(item.id)
                                            if (item.id == 0) {
                                                setVisibleCategory(!visibleCategory);
                                                setVisibleAddCategory(true)
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
                            />
                            <View style={Spacing.marginTop20}>
                                <View style={styles.priorityButton}>
                                    <TouchableOpacity onPress={() => { setVisibleCategory(false); }} style={[Button.buttonCrud]}>
                                        <Text style={[StyleCommon.normalText, styles.cancelText]}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { setVisibleCategory(false) }} style={[Button.buttonCrud, StyleCommon.mainButtonColor]}>
                                        <Text style={[StyleCommon.normalText]}>Edit</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    {visibleAddCategory &&
                        <View style={{ marginBottom: 530 }}>
                            <AddCategory switchVisibleAddCategoryButton={switchVisibleAddCategoryButton} visibleAddCategory={toggleAddCategory} />
                        </View>}
                </Overlay>


            </View>

        </View>

    )
}

export default EditTask

// const styles = StyleSheet.create({
//     content: {
//         justifyContent: 'center',
//         marginHorizontal: 20,
//         marginVertical: 30
//     },
//     dot: {
//         width: 16,
//         height: 16,
//         borderRadius: 50,
//         borderColor: '#fff',
//         borderWidth: 1,
//         marginTop: 5,
//     },
//     tag: {
//         width: 108,
//         height: 37,
//         borderRadius: 6,
//         alignItems: 'center',
//         justifyContent: 'center'
//     },
//     cateTag: {
//         width: 118,
//         height: 40,
//         borderRadius: 6,
//         alignItems: 'center',
//         flexDirection: 'row',
//         justifyContent: 'center'
//     },
//     priorityTag: {
//         width: 70,
//         height: 37,
//         borderRadius: 6,
//         alignItems: 'center',
//         flexDirection: 'row',
//         justifyContent: 'center'
//     },
//     addTask: {
//         width: 375,
//         height: 228,
//         paddingHorizontal: 20
//     },
//     work: {
//         marginTop: 20
//     },
//     editTitleButton: {
//         backgroundColor: '#363636',
//         flexDirection: 'row',
//         borderRadiusp: 5,
//         marginHorizontal: 20,
//         marginTop: 10
//     },
//     calendar: {
//         width: 327
//     },
//     calendarButton: {
//         backgroundColor: '#363636',
//         flexDirection: 'row',
//         borderBottomLeftRadius: 5,
//         borderBottomRightRadius: 5,
//         justifyContent: 'space-between',
//         height: 50,
//         paddingHorizontal: 3
//     },

//     priorityButton: {
//         backgroundColor: '#363636',
//         flexDirection: 'row',
//         borderRadiusp: 5,
//         justifyContent: 'space-between',
//         paddingHorizontal: 3,
//         marginTop: 20
//     },
//     priorityIcon: {
//         width: 24,
//         height: 24,
//         marginTop: 8
//     },
//     priority: {
//         width: 327,
//         height: 350,
//     },
//     categoryItem: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginTop: 20,
//         marginHorizontal: 22,
//     },
//     categoryIcon: {
//         width: 32,
//         height: 32
//     },
//     category: {
//         width: 327,
//         height: 530,
//     },
// })