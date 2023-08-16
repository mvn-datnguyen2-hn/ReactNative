import { Animated, FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, {useEffect, useRef, useState} from 'react'
import Slides from '../data'
import SlideItem from './SlideItem'
import Pagination from './Pagination'
const Slider = ({navigation}) => {
    const [index, setIndex] = useState(0);
    const [getStart, setGetStart] = useState('NEXT');
    const scrollX = useRef(new Animated.Value(0)).current;
    const slideRef = useRef(null);

    const handleOnScroll = event => {
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
    const handleOnViewableItemsChanged = useRef(({ viewableItems }) => {
        setIndex(viewableItems[0].index);
    }).current;

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
    }).current;

    const handleNextButton = () => {
        if (index === Slides.length - 1) {
            navigation.navigate('PreLogin')
            return;
        }
        if (index === Slides.length - 2) {
            setGetStart('GET STARTED')
        }
        setIndex(index + 1);
    }
    useEffect(() => {
        slideRef.current.scrollToIndex({
            index,
            animated: true
        })
    }, [index])
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => {
                navigation.navigate('PreLogin')
                }} style={styles.buttonSkip}>
            <Text style={styles.skip}>SKIP</Text>
            </TouchableOpacity>
            <FlatList
                data={Slides}
                renderItem={({ item }) => <SlideItem item={item} />}
                initialScrollIndex={index}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator
                onScroll={handleOnScroll}
                ref={slideRef}
                onViewableItemsChanged={handleOnViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
                keyExtractor={(item) => item.id}
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
                }} style={styles.buttonBack}>
                    <Text style={styles.back}>BACK</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleNextButton} style={ getStart == 'NEXT' ? styles.buttonNext : styles.buttonGetStarted}>
                    <Text style={styles.next}>{getStart}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Slider

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black'
    },
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
    back: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    },
    next: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    },
    buttonBack: {
        width: 90,
        height: 48,
        justifyContent: 'center',
        borderRadius: 5
    },
    buttonNext: {
        backgroundColor: '#8875FF',
        width: 90,
        height: 48,
        justifyContent: 'center',
        borderRadius: 5
    },
    buttonGetStarted: {
        backgroundColor: '#8875FF',
        width: 150,
        height: 48,
        justifyContent: 'center',
        borderRadius: 5
    }
})