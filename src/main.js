import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";
import axios from "axios";

Vue.config.productionTip = false;
const HTTP = axios.create({
  baseURL: "http://localhost:5000/api/admin", //"http://192.168.191.20:8086/api/admin",
  headers: {
    "Content-Type":
      "application/json; application/x-www-form-urlencoded; charset=UTF-8",
  },
});
HTTP.interceptors.request.use((config) => {
  let token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }
  return config;
});
Vue.prototype.$http = HTTP;
new Vue({
  vuetify,
  router,
  store,  
  render: (h) => h(App),
}).$mount("#app");
