import axios from 'axios';
import { ReactElement, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import CategoryButton from '@/app/components/CategoryButton';
import ProductCard from '@/app/components/ProductCard';
import TitleText from '@/app/components/TitleText';
import { ProductType } from '@/app/interfaces/Product';
import Icon from '@/app/utils/Icon';
import { TitleSize } from '@/app/utils/Typography';

const CatalogTab = (): ReactElement => {
    const [products, setProducts] = useState<ProductType[]>([]);

    const initProducts = async (): Promise<void> => {
        const response = await axios.get('/product');
        const products: ProductType[] = response.data;
        setProducts(products);
    };

    useEffect(() => {
        initProducts();
    }, []);
    return (
        <View style={styles.ProductTab}>
            <TitleText text={'Catalogue'} size={TitleSize.h2} />
            <View style={styles.categories}>
                <CategoryButton icon={Icon.alcool} text={'Alcools'} />
                <CategoryButton icon={Icon.snack} text={'Snacks'} />
                <CategoryButton icon={Icon.boisson} text={'Boissons'} />
                <CategoryButton icon={Icon.divers} text={'Divers'} />
            </View>
            <TitleText size={TitleSize.h2} text={'Produits'} />
            <View style={styles.ProductsList}>
                {products.map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    ProductTab: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
        height: '100%',
        padding: 30,
    },
    categories: {
        display: 'flex',
        flexDirection: 'row',
        gap: 30,
        marginBottom: 30,
    },
    ProductsList: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
});
export default CatalogTab;
