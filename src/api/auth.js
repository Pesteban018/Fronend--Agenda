import axios from "./axios";



export const registerRequest = (user) => axios.post(`/register`, user);


export const loginRequest = (user) => axios.post(`/login`, user);

export const verityTokenRequet = () => axios.get(`/verify`)

export const updateUser = (user) => axios.put(`/profile`, user)

