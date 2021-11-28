import axios from "axios";
import domain from "./domain";

export default axios.create({
  baseURL: `${domain}/api/users`,
});

export let Auth = axios.create({
  baseURL: `${domain}/api/auth`,
});
