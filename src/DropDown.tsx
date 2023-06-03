import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
// import RNPickerSelect from 'react-native-picker-select';
import { Picker } from '@react-native-picker/picker';
import MapView, { Marker } from 'react-native-maps';
const DropDown = () => {
    const [cities, setCities] = useState([]);
    const [zones, setZones] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedZone, setSelectedZone] = useState(null);
    const [selectedDuty, setSelectedDuty] = useState('');
    const [pharmacies, setPharmacies] = useState([]);
    const [userCountryCode, setUserCountryCode] = useState();

    const dutyType = [
        { value: 'jour', label: 'Garde de jour' },
        { value: 'nuit', label: 'Garde de nuit' },
    ];
    const handleDutyType = (value: any) => {
        setSelectedDuty(value);
    };
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
    const handleCityChange = (value: any) => {

        setSelectedCity(value);
        setSelectedZone(null);
    };

    const handleSearch = async () => {
        if (selectedCity && selectedZone && selectedDuty) {
            const res = await fetch(
                `https://pharmacy-liard.vercel.app/api/pharmacies/${selectedDuty}/${selectedZone}/${selectedCity}`
            );
            const data = await res.json();
            console.log(data);
            setPharmacies(data);

        }
    };


    const handleZoneChange = (value: any) => {
        setSelectedZone(value);
    };

    return (
        <View style={styles.container}>
            <View style={styles.dropdownContainer}>
                <Text style={styles.label}>City</Text>
                <Picker
                    style={styles.pickerStyle}
                    selectedValue={selectedCity}
                    onValueChange={handleCityChange}
                >
                    <Picker.Item label="Sélectionnez une ville" value={null} />
                    {cities.map((city: any) => (
                        <Picker.Item key={city._id} label={city.name} value={city._id} />
                    ))}
                </Picker>
            </View>
            <View style={styles.dropdownContainer}>
                <Text style={styles.label}>Zone</Text>
                {selectedCity ? (
                    <Picker
                        style={styles.pickerStyle}
                        selectedValue={selectedZone}
                        onValueChange={handleZoneChange}
                    >
                        <Picker.Item label="Sélectionnez une zone" value={null} />
                        {zones.map((zone: any) => (
                            <Picker.Item key={zone._id} label={zone.name} value={zone._id} />
                        ))}
                    </Picker>
                ) : (
                    <Picker style={styles.pickerStyle} enabled={false}>
                        <Picker.Item label="Sélectionnez une ville d'abord" value={null} />
                    </Picker>
                )}
            </View>
            <View style={styles.dropdownContainer}>
                <Text style={styles.label}>DutyType</Text>
                {selectedCity && selectedZone ? (
                    <Picker
                        style={styles.pickerStyle}
                        selectedValue={selectedDuty}
                        onValueChange={handleDutyType}
                    >
                        <Picker.Item label="Sélectionnez un type de garde" value={null} />
                        {dutyType.map((option) => (
                            <Picker.Item
                                key={option.value}
                                label={option.label}
                                value={option.value}
                            />
                        ))}
                    </Picker>
                ) : (
                    <Picker style={styles.pickerStyle} enabled={false}>
                        <Picker.Item
                            label="Sélectionnez une ville et une zone d'abord"
                            value={null}
                        />
                    </Picker>
                )}
            </View>
            <View style={styles.btn}>
                <Button title="Search" onPress={handleSearch} />
            </View>
            <View style={{ flex: 1 }}>
                <MapView
                    style={{ flex: 1 }}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    {/* <Marker
                        coordinate={{ latitude: 33.235422, longitude: -8.490317899999999 }}
                        title="Marker Title"
                        description="Marker Description"
                    /> */}
                    { pharmacies?.map((p: any)=> (
                        <Marker
                            coordinate={{ latitude: p.latitude, longitude: p.longitude }}
                            key={Math.random()}
                        />
                    )
                    )}
                </MapView>
            </View>
        </View>
        // <View><Text>HEl</Text></View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#fff',
    },
    dropdownContainer: {
        marginBottom: 8,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    dropdown: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 10,
    },
    pickerStyle: {
        borderWidth: 10,
        borderColor: 'black',
        borderRadius: 4,
        backgroundColor: 'black',
    },
    btn: {
        backgroundColor: 'black',
        borderRadius: 10,
        marginBottom: 10,
    }
});

export default DropDown;
