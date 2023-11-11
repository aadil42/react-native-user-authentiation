import axios from "axios";

const API_KEY = "AIzaSyB2ZvLUuQHRGyacM2xHnc4ZqN_QVaZkj98";

export const authenticateUser = async (email, password, mode) => {
    const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`,
    {   
        email: email,
        password: password,
        returnSecureToken: true
    });
    return response;
}

export const loginUser = async (email, password) => {
    return await authenticateUser(email, password, "signInWithPassword");
}

export const createUser = async (email, password) => {
  return await authenticateUser(email, password, "signUp");
}

export const getProtectedContent = async (token) => {
    return await axios.get(`https://react-native-authenticat-65ef8-default-rtdb.firebaseio.com/dummyContent.json?auth=${token}`);
}