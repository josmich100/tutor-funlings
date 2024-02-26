import axios from "axios";

const BaseApi = axios.create({
  baseURL: "https://vaultde.ngamia.africa/",
})

export default BaseApi;


// De: https://vaultde.ngamia.africa/
// QA: https://vaultqa.ngamia.africa/
// Production: https://vault.ngamia.africa/
