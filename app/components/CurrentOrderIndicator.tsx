import React, { useRef, useEffect, ReactElement } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';

import Icon from '@/app/utils/Icon';
import { CurrentOrderIndicatorProps } from '@/app/interfaces/component';

const CurrentOrderIndicator = ({ onPress }: CurrentOrderIndicatorProps): ReactElement => {
    const scale = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(scale, { toValue: 1.2, duration: 700, useNativeDriver: true }),
                Animated.timing(scale, { toValue: 1, duration: 700, useNativeDriver: true }),
            ])
        ).start();
    }, [scale]);

    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Animated.View style={[styles.circle, { transform: [{ scale }] }]}>
                <Icon.drone_delivery width={32} height={32} />
            </Animated.View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: { alignItems: 'center', marginVertical: 20 },
    circle: {
        backgroundColor: '#386BF6',
        borderRadius: 40,
        width: 64,
        height: 64,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#386BF6',
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
});

export default CurrentOrderIndicator;
