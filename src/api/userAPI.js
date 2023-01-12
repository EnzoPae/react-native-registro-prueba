import axios from 'axios'

export const createUser = async(userData)=>{
    return axios.post('http://192.168.0.198:4005/api/user',userData)
}