import axios from 'axios';
import { ReactElement, useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import BodyText from '@/app/components/BodyText';
import LikeButton from '@/app/components/LikeButton';
import { ProductType } from '@/app/interfaces/Product';
import { BodySize } from '@/app/utils/Typography';

const ProductCard = ({ product }: { product: ProductType }): ReactElement => {
    const [isLiked, setIsLiked] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

    const toggleLike = (): void => {
        setIsLiked(!isLiked);
    };

    useEffect(() => {
        let objectUrl: string | undefined;
        const fetchImg = async (): Promise<void> => {
            try {
                const response = await axios.get('/uploads/' + product.imageUrl);
                objectUrl = response.request.responseURL;
                setImageUrl(objectUrl);
            } catch {
                setImageUrl(undefined);
            }
        };
        fetchImg();
        return (): void => {
            if (objectUrl) URL.revokeObjectURL(objectUrl);
        };
    }, [product.imageUrl]);

    return (
        <TouchableOpacity style={styles.ProductCard} activeOpacity={0.8}>
            <View style={styles.likeButton}>
                <LikeButton isLiked={isLiked} onPress={toggleLike} />
            </View>
            <View>
                <View style={styles.containerimage}>
                    <Image style={styles.image} source={{ uri: imageUrl }} />
                </View>
                <View style={styles.info}>
                    <BodyText text={product.name} size={BodySize.xlarge} />
                    <BodyText size={BodySize.small} text={product.description} />
                    <BodyText size={BodySize.xlarge} text={product.price + ' €'} />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    ProductCard: {
        position: 'relative',
        backgroundColor: '#fff',
        borderRadius: 15,
        width: 160,
        height: 215,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        padding: 20,
        marginVertical: 20,
    },
    likeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    image: {
        width: 86,
        height: 86,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerimage: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    info: {
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
        width: '100%',
    },
});

export default ProductCard;
