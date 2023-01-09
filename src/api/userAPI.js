import axios from 'axios'

export const getUsers = async()=>{
    return axios.get('https://jsonplaceholder.typicode.com/users')
}
export const createUser = async(userData)=>{
    return axios.post('http://192.168.0.169:4005/api/user',userData)
}