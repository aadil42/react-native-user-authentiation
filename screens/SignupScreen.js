import AuthContent from '../components/Auth/AuthContent';
import { createUser } from '../utils/auth';

function SignupScreen() {

  const addUser = ({email, password}) => {
    createUser(email, password);  
  }

  return <AuthContent onAuthenticate={addUser} />;
}

export default SignupScreen;
