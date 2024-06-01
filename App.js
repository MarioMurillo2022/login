import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import Login from './src/screens/Login';
import Splash from './src/screens/Splash';
import Home from './src/screens/Home';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadResourcesAndDataAsync = async () => {
      try {

        await SplashScreen.preventAutoHideAsync();

        setTimeout(() => {
          setIsLoading(false);
          SplashScreen.hideAsync();
        }, 1000); // 
      } catch (e) {
        console.warn(e);
      }
    };

    loadResourcesAndDataAsync();
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
