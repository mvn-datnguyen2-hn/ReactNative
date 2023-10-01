import { StyleSheet, Text, View, Image} from 'react-native'
import StyleCommon from '../../common/CommonStyles'
import React from 'react'
import Spacing from '../../common/Spacing';

type Props = {
    id: number;
    img: number;
    title: string;
    description: string;
  };
interface IntroProps {
    intro: Props,
}

const SlideItem : React.FC<IntroProps> = ({intro}) : JSX.Element => {
    return (
        <View style={[StyleCommon.container,StyleCommon.alignItemCenter]}>
            <Image source={intro.img} resizeMode='contain' style={StyleCommon.introImg} />
            <View style={styles.content}>
                <Text style={[StyleCommon.title, StyleCommon.whiteText]}>{intro.title}</Text>
                <Text numberOfLines={2} ellipsizeMode='tail' 
                style={[
                    StyleCommon.description, 
                    styles.descript,StyleCommon.whiteText, Spacing.marginVertical50]}>{intro.description}</Text>
            </View>
        </View>
    )
};


const styles = StyleSheet.create({
    content: {
        flex: 0.4,
        marginTop: 50,
        alignItems: 'center',
    },
    descript: {
        width: 310
    }
})
export default SlideItem