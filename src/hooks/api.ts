import axios from "axios"

const host = import.meta.env.VITE_HOST || "https://051205"
export const api = axios.create({
  baseURL: `${import.meta.env.VITE_PROTOCOL}://${host}/api`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})