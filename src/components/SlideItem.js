import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React from 'react'
const { width, height } = Dimensions.get('screen')
const SlideItem = ({ item }) => {
    return (
        <View style={styles.container}>
            <Image source={item.img} resizeMode='contain' style={styles.image} />
            <View style={styles.content}>
                <Text style={styles.title}>{item.title}</Text>
                <Text numberOfLines={2} ellipsizeMode='tail' style={styles.description}>{item.description}</Text>
            </View>
        </View>
    )
}

export default SlideItem

const styles = StyleSheet.create({
    container: {
        width,
        height,
        alignItems: 'center',
    },
    image: {
        width: '50%',
        height: '40%'
    },
    content: {
        flex: 0.4,
        marginTop: 50,
        alignItems: 'center',
    },
    description: {
        textAlign: 'center',
        width: 300,
        fontSize: 15,
        marginVertical: 50,
        color: 'white',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
    }
})