import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles'; // Importation des styles

const RoundOneScreen = ({ navigation }: any) => {

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, [navigation]);

  const handleStart = async () => {
      navigation.navigate('Toss');
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.roundTitle}>MANCHE 1</Text>

      <Text style={globalStyles.roundText}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam.
      </Text>
      
      <TouchableOpacity style={globalStyles.button} onPress={handleStart}>
        <Text style={globalStyles.buttonText}>Ok j'ai compris</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RoundOneScreen;
