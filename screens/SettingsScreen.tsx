import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { globalStyles } from '../styles'; // Importation des styles
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importer AsyncStorage
import apiData from '../api'; // Importation du tableau depuis api.js

const SettingsScreen = ({ navigation }: any) => {

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, [navigation]);

  // State pour les noms des équipes et la sélection du nombre
  const [teamOne, setTeamOne] = useState('');
  const [teamTwo, setTeamTwo] = useState('');
  const [cardsNumber, setCardsNumber] = useState('10');
  const [teamOneError, setTeamOneError] = useState('');
  const [teamTwoError, setTeamTwoError] = useState('');

  // Utiliser useEffect pour récupérer les données d'AsyncStorage au chargement de l'écran
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('gameData');
      
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setTeamOne(parsedData.teamOne);
          setTeamTwo(parsedData.teamTwo);
          setCardsNumber(parsedData.cardsNumber);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données depuis AsyncStorage:', error);
      }
    };

    loadData(); // Charger les données lors de l'initialisation de l'écran
  }, []); // [] signifie que ce useEffect se déclenche uniquement au montage de l'écran

  // Fonction pour récupérer un nombre 'x' d'éléments aléatoires depuis apiData
  const getRandomItems = (numItems: number) => {
    const shuffled = [...apiData].sort(() => 0.5 - Math.random()); 
    return shuffled.slice(0, numItems);
  };

  // Fonction à appeler quand le bouton "Commencer" est pressé
  const handleStart = async () => {
    const textError = 'Le nom de l\'équipe est obligatoire';
    let isValid = true;

    if (!teamOne) {
      setTeamOneError(textError);
      isValid = false;
    } else {
      setTeamOneError('');
    }
    if (!teamTwo) {
      setTeamTwoError(textError);
      isValid = false;
    } else {
      setTeamTwoError('');
    }

    if (isValid) {
      try {
        const selectedCards = getRandomItems(Number(cardsNumber)); 77
        console.log(selectedCards);7

        // Enregistrer les données dans AsyncStorage
        const data = { teamOne, teamTwo, cardsNumber, selectedCards };
        await AsyncStorage.setItem('gameData', JSON.stringify(data));

        // Optionnel : pour vérifier que les données sont bien stockées
        console.log(`Team 1: ${teamOne}, Team 2: ${teamTwo}, Cards: ${cardsNumber}`);

        // Naviguer vers l'écran "RoundOne"
        navigation.navigate('RoundOne');
      } catch (error) {
        console.error('Erreur lors de la sauvegarde dans AsyncStorage:', error);
      }
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={styles.screenTitle}>Définissez vos équipes !</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nom de l'équipe 1</Text>
        <TextInput
          style={[styles.input, teamOneError ? styles.inputError : null]}
          placeholder="Entrez le nom"
          placeholderTextColor="#999"
          value={teamOne}
          onChangeText={setTeamOne}
        />
        {teamOneError && <Text style={styles.errorText}>{teamOneError}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nom de l'équipe 2</Text>
        <TextInput
          style={[styles.input, teamTwoError ? styles.inputError : null]}
          placeholder="Entrez le nom"
          placeholderTextColor="#999"
          value={teamTwo}
          onChangeText={setTeamTwo}
        />
        {teamTwoError && <Text style={styles.errorText}>{teamTwoError}</Text>}
      </View>

      {/* Sélection nombre de cartes */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nombre de cartes</Text>
        <Picker
          selectedValue={cardsNumber}
          style={styles.picker}
          onValueChange={(itemValue: string) => setCardsNumber(itemValue)}
        >
          <Picker.Item label="10" value="10" />
          <Picker.Item label="20" value="20" />
          <Picker.Item label="30" value="30" />
          <Picker.Item label="40" value="40" />
          <Picker.Item label="50" value="50" />
        </Picker>
      </View>

      {/* Bouton Commencer */}
      <TouchableOpacity style={globalStyles.button} onPress={handleStart}>
        <Text style={globalStyles.buttonText}>Commencer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screenTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  picker: {
    height: 50,
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    color: '#333', // Pour s'assurer que la couleur du texte est visible
    paddingLeft: 10,  // Ajoute un peu de padding pour que l'élément soit bien aligné
    fontSize: 16,
  }
});

export default SettingsScreen;
