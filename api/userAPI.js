import axios from 'axios'

export const getUsers = async()=>{
    return axios.get('https://jsonplaceholder.typicode.com/users')
}
