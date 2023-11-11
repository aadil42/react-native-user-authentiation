import { useState, useContext } from 'react';
import { Alert } from 'react-native';
import AuthContent from '../components/Auth/AuthContent';
import { loginUser } from '../utils/auth';

import { AuthContext } from '../store/AuthContextProvider';
function LoginScreen() {

  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);

  const { authenticate } = authCtx;

  const logUser = async ({email, password}) => {
      try {
        setIsLoading(true);
        const response = await loginUser(email, password);  
        setIsLoading(false);
        Alert.alert("Success!", "Welcom", [
          {
            text: "Ok",
            onPress: () => setIsLoading(false)
          }
        ]);

        const token = response && response.data.idToken || "";
        
        authenticate(token);
        return response;  
      }catch (error) {
        
        Alert.alert("Invalid credentials", "Email or password or both are incorrect", [
          {
            text: "Try again",
            onPress: () => setIsLoading(false)
          }
        ]);
      }
  }

  return <AuthContent isLoading={isLoading} onAuthenticate={logUser} isLogin />;
}

export default LoginScreen;
