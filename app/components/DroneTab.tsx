import React, { ReactElement, useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, ActivityIndicator } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon from '@/app/utils/Icon';
import { GeoType } from '@/app/interfaces/GeoType';
import { DroneType } from '@/app/interfaces/Drone';
import { DroneTabProps } from '@/app/interfaces/component';
import StatusBars from '@/app/components/StatusBars';

const DroneTab = (props: DroneTabProps): ReactElement => {
    const [targetPosition, setTargetPosition] = useState<GeoType>({ latitude: 0, longitude: 0 });
    const [loading, setLoading] = useState(false);
    const [drone, setDrone] = useState<DroneType | null>(null);
    const convertXYtoLatLng = (coords: { x: number; y: number }): GeoType => ({
        latitude: coords.x,
        longitude: coords.y,
    });
    const getDrones = async (): Promise<void> => {
        const response = await axios.get('/drone/' + props.order.droneId._id);
        if (response.status === 200) {
            const droneData = response.data;
            const newCoordinates = convertXYtoLatLng(droneData.coordinates);
            if (
                !drone ||
                drone.coordinates.latitude !== newCoordinates.latitude ||
                drone.coordinates.longitude !== newCoordinates.longitude
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
        switch (status) {
            case 'waiting':
                return 0;
            case 'ready':
                return 1;
            case 'pending':
                return 2;
            default:
                return 0;
        }
    };

    useEffect(() => {
        setLoading(true);
        getDeliveryLocation();
        getDrones();
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (props.visible) {
            getDrones();
            interval = setInterval(getDrones, 2000);
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
            <View style={styles.container}>
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
                    <Marker coordinate={targetPosition} title="Livraison" />
                    <Polyline
                        coordinates={[drone.coordinates, targetPosition]}
                        strokeColor="#386BF6"
                        strokeWidth={5}
                    />
                </MapView>
            </View>
            <View style={styles.informations}>
                <StatusBars status={getStatusIndex(drone.status)} />
            </View>
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
    },
    informations: {
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        margin: 20,
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.6,
    },
});

export default DroneTab;
