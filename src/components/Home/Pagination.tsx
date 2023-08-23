import {StyleSheet, Animated, View, Dimensions} from 'react-native';
import React from 'react';

const {width} = Dimensions.get('screen');

type Props = {
  id: number;
  img: number;
  title: string;
  description: string;
};
interface DotProps {
  data: Props[],
  scrollX: any
}
const Pagination : React.FC<DotProps> = ({data, scrollX}) : JSX.Element => {
  return (
    <View style={styles.container}>
      {data.map((_ : any, idx: number) => {
        const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [12, 30, 12],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.5, 1, 0.5],
          extrapolate: 'clamp',
        });

        const backgroundColor = scrollX.interpolate({
          inputRange,
          outputRange: ['#ccc', '#ccc', '#ccc'],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={idx.toString()}
            style={[
              styles.dot,
              {width: dotWidth, backgroundColor, opacity},
            ]}
          />
        );
      })}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 450,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 30,
    backgroundColor: 'black',
    opacity: 0.7,
    marginHorizontal: 5,
    height: 5,
    borderRadius: 10,
    marginVertical: 20
  },
  dotActive: {
    backgroundColor: '#000',
  },
});