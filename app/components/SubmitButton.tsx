import {Dimensions, StyleSheet, Text, TouchableOpacity} from "react-native";
const { width } = Dimensions.get("window");

interface SubmitButtonProps {
    text: string;
    onPress: () => void;
}

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
        width: width * 0.8,
    },
    buttonText: {
        fontFamily: 'Inter',
        fontSize: 20,
        color: "#fff",
    },
});

export default SubmitButton;