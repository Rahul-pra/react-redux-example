import axios from "axios";
import authHeader from "./auth-header";
import config from "../config";

const API_URL = config.apiUrl;


const getComments = () => {
    //return axios.get(API_URL + "comments", { headers: authHeader() });  // pass header for token 
    return axios.get(API_URL + "comments");
}



const comments = {
    getComments,

}

export default comments