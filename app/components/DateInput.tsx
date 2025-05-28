import {View, TextInput, TouchableOpacity, StyleSheet, Dimensions, Text} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useState } from "react";
import Icon from "@/app/utils/Icon";
import {DateInputProps} from "@/app/interfaces/component";
const { width } = Dimensions.get("window");

const DateInput = (props : DateInputProps) => {
    const [isPickerVisible, setPickerVisible] = useState(false);

    const showPicker = () => setPickerVisible(true);
    const hidePicker = () => setPickerVisible(false);

    const handleConfirm = (date: Date) => {
        const formatted = date.toLocaleDateString("fr-FR");
        props.onChange(formatted);
        hidePicker();
    };

    const handleInputChange = (text: string) => {
        let cleaned = text.replace(/\D/g, "");
        if (cleaned.length > 2) cleaned = cleaned.slice(0,2) + "/" + cleaned.slice(2);
        if (cleaned.length > 5) cleaned = cleaned.slice(0,5) + "/" + cleaned.slice(5,9);
        props.onChange(cleaned);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder={props.placeholder || "JJ/MM/AAAA"}
                value={props.value}
                keyboardType="numeric"
                maxLength={10}
                onChangeText={handleInputChange}
                placeholderTextColor={"#8F9098"}
            />
            <TouchableOpacity onPress={showPicker} style={styles.icon}>
                <Icon.calendar width={24} height={24} color="#006FFD" />
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isPickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hidePicker}
                locale="fr-FR"
            />
            {props.error && <Text style={styles.errorText}>{props.error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flexDirection: "row", alignItems: "center",width: width * 0.75, },
    input: { flex: 1, padding: 10, borderWidth: 1, borderColor: "#C5C6CC", borderRadius: 12,  height: 50,},
    icon: { position: "absolute", right: 10 },
    errorText: {
        fontSize: 12,
        color: 'red',
        fontWeight: 'light',
        marginLeft: 3,
        marginTop: 2,
        marginBottom:5
    },
});

export default DateInput;