import { ReactElement } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ProfileButtonProps } from '@/app/interfaces/component';
import Icon from '@/app/utils/Icon';
const { width } = Dimensions.get('window');

const IconButton = (props: ProfileButtonProps): ReactElement => {
    return (
        <TouchableOpacity style={styles.button} onPress={props.onPress}>
            <View style={styles.content}>
                {props.icon && <props.icon />}
                <Text>{props.text}</Text>
            </View>
            <Icon.arrow_right />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: width * 0.85,
        height: 60,
        backgroundColor: '#fff',
        paddingHorizontal: 15,
    },

    content: {
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default IconButton;
