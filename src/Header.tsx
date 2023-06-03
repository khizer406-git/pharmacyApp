import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={styles.container}>
      <Image source={require('./logo.jpg')} style={styles.logo} />
      <Text style={styles.title}>Pharmacy App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'lightblue ',
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Header;
