import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import StyleCommon from '../../common/CommonStyles'
import { Overlay } from '@rneui/themed';
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import AddTask from '../../components/TaskModify/Add/AddTask';
import Task from './Task';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spacing from '../../common/Spacing';
import Font from '../../common/Font';


const Home = () => {
    const [visibleOverlay, setVisibleOverlay] = useState(false);
    const navigator = useNavigation();
    useFocusEffect(() => {
        navigator.setOptions({
            header: ({ }) => null,
            // Ẩn nút "Back"
        });
    });
    const toggleOverlay = () => {
        setVisibleOverlay(!visibleOverlay);
    };
    let todayTasks: any[] = []
    let completedTasks: any[] = []
    const [todayTask, setTodayTask] = useState<any[]>([])
    const [completedTask, setCompletedTask] = useState<any[]>([])
    useEffect(() => {
        const getData = async () => {
            let tasks: any[] = []
            let userData = await AsyncStorage.getItem('loginUser')
            let categories = await AsyncStorage.getItem('categories')
            await AsyncStorage.getItem('userTasks')
                .then(async (t) => {
                    tasks = t ? JSON.parse(t) : [];
                    console.log(tasks);
                    
                    if (userData !== null) {
                        let user = JSON.parse(userData)
                        if (tasks.length !== 0) {
                            let taskIndex = tasks.findIndex(c => c.username == user);
                        const today = new Date().toISOString().slice(0, 10);
                        console.log(today);
                        
                        let temp = tasks[taskIndex].todos;
                        console.log(temp);
                        
                        todayTasks = temp.filter((c: any) => c.date === today && c.status == 0);
                        console.log(todayTasks);
                        
                        completedTasks = temp.filter((c: any) => c.date === today && c.status == 1);
                        if (categories !== null) {
                            let cates = JSON.parse(categories)
                            todayTasks.forEach((element: any) => {
                                let cateIndex = cates.findIndex((c: any) => c.username == user);
                                let temp = cates[cateIndex].categories;
                                let cate = temp.find((c: any) => c.id == element.category)
                                element.categoryName = cate.name;
                                element.cateIcon = cate.icon;
                                element.color = cate.color;
                            });
                            completedTasks.forEach((element: any) => {
                                let cateIndex = cates.findIndex((c: any) => c.username == user);
                                let temp = cates[cateIndex].categories;
                                let cate = temp.find((c: any) => c.id == element.category)
                                element.categoryName = cate.name;
                                element.cateIcon = cate.icon;
                                element.color = cate.color;
                            });
                        }
                        }
                        
                    }
                    setTodayTask(todayTasks)
                    console.log(todayTasks);
                    
                    setCompletedTask(completedTasks)
                })
        }
        getData()
    }, [visibleOverlay])
    return (
        <View style={[StyleCommon.blackBackground, styles.container]}>
            <View style={[StyleCommon.homeHeader, Spacing.marginTop50, Spacing.marginBottom10]}>
                <TouchableOpacity onPress={() => { }}>
                    <Image style={[StyleCommon.homeHeaderNav]} source={require('../../assets/HeaderNavIcon/nav.png')} />
                </TouchableOpacity>
                <Text style={[StyleCommon.homeTitleText]}>Index</Text>
                <Image style={[StyleCommon.homeHeaderNav, StyleCommon.borderRadius21]} source={require('../../assets/HeaderNavIcon/avartar.png')} />
            </View>
            {todayTask.length == 0 && completedTask.length == 0 ?
                <View style={styles.content}>
                    <Image source={require('../../assets/BackgroundImg/bgrImg.png')} resizeMode='contain' style={styles.bgrImg} />
                    <View>
                        <Text style={[StyleCommon.normalText, Font.fontSize20, Font.fontWeight400]}>What do you want to do today?</Text>
                        <Text style={[StyleCommon.normalText, Spacing.marginTop10, Font.fontWeight400]}>Tap + to add your tasks</Text>
                    </View>
                </View> :
                <View style={StyleCommon.alignItemCenter}>
                    <Task todayTasks={todayTask} completedTasks={completedTask}/>
                </View>
            }
            <View style={[styles.bottomNav,
                todayTask.length == 0 && completedTask.length !== 0 && Spacing.bottomReverse340,
                todayTask.length == 0 && completedTask.length == 0 && Spacing.bottomReverse40,
                todayTask.length == 1 && completedTask.length == 0 && Spacing.bottomReverse430,
                todayTask.length == 2 && completedTask.length == 0 &&  Spacing.bottomReverse330,
                todayTask.length > 2 &&Spacing.bottomReverse250,
                completedTask.length !== 0 && Spacing.bottomReverse70,
                todayTask.length == 0 && completedTask.length !== 0 &&  Spacing.bottomReverse340,
                todayTask.length == 1 && completedTask.length !== 0 && Spacing.bottomReverse250,
                todayTask.length == 2 && completedTask.length !== 0 && Spacing.bottomReverse150
                ]}>
                <View>
                    <TouchableOpacity style={StyleCommon.alignItemCenter}>
                        <Image style={[StyleCommon.iconNav]} source={require('../../assets/NavigationIcon/index.png')} />
                        <Text style={[StyleCommon.normalText, Font.fontSize12]}>Home</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={StyleCommon.alignItemCenter}>
                        <Image style={[StyleCommon.iconNav]} source={require('../../assets/NavigationIcon/calendar.png')} />
                        <Text style={[StyleCommon.normalText, Font.fontSize12]}>Calendar</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={toggleOverlay} style={[StyleCommon.alignItemCenter, styles.addButton]}>
                    <View style={[styles.iconWrapper, StyleCommon.mainButtonColor]}>
                        <Text style={[StyleCommon.normalText, Font.fontSize30]}>+</Text>
                    </View>
                </TouchableOpacity>
                <View>
                    <TouchableOpacity style={StyleCommon.alignItemCenter}>
                        <Image style={[StyleCommon.iconNav]} source={require('../../assets/NavigationIcon/clock.png')} />
                        <Text style={[StyleCommon.normalText, Font.fontSize12]}>Focuse</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={StyleCommon.alignItemCenter}>
                        <Image style={[StyleCommon.iconNav]} source={require('../../assets/NavigationIcon/profile.png')} />
                        <Text style={[StyleCommon.normalText, Font.fontSize12]}>Profile</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Overlay isVisible={visibleOverlay} overlayStyle={[StyleCommon.greyBackground, StyleCommon.borderRadius8]} onBackdropPress={toggleOverlay}>
                <AddTask toggleOverlay={toggleOverlay}></AddTask>
            </Overlay>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between', 
        flex: 1
    },
    bgrImg: {
        width: 227,
        height: 227
    },
    content: {
        alignItems: 'center',
        marginTop: 74,
        height: 540
    },
    bottomNav: {
        backgroundColor: '#363636',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 10,
        bottom: -60,
        height: '100%'
    },
    iconWrapper: {
        width: 64,
        height: 64,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        marginTop: -43
    },
    addButton: {
        position: 'relative' 
    }
})