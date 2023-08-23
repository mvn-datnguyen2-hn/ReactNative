import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native'
import React from 'react'
import StyleCommon from '../../Common/CommonStyles'
import Colors from '../../Common/Colors'
import { useFocusEffect, useNavigation } from '@react-navigation/native'


const Home = () => {
    const navigator = useNavigation();
    useFocusEffect(() => {
        navigator.setOptions({
            header: ({ }) => null, // Ẩn nút "Back"
        });
        });
    return (
        <View style={[Colors.backgroundColor, {justifyContent: 'space-between'}]}>
            <View style={[StyleCommon.homeHeader, {marginTop: 50}]}>
                <TouchableOpacity onPress={() => { }}>
                    <Image style={[StyleCommon.homeHeaderNav]} source={require('../../assets/HeaderNavIcon/nav.png')} />
                </TouchableOpacity>
                <Text style={[StyleCommon.homeTitleText]}>Index</Text>
                <Image style={[StyleCommon.homeHeaderNav, { borderRadius: 21 }]} source={require('../../assets/HeaderNavIcon/avartar.png')} />
            </View>
            <View style={styles.content}>
                <Image source={require('../../assets/BackgroundImg/bgrImg.png')} resizeMode='contain' style={styles.bgrImg} />
                <View>
                    <Text style={[StyleCommon.normalText, { fontSize: 20, fontWeight: '400' }]}>What do you want to do today?</Text>
                    <Text style={[StyleCommon.normalText, { marginTop: 10, fontWeight: '400' }]}>Tap + to add your tasks</Text>
                </View>
            </View>
            <View style={styles.bottomNav}>
                <View>
                    <TouchableOpacity style={{ alignItems: 'center' }}>
                        <Image style={[StyleCommon.iconNav]} source={require('../../assets/NavigationIcon/index.png')} />
                        <Text style={[StyleCommon.normalText, { fontSize: 12 }]}>Home</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={{ alignItems: 'center' }}>
                        <Image style={[StyleCommon.iconNav]} source={require('../../assets/NavigationIcon/calendar.png')} />
                        <Text style={[StyleCommon.normalText, { fontSize: 12 }]}>Calendar</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={[{ alignItems: 'center', position:'relative'}]}>
                    <View style={[styles.iconWrapper, Colors.mainButton]}>
                        <Text style={[StyleCommon.normalText,{fontSize: 30}]}>+</Text>
                    </View>
                </TouchableOpacity>
                <View>
                    <TouchableOpacity style={{ alignItems: 'center' }}>
                        <Image style={[StyleCommon.iconNav]} source={require('../../assets/NavigationIcon/clock.png')} />
                        <Text style={[StyleCommon.normalText, { fontSize: 12 }]}>Focuse</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={{ alignItems: 'center' }}>
                        <Image style={[StyleCommon.iconNav]} source={require('../../assets/NavigationIcon/profile.png')} />
                        <Text style={[StyleCommon.normalText, { fontSize: 12 }]}>Profile</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    bgrImg: {
        width: 227,
        height: 227
    },
    content: {
        alignItems: 'center',
        marginTop: 74
    },
    bottomNav: {
        backgroundColor: '#363636',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 10,
        marginTop:300,
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
    }
})