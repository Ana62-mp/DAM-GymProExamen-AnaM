import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";

import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DrawerNavigator from "./src/navigators/DrawerNavigator";

import RoutineDetailScreen from "./src/screens/RoutineDetailScreen";

import AddRoutineScreen from "./src/screens/AddRoutineScreen";

import { RoutineProvider } from "./src/context/RoutineContext";
import { colors } from "./src/theme";

import { SafeAreaProvider } from "react-native-safe-area-context";

// Tipos de las rutas para que salga error si no están aquí
export type RootStackParamList = {
  DrawerNavigator: undefined;

  // Detail necesita obligatoriamente un id para encontrar la rutina que es
  Detail: {
    id: string;
  };

  // AddRoutine puede recibir id o no por eso pongo ?
  AddRoutine:
    | {
        id?: string;
      }
    | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <RoutineProvider>
        <NavigationContainer
          theme={{
            ...DefaultTheme,

            colors: {
              ...DefaultTheme.colors,
              primary: colors.primary,
              background: colors.background,
              card: colors.surface,
              text: colors.text,
              border: colors.border,
            },
          }}
        >
          <StatusBar style="dark" />

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
                  backgroundColor: colors.surface,
                },

                headerTintColor: colors.text,
                headerTitleStyle: { fontWeight: "800" },

                headerShadowVisible: false,
              }}
            />

            <Stack.Screen
              name="AddRoutine"
              component={AddRoutineScreen}
              options={({ route }) => ({
                title: route.params?.id ? "Editar Rutina" : "Nueva Rutina",

                headerStyle: {
                  backgroundColor: colors.surface,
                },

                headerTintColor: colors.text,
                headerTitleStyle: { fontWeight: "800" },

                headerShadowVisible: false,
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </RoutineProvider>
    </SafeAreaProvider>
  );
}
