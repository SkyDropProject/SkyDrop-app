import {View, StyleSheet, Image, TouchableOpacity} from "react-native";
import LikeButton from "@/app/components/LikeButton";
import {useState} from "react";
import {ProductType} from "@/app/interfaces/Product";
import BodyText from "@/app/components/BodyText";
import {BodySize} from "@/app/utils/Typography";
import ProductDetail from "@/app/components/ProductDetail";

const ProductCard = ({ product }: { product: ProductType }) => {
    const [isLiked,setIsLiked] = useState(false)

    const toggleLike = () => {
        setIsLiked(!isLiked)
    }

    return(
          <TouchableOpacity style={styles.ProductCard} activeOpacity={0.8}>
            <View style={styles.likeButton}>
                <LikeButton isLiked={isLiked} onPress={toggleLike} />
            </View>
            <View>
                <View style={styles.containerimage}>
                    <Image style={styles.image} source={{uri: product.image}} />
                </View>
                <View style={styles.info}>
                    <BodyText text={product.name} size={BodySize.xlarge} />
                    <BodyText size={BodySize.small} text={product.description} />
                    <BodyText size={BodySize.xlarge} text={product.price + " €"} />
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    ProductCard: {
        position: "relative",
        backgroundColor: "#fff",
        borderRadius: 15,
        width: 160,
        height: 215,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        padding: 20,
        marginVertical: 20
    },
    likeButton: {
        position: "absolute",
        top: 10,
        right: 10,
    },
    image:{
        width: 86,
        height: 86,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    containerimage:{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 10,
    },
    info:{
        display: "flex",
        flexDirection: "column",
        gap: 5,
        width: "100%",
    }
})

export default ProductCard;