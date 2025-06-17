import { ReactElement } from 'react';
import { StyleSheet, Text } from 'react-native';

import { BodyProps } from '@/app/interfaces/component';
const BodyText = (props: BodyProps): ReactElement => {
    return <Text style={styles[props.size]}>{props.text}</Text>;
};

const styles = StyleSheet.create({
    small: {
        fontFamily: 'inter',
        fontWeight: 'light',
        fontSize: 12,
    },
    medium: {
        fontFamily: 'inter',
        fontWeight: 'regular',
        fontSize: 16,
    },
    large: {
        fontFamily: 'inter',
        fontWeight: 'regular',
        fontSize: 18,
    },
    xlarge: {
        fontFamily: 'inter',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default BodyText;
