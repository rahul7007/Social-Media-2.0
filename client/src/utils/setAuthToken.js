import api from '../api/index'
import axios from 'axios'
// console.log(api.defaults)
// console.log("In setautoken")
const setAuthToken = token => {
    // console.log("token inside setAuthToken", token)
    if (token) {
        // console.log("axioo->", axios.defaults);
        // axios.defaults.headers.common = token;
        // console.log(axios.defaults.headers.common['x-auth-token'])
        axios.defaults.headers.common['x-auth-token'] = token;
        // axios.headers: {
        //     "x-auth-token" : "this is the token" // define the header 
        //     "Accept" : "application/json",
        //     "Content-Type" : "application/json",
        // }
        // localStorage.setItem('token', token);
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
        // localStorage.removeItem('token');
    }
};

export default setAuthToken;