import { Tabs } from 'expo-router';
import { View, Text } from 'react-native';

import HomeIcon from '@/assets/icons/navbar/home.svg';
import HoverHomeIcon from '@/assets/icons/navbar/hover_home.svg';
import SearchIcon from '@/assets/icons/navbar/search.svg';
import HoverSearchIcon from '@/assets/icons/navbar/hover_search.svg';
import CartIcon from '@/assets/icons/navbar/cart.svg';
import HoverCartIcon from '@/assets/icons/navbar/hover_cart.svg';
import ProfileIcon from '@/assets/icons/navbar/profile.svg';
import HoverProfileIcon from '@/assets/icons/navbar/hover_profile.svg';
import OrderIcon from '@/assets/icons/navbar/order.svg';
import HoverOrderIcon from '@/assets/icons/navbar/hover_order.svg';
import { useIntl } from 'react-intl';

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
}) => (
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

export default function Layout() {
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
                            Icon={focused ? HoverHomeIcon : HomeIcon}
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
                            Icon={focused ? HoverSearchIcon : SearchIcon}
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
                            Icon={focused ? HoverOrderIcon : OrderIcon}
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
                            Icon={focused ? HoverCartIcon : CartIcon}
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
                            Icon={focused ? HoverProfileIcon : ProfileIcon}
                            focused={focused}
                            label="Profile"
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
