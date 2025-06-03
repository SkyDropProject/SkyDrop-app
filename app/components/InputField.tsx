import { TextInput, StyleSheet, Text, Dimensions, View } from 'react-native';
import { inputProps } from '@/app/interfaces/component';
const { width } = Dimensions.get('window');

const InputField = (props: inputProps) => {
    return (
        <View style={styles.InputField}>
            <TextInput
                style={[
                    styles.input,
                    props.small && styles.inputSmall,
                    props.disabled && styles.disabledInput,
                ]}
                placeholder={props.placeholder}
                value={props.value}
                onChangeText={props.onChangeText}
                editable={!props.disabled}
                secureTextEntry={props.secureTextEntry}
                keyboardType={props.keyboardType}
                placeholderTextColor={'#8F9098'}
            />
            {props.error && <Text style={styles.errorText}>{props.error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    InputField: {
        display: 'flex',
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#C5C6CC',
        padding: 10,
        color: '#8F9098',
        fontSize: 14,
        width: width * 0.75,
        height: 50,
    },
    inputSmall: {
        width: width * 0.36,
    },
    disabledInput: {
        backgroundColor: '#F0F0F0',
        borderColor: '#E0E0E0',
    },
    errorText: {
        fontSize: 12,
        color: 'red',
        fontWeight: 'light',
        marginLeft: 3,
        marginTop: 2,
        marginBottom: 5,
    },
});

export default InputField;
