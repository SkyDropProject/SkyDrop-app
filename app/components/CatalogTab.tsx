import axios from 'axios';
import { ReactElement, useEffect, useState } from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useIntl} from "react-intl";

import CategoryButton from '@/app/components/CategoryButton';
import ProductCard from '@/app/components/ProductCard';
import TitleText from '@/app/components/TitleText';
import { ProductType } from '@/app/interfaces/Product';
import Icon from '@/app/utils/Icon';
import { TitleSize } from '@/app/utils/Typography';
import {CategoryType} from "@/app/interfaces/Category";
import SearchBar from "@/app/components/SearchBar";
import {useProductModal} from "@/app/providers/ProductModalProvider";


const CatalogTab = (): ReactElement => {
    const[categories, setCategories] = useState<CategoryType[]>([]);
    const [products, setProducts] = useState<ProductType[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
    const [search, setSearch] = useState<string>('');
    const { showProduct } = useProductModal();
    const intl = useIntl();

    const initCategory = async (): Promise<void> => {
        const response = await axios.get('/category');
        const category = response?.data;
        setCategories(category);
    }

    const initProducts = async (): Promise<void> => {
        const response = await axios.get('/product');
        const products: ProductType[] = response.data;
        setProducts(products);
    };

    const filteredProducts = products.filter(product => {
        const matchCategory = selectedCategoryId ? product.categoryId === selectedCategoryId : true;
        const matchSearch = product.name.toLowerCase().includes(search.toLowerCase());
        return matchCategory && matchSearch;
    });

    useEffect(() => {
        initCategory();
        initProducts();
    }, []);
    return (
        <View style={styles.ProductTab}>
            <TitleText text={intl.formatMessage({id: "catalogMenu"})} size={TitleSize.h2} />
            <SearchBar
                placeholder={intl.formatMessage({id: "searchForAProduct"})}
                value={search}
                onChangeText={setSearch}
            />
            <ScrollView style={styles.categories} contentContainerStyle={{ columnGap: 20, }} horizontal showsHorizontalScrollIndicator={false}>
            {
                categories.map((category, index) => (
                    <CategoryButton icon={Icon[category.name.toLowerCase() as keyof typeof Icon] || Icon.divers} text={category.name} key={index} onPress={() => setSelectedCategoryId(category._id)} />
                ))
            }
            </ScrollView>
            <TitleText size={TitleSize.h2} text={intl.formatMessage({id: "products"})} />
            <View style={styles.ProductsList}>
                {filteredProducts.map((product, index) => (
                    <ProductCard key={index} product={product} onPress={() => showProduct(product)} />
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
        marginTop: 30,
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
