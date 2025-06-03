import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type ExpansionPanelProps = {
    title: string;
    children: React.ReactNode;
};

const ExpansionPanel = ({ title, children }: ExpansionPanelProps) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setExpanded(!expanded)} style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.arrow}>{expanded ? '▲' : '▼'}</Text>
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
        borderWidth: 1,
        borderColor: '#ddd',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f5f5f5',
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
