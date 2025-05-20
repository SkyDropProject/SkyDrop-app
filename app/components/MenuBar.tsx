import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import Icon from "@/app/utils/Icon";
import { MenuBarProps } from "@/app/interfaces/component";
import {useIntl} from "react-intl";

const MenuBar = ({ activeTab, onTabPress }: MenuBarProps) => {
    const intl = useIntl()

    const tabs = [
        { id: "home", label: intl.formatMessage({id:"homeMenu"}), icon: Icon.home, icon_selected: Icon.home_selected },
        { id: "catalog", label: intl.formatMessage({id:"catalogMenu"}), icon: Icon.catalog, icon_selected: Icon.catalog_selected },
        { id: "drone", label: "Drone", icon: Icon.drone, icon_selected: Icon.drone_selected },
        { id: "cart", label: intl.formatMessage({id:"cartMenu"}), icon: Icon.cart, icon_selected: Icon.cart_selected },
        { id: "profile", label: intl.formatMessage({id:"profileMenu"}), icon: Icon.profile, icon_selected: Icon.profile_selected },
    ];

    return (
        <View style={styles.menuBar}>
            {tabs.map((tab) => (
                <TouchableOpacity
                    key={tab.id}
                    style={[
                        styles.tab,
                        activeTab === tab.id && styles.activeTab,
                    ]}
                    onPress={() => onTabPress(tab.id)}
                >
                    { activeTab === tab.id ? <tab.icon_selected width={24} height={24} /> : <tab.icon width={24} height={24} /> }
                    <Text style={[styles.text,
                        activeTab === tab.id && styles.activeText]}>
                        {tab.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    menuBar: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: "#ccc",
    },
    tab: {
        flex: 1,
        alignItems: "center",
        padding: 10,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: "#007BFF",
    },
    text: {
        color: "#007BFF",
        fontWeight: "bold",
        fontSize: 12,
        marginTop: 5,
        opacity: 0,
    },
    activeText: {
        opacity: 1,
    },

});

export default MenuBar;