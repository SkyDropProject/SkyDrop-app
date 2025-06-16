import {ReactElement, useEffect, useRef, useState} from 'react';
import {Animated, Dimensions, Easing, Image, StyleSheet, View} from 'react-native';
import {useIntl} from "react-intl";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {API_URL} from "@/app/utils/Api";
import {useAlert} from "@/app/components/AlertContext";
import { BodySize } from '@/app/utils/Typography';
import { ProductDetailProps } from '@/app/interfaces/component';
import SubmitButton from "@/app/components/SubmitButton";
import BodyText from '@/app/components/BodyText';
import ExpansionPanel from '@/app/components/ExpansionPanel';
import QuantityComponent from '@/app/components/QuantityComponent';

import Icon from '../utils/Icon';

const { width, height } = Dimensions.get('window');

const ProductDetail = (props: ProductDetailProps): ReactElement => {
    const [quantity, setQuantity] = useState(1);
    const translateY = useRef(new Animated.Value(height)).current;
    const intl = useIntl();
    const { showAlert } = useAlert();

    useEffect(() => {
        Animated.timing(translateY, {
            toValue: 0,
            duration: 300,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
        }).start();
    }, [translateY]);

    const handleClose = () : void=> {
        Animated.timing(translateY, {
            toValue: height,
            duration: 300,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
        }).start(() => props.onClose());
    };

    const handleSubmit = async () : Promise<void> => {
        const userId = await AsyncStorage.getItem('userId');
        try {
            for (let i = 0; i < quantity; i++) {
                await axios.put("/user/cart", {
                    productId: props.product._id,
                    _id: userId,
                });
            }
            showAlert("Votre produit a bien été ajouté au panier", "success");
        } catch {
            showAlert("Une erreur a été rencontrée", "error");
        }
    }
    return (
        <Animated.View style={[styles.ProductDetail, { transform: [{ translateY }] }]}>
            <Icon.cross width={32} height={32} onPress={handleClose} style={styles.cross} />
            <View style={styles.container}>
                <Image source={{ uri: API_URL + "/uploads/" + props.product.imageUrl }} style={styles.image} resizeMode="contain" />
            </View>
            <View style={styles.infos}>
                <BodyText size={BodySize.xlarge} text={props.product.name} />
                <BodyText size={BodySize.large} text={props.product.price + ' €'} />
                <BodyText size={BodySize.medium} text={props.product.weight.toString() + ' g'} />
                <QuantityComponent quantity={quantity} setQuantity={setQuantity} loading={false} />
            </View>
            <ExpansionPanel title={intl.formatMessage({id:"details"})}>
                <BodyText size={BodySize.small} text={props.product.description} />
            </ExpansionPanel>
            <View style={styles.buttonAddToCart}>
                <SubmitButton text={intl.formatMessage({id:"addToCart"})} onPress={handleSubmit} />
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    ProductDetail: {
        width: '100%',
        flex: 1,
        height: '100%',
        backgroundColor: '#fff',
        padding: 30,
        alignItems: 'center',
        position: 'relative',
    },
    container: {
        width: width * 0.70,
        height: height * 0.3,
        marginTop: width * 0.1,
        marginBottom: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    cross: {
        position: 'absolute',
        top: 50,
        right: 10,
    },
    infos:{
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
        gap: 5,
        marginBottom: 20,
    },
    buttonAddToCart: {
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 50,
    }
});
export default ProductDetail;
