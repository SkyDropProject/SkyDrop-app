import {TitleProps} from "@/app/interfaces/component";
import {StyleSheet, Text} from "react-native";

const TitleText = (props: TitleProps) => {
    return(
        <Text style={styles[props.size]}>{props.text}</Text>
    )
}

const styles = StyleSheet.create({
        h1:{
            fontFamily: 'Inter',
            fontWeight: 'bold',
            fontSize: 24
        },
        h2:{
            fontFamily: 'Inter',
            fontWeight: 'bold',
            fontSize: 16,
        },
        h3:{
            fontFamily: 'Inter',
            fontWeight: 'bold',
            fontSize: 14,
        }
    })

export default TitleText;