import axios from 'axios'

var instance = axios.create({});

instance.interceptors.request.use(config => {
    let AUTH_TOKEN = localStorage.getItem("token");
    if(AUTH_TOKEN && !config.url.includes("admin")){
        config.headers.common["Authorization"] = AUTH_TOKEN;
    }
    return config;
},err => {
    return Promise.reject(err);
});
instance.interceptors.response.use(res => {
    if(res.headers.token){
        localStorage.setItem('token',res.headers.token);
    }
    return res;
},err => {
    return err;
});

export default instance;