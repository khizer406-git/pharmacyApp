import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const About = () => {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>About Us</Text> */}
      <Text style={styles.description}>
        Welcome to our pharmacy! We are committed to providing high-quality healthcare services to our community.
      </Text>
      <Text style={styles.description}>
        Our team of experienced pharmacists and staff members are dedicated to ensuring your health and well-being. 
      </Text>
      <Text style={styles.description}>
        At our pharmacy, you can expect personalized service, expert medication advice, and a wide range of products to meet your healthcare needs.
      </Text>
      <Text style={styles.description}>
        Whether you need prescription medications, over-the-counter products, or advice on managing your health conditions, we are here to help.
      </Text>
      <Text style={styles.description}>
        We also offer convenient services such as medication refills, prescription transfers, and medication therapy management.
      </Text>
      <Text style={styles.description}>
        Your health is our top priority, and we strive to make your experience at our pharmacy pleasant and efficient.
      </Text>
      <Text style={styles.description}>
        Thank you for choosing our pharmacy. We look forward to serving you and your family's healthcare needs.
      </Text>
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
    color:'black',
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color:'black',
  },
});

export default About;
