import { ReactElement } from 'react';
import { StyleSheet, Text } from 'react-native';

import { TitleProps } from '@/app/interfaces/component';

const TitleText = (props: TitleProps): ReactElement => {
    return <Text style={styles[props.size]}>{props.text}</Text>;
};

const styles = StyleSheet.create({
    h1: {
        fontFamily: 'Inter',
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 15,
    },
    h2: {
        fontFamily: 'Inter',
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 15,
    },
    h3: {
        fontFamily: 'Inter',
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 15,
    },
});

export default TitleText;
