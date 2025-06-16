import React, { ReactElement, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Icon from '../utils/Icon';

interface ExpansionPanelProps {
    title: string;
    children: React.ReactNode;
}

const ExpansionPanel = ({ title, children }: ExpansionPanelProps): ReactElement => {
    const [expanded, setExpanded] = useState(false);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setExpanded(!expanded)} style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                <Icon.arrow_bottom />
            </TouchableOpacity>
            {expanded && <View style={styles.content}>{children}</View>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        backgroundColor: '#fff',
        marginVertical: 8,
        overflow: 'hidden',
        width: '100%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    arrow: {
        fontSize: 18,
    },
    content: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
});

export default ExpansionPanel;
