import {CategoryButtonProps} from "@/app/interfaces/component";
import {StyleSheet, TouchableOpacity, Image, Text} from "react-native";

const CategoryButton = (props : CategoryButtonProps) => {
    return(
        <TouchableOpacity>
            <Image style={styles.image} />
            <Text style={styles.texte}>{props.text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    image : {
        width: 24,
        height: 24,
    },
    texte : {

    }

})

export default CategoryButton;