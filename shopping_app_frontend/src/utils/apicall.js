import axios from 'axios';

const api = axios.create();

const setHeader = () => {
    const token = localStorage.getItem('token');
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
}

export const GetData = async (fullUrl, options) => {
    try {
        setHeader();
        const response = await api.get(fullUrl);
        return response;
    } catch (err) {
        throw err;
    }
}

export const PostData = async (fullUrl, options) => {
    try {
        setHeader();
        const response = await api.post(fullUrl, options);
        return response;
    } catch (err) {
        throw err;
    }
}

export const PutData = async (fullUrl, options) => {
    try {
        setHeader();
        const response = await api.put(fullUrl, options);
        return response;
    } catch (err) {
        throw err;
    }
}

export const DeleteData = async (fullUrl) => {
    try {
        setHeader();
        const response = await api.delete(fullUrl);
        return response;
    } catch (err) {
        throw err;
    }
}
