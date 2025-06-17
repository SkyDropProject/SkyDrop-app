import { ReactElement } from 'react';
import { ScrollView } from 'react-native';

import CatalogTab from '@/app/components/CatalogTab';

const Search = (): ReactElement => {
    return (
        <ScrollView>
            <CatalogTab />
        </ScrollView>
    );
};

export default Search;
