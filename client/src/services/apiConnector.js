import axios from 'axios';
import isProduction from '../utils/logger';

const axiosInstance = axios.create({});

export const apiConnector = async (method, url, bodyData, headers, params) => {
    try {
        const response = await axiosInstance({
            method: method,
            url: url,
            data: bodyData || null,
            headers: headers || null,
            params: params || null,
        });
        return response;
    } catch (error) {
        if (!isProduction()) {
            console.log("API CONNECTOR ERROR:", error);  // Log any errors in development
        }
        throw error;
    }
};
