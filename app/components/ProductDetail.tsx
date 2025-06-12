import { ReactElement, useState } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';

import BodyText from '@/app/components/BodyText';
import ExpansionPanel from '@/app/components/ExpansionPanel';
import QuantityComponent from '@/app/components/QuantityComponent';
import { ProductDetailProps } from '@/app/interfaces/component';
import { BodySize } from '@/app/utils/Typography';

import Icon from '../utils/Icon';
const { width, height } = Dimensions.get('window');

const ProductDetail = (props: ProductDetailProps): ReactElement => {
    const [quantity, setQuantity] = useState(1);
    return (
        <View style={styles.ProductDetail}>
            <Icon.cross width={32} height={32} />
            <Image source={{ uri: props.product.imageUrl }} style={styles.image} />
            <BodyText size={BodySize.xlarge} text={props.product.name} />
            <BodyText size={BodySize.large} text={props.product.price + ' €'} />
            <BodyText size={BodySize.medium} text={props.product.weight.toString()} />
            <QuantityComponent quantity={quantity} setQuantity={setQuantity} />
            <ExpansionPanel title={'Détails'}>
                <BodyText size={BodySize.small} text={props.product.description} />
            </ExpansionPanel>
        </View>
    );
};

const styles = StyleSheet.create({
    ProductDetail: {},
    image: {
        width: width * 0.85,
        height: height * 0.3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
        position: 'relative',
    },
    cross: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
});
export default ProductDetail;
