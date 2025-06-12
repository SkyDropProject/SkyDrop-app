import { ReactElement, useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';

import BodyText from '@/app/components/BodyText';
import QuantityComponent from '@/app/components/QuantityComponent';
import { ProductType } from '@/app/interfaces/Product';
import { BodySize } from '@/app/utils/Typography';

const { width } = Dimensions.get('window');

const ProductCartCard = ({ product }: { product: ProductType }): ReactElement => {
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState(1);
    useEffect(() => {
        setPrice(product.price + ' €');
    }, [product]);
    return (
        <View style={styles.productCard}>
            <Image style={styles.image} source={{ uri: product.imageUrl }} />
            <View style={styles.info}>
                <BodyText text={product.name} size={BodySize.xlarge} />
                <BodyText text={product.description} size={BodySize.small} />
                <View style={styles.last_row}>
                    <QuantityComponent quantity={quantity} setQuantity={setQuantity} />
                    <View>
                        <BodyText size={BodySize.xlarge} text={price} />
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    productCard: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 16,
        paddingVertical: 10,
        paddingHorizontal: 10,
        height: 110,
        width: width * 0.85,
        marginTop: 10,
    },
    image: {
        height: '100%',
        width: 100,
    },
    info: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 10,
        width: '80%',
    },
    last_row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
    },
});

export default ProductCartCard;
