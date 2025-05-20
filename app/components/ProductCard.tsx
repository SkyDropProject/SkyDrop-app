import {StyleSheet, Dimensions, View, Text} from "react-native";
import {ProductCardProps} from "@/app/interfaces/component";
const { width } = Dimensions.get("window");

const ProductCard = (props : ProductCardProps) => {

    return(
        <View style={styles.view}>
            {props.icon && <props.icon width={50} />}
            <Text>{props.name}</Text>
            <Text>{props.description}</Text>
            <Text>{props.price}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    view : {
        backgroundColor: "#fff",
        borderRadius: 15,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: (width * 0.75) / 2,
        height: 150,
        color: "#000000"
    }
})
export default ProductCard;