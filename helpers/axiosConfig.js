import axios from "axios";

const instance = axios.create({
  baseURL: 'http://10.0.2.2:8000/api'
  // baseURL: 'https://4639-41-212-47-54.eu.ngrok.io/api'
})

export default instance