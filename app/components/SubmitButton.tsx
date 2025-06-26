import { ReactElement, useEffect, useRef } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, Animated } from 'react-native';
import { SubmitButtonProps } from '@/app/interfaces/component';

const { width } = Dimensions.get('window');

const SubmitButton = (props: SubmitButtonProps & { animated?: boolean }): ReactElement => {
    const scale = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (props.animated) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(scale, { toValue: 1.2, duration: 700, useNativeDriver: true }),
                    Animated.timing(scale, { toValue: 1, duration: 700, useNativeDriver: true }),
                ])
            ).start();
        }
    }, [props.animated, scale]);

    const ButtonContent = (
        <TouchableOpacity
            style={[styles.button, props.disabled && styles.disabled]}
            onPress={props.onPress}
            disabled={props.disabled}
        >
            <Text style={styles.buttonText}>{props.text}</Text>
        </TouchableOpacity>
    );

    return props.animated ? (
        <Animated.View style={{ transform: [{ scale }] }}>
            {ButtonContent}
        </Animated.View>
    ) : (
        ButtonContent
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#006FFD',
        padding: 10,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.75,
        height: 45,
    },
    buttonText: {
        fontFamily: 'Inter',
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fff',
    },
    disabled: {
        backgroundColor: 'rgb(229,229,229)',
        color: 'rgb(182,182,182)',
    }
});

export default SubmitButton;