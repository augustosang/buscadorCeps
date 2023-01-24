import axios from "axios";

//09230110/json/

const api = axios.create({
  baseURL: "https://viacep.com.br/ws/"
});

export default api;