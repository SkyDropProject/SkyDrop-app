import React, { ReactElement, useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { AnimatedBarsProps } from '@/app/interfaces/component';

const AnimatedBar = ({ active }: AnimatedBarsProps): ReactElement => {
    const animation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (active) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(animation, {
                        toValue: 1,
                        duration: 800,
                        useNativeDriver: false,
                    }),
                    Animated.timing(animation, {
                        toValue: 0,
                        duration: 800,
                        useNativeDriver: false,
                    }),
                ])
            ).start();
        } else {
            animation.setValue(0);
        }
    }, [animation, active]);

    const width = active
        ? animation.interpolate({
              inputRange: [0, 1],
              outputRange: ['10%', '100%'],
          })
        : '100%';

    return (
        <View style={styles.barBackground}>
            <Animated.View
                style={[
                    styles.barFill,
                    { width, backgroundColor: active ? '#006FFD' : '#006FFD' },
                    active && { opacity: 0.7 },
                ]}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    barContainer: {
        flex: 1,
        marginHorizontal: 4,
    },
    barBackground: {
        height: 8,
        backgroundColor: '#e0e0e0',
        borderRadius: 4,
        overflow: 'hidden',
    },
    barFill: {
        height: 8,
        backgroundColor: '#006FFD',
        borderRadius: 4,
    },
});

export default AnimatedBar;
