import axios from 'axios';

const API_KEY = "AIzaSyBtKRn_7Uz8I-U5YUA23pZHmDbXi1qTqKw";

// const URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
// https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]


export async function authenticate(mode, email, password) {
    const URL = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;


    const response = await axios.post(URL, {
        email: email,
        password: password,
        returnSecureToken: true
    }, {
        // Explicitly force the JSON header
        headers: {
            'Content-Type': 'application/json'
        }
    });

    
    const token = response.data.idToken;
    return token;

}


export async function createUser(email, password) {
    return await authenticate('signUp', email, password)
}

export async function login(email, password) {
    return await authenticate('signInWithPassword', email, password)
}