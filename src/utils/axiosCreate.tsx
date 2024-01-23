import axios from 'axios';

// const local: string = "http://localhost:5010/api"
// http://ec2-35-179-90-244.eu-west-2.compute.amazonaws.com:8080/api
const live: string = "https://krasen.site/apis"
export const api = axios.create({
  baseURL: live,
  timeout: 10000,
});