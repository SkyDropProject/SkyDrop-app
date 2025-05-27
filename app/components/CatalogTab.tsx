import {StyleSheet, View} from "react-native";
import {useEffect, useState} from "react";
import {ProductType} from "@/app/interfaces/Product";
import ProductCard from "@/app/components/ProductCard";
import {TitleSize} from "@/app/utils/Typography";
import TitleText from "@/app/components/TitleText";
import CategoryButton from "@/app/components/CategoryButton";
import Icon from "@/app/utils/Icon";

const CatalogTab = () => {
    const [products,setProducts] = useState<ProductType[]>([])

    const initProducts = () => {
        //route all products

        const product : ProductType = {
            name: "Coca-Cola",
            price: 2,
            image: "https://pizzavia.fr/wp-content/uploads/2025/01/coca.png",
            stock: 15000,
            _id: "adbuz1234567890",
            description: "Canette classique de coca cola",
            categoryId: "Boisson",
            weight: 33
        }
        const bigmac : ProductType = {
            name: "Big-Mac",
            price: 10,
            image : "https://eu-images.contentstack.com/v3/assets/blt5004e64d3579c43f/blt53e76fa73b472f03/666c66deb01d0ed0814618a2/BigMac_GLOBAL_400x400px_72DPI.png?auto=webp",
            stock: 55,
            _id: "izjd9242948",
            description: "Burger classique du Mc do",
            categoryId: "Burger",
            weight: 100
        }

        const bigmac1 : ProductType = {
            name: "Big-Mac",
            price: 10,
            image : "https://eu-images.contentstack.com/v3/assets/blt5004e64d3579c43f/blt53e76fa73b472f03/666c66deb01d0ed0814618a2/BigMac_GLOBAL_400x400px_72DPI.png?auto=webp",
            stock: 55,
            _id: "izjd9242948",
            description: "Burger classique du Mc do",
            categoryId: "Burger",
            weight: 100
        }

        const bigmac2 : ProductType = {
            name: "Big-Mac",
            price: 10,
            image : "https://eu-images.contentstack.com/v3/assets/blt5004e64d3579c43f/blt53e76fa73b472f03/666c66deb01d0ed0814618a2/BigMac_GLOBAL_400x400px_72DPI.png?auto=webp",
            stock: 55,
            _id: "izjd9242948",
            description: "Burger classique du Mc do",
            categoryId: "Burger",
            weight: 100
        }
        setProducts([product,bigmac,bigmac1,bigmac2])
    }

    useEffect(() => {
        initProducts()
    },[])
    return(
        <View style={styles.ProductTab}>
            <TitleText text={"Catalogue"} size={TitleSize.h2} />
            <View style={styles.categories}>
                <CategoryButton icon={Icon.alcool} text={"Alcools"} />
                <CategoryButton icon={Icon.snack} text={"Snacks"} />
                <CategoryButton icon={Icon.boisson} text={"Boissons"} />
                <CategoryButton icon={Icon.divers} text={"Divers"} />
            </View>
            <TitleText size={TitleSize.h2} text={"Produits"} />
            <View style={styles.ProductsList}>
                {
                    products.map((product,index) => (
                        <ProductCard key={index} product={product} />
                    ))
                }
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    ProductTab: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        width: "100%",
        height: "100%",
        padding: 30,
    },
    categories: {
        display: "flex",
        flexDirection: "row",
        gap: 30,
        marginBottom: 10
    },
    ProductsList: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
    },
});
export default CatalogTab;