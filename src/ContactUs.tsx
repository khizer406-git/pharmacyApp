import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ContactUs = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        We value your feedback and are here to assist you. Please feel free to reach out to us using the contact information below.
      </Text>
      <View style={styles.contactInfo}>
        <Text style={styles.infoLabel}>Address:</Text>
        <Text style={styles.infoText}>123 Main Street, City, State, Zip Code</Text>
      </View>
      <View style={styles.contactInfo}>
        <Text style={styles.infoLabel}>Phone:</Text>
        <Text style={styles.infoText}>(123) 456-7890</Text>
      </View>
      <View style={styles.contactInfo}>
        <Text style={styles.infoLabel}>Email:</Text>
        <Text style={styles.infoText}>info@pharmacy.com</Text>
      </View>
      <Text style={styles.description}>
        Our friendly staff is available during our business hours to answer any questions you may have or to assist you with your healthcare needs.
      </Text>
      <Text style={styles.description}>
        If you prefer, you can also use the contact form below to send us a message, and we will get back to you as soon as possible.
      </Text>
      {/* Contact form component can be added here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color:'black',
  },
  contactInfo: {
    flexDirection: 'row',
    marginBottom: 5,
    color:'black',
  },
  infoLabel: {
    fontWeight: 'bold',
    marginRight: 5,
    color:'black',
  },
  infoText: {
    flex: 1,
    color:'black',
  },
});

export default ContactUs;
