import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import { Ionicons } from '@expo/vector-icons'; 
import ProgressScreen from "../screens/ProgressScreen";
import RoutineListScreen from "../screens/RoutineListScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator(){
    return(
        <Tab.Navigator
        
            screenOptions={({route}) => ({
                headerShown: false, // Ocultamos la cabecera interna para usar la del Drawer         
                tabBarIcon: ({ color, size }) => {           
                let iconName: keyof typeof Ionicons.glyphMap = 'fitness';           
                if (route.name === 'Progreso') {
                    iconName = 'stats-chart';
                } 
                else if (route.name === 'Rutinas') {
                    iconName = 'list';
                }

                return <Ionicons name={iconName} size={size} color={color}/>


            },   
            
            tabBarActiveTintColor: '#c9363f',
            tabBarInactiveTintColor: '#707070',
            tabBarStyle: {
                backgroundColor: '#ffffff',
                borderTopColor: '#e3e3e3',
                height: 70,
                paddingTop: 8,
                paddingBottom: 10,
            },
            tabBarLabelStyle: {
                fontSize: 11,
                fontWeight: '700',
            },
            tabBarHideOnKeyboard: true,
        
        })}
        >
        <Tab.Screen name="Progreso" component={ProgressScreen} />
        <Tab.Screen name="Listas Rutinas" component={RoutineListScreen} />

        </Tab.Navigator>
    )
};

