import { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Alert } from "react-native";

import IconButton from "./components/ui/IconButton";
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { Colors } from './constants/styles';

import { AuthContext } from './store/AuthContextProvider';
import AuthContextProvider from "./store/AuthContextProvider";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {

  const authCtx = useContext(AuthContext);
  const { logout } = authCtx;

  const confirmLoggingOut = () => {
    Alert.alert("Logout", "Are you sure?", [
      {
        text: "No"
      },
      {
        text: "Yes",
        onPress: () => {
          logout();
        }
      }
    ]);
  }
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
        headerRight: ({tintColor}) => {
          return <IconButton 
            icon="exit"
            color={tintColor}
            size={24}
            onPress={confirmLoggingOut}
          />
        }
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
    </Stack.Navigator>
  );
}

function Navigation() {

  const authCtx = useContext(AuthContext);

  const {isAuthenticated} = authCtx;
  
  return (
    <NavigationContainer>
      {isAuthenticated && <AuthenticatedStack />}
      {!isAuthenticated && <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
    <AuthContextProvider>
      <StatusBar style="light" />
      <Navigation />
    </AuthContextProvider>
    </>
  );
}
