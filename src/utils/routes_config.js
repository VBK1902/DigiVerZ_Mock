import axios from 'axios';

export const dqr_api = axios.create({
    baseURL: 'http://127.0.0.1:5000/dqr',
  });
  
  export const mb_api = axios.create({
    baseURL: 'http://127.0.0.1:5000/mb',
  });
  export const sf_api = axios.create({
    baseURL: 'http://127.0.0.1:5000/sf',
  });
  
  export const aa_api = axios.create({
    baseURL: 'http://127.0.0.1:5000/aa',
  });