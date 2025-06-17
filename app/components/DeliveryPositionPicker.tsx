import React, { ReactElement } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

import Icon from '../utils/Icon';
import { DeliveryPositionPickerProps } from '../interfaces/component';

const DeliveryPositionPicker = ({
    position,
    onPress,
}: DeliveryPositionPickerProps): ReactElement => (
    <View>
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={styles.text}>{position}</Text>
            <Icon.arrow_bottom />
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        marginBottom: 16,
    },
    text: {
        flex: 1,
        fontSize: 16,
        color: '#222',
    },
});

export default DeliveryPositionPicker;
