import { createContext, useState, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({

});

const AuthContextProvider = ({children}) => {

    const [authenticated, SetAuthenticated] = useState(false);
    const [token, setToken] = useState(null);

    

    const authenticate = (token) => {
        if(token) {
            setToken(token);
            SetAuthenticated(true);
            AsyncStorage.setItem('token', token); // values must be strings. token is tring
        };
    }

    const logInWithCurrentSession = () => {
        setToken(token);
        SetAuthenticated(true);
    }

    const logout = () => {
        setToken(null);
        SetAuthenticated(false);
        AsyncStorage.removeItem('token');
    }

    values = {
        token: token,
        isAuthenticated: authenticated,
        authenticate: authenticate,
        logout: logout,
        logInWithCurrentSession: logInWithCurrentSession
    }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;