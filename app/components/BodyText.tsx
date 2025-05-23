import {BodyProps} from "@/app/interfaces/component";
import {StyleSheet,Text} from "react-native";
const BodyText = (props : BodyProps) => {
    return(
        <Text style={styles[props.size]}>props.text</Text>
    )
}

const styles = StyleSheet.create({
    small:{
        fontFamily: 'Inter',
        fontWeight: 'regular',
        fontSize: 14,
    },
    medium:{
        fontFamily: 'Inter',
        fontWeight: 'regular',
        fontSize: 16,
    },
    large:{
        fontFamily: 'Inter',
        fontWeight: 'regular',
        fontSize: 18,
    },
    xlarge:{
        fontFamily: 'Inter',
        fontWeight: 'bold',
        fontSize: 18,
    }
})

export default BodyText;