import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './app/screens/Login';
import List from './app/screens/List';
import Details from './app/screens/Details';
import { useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';
import Ionicons from "@expo/vector-icons/Ionicons";

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function InsideLayout() {
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'compass-outline'
                : 'compass-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'compass-outline' : 'compass-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={List} />
        <Tab.Screen name="Settings" component={Details} />
      </Tab.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      //console.log('user' + user);
      setUser(user);
    });
  })
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        {user ? 
        (<Stack.Screen name='Inside' component={InsideLayout} options={{ headerShown: false}} />
        ) : 
        (
          <Stack.Screen name='Login' component={Login} options={{ headerShown: false}} />
        )}
        
      </Stack.Navigator>


    </NavigationContainer>
  );
};