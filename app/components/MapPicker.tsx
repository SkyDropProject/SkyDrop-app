import React, { useEffect, useImperativeHandle, useState, forwardRef} from 'react';
import {View, StyleSheet, Dimensions, Alert, TouchableOpacity, Text} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {GeoType} from "@/app/interfaces/GeoType";
import TitleText from "@/app/components/TitleText";
import {TitleSize} from "@/app/utils/Typography";
import {MapPickerProps} from "@/app/interfaces/component";
import InputField from "@/app/components/InputField";

import SubmitButton from './SubmitButton';
import { getAddressFromCoords } from '../utils/Geo';

const { width, height } = Dimensions.get('window');

const MapPicker = forwardRef<any,MapPickerProps>((props, ref)  => {
    MapPicker.displayName = 'MapPicker';
    const defaultRegion = {
        latitude: 44.1256,
        longitude: 4.0806,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    };

    const [region, setRegion] = useState(defaultRegion);
    const [marker, setMarker] = useState<GeoType | null>(null);
    const [search, setSearch] = useState('');
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

    const fetchSuggestions = async (query: string) : Promise<void> => {
        if (!query) {
            setSuggestions([]);
            return;
        }
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
            const data = await response.json();
            setSuggestions(data);
        } catch {
            setSuggestions([]);
        }
    };

    const handleSearchChange = (text: string) : void=> {
        setSearch(text);
        if (debounceTimeout) clearTimeout(debounceTimeout);
        const timeout = setTimeout(() => fetchSuggestions(text), 400);
        setDebounceTimeout(timeout);
    };

    const handleSuggestionPress = (item: any) : void=> {
        setSearch(item.display_name);
        setSuggestions([]);
        const coords = { latitude: parseFloat(item.lat), longitude: parseFloat(item.lon) };
        setRegion({ ...coords, latitudeDelta: 0.01, longitudeDelta: 0.01 });
        setMarker(coords);
    };

    const handleMapPress = (e: { nativeEvent: { coordinate: React.SetStateAction<GeoType | null>; }; }) : void => {
        setMarker(e.nativeEvent.coordinate);
    };

    const handleSearch = async () : Promise<void> => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(search)}`);
            const data = await response.json();
            if (data && data.length > 0) {
                const { lat, lon } = data[0];
                const coords = { latitude: parseFloat(lat), longitude: parseFloat(lon) };
                setRegion({ ...coords, latitudeDelta: 0.01, longitudeDelta: 0.01 });
                setMarker(coords);
            } else {
                Alert.alert('Adresse non trouvée');
            }
        } catch {
            Alert.alert('Erreur lors de la recherche');
        }
    };

    const handleSubmit = async (): Promise<void> => {
        if (!marker) {
            Alert.alert('Veuillez placer un marqueur');
            return;
        }
        await AsyncStorage.setItem('location', JSON.stringify(marker));
        const address = await getAddressFromCoords(marker.latitude, marker.longitude);
        Alert.alert('Emplacement enregistré', address);
        props.onClose();
    };

    const loadPosition = async () : Promise<void> => {
        const saved = await AsyncStorage.getItem('location');
        if (saved) {
            const coords: GeoType = JSON.parse(saved);
            setRegion({
                latitude: coords.latitude,
                longitude: coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
            setMarker({
                latitude: coords.latitude,
                longitude: coords.longitude,
            });
        }
    };
    useImperativeHandle(ref, () => ({
        reload: loadPosition
    }));

    useEffect(() => {
        loadPosition();
    }, []);

    useEffect(() => {
        if (props.onOpen) props.onOpen();
    }, [props,props.onOpen]);



    return (
        <View style={styles.container}>
            <TitleText size={TitleSize.h2} text={"Choisir l'adresse de livraison"} />
            <InputField
                placeholder="Rechercher une adresse"
                value={search}
                onChangeText={handleSearchChange}
                onSubmitEditing={handleSearch}
                returnKeyType="search"
            />
            {suggestions.length > 0 && (
                <View style={styles.suggestionWrapper}>
                    <View style={styles.suggestionList}>
                        {suggestions.map(item => (
                            <TouchableOpacity
                                key={item.place_id}
                                onPress={() => handleSuggestionPress(item)}
                                style={styles.suggestionItem}
                            >
                                <Text>{item.display_name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            )}
            <MapView
                style={styles.map}
                region={region}
                onPress={handleMapPress}
            >
                {marker && <Marker coordinate={marker} />}
            </MapView>
            <View style={styles.buttonContainer}>
                <SubmitButton text="Valider l'emplacement" onPress={handleSubmit} />
            </View>
        </View>
    );
});

export default MapPicker;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        flex:1,
        padding: 30,
    },
    map: {
        width: width,
        height: height * 0.6,
    },
    buttonContainer: {
        marginTop: 20,
        width: width * 0.75,
    },
    suggestionWrapper: {
        position: 'absolute',
        top: 120,
        left: '12%',
        width: '90%',
        zIndex: 20,
        borderRadius: 8,
        overflow: 'hidden',
    },
    blur: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 8,
    },
    suggestionList: {
        maxHeight: 300,
        backgroundColor: 'rgba(255,255,255,0.8)',
    },
    suggestionItem: {
        padding: 10,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
});