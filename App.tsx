import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import des pages
import HomeScreen from './screens/HomeScreen';
import Settings from './screens/SettingsScreen';
import RoundOneScreen from './screens/RoundOneScreen';
import RoundTwoScreen from './screens/RoundTwoScreen';
import RoundThreeScreen from './screens/RoundThreeScreen';
import Toss from './screens/Toss';
import StartGameScreen from './screens/StartGameScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="RoundOne" component={RoundOneScreen} />
        <Stack.Screen name="RoundTwo" component={RoundTwoScreen} />
        <Stack.Screen name="RoundThree" component={RoundThreeScreen} />
        <Stack.Screen name="Toss" component={Toss} />
        <Stack.Screen name="StartGame" component={StartGameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
