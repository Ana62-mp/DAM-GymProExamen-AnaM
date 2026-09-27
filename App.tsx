import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";

import {
  DarkTheme,
  NavigationContainer,
} from "@react-navigation/native";

import {
  createNativeStackNavigator
} from "@react-navigation/native-stack";

import DrawerNavigator from "./src/navigators/DrawerNavigator";

import RoutineDetailScreen from "./src/screens/RoutineDetailScreen";

import AddRoutineScreen from "./src/screens/AddRoutineScreen";

import {
  RoutineProvider
} from "./src/context/RoutineContext";


// Tipos de las rutas
export type RootStackParamList = {

  DrawerNavigator: undefined;

  // Detail necesita obligatoriamente un id
  Detail: {
    id: string;
  };

  // AddRoutine puede recibir id o no
  AddRoutine: {
    id?: string;
  } | undefined;

};


const Stack =
  createNativeStackNavigator<RootStackParamList>();


export default function App() {

  return (

    <RoutineProvider>

      <NavigationContainer
        theme={{
          ...DarkTheme,

          colors: {
            ...DarkTheme.colors,

            primary: "#8f1d24",
            background: "#f7f7f7",
            card: "#ffffff",
            text: "#111111",
            border: "#e3e3e3",
          },

        }}
      >

        <StatusBar style="light" />


        <Stack.Navigator>


          <Stack.Screen
            name="DrawerNavigator"
            component={DrawerNavigator}
            options={{
              headerShown: false,
            }}
          />


          <Stack.Screen
            name="Detail"
            component={RoutineDetailScreen}
            options={{
              title: "Detalles de rutina",

              headerStyle: {
                backgroundColor: "#ffffff",
              },

              headerTintColor: "#111111",

              headerShadowVisible: false,
            }}
          />


          <Stack.Screen
            name="AddRoutine"
            component={AddRoutineScreen}
            options={({ route }) => ({

              title: route.params?.id
                ? "Editar Rutina"
                : "Nueva Rutina",

              headerStyle: {
                backgroundColor: "#ffffff",
              },

              headerTintColor: "#111111",

              headerShadowVisible: false,

            })}
          />


        </Stack.Navigator>

      </NavigationContainer>

    </RoutineProvider>

  );

}