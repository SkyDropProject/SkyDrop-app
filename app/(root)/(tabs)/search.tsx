import { ReactElement } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import CatalogTab from '@/app/components/CatalogTab';

const Search = (): ReactElement => {
    return (
        <ScrollView>
            <View style={styles.catalogTab}>
                <CatalogTab />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    catalogTab: {
        paddingTop: 20,
    },
});

export default Search;
