import axios from "axios";

const herokuDomain = "https://tranquil-savannah-34990.herokuapp.com";
// const localDomain =  "http://localhost:5000";

export default axios.create({
  baseURL: `${herokuDomain}/api/houses`,
});
