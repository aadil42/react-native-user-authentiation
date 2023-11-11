import { createContext, useState } from "react";

export const AuthContext = createContext({

});

const AuthContextProvider = ({children}) => {

    const [authenticated, SetAuthenticated] = useState(false);
    const [token, setToken] = useState(null);

    const authenticate = (token) => {
        if(token) {
            setToken(token);
            SetAuthenticated(true);
        };
    }

    const logout = () => {
        setToken("");
        SetAuthenticated(false);
    }

    values = {
        token: token,
        isAuthenticated: authenticated,
        authenticate: authenticate,
        logout: logout
    }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;