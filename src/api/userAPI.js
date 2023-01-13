import axios from 'axios'
import config from '../constants'
export const createUser = async(userData)=>{
    return axios.post(`${config.BASE_URL}/api/user`,userData)
}