import React, { useState, useEffect } from "react";
import { NavigationContainer, View } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";

import Login from "./src/screens/Login";
import Splash from "./src/screens/Splash";
import Home from "./src/screens/Home";
import AgendarCita from "./src/screens/AgendarCita";
import Registro from "./src/screens/Registro";

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
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerBackTitleVisible: true,
            headerBackTitle: "Salir",
            headerStyle: {
              backgroundColor: "#192a57",
            },
            title: "Inicio de Sesión",
            headerTitleStyle: {
              color: "#fff",
            },
          }}
        />
        <Stack.Screen
          name="Registro"
          component={Registro}
          options={{
            headerBackTitleVisible: true,
            headerBackTitle: "Salir",
            headerStyle: {
              backgroundColor: "#192a57",
            },
            title: "Registro de Usuario",
            headerTitleStyle: {
              color: "#fff",
            },
          }}
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Agenda"
          component={AgendarCita}
          options={{
            headerStyle: {
              backgroundColor: "#192a57",
            },
            title: "Agendar Cita",
            headerTitleStyle: {
              color: "#fff",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
