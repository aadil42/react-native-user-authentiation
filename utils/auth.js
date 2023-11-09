import axios from "axios";

const API_KEY = "AIzaSyB2ZvLUuQHRGyacM2xHnc4ZqN_QVaZkj98";

export const createUser = async (email, password) => {
    const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
    {   
        email: email,
        password: password,
        returnSecureToken: true
    });
    return response;
}