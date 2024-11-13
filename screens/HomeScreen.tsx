import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';  // Importer la bibliothèque d'animation
import { globalStyles } from '../styles'; // Importation des styles

const HomeScreen = ({ navigation }: any) => {

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false  // Désactive le header pour cet écran
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Animation des points en arrière-plan */}
      <View style={styles.background}>
        {Array.from({ length: 30 }).map((_, index) => (
          <Animatable.View
            key={index}
            style={[styles.dot, { top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }]} // Placement aléatoire dans l'écran
            animation="bounceIn"
            iterationCount="infinite"
            duration={3000 + Math.random() * 2000} // Durée d'animation aléatoire
          />
        ))}
      </View>

      <Text style={styles.title}>TIME'S UP</Text>
      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => navigation.navigate('Settings')}
      >
        <Text style={globalStyles.buttonText}>Commencer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff', // Couleur de fond douce
    padding: 20,
    position: 'relative', // Permet de positionner les points animés en arrière-plan
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 40, // Espacement sous le titre
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none', // Empêche l'interaction avec les points animés
  },
  dot: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#dbd872',  // Couleur des points
    opacity: 0.6,
  },
});

export default HomeScreen;
