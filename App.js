import React from 'react'
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Usuarios from './screens/Usuarios';
import DrawerNavigator from './screens/DrawerNavigator';
import LoginScreen from './screens/LoginScreen';
import { UserProvider } from './screens/UserContext'; 

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // Envolver todo dentro del UserProvider para que el contexto esté disponible globalmente
    <UserProvider> 
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Usuarios" component={Usuarios} />
          <Stack.Screen name="Main" component={DrawerNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
