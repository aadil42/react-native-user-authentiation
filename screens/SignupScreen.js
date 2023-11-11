import { useState, useContext } from "react";

import AuthContent from '../components/Auth/AuthContent';
import { createUser } from '../utils/auth';
import { Alert } from "react-native";

import { AuthContext } from "../store/AuthContextProvider";

function SignupScreen() {

  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);
  const { authenticate } = authCtx;

  const addUser = async ({email, password}) => {

    try {
      setIsLoading(true);
      const response = await createUser(email, password);  
      setIsLoading(false);

      const token = response && response.data.idToken || null;
      authenticate(token);

      return response;  
    }catch (error) {
      
      Alert.alert("User already exists", "Use different Email", [
        {
          text: "Ok",
          onPress: () => setIsLoading(false)
        }
      ])
    }

  }

  return <AuthContent isLoading={isLoading} onAuthenticate={addUser} />;
}

export default SignupScreen;
