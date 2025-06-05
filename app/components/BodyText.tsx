import { ReactElement } from 'react';
import { StyleSheet, Text } from 'react-native';

import { BodyProps } from '@/app/interfaces/component';
const BodyText = (props: BodyProps): ReactElement => {
    return <Text style={styles[props.size]}>{props.text}</Text>;
};

const styles = StyleSheet.create({
    small: {
        fontFamily: 'Inter',
        fontWeight: 'light',
        fontSize: 12,
    },
    medium: {
        fontFamily: 'Inter',
        fontWeight: 'regular',
        fontSize: 16,
    },
    large: {
        fontFamily: 'Inter',
        fontWeight: 'regular',
        fontSize: 18,
    },
    xlarge: {
        fontFamily: 'Inter',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default BodyText;
