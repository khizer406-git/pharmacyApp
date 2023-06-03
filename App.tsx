/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { View,Text} from 'react-native';
import HomeTabs from './src/HomeTabs';
import Header from './src/Header';

// const Stack = createNativeStackNavigator();

function App(){

  return (    
      <View style={{flex:1}}>
        <Header/>
        <HomeTabs/>
      </View>
  );
}

export default App;
