import axios from "axios";

const BaseApi = axios.create({
  baseURL: "http://localhost:3000/api/",
});

export default BaseApi;

// Local: https://ecbd87500a0d.ngrok.io/
// De: https://apide.ngamia.africa/
// QA: https://apiqa.ngamia.africa/
// Production: https://api.ngamia.africa/
