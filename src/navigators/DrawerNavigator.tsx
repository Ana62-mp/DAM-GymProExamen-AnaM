import { createDrawerNavigator } from '@react-navigation/drawer'; 
import { Ionicons } from '@expo/vector-icons'; 
import SettingsScreen from "../screens/SettingsScreen";
import TabNavigator from "./TabNavigator";
import { colors } from "../theme";


const Drawer = createDrawerNavigator();


export default function DrawerNavigator(){
    return(
        <Drawer.Navigator

            screenOptions={{
                headerStyle: {backgroundColor: colors.surface},
                headerTintColor: colors.text,
                headerTitleStyle: {fontWeight: '800'},
                headerShadowVisible: false,
                drawerStyle: {backgroundColor: colors.surface},
                drawerActiveTintColor: colors.white,
                drawerInactiveTintColor: '#555555',
                drawerActiveBackgroundColor: colors.primaryDark,
                drawerItemStyle: {borderRadius: 12, marginHorizontal: 10},
                drawerLabelStyle: {fontWeight: '700'},
            }}
            >


            <Drawer.Screen
                name="GymPro"
                component={TabNavigator}
                options={{
                    title: "Mi entrenamiento",
                    drawerIcon: ({color, size}) => (
                        <Ionicons name="barbell-outline" color={color} size={size}/>
                    ),
                }}
            />
            <Drawer.Screen
                name="Configuración"
                component={SettingsScreen}
                options={{
                    drawerIcon: ({color, size}) => (
                        <Ionicons name="settings-outline" color={color} size={size}/>
                    ),

                }}
            
            />


        </Drawer.Navigator>
    )
};

