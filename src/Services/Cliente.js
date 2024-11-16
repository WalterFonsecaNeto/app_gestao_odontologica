import axios from "axios";

export const HTTPClient = axios.create({
    baseURL: 'https://localhost:7240/api', 
    headers: {
    'Access-Controll-Allow-Origin': '*',
    'Access-Controll-Allow-Headers': 'Authorization',
    'Access-Controll-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATH, DELETE',
    'Content-Type': 'application/json;charset=UTF-8',
}})