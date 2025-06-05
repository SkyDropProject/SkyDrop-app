import { ReactElement, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { StyleSheet, View } from 'react-native';

import ProductCartCard from '@/app/components/ProductCartCard';
import TitleText from '@/app/components/TitleText';
import { ProductType } from '@/app/interfaces/Product';
import { TitleSize } from '@/app/utils/Typography';

const CartTab = (): ReactElement => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const intl = useIntl();

    const initProducts = (): void => {
        // init Products ici (à adapter un peu vu que ce sera un panier et pas des produits)
        const product: ProductType = {
            name: 'Coca-Cola 33cl',
            price: 2,
            image: 'https://pizzavia.fr/wp-content/uploads/2025/01/coca.png',
            stock: 15000,
            _id: 'adbuz1234567890',
            description: 'Canette classique de coca cola',
            categoryId: 'Boisson',
            weight: 33,
        };
        setProducts([product]);
    };
    useEffect(() => {
        initProducts();
    }, []);
    return (
        <View style={styles.cartmenu}>
            <View style={styles.header}>
                <TitleText size={TitleSize.h2} text={intl.formatMessage({ id: 'cart_title' })} />
            </View>
            <View style={styles.header}>
                <TitleText
                    size={TitleSize.h3}
                    text={
                        intl.formatMessage({ id: 'article_title' }) + ' (' + products.length + ')'
                    }
                />
            </View>
            {products.map((product, index) => (
                <ProductCartCard key={index} product={product} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    cartmenu: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '85%',
        paddingHorizontal: 15,
        marginTop: 10,
    },
});
export default CartTab;
