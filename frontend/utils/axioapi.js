import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
});
const linstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_URL,
});

export default instance;
export { linstance };
