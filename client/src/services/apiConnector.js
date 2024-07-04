import axios from 'axios';

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
        console.log("API CONNECTOR RESPONSE:", response);  // Log the response
        return response;
    } catch (error) {
        console.log("API CONNECTOR ERROR:", error);  // Log any errors
        throw error;
    }
};
