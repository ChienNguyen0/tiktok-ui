import axios from 'axios';

// custom endpoint html
const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

// async/ await : custom path
export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response.data;
};

export default httpRequest;
