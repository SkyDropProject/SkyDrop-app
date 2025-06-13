import {router, Tabs} from 'expo-router';
import {ReactElement, useEffect} from 'react';
import { useIntl } from 'react-intl';
import { Text, View } from 'react-native';

import Icon from '@/app/utils/Icon';
import {useAuth} from "@/app/providers/AuthProvider";

const TabIcon = ({
    Icon,
    focused,
    isMain = false,
    label,
}: {
    Icon: React.ComponentType<any>;
    focused: boolean;
    isMain?: boolean;
    label: string;
}): ReactElement => (
    <View
        className="items-center justify-center min-w-14"
        style={{
            paddingTop: isMain ? 0 : 10,
            transform: isMain ? [{ translateY: -10 }] : [],
            elevation: isMain ? 5 : 0,
            zIndex: isMain ? 10 : 0,
            paddingBottom: isMain ? 15 : 0,
        }}
    >
        <Icon />

        {!isMain && (
            <Text
                style={{
                    fontSize: 12,
                    color: '#386BF6',
                    lineHeight: 14,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    opacity: focused ? 1 : 0,
                }}
            >
                {label}
            </Text>
        )}
    </View>
);

export default function Layout(): ReactElement {
    const intl = useIntl();
    return (
        <Tabs
            initialRouteName="home"
            screenOptions={{
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: 'white',
                tabBarShowLabel: false,
                tabBarStyle: {
                    paddingTop: 10,
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: intl.formatMessage({ id: 'home' }),
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            Icon={focused ? Icon.hover_home : Icon.home}
                            focused={focused}
                            label={intl.formatMessage({ id: 'home' })}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: intl.formatMessage({ id: 'catalog' }),
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            Icon={focused ? Icon.hover_catalog : Icon.catalog}
                            focused={focused}
                            label="Search"
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="order"
                options={{
                    title: intl.formatMessage({ id: 'order' }),
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            Icon={focused ? Icon.hover_drone_nav : Icon.drone_nav}
                            focused={focused}
                            isMain
                            label="Order"
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="cart"
                options={{
                    title: intl.formatMessage({ id: 'cart' }),
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            Icon={focused ? Icon.hover_cart : Icon.cart}
                            focused={focused}
                            label="Cart"
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: intl.formatMessage({ id: 'profile' }),
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            Icon={focused ? Icon.hover_profile : Icon.profile}
                            focused={focused}
                            label="Profile"
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
