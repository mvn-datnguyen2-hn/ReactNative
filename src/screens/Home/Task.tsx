import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import StyleCommon from '../../common/CommonStyles'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackParams } from '../../../App'
import Font from '../../common/Font'
import Spacing from '../../common/Spacing'
import Size from '../../common/Size'
import styles from './taskStyle'
interface Props {
    todayTasks: any
    completedTasks: any
}
const Task: React.FC<Props> = ({ todayTasks, completedTasks }) => {
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();

    return (
        <View style={[StyleCommon.blackBackground, Size.width350]}>
            <View style={styles.search}>
                <Image style={[StyleCommon.iconNav, Spacing.marginRight5]} source={require('../../assets/NavigationIcon/glass.png')} />
                <TextInput
                    style={[StyleCommon.normalText]}
                    placeholderTextColor='white'
                    placeholder='Search for your task'
                />
            </View>
            <View style={Spacing.marginVertical15}>
                <View style={[StyleCommon.greyBackground, styles.tag]}>
                    <Text style={[StyleCommon.normalText, Font.fontSize12]}>Today</Text>
                </View>
            </View>
            <View style={[
                todayTasks.length !== 0 && todayTasks.length >= 3 ? Size.height270 : Size.height0,
                todayTasks.length == 1 && Size.height90,
                todayTasks.length == 2 && Size.height180
            ]}>
                <FlatList
                    data={todayTasks}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => { navigation.navigate('Edit', item) }}>
                            <View style={[StyleCommon.greyBackground, styles.task]}>
                                <View style={{
                                    alignItems: 'center',
                                    flexDirection: 'row'
                                }}>
                                    <View style={styles.dot}>
                                    </View>
                                    <View style={[Spacing.marginHorizontal20, Spacing.marginTop5]}>
                                        <Text style={[StyleCommon.normalText, Font.textLeft]}>{item.name}</Text>
                                        <View style={[StyleCommon.flexDirectionRow, Spacing.marginTop10]}>
                                            <Text style={[StyleCommon.normalText, Font.fontSize14, StyleCommon.halfOpacity]}>Today At {item.time} </Text>
                                            <View style={[StyleCommon.flexDirectionRow, Spacing.marginLeft40]}>
                                                <View style={[styles.cateTag, { backgroundColor: item.color }]}>
                                                    <Image style={[styles.cateIcon, Spacing.marginRight10]} source={{ uri: item.cateIcon }} />
                                                    <Text style={[StyleCommon.normalText, Font.fontSize11]}>{item.categoryName}</Text>
                                                </View>
                                                <View style={[StyleCommon.greyBackground, styles.priorityTag, Spacing.marginLeft10]}>
                                                    <Image style={[Size.width14, Size.height14, Spacing.marginRight5]} source={require('../../assets/NavigationIcon/priority.png')} />
                                                    <Text style={[StyleCommon.normalText, Font.fontSize12]}>{item.priority}</Text>
                                                </View>
                                            </View>

                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
            <View style={Spacing.marginBottom10}>
                <View style={[StyleCommon.greyBackground, styles.completeTag]}>
                    <Text style={[StyleCommon.normalText, Font.fontSize12]}>Completed</Text>
                </View>
            </View>
            <View style={completedTasks.length !== 0 ? Size.height170 : Size.height0}>
                <FlatList
                    data={completedTasks}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled
                    renderItem={({ item }) => (
                        <View style={[StyleCommon.greyBackground, styles.completeTask]}>
                            <View style={
                                StyleCommon.rowItemCenter
                            }>
                                <View style={styles.dot}>
                                </View>
                                <View style={[Spacing.marginHorizontal20, Spacing.marginTop5]}>
                                    <Text style={[StyleCommon.normalText, Font.textLeft]}>{item.name}</Text>
                                    <View style={[StyleCommon.flexDirectionRow, Spacing.marginTop10]}>
                                        <Text style={[StyleCommon.normalText, Font.fontSize14, StyleCommon.halfOpacity]}>Today At {item.time} </Text>
                                        <View style={[StyleCommon.flexDirectionRow, Spacing.marginLeft40]}>
                                            <View style={[styles.cateTag, { backgroundColor: item.color }]}>
                                                <Image style={[styles.cateIcon, Spacing.marginRight10]} source={{ uri: item.cateIcon }} />
                                                <Text style={[StyleCommon.normalText, Font.fontSize11]}>{item.categoryName}</Text>
                                            </View>
                                            <View style={[StyleCommon.greyBackground, styles.priorityTag, Spacing.marginLeft10]}>
                                                <Image style={[Size.width14, Size.height14, Spacing.marginRight5]} source={require('../../assets/NavigationIcon/priority.png')} />
                                                <Text style={[StyleCommon.normalText, Font.fontSize12]}>{item.priority}</Text>
                                            </View>
                                        </View>

                                    </View>
                                </View>
                            </View>
                        </View>

                    )}
                />
            </View>
        </View>
    )
}

export default Task

