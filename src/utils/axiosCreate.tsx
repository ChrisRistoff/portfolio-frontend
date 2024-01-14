// axios create
import axios from 'axios';

// http://ec2-35-179-90-244.eu-west-2.compute.amazonaws.com:5000/api
export const api = axios.create({
  baseURL: 'http://localhost:5010/api',
  timeout: 10000,
});