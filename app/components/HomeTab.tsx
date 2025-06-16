import { ReactElement, useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { TitleSize } from '@/app/utils/Typography';

import ProductCard from '@/app/components/ProductCard';
import { ProductType } from '@/app/interfaces/Product';
import { useProductModal } from '@/app/providers/ProductModalProvider';
import { getAddressFromCoords } from '@/app/utils/Geo';
import { GeoType } from '@/app/interfaces/GeoType';
import TitleText from '@/app/components/TitleText';
import DeliveryPositionPicker from '@/app/components/DeliveryPositionPicker';
import MapPicker from '@/app/components/MapPicker';

const HomeTab = (): ReactElement => {
    const intl = useIntl();
    const [products, setProducts] = useState<ProductType[]>([]);
    const [position, setPosition] = useState<string>('Aucune Position');
    const { showProduct } = useProductModal();
    const modalizeRef = useRef<Modalize>(null);
    const mapPickerRef = useRef<any>(null);

    const openSheet = (): void => modalizeRef.current?.open();
    const closeSheet = (): void => modalizeRef.current?.close();

    const initProducts = async (): Promise<void> => {
        const response = await axios.get('/product/star');
        const products: ProductType[] = response.data;
        setProducts(products);
    };

    useEffect(() => {
        initProducts();
        getPositionDelivery();
    }, []);

    const getPositionDelivery = async (): Promise<void> => {
        const positionCoordinates = await AsyncStorage.getItem('location');
        if (positionCoordinates) {
            const coords: GeoType = JSON.parse(positionCoordinates);
            const namePosition: string = await getAddressFromCoords(
                coords.latitude,
                coords.longitude
            );
            setPosition(namePosition);
        } else {
            const coords: GeoType = { latitude: 44.133333, longitude: 4.083333 };
            const namePosition: string = await getAddressFromCoords(
                coords.latitude,
                coords.longitude
            );
            setPosition(namePosition);
        }
    };

    return (
        <View style={styles.HomeTab}>
            <TitleText size={TitleSize.h2} text={intl.formatMessage({ id: 'location' })} />
            <DeliveryPositionPicker position={position} onPress={openSheet} />
            <Modalize
                ref={modalizeRef}
                adjustToContentHeight
                onClosed={getPositionDelivery}
                onOpen={() => mapPickerRef.current?.reload()}
                handlePosition="inside"
            >
                <View style={{ minHeight: 350 }}>
                    <MapPicker ref={mapPickerRef} onClose={closeSheet} />
                </View>
            </Modalize>
            <TitleText size={TitleSize.h2} text={intl.formatMessage({ id: 'stars' })} />
            <ScrollView
                horizontal
                style={styles.ProductsList}
                contentContainerStyle={{ columnGap: 20 }}
            >
                {products.map((product, index) => (
                    <ProductCard
                        key={index}
                        product={product}
                        onPress={() => showProduct(product)}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    HomeTab: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
        height: '100%',
        marginTop: 30,
        padding: 30,
    },
    ProductsList: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
    },
});

export default HomeTab;
