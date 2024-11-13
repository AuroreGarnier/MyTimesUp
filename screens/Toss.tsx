import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Image } from 'react-native';
import { globalStyles } from '../styles';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importer AsyncStorage

const Toss = ({ navigation }: any) => {

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, [navigation]);

  // États pour stocker les équipes, le résultat du tirage, et l'animation de la pièce
  const [teamOne, setTeamOne] = useState('');
  const [teamTwo, setTeamTwo] = useState('');
  const [winner, setWinner] = useState('');
  const [isDrawn, setIsDrawn] = useState(false); // Indicateur de tirage effectué
  const [loading, setLoading] = useState(true); // Indicateur de chargement des données
  const [rotateValue] = useState(new Animated.Value(0)); // Valeur de rotation de la pièce
  const [isAnimationComplete, setIsAnimationComplete] = useState(false); // Indicateur de fin d'animation

  // Charger les données depuis AsyncStorage
  useEffect(() => {
    const loadTeams = async () => {
      console.log('coucou')
      try {
        const storedTeamOne = await AsyncStorage.getItem('teamOne');
        const storedTeamTwo = await AsyncStorage.getItem('teamTwo');

        if (storedTeamOne) setTeamOne(storedTeamOne);
        if (storedTeamTwo) setTeamTwo(storedTeamTwo);
      } catch (error) {
        console.error('Erreur lors du chargement des équipes depuis AsyncStorage:', error);
      } finally {
        setLoading(false); // Fin du chargement
      }
    };

    loadTeams();
  }, []);

  // Fonction pour effectuer le tirage au sort
  const draw = () => {
    const teams = [teamOne, teamTwo];
    const randomIndex = Math.floor(Math.random() * teams.length);
    const randomWinner = teams[randomIndex];
    setWinner(randomWinner);
    setIsDrawn(true); // Le tirage est effectué

    // Démarrer l'animation de la rotation de la pièce
    rotatePiece();
  };

  // Fonction pour animer la rotation de la pièce
  const rotatePiece = () => {
    // Reset la rotation
    rotateValue.setValue(0);

    // Animer la rotation de 360° autour de l'axe Y (flip horizontal)
    Animated.timing(rotateValue, {
      toValue: 1,  // Rotation complète
      duration: 2000, // Durée de l'animation en ms
      useNativeDriver: true,  // Utilisation du driver natif pour des performances optimisées
    }).start();

    // Déclencher l'affichage du résultat après un délai (ici 2 secondes après la fin de l'animation)
    setTimeout(() => {
      setIsAnimationComplete(true); // L'animation est terminée, afficher le gagnant
    }, 2000); // Délai de 2 secondes
  };

  // Fonction pour aller à la page suivante (par exemple, "RoundOne")
  const startGame = async() => {
    // ondétermine l'équipe "en cours de jeu"
    await AsyncStorage.setItem('teamPlaying', winner);
    navigation.navigate('StartGame');
  };

  // Interpolation pour transformer la valeur de rotation de 0 à 360° autour de l'axe Y
  const rotation = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '720deg'], // Rotation horizontale
  });

  return (
    <View style={globalStyles.container}>
      <Text style={styles.title}>Tirage au sort</Text>

      {loading ? (
        // Affichage d'un indicateur de chargement pendant que les données sont récupérées
        <Text style={globalStyles.roundText}>Chargement...</Text>
      ) : (
        <>
          {teamOne && teamTwo ? (
            <>
              {!isDrawn ? (
                <TouchableOpacity style={globalStyles.button} onPress={draw}>
                  <Text style={globalStyles.buttonText}>Lancer le tirage</Text>
                </TouchableOpacity>
              ) : (
                <>
                  {/* Image de la pièce animée avec rotation horizontale */}
                  <Animated.View style={[styles.coin, { transform: [{ rotateY: rotation }] }]}>
                    <Image 
                      source={require('../assets/coin.png')}  
                      style={styles.coinImage} 
                    />
                  </Animated.View>

                  {/* Affichage du résultat après le délai */}
                  {isAnimationComplete && (
                    <>
                      <Text style={styles.resultText}>{winner}</Text>
                      <Text style={styles.text}>Vous commencez !</Text>

                      <TouchableOpacity style={globalStyles.button} onPress={startGame}>
                        <Text style={globalStyles.buttonText}>C'est parti !</Text>
                      </TouchableOpacity>
                    </>
                  )}
                </>
              )}
            </>
          ) : (
            <Text style={globalStyles.roundText}>Aucune équipe trouvée</Text>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 40, // Espacement sous le titre
  },
  resultText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 20,
  },
  text: {
    fontSize: 20,
    marginTop: 20,
  },
  coin: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  coinImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  }
});

export default Toss;
