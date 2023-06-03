import React,{useEffect,useState} from 'react'
import {View,Text,StyleSheet} from 'react-native';
import DropDown from './DropDown';

// useEffect(()=>{},[])

const Pharmacy = () => {
  return (
    <View style={{flex: 1,backgroundColor:'green'}}>
       
       <DropDown/> 
    </View>
  )
}

export default Pharmacy;