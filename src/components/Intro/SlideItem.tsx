import { StyleSheet, Text, View, Image} from 'react-native'
import StyleCommon from '../../Common/CommonStyles'
import Colors from '../../Common/Colors'
import React from 'react'
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
        <View style={[StyleCommon.container,{alignItems:'center'}]}>
            <Image source={intro.img} resizeMode='contain' style={StyleCommon.introImg} />
            <View style={styles.content}>
                <Text style={[StyleCommon.title, Colors.white]}>{intro.title}</Text>
                <Text numberOfLines={2} ellipsizeMode='tail' 
                style={[
                    StyleCommon.description, 
                    {width: 310, marginVertical: 50},Colors.white]}>{intro.description}</Text>
            </View>
        </View>
    )
};


const styles = StyleSheet.create({
    content: {
        flex: 0.4,
        marginTop: 50,
        alignItems: 'center',
    }
})
export default SlideItem