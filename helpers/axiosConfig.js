import axios from "axios";

const instance = axios.create({
  baseURL: 'http://10.0.2.2:8000/api'
  // baseURL: 'https://c064-41-80-96-86.eu.ngrok.io/api'
})

export default instance