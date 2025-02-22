import axios from "axios"

const host = import.meta.env.VITE_HOST || "paste.051205.xyz"
const protocol = import.meta.env.VITE_PROTOCOL || "https"
export const api = axios.create({
  baseURL: `${protocol}://${host}/api`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})