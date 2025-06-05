import { ReactElement } from 'react';
import { useIntl } from 'react-intl';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { MenuBarProps } from '@/app/interfaces/component';
import Icon from '@/app/utils/Icon';

const MenuBar = (props: MenuBarProps): ReactElement => {
    const intl = useIntl();

    const tabs = [
        {
            id: 'home',
            label: intl.formatMessage({ id: 'homeMenu' }),
            icon: Icon.home,
            icon_selected: Icon.home_selected,
        },
        {
            id: 'catalog',
            label: intl.formatMessage({ id: 'catalogMenu' }),
            icon: Icon.catalog,
            icon_selected: Icon.catalog_selected,
        },
        { id: 'drone', label: '', icon: Icon.drone, icon_selected: Icon.drone_selected },
        {
            id: 'cart',
            label: intl.formatMessage({ id: 'cartMenu' }),
            icon: Icon.cart,
            icon_selected: Icon.cart_selected,
        },
        {
            id: 'profile',
            label: intl.formatMessage({ id: 'profileMenu' }),
            icon: Icon.profile_menu,
            icon_selected: Icon.profile_selected,
        },
    ];

    return (
        <View style={styles.menuBar}>
            {tabs.map((tab) => (
                <TouchableOpacity
                    key={tab.id}
                    style={[styles.tab, tab.id === 'drone' && styles.droneTab]}
                    onPress={() => props.onTabPress(tab.id)}
                >
                    {props.activeTab === tab.id ? (
                        tab.id === 'drone' ? (
                            <tab.icon_selected width={27} height={27} />
                        ) : (
                            <tab.icon_selected width={24} height={24} />
                        )
                    ) : tab.id === 'drone' ? (
                        <tab.icon width={27} height={27} />
                    ) : (
                        <tab.icon width={24} height={24} />
                    )}
                    <Text style={[styles.text, props.activeTab === tab.id && styles.activeText]}>
                        {tab.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    menuBar: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 5,
        borderWidth: 0,
    },
    tab: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#007BFF',
        fontWeight: 'bold',
        fontSize: 12,
        marginTop: 5,
        opacity: 0,
    },
    activeText: {
        opacity: 1,
    },
    droneTab: {
        position: 'relative',
        bottom: 25,
        backgroundColor: '#613EEA',
        borderRadius: '50%',
        padding: 30,
        width: 27,
        height: 27,
        boxShadow: '0px 0px 10px #613EEA',
    },
});

export default MenuBar;
