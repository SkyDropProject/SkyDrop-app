import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinkButtonProps } from '@/app/interfaces/component';

const LinkButton = (props: LinkButtonProps) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <Text style={styles.LinkButton}>{props.text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    LinkButton: {
        color: '#006FFD',
    },
});
export default LinkButton;
