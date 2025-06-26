import React, { ReactElement, useEffect, useState } from 'react';
import {StyleSheet, View, Dimensions, ActivityIndicator, ScrollView, TouchableOpacity} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon from '@/app/utils/Icon';
import { GeoType } from '@/app/interfaces/GeoType';
import { DroneType } from '@/app/interfaces/Drone';
import { DroneTabProps } from '@/app/interfaces/component';
import StatusBars from '@/app/components/StatusBars';
import TitleText from '@/app/components/TitleText';
import { BodySize, TitleSize } from '@/app/utils/Typography';
import BodyText from '@/app/components/BodyText';
import ProductCartCard from '@/app/components/ProductCartCard';
import { convertXYtoLatLng } from '@/app/utils/Geo';
import {useIntl} from "react-intl";
import SubmitButton from "@/app/components/SubmitButton";
import Spacer from '@/app/components/Spacer';
import OrderFinalStatus from "@/app/components/OrderFinalStatus";
import {OrderType} from "@/app/interfaces/Order";

const DroneTab = (props: DroneTabProps): ReactElement => {
    const [targetPosition, setTargetPosition] = useState<GeoType>({ latitude: 0, longitude: 0 });
    const [loading, setLoading] = useState(false);
    const [drone, setDrone] = useState<DroneType | null>(null);
    const [order, setOrder] = useState<OrderType>(props.order);
    const [disabledButtonGetOrder, setDisabledButtonGetOrder] = useState<boolean>(false);
    const intl = useIntl();

    const getOrder = async () => {
        const response = await axios.get('/order/' + props.order._id)
        if(response.status === 200) {
            setOrder(response.data);
        }
    }

    const getDrones = async (): Promise<void> => {
        const response = await axios.get('/drone/' + props.order.droneId._id);
        if (response.status === 200) {
            const droneData = response.data;
            const newCoordinates = convertXYtoLatLng(droneData.coordinates);
            if (
                !drone ||
                drone.coordinates.latitude !== newCoordinates.latitude ||
                drone.coordinates.longitude !== newCoordinates.longitude ||
                drone.status !== droneData.status
            ) {
                setDrone({
                    ...droneData,
                    coordinates: newCoordinates,
                });
            }
        }
    };

    const getDeliveryLocation = async (): Promise<void> => {
        const location = await AsyncStorage.getItem('location');
        if (location) {
            const coords: GeoType = JSON.parse(location);
            setTargetPosition(coords);
        }
        setLoading(false);
    };

    const getStatusIndex = (status: string): 0 | 1 | 2 => {
        if(order.status !== 'finished' && order.status !== 'cancelled') {
            switch (status) {
                case 'waiting':
                    return 0;
                case 'delivering':
                    return 1;
                case 'pending':
                    return 2;
                default:
                    return 0;
            }
        }else{
            return 2;
        }
    };

    const orderRecup = async (): Promise<void> => {
        const response = await axios.get('/order/completed/' + props.order._id);
        if(response.status === 200) {
            setDisabledButtonGetOrder(true);
        }
    }

    useEffect(() => {
        setLoading(true);
        getDeliveryLocation();
        getOrder();
        getDrones();
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (props.visible) {
            getOrder();
            getDrones();
            interval = setInterval(() => {
                getOrder();
                getDrones();
            }, 2000);
        }

        return (): void => {
            if (interval) clearInterval(interval);
        };
    }, [props, props.visible]);

    if (loading) {
        return <ActivityIndicator size="large" color="white" />;
    }
    if (!drone) {
        return <ActivityIndicator size="large" color="white" />;
    }

    return (
        <View style={styles.DroneTab}>
            {props.onBack && (
                <TouchableOpacity style={styles.backButtonContainer} onPress={props.onBack}>
                    <Icon.cross width={58} />
                </TouchableOpacity>
            )}
            <View style={styles.container}>
                {
                    order.status === "finished" ? (
                        <OrderFinalStatus status={0} />
                    ) : order.status === "cancelled" ? (
                        <OrderFinalStatus status={1} />
                    ) : (
                        <MapView
                            style={styles.map}
                            initialRegion={{
                                latitude: (drone.coordinates.latitude + targetPosition.latitude) / 2,
                                longitude: (drone.coordinates.longitude + targetPosition.longitude) / 2,
                                latitudeDelta: 0.05,
                                longitudeDelta: 0.05,
                            }}
                        >
                            <Marker coordinate={drone.coordinates} title="Drone">
                                <Icon.drone_delivery height={50} width={50} />
                            </Marker>
                            <Marker coordinate={targetPosition} title={intl.formatMessage({id: "delivery"})} />
                            <Polyline
                                coordinates={[drone.coordinates, targetPosition]}
                                strokeColor="#386BF6"
                                strokeWidth={5}
                            />
                        </MapView>
                    )
                }
            </View>
            {
                order.status !== "finished" && order.status !== "cancelled" ? (
                    drone.status === 'pending' ? (
                        <View style={styles.recup}>
                            <SubmitButton text={"Récupérer ma commande"} onPress={orderRecup} disabled={disabledButtonGetOrder} animated />
                        </View>

                        )
                        :
                        (

                            <ScrollView style={styles.informations}>
                                <StatusBars status={getStatusIndex(drone.status)} />
                                <Spacer />
                                <TitleText
                                    size={TitleSize.h2}
                                    text={'Commande n°' + order._id + ' en cours de livraison'}
                                />
                                <BodyText
                                    size={BodySize.small}
                                    text={
                                        'Votre commande est en cours d’acheminement, ' +
                                        drone.name +
                                        ' fait de son mieux pour vous la livrer à temps.'
                                    }
                                />
                                <Spacer />
                                <BodyText size={BodySize.xlarge} text={intl.formatMessage({id: "orderSummary"})} />
                                <Spacer />
                                {order.products.map((product, index) => (
                                    <ProductCartCard key={index} product={product} loading={false} disabled />
                                ))}
                            </ScrollView>
                        )
                    ) : (
                    <ScrollView style={styles.informations}>
                        <StatusBars status={3} />
                        <Spacer />
                        <TitleText
                            size={TitleSize.h2}
                            text={'Commande n°' + order._id + ' est finalisée ou annulée'}
                        />
                        <BodyText
                            size={BodySize.small}
                            text={
                                drone.name +
                                ' ainsi que toute l’équipe de SkyDrop vous remercie de votre commande ! ' +
                                'Nous espérons qu’elles s’est passée sans encombre et que vous en êtes satisfait !'
                            }
                        />
                        <Spacer />
                    </ScrollView>
                )}
        </View>
    );
};

const styles = StyleSheet.create({
    DroneTab: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    container: {
        display: 'flex',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.6,
    },
    informations: {
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        margin: 20,
    },
    map: {
        // width: Dimensions.get('window').width,
        // height: Dimensions.get('window').height * 0.6,
        width: '100%',
        height: '100%',
    },
    recup:{
        width: '100%',
        height: '30%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButtonContainer: {
        position: 'absolute',
        top: 50,
        left: 10,
        zIndex: 10,
    },
    backButton: {
        backgroundColor: 'white',
        borderRadius: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
    },
});

export default DroneTab;
