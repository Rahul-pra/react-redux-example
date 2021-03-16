import axios from "axios";
//import authHeader from "./auth-header";
import config from "../config";

const API_URL = config.apiUrl;


const getUsers = () => {
    //return axios.get(API_URL + "comments", { headers: authHeader() });  // pass header for token 
    //console.log("API_URL ==>", API_URL);
    return axios.get(API_URL + "users");
}



const usersServices = {
    getUsers,

}

export default usersServices