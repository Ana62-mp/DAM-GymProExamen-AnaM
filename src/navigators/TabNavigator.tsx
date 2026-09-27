import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import { Ionicons } from '@expo/vector-icons'; 
import ProgressScreen from "../screens/ProgressScreen";
import RoutineListScreen from "../screens/RoutineListScreen";
import { colors } from "../theme";

const Tab = createBottomTabNavigator();

export default function TabNavigator(){
    return(
        <Tab.Navigator
        
            screenOptions={({route}) => ({
                headerShown: false, // Ocultamos la cabecera interna para usar la del Drawer         
                tabBarIcon: ({ color, size }) => {           
                let iconName: keyof typeof Ionicons.glyphMap = 'fitness';           
                if (route.name === 'Progreso') {
                    iconName = 'stats-chart-outline';
                } 
                else if (route.name === 'Rutinas') {
                    iconName = 'barbell-outline';
                }

                return <Ionicons name={iconName} size={size} color={color}/>


            },   
            
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: '#777777',
            tabBarStyle: {
                backgroundColor: colors.surface,
                borderTopColor: colors.border,
                height: 68,
                paddingTop: 8,
                paddingBottom: 8,
            },
            tabBarLabelStyle: {
                fontSize: 11,
                fontWeight: '700',
            },
            tabBarHideOnKeyboard: true,
        
        })}
        >
        <Tab.Screen name="Rutinas" component={RoutineListScreen} />
        <Tab.Screen name="Progreso" component={ProgressScreen} />

        </Tab.Navigator>
    )
};

