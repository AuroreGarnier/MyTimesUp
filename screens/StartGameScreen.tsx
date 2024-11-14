import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { globalStyles } from '../styles'; // Importation des styles
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importer AsyncStorage
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importation des icônes

const StartGameScreen = ({ navigation }: any) => {
  
  const [cardsNumber, setCardsNumber] = useState('');
  const [selectedCards, setSelectedCards] = useState('');
  const [teamPlaying, setTeamPlaying] = useState(''); // L'équipe qui va commencer
  const [loading, setLoading] = useState(true); // Indicateur de chargement des données

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, [navigation]);

  // Chargement des données depuis AsyncStorage
  useEffect(() => {
    const load = async () => {
      try {
        const data = await AsyncStorage.getItem('gameData');
        if (data) {
          const parsedData = JSON.parse(data);
          setTeamPlaying(parsedData.teamPlaying);
          setSelectedCards(parsedData.selectedCards);
        }
      } catch (error) {
        console.error("Erreur lors du chargement de l'équipe qui débute :", error);
      } finally {
        setLoading(false); // Fin du chargement
      }
    };

    load();
  }, []);

  const handleStart = () => {
    navigation.navigate('Toss');
  };

  return (
    <View style={globalStyles.container}>
      {loading ? (
        <Text style={styles.loadingText}>Chargement...</Text>
      ) : (
        <>
          {teamPlaying ? (
            <View style={styles.container}>
              <Text style={styles.text}>Mario</Text>

              {/* Affichage de l'image avec bordure */}
              <Image
                source={{ uri: 'https://img-31.ccm2.net/lIK2v6qKEysycP27x6dka3SnPC0=/450x/smart/f7d924362cef46df94f1561f603fd12d/ccmcms-hugo/10780779.jpg' }} // Remplacez cette URL par l'image de l'équipe
                style={styles.image}
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.redButton]}
                  onPress={() => console.log('Action de la croix')}
                >
                  <Icon name="close" size={50} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.greenButton]}
                  onPress={handleStart}
                >
                  <Icon name="check" size={50} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <Text style={styles.text}>Aucune équipe trouvée pour commencer.</Text>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingText: {
    fontSize: 18,
    color: '#888',
    marginTop: 20,
  },
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    fontSize: 24,
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 50, // Pour des coins arrondis
    borderWidth: 3,  // Bordure autour de l'image
    borderColor: 'black', // Couleur de la bordure
    margin: 40
  },
  buttonContainer: {
    flexDirection: 'row', // Affiche les boutons l'un à côté de l'autre
    //justifyContent: 'center', // Centrer les boutons horizontalement
    alignItems: 'center', // Centrer les boutons verticalement
    width: '100%',
    marginTop: 30,
  },
  button: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 25, // Ajouter un espacement entre les boutons
  },
  redButton: {
    backgroundColor: '#f5493d', // Couleur rouge pour la croix
  },
  greenButton: {
    backgroundColor: '#5fb962', // Couleur verte pour le check
  }
});

export default StartGameScreen;
