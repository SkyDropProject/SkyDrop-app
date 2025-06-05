import { ReactElement } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { CategoryButtonProps } from '@/app/interfaces/component';

const CategoryButton = (props: CategoryButtonProps): ReactElement => {
    return (
        <TouchableOpacity style={styles.button}>
            {props.icon && (
                <View style={styles.iconContainer}>
                    <props.icon />
                </View>
            )}
            <Text style={styles.text}>{props.text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        height: 40,
        justifyContent: 'center',
    },
    text: {
        marginTop: 20,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
    },
});

export default CategoryButton;
