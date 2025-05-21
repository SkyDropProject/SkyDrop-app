import {Dimensions, StyleSheet, Text, TouchableOpacity} from "react-native";
import {SubmitButtonProps} from "@/app/interfaces/component";
const { width } = Dimensions.get("window");

const SubmitButton = (props : SubmitButtonProps)  => {
    return (
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>{props.text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#006FFD",
        padding: 10,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        width: width * 0.75,
        height: 45,
    },
    buttonText: {
        fontFamily: 'Inter',
        fontSize: 14,
        fontWeight: 'bold',
        color: "#fff",
    },
});

export default SubmitButton;