import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles'; // Importation des styles

const RoundThreeScreen = ({ navigation }: any) => {

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,  // Désactive le header pour cet écran
    });
  }, [navigation]);

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.roundTitle}>MANCHE 3</Text>

      <Text style={globalStyles.roundText}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam.
      </Text>
      
      <TouchableOpacity style={globalStyles.button} >
        <Text style={globalStyles.buttonText}>Ok j'ai compris</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RoundThreeScreen;
