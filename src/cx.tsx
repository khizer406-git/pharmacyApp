import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Button,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Picker } from '@react-native-picker/picker';
import 'react-native-gesture-handler';


function Body() {
    const [mapRef, setMapRef] = useState(null);
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    const [zones, setZones] = useState([]);
    const [selectedZone, setSelectedZone] = useState(null);
    const [isGardeSelected, setIsGardeSelected] = useState(false);
    const [selectedGarde, setSelectedGarde] = useState(null);
    const [pharmacies, setPharmacies] = useState([]);
    const [pharmacyLocations, setPharmacyLocations] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedPharmacy, setSelectedPharmacy] = useState(null);


    useEffect(() => {
        const fetchCities = async () => {
            try {
                const res = await fetch('https://pharmacy-liard.vercel.app/api/cities');
                const data = await res.json();
                setCities(data);
            } catch (error) {
                console.error("ll");
            }
        };
        fetchCities();
    }, []);

    const gardeOptions = [
        { value: 'jour', label: 'Garde de jour' },
        { value: 'nuit', label: 'Garde de nuit' },
    ];

    const handleGardeChange = (value: any) => {
        setSelectedGarde(value);
    };

    const handleCityChange = (value: any) => {
        setSelectedCity(value);
        setSelectedZone(null);
        setIsGardeSelected(false);
    };

    useEffect(() => {
        if (selectedCity) {
            const fetchZones = async () => {
                try {
                    const res = await fetch(
                        `https://pharmacy-liard.vercel.app/api/zones/city/${selectedCity}`
                    );
                    const data = await res.json();
                    setZones(data);
                } catch (error) {
                    console.error("bj");
                }
            };
            fetchZones();
        } else {
            setZones([]);
        }
    }, [selectedCity]);

    const handleZoneChange = (value: any) => {
        setSelectedZone(value);
        setIsGardeSelected(false);
    };

    const handleGardeSelect = () => {
        setIsGardeSelected(!isGardeSelected);
    };

    const handleSearch = async () => {
        if (selectedCity && selectedZone && selectedGarde) {
            try {
                const res = await fetch(
                    `https://pharmacy-liard.vercel.app/api/pharmacies/${selectedGarde}/${selectedZone}/${selectedCity}`
                );
                const data = await res.json();
                setPharmacies(data);
                const locations = data.map((pharmacy: any) => ({
                    lat: pharmacy.latitude,
                    lon: pharmacy.longitude,
                    name: pharmacy.name,
                    address: pharmacy.address,
                }));
                setPharmacyLocations(locations);


            } catch (error) {
                console.error("xd");
            }
        }
    };
    const handleViewDetails = (pharmacy: any) => {
        setSelectedPharmacy(pharmacy);
        setIsModalVisible(true);
    };


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.menuContainer}>
                    <View style={styles.menuItem}>
                        <Text>Ville :</Text>
                        <Picker
                            style={styles.select}
                            selectedValue={selectedCity}
                            onValueChange={handleCityChange}
                        >
                            <Picker.Item label="Sélectionnez une ville" value={null} />
                            {cities.map((city: any) => (
                                <Picker.Item key={city._id} label={city.name} value={city._id} />
                            ))}
                        </Picker>
                    </View>
                    <View style={styles.menuItem}>
                        <Text>Zone :</Text>
                        {selectedCity ? (
                            <Picker
                                style={styles.select}
                                selectedValue={selectedZone}
                                onValueChange={handleZoneChange}
                            >
                                <Picker.Item label="Sélectionnez une zone" value={null} />
                                {zones.map((zone: any) => (
                                    <Picker.Item key={zone._id} label={zone.name} value={zone._id} />
                                ))}
                            </Picker>
                        ) : (
                            <Picker style={styles.select} enabled={false}>
                                <Picker.Item label="Sélectionnez une ville d'abord" value={null} />
                            </Picker>
                        )}
                    </View>
                    <View style={styles.menuItem}>
                        <Text>Type de garde :</Text>
                        {selectedCity && selectedZone ? (
                            <Picker
                                style={styles.select}
                                selectedValue={selectedGarde}
                                onValueChange={handleGardeChange}
                            >
                                <Picker.Item label="Sélectionnez un type de garde" value={null} />
                                {gardeOptions.map((option) => (
                                    <Picker.Item
                                        key={option.value}
                                        label={option.label}
                                        value={option.value}
                                    />
                                ))}
                            </Picker>
                        ) : (
                            <Picker style={styles.select} enabled={false}>
                                <Picker.Item
                                    label="Sélectionnez une ville et une zone d'abord"
                                    value={null}
                                />
                            </Picker>
                        )}
                    </View>
                </View>
                <Button
                    title="Rechercher"
                    onPress={handleSearch}
                    color="#008000" // Vert
                />
                {/* <MapTouchable onPress={() => {}}>
          <View style={styles.mapContainer}>
            <MapView
              ref={(ref) => setMapRef(ref)}
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              initialRegion={{
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              {pharmacyLocations.map((pharmacy, index) => (
                <Marker
                  key={index}
                  coordinate={{ latitude: pharmacy.lat, longitude: pharmacy.lon }}
                  image={markerIcon}
                >
                  <Callout>
                    <View>
                      <Text>{pharmacy.name}</Text>
                      <Text>{pharmacy.address}</Text>
                    </View>
                  </Callout>
                </Marker>
              ))}
            </MapView>
          </View>
        </MapTouchable> */}
                {/* <View style={styles.pharmacyContainer}>
      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderText, styles.columnHeader]}>
          Pharmacy Name
        </Text>
        <Text style={[styles.tableHeaderText, styles.columnHeader]}>Address</Text>
        <Text style={[styles.tableHeaderText, styles.columnHeader]}></Text>
      </View>
      <ScrollView style={styles.tableBody}>
        {pharmacies.map((pharmacy, index) => (
          <View
            key={index}
            style={[
              styles.tableRow,
              index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd,
            ]}
          >
            <Text style={[styles.tableRowText, styles.columnData]}>
              {pharmacy.name}
            </Text>
            <Text style={[styles.tableRowText, styles.columnData]}>
              {pharmacy.address}
            </Text>
            <Button
              title="Voir détails"
              onPress={() => handleViewDetails(pharmacy)}
              color="#008000" // Vert
            />
          </View>
        ))}
      </ScrollView>
    </View>
    <Modal
  isVisible={isModalVisible}
  onBackdropPress={() => setIsModalVisible(false)}
>
  <View style={styles.modalContent}>
    <Text style={styles.modalTitle}>Informations</Text>
    <Text>Nom : {selectedPharmacy?.name}</Text>
    <Text>Adresse : {selectedPharmacy?.address}</Text>
    
    <Image source={require('./pharmacy.jpeg')} style={styles.image} />
    
  </View>
</Modal>
 */}

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    menuContainer: {
        marginBottom: 20,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    select: {
        flex: 1,
        marginLeft: 10,
    },
    mapContainer: {
        flex: 1,
        height: 300,
        marginBottom: 20,
    },
    mapTouchable: {
        flex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    pharmacyContainer: {
        flex: 1,
    },
    tableHeader: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    tableHeaderText: {
        fontWeight: 'bold',
        marginRight: 10,
    },
    columnHeader: {
        flex: 1,
    },
    tableBody: {
        flex: 1,
    },
    tableRow: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    tableRowEven: {
        backgroundColor: '#f0f0f0',
    },
    tableRowOdd: {
        backgroundColor: '#ffffff',
    },
    tableRowText: {
        marginRight: 10,
    },
    columnData: {
        flex: 1,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    image: {
        width: 370,
        height: 300,
        marginBottom: 10,
        alignSelf: 'center',
    },
    modalTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: 'green'
    },
});

export default function App() {
    return (
        <View style={styles.container}>
            <Body />
        </View>
    );
}