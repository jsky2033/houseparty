import axios from "axios";

// const herokuDomain = "https://tranquil-savannah-34990.herokuapp.com";
const localDomain = "http://localhost:5000";

export default axios.create({
  baseURL: `${localDomain}/api/users`,
});

export let Auth = axios.create({
  baseURL: `${localDomain}/api/auth`,
});
