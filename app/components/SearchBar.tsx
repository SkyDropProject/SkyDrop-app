import React, {ReactElement, useState} from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

import { SearchBarProps } from '@/app/interfaces/component';
import Icon from "@/app/utils/Icon";

const SearchBar = ({ placeholder = 'Rechercher...', onChangeText, value } : SearchBarProps) : ReactElement => {
    const [search, setSearch] = useState(value ?? '');

    const handleChange = (text: string) : void => {
        setSearch(text);
        onChangeText?.(text);
    };

    return (
        <View style={styles.container}>
            <View style={styles.icone}>
            <Icon.search/>
            </View>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={search}
                onChangeText={handleChange}
                autoCorrect={false}
                autoCapitalize="none"
                clearButtonMode="while-editing"
                placeholderTextColor="#888"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        borderRadius : 12,
        backgroundColor: '#fff',
        textAlign: 'center',
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        width: '100%',
    },
    icone: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default SearchBar;