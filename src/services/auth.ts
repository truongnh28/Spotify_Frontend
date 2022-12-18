import axios from "axios";
import { LOGIN } from "../api/auth";

export const loginToSpotify = async ({username, password} : {username: string; password: string}) => {
    return await axios.post(LOGIN, {username, password});
}