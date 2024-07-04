import axios from "axios"

export const api = axios.create({
  baseURL: "https://explorer-api-notes-t6a4.onrender.com",
})
