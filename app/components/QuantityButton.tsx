import { ReactElement } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { QuantityButtonProps } from '@/app/interfaces/component';

const QuantityButton = (props: QuantityButtonProps): ReactElement => {
    return (
        <TouchableOpacity style={styles.QuantityButton} onPress={props.onPress}>
            <props.icon width={10} height={10} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    QuantityButton: {
        borderRadius: 50,
        padding: 10,
        backgroundColor: '#EAF2FF',
    },
});

export default QuantityButton;
