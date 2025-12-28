import axios from "axios";

const apiurl=axios.create({
    baseURL: "https://foodiehub-backend-mwfg.onrender.com"
});
apiurl.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


export default apiurl;