import axios from 'axios';
import PostType from '../types/post';


const base: string = 'https://kekambas-125-api.onrender.com/api';
const postEndpoint: string = '/posts';


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

export {
    getAllPosts,
}
