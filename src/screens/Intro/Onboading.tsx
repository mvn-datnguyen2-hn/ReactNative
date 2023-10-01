import { Animated, FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import Button from '../../common/Button'
import Slides from '../../constant/introData'
import SlideItem from './SlideItem'
import Pagination from './Pagination'
import Colors from '../../common/Colors'
import StyleCommon from '../../common/CommonStyles'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackParams } from '../../../App'


const Slider: FunctionComponent = () => {
    const [index, setIndex] = useState(0);
    const [getStart, setGetStart] = useState('NEXT');
    const scrollX = useRef(new Animated.Value(0)).current;
    const slideRef = useRef(null);
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
    const handleOnScroll = (event: any) => {
        Animated.event(
            [
                {
                    nativeEvent: {
                        contentOffset: {
                            x: scrollX,
                        },
                    },
                },
            ],
            {
                useNativeDriver: false,
            },
        )(event);
        if (index === Slides.length - 1) {
            setGetStart('GET STARTED')
        }
        if (index < Slides.length - 1) {
            setGetStart('NEXT')
        }
    };
    const handleOnViewableItemsChanged = useRef(({ viewableItems }: any) => {
        setIndex(viewableItems[0].index);
    }).current;

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
    }).current;

    const handleNextButton = () => {
        if (index === Slides.length - 1) {
            navigation.navigate('Start')
            return;
        }
        if (index === Slides.length - 2) {
            setGetStart('GET STARTED')
        }
        setIndex(index + 1);
    }
    useEffect(() => {
        // @ts-ignore: Object is possibly 'null'.
        slideRef.current.scrollToIndex({
            index,
            animated: true
        })
    }, [index])
    return (
        <View style={StyleCommon.blackBackground}>
            <TouchableOpacity onPress={() => {
                navigation.navigate('Start')
            }} style={styles.buttonSkip}>
                <Text style={styles.skip}>SKIP</Text>
            </TouchableOpacity>
            <FlatList
                data={Slides}
                renderItem={({ item }) => <SlideItem intro={item} />}
                initialScrollIndex={index}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator
                onScroll={handleOnScroll}
                ref={slideRef}
                onViewableItemsChanged={handleOnViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
                keyExtractor={(_, index) => index.toString()}
            />
            <Pagination data={Slides} scrollX={scrollX} />
            <View style={styles.bottomButton}>
                <TouchableOpacity onPress={() => {
                    if (index === 0) {
                        return;
                    }
                    if (index < Slides.length) {
                        setGetStart('NEXT')
                    }
                    setIndex(index - 1);
                }} style={[Button.buttonIntroNavigate]}>
                    <Text style={[StyleCommon.normalText]}>BACK</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleNextButton} style={getStart == 'NEXT' ? [Button.buttonIntroNavigate, StyleCommon.mainButtonColor] : styles.buttonGetStarted}>
                    <Text style={[StyleCommon.normalText]}>{getStart}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Slider

const styles = StyleSheet.create({
    buttonSkip: {
        marginLeft: 24,
    },
    skip: {
        color: 'white',
        opacity: 0.44,
        height: 24,
        fontSize: 16
    },
    bottomButton: {
        bottom: 150,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10
    },
    buttonGetStarted: {
        backgroundColor: '#8875FF',
        width: 150,
        height: 48,
        justifyContent: 'center',
        borderRadius: 5
    }
})