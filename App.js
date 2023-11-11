import { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from "@react-native-async-storage/async-storage";

import AppLoading from 'expo-app-loading';

import { Text } from "react-native";

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

const Root = () => {

  const [isFetchingToken, setIsFetchingToken] = useState(true);
  const authCtx = useContext(AuthContext);
  const { logInWithCurrentSession } = authCtx;

  useEffect(() => {
    const getSavedToken = async () => {
        const storedToken = await AsyncStorage.getItem('token');
        if(storedToken) logInWithCurrentSession(storedToken);
        setIsFetchingToken(false);
    }
    getSavedToken();
  }, []);

  let content = <Navigation />

  if(isFetchingToken) {
    content = <AppLoading />
  }

  return (
    content
  );
}

export default function App() {
  return (
    <>
    <AuthContextProvider>
      <StatusBar style="light" />
      {/* <Navigation /> */}
      <Root />
    </AuthContextProvider>
    </>
  );
}
