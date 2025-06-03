import { View, Text, StyleSheet } from 'react-native';
import { useAlert } from '@/app/components/AlertContext';
import Icon from '@/app/utils/Icon';

const Alert = () => {
    const { alert } = useAlert();
    // @ts-ignore
    const IconComponent = Icon[alert?.type];
    if (!alert) return null;

    return (
        <View style={[styles.container, styles[alert.type]]}>
            <IconComponent width={20} height={20} />
            <Text>{alert.message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 20,
        right: 20,
        borderRadius: 10,
        padding: 20,
        fontSize: 14,
        fontWeight: 400,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
    },
    error: {
        backgroundColor: '#fdeded',
    },

    info: {
        backgroundColor: '#e5f6fd',
    },

    success: {
        backgroundColor: '#edf7ed',
    },

    warning: {
        backgroundColor: '#fff4e5',
    },
});

export default Alert;
