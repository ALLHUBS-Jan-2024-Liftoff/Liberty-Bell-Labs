// services/userService.js
import axios from "axios";

const BASEAPIURL = "http://localhost:8080";

export const registerUser = async (
  
  username,
  password,
  verifyPassword
) => {
  try {
    const response = await axios.post(`${BASEAPIURL}/register`, null, {
      params: { username, password, verifyPassword },
    });
    return response.data;
  } catch (error) {
    console.error("There was an error creating the user!", error);
    throw error;
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${BASEAPIURL}/login`, null, {
      params: { username, password },
    });
    return response.data;
  } catch (error) {
    console.error("There was an error logging in the user!", error);
    throw error;
  }
};