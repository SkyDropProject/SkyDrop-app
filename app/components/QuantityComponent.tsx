import { ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';

import BodyText from '@/app/components/BodyText';
import QuantityButton from '@/app/components/QuantityButton';
import { QuantityComponentProps } from '@/app/interfaces/component';
import Icon from '@/app/utils/Icon';
import { BodySize } from '@/app/utils/Typography';

const QuantityComponent = (props: QuantityComponentProps): ReactElement => {
    const addQuantity = (): void => {
        props.setQuantity(props.quantity + 1);
    };

    const removeQuantity = (): void => {
        if (props.quantity === 1) return;
        props.setQuantity(props.quantity - 1);
    };
    return (
        <View style={styles.QuantityComponent}>
            <QuantityButton icon={Icon.minus} onPress={removeQuantity} />
            <BodyText size={BodySize.medium} text={props.quantity.toString()} />
            <QuantityButton icon={Icon.add} onPress={addQuantity} />
        </View>
    );
};

const styles = StyleSheet.create({
    QuantityComponent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        backgroundColor: '#fff',
        borderRadius: 12,
    },
});

export default QuantityComponent;
