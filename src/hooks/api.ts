import axios from "axios"

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_PROTOCOL || "https"}://${import.meta.env.VITE_HOST || "paste.051205.xyz"}/api`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})