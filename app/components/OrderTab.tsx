import {ReactElement, useCallback, useRef, useState} from "react";
import {ScrollView, StyleSheet, View} from "react-native";
import {useIntl} from "react-intl";
import {Modalize} from "react-native-modalize";
import {useFocusEffect} from "@react-navigation/native";
import {router} from "expo-router";
import axios from "axios";

import {BodySize, TitleSize} from "@/app/utils/Typography";
import TitleText from "@/app/components/TitleText";
import BodyText from "@/app/components/BodyText";
import SubmitButton from "@/app/components/SubmitButton";
import {OrderType} from "@/app/interfaces/Order";
import ProductCartCard from "@/app/components/ProductCartCard";
import CurrentOrderIndicator from "@/app/components/CurrentOrderIndicator";
import DroneTab from "@/app/components/DroneTab";

const OrderTab = (): ReactElement => {
    const intl = useIntl();
    const [orders, setOrders] = useState<OrderType[]>([]);
    const [currentOrders, setCurrentOrders] = useState<OrderType[]>();
    const modalizeRef = useRef<Modalize>(null);

    const [isDroneTabVisible, setIsDroneTabVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);

    const getOrders = async () : Promise<void> => {
        const response = await axios.get("/order");
        if(response.status === 200) {
            const ordersTmp: OrderType[] = response.data;
            const current = ordersTmp.filter(order => order.status === "created");
            const others = ordersTmp.filter(order => order.status !== "created");
            setCurrentOrders(current);
            setOrders(others);
        }
    }

    const handleGoCart = () : void=> {
        router.push('/(root)/(tabs)/cart');
    }

    useFocusEffect(
        useCallback(() => {
            getOrders();
        }, [])
    );

    return(
        selectedOrder ? <DroneTab order={selectedOrder} visible={isDroneTabVisible} /> :
            (<ScrollView contentContainerStyle={styles.OrderTab}>
            <TitleText size={TitleSize.h2} text={intl.formatMessage({id : "orderTitle"})} />
            <View style={styles.centre}>
                {currentOrders?.length === 0 ? (
                    <>
                        <BodyText size={BodySize.small} text={intl.formatMessage({id : "noCurrentOrder"})} />
                        <SubmitButton text={intl.formatMessage({id: "YourCart"})} onPress={handleGoCart} />
                    </>
                ) : (
                    <>
                        {currentOrders?.map((order,index) => (
                            <View key={order._id || index}>
                                <CurrentOrderIndicator onPress={() => {
                                    setSelectedOrder(order);
                                    modalizeRef.current?.open();
                                }} />
                            </View>
                        ))}
                    </>
                )}
            </View>
            <View>
                <BodyText size={BodySize.xlarge} text={intl.formatMessage({id: "lastOrders"})} />
            </View>
            <View>
                {orders.map((order, index) => (
                    <View key={order._id || index}>
                        <BodyText size={BodySize.small} text={intl.formatMessage({id: "orderNumber"}, {number: order._id})} />
                        {order.products.map((product, index2) => (
                            <ProductCartCard key={product._id || index2} product={product} loading={false} disabled />
                        ))}
                    </View>
                ))}
            </View>
            <Modalize
                ref={modalizeRef}
                adjustToContentHeight
                onOpen={() => setIsDroneTabVisible(true)}
                onClose={() => setIsDroneTabVisible(false)}
            >
                {selectedOrder && (
                    <DroneTab order={selectedOrder} visible={isDroneTabVisible} />
                )}
            </Modalize>
        </ScrollView>)
    );
};

const styles = StyleSheet.create({
    OrderTab: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
        height: '100%',
        marginTop: 30,
        padding: 30,
        gap:20
    },
    centre:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap:20,
        width: '100%',
    }
});

export default OrderTab;