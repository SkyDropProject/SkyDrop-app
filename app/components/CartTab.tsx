import { ReactElement, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useIntl } from 'react-intl';
import { StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router } from 'expo-router';

import ProductCartCard from '@/app/components/ProductCartCard';
import TitleText from '@/app/components/TitleText';
import { ProductType } from '@/app/interfaces/Product';
import { BodySize, TitleSize } from '@/app/utils/Typography';

import { useAlert } from '@/app/components/AlertContext';

import BodyText from '@/app/components/BodyText';
import SubmitButton from '@/app/components/SubmitButton';
import {convertXYtoLatLng} from "@/app/utils/Geo";

const CartTab = (): ReactElement => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loadingQuantities, setLoadingQuantities] = useState<{ [id: string]: boolean }>({});
    const intl = useIntl();
    const { showAlert } = useAlert();

    const totalItems = products.reduce((sum, product) => sum + (product.quantity || 1), 0);
    const totalPrice = products.reduce(
        (sum, product) => sum + (product.price || 0) * (product.quantity || 1),
        0
    );
    const deliveryPrice = 0.5;
    const initProducts = async (): Promise<void> => {
        const userId = await AsyncStorage.getItem('userId');
        const response = await axios.get('/user/cart/' + userId);

        if (response.status === 200) {
            const productIds: string[] = response.data;
            const productCount: Record<string, number> = {};
            productIds.forEach((id) => {
                productCount[id] = (productCount[id] || 0) + 1;
            });

            try {
                const uniqueIds = Object.keys(productCount);
                const productResponses = await Promise.all(
                    uniqueIds.map((id) => axios.get('/product/' + id))
                );
                const products = productResponses.map((res) => ({
                    ...res.data,
                    quantity: productCount[res.data._id] || 1,
                }));
                setProducts(products);
            } catch {
                showAlert('Erreur lors de la récupération des produits', 'warning');
            }
        } else {
            showAlert('Une erreur est survenue pour afficher votre panier', 'warning');
        }
    };

    const handleIncrease = async (productId: string): Promise<void> => {
        if (!productId) return;
        setLoadingQuantities((prev) => ({ ...prev, [productId]: true }));
        const userId = await AsyncStorage.getItem('userId');
        await axios.put('/user/cart', { _id: userId, productId });
        await initProducts();
        setLoadingQuantities((prev) => ({ ...prev, [productId]: false }));
    };

    const handleDecrease = async (productId: string): Promise<void> => {
        if (!productId) return;
        setLoadingQuantities((prev) => ({ ...prev, [productId]: true }));
        const userId = await AsyncStorage.getItem('userId');
        await axios.post('/user/cart', { _id: userId, productId });
        await initProducts();
        setLoadingQuantities((prev) => ({ ...prev, [productId]: false }));
    };

    const handleOrder = async (): Promise<void> => {
        if (!totalItems) return;
        if (products.length === 0) return;
        const userId = await AsyncStorage.getItem('userId');
        const location = await AsyncStorage.getItem('location');
        if (!location) {
            showAlert('Aucune localisation trouvée', 'warning');
            return;
        }
        const coords = convertXYtoLatLng(location);
        const productsToSend: ProductType[] = [];
        for (const product of products) {
            for (let i = 0; i < (product.quantity || 1); i++) {
                productsToSend.push(product);
            }
        }

        const payload = {
            products: productsToSend,
            price: totalPrice,
            coordinates: coords,
        };
        await axios.put('/order', payload);

        for (let product of products) {
            if (product.quantity === undefined) return;
            for (let i = 0; i < product.quantity; i++) {
                await axios.post('/user/cart', { _id: userId, productId: product._id });
            }
        }
        showAlert('Votre commande a bien été prise en compte', 'success');
        await initProducts();
        router.push('/(root)/(tabs)/order');
    };
    useFocusEffect(
        useCallback(() => {
            initProducts();
        }, [initProducts])
    );
    return (
        <View style={styles.cartmenu}>
            <View style={styles.header}>
                <TitleText size={TitleSize.h2} text={intl.formatMessage({ id: 'cart_title' })} />
            </View>
            <View style={styles.header}>
                <TitleText
                    size={TitleSize.h3}
                    text={intl.formatMessage({ id: 'article_title' }) + ' (' + totalItems + ')'}
                />
            </View>
            {products.map((product, index) => (
                <ProductCartCard
                    key={index}
                    product={product}
                    onIncrease={handleIncrease}
                    onDecrease={handleDecrease}
                    loading={!!loadingQuantities[product._id]}
                />
            ))}
            {products.length === 0 ? (
                <BodyText size={BodySize.small} text={"Ajouter des produits à votre panier, ils apparaitront ici !"} />
            ) : (
                <View style={styles.resumeSection}>
            <View style={styles.resume}>
                <View style={styles.gapBetween}>
                    <BodyText size={BodySize.medium} text={'Articles(' + totalItems + ')'} />
                    <BodyText size={BodySize.medium} text={'Livraison'} />
                    <BodyText size={BodySize.xlarge} text={'Total'} />
                </View>
                <View style={styles.gapBetween}>
                    <BodyText size={BodySize.xlarge} text={totalPrice.toFixed(2) + ' €'} />
                    <BodyText size={BodySize.xlarge} text={deliveryPrice.toFixed(2) + ' €'} />
                    <BodyText
                        size={BodySize.xlarge}
                        text={(totalPrice + deliveryPrice).toFixed(2) + ' €'}
                    />
                </View>
            </View>
            <SubmitButton text={'Commander'} onPress={handleOrder} />
        </View>
                )}
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
        marginTop: 30,
        padding: 30,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    resumeSection: {
        position: 'absolute',
        bottom: 80,
        borderRadius: 16,
        padding: 15,
        width: '100%',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
    },
    resume: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    gapBetween: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
    },
});
export default CartTab;
