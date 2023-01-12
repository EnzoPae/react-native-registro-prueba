import axios from 'axios'

export const createUser = async(userData)=>{
    return axios.post('http://webports.duckdns.org:4005/api/user',userData)
}