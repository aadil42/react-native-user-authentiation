import { useState } from "react";

import AuthContent from '../components/Auth/AuthContent';
import { createUser } from '../utils/auth';
import { Alert } from "react-native";

function SignupScreen() {

  const [isLoading, setIsLoading] = useState(false);

  const addUser = async ({email, password}) => {

    try {
      setIsLoading(true);
      const response = await createUser(email, password);  
      setIsLoading(false);
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
