import axios from 'axios';
import PostType from '../types/post';
import UserType from '../types/auth';


const base: string = 'https://kekambas-125-api.onrender.com/api';
// const base: string = 'http://localhost:8080/api';
const postEndpoint: string = '/posts';
const userEndpoint: string = '/users';


const apiClientNoAuth = () => axios.create({
    baseURL: base
})

type APIResponse<T> = {
    error?: string,
    data?: T
}


async function getAllPosts(): Promise<APIResponse<PostType[]>> {
    let error;
    let data;
    try{
        const response = await apiClientNoAuth().get(postEndpoint);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        } else {
            error = 'Something went wrong'
        }
    }
    return {error, data}
}

async function register(newUserData:Partial<UserType>): Promise<APIResponse<UserType>> {
    let error;
    let data;
    try {
        const response = await apiClientNoAuth().post(userEndpoint, newUserData)
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {error, data}
}

export {
    getAllPosts,
    register,
}
