import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const registerUser = (name, email, password) =>
  axios.post(`${BASE_URL}/auth/register`, { name, email, password });

export const loginUser = (email, password) =>
  axios.post(`${BASE_URL}/auth/login`, { email, password });

export const getModules = () => axios.get(`${BASE_URL}/modules`);

export const createModule = (data, token) =>
  axios.post(`${BASE_URL}/modules`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteModule = (id, token) =>
  axios.delete(`${BASE_URL}/modules/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
