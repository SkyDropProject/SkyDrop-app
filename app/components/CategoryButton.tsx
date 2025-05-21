import {CategoryButtonProps} from "@/app/interfaces/component";
import {StyleSheet, TouchableOpacity, Text} from "react-native";

const CategoryButton = (props : CategoryButtonProps) => {
    return(
        <TouchableOpacity style={styles.button}>
            {props.icon && <props.icon />}
            <Text style={styles.text}>{props.text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button : {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
    }

})

export default CategoryButton;