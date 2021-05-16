import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  getters: {
    isLoggedIn: (state) => !!state.token,
    userModel:(state)=>state.user,
    getCours:(state)=>state.cours,
    getBlock:(state)=>state.block,  
    getQuestions:(state)=>state.questions,
    authStatus: (state) => state.status,
    messages: (state)=>state.messages,
  },
  state: {
    dateCurrent:new Date(),
    status: "",
    messages:[{text:"Новое сообщение 1"} ,{text:"Новое сообщение 2"}],
    token: localStorage.getItem("token") || "",
    user: {
      family:"",
      firstName:"Тестовый",
      lastName:"Пользователь",
      departament:"Тестовый",
      id:"1",
      email:"email@.com"
    },
    cours:[{
      title:"Новость 1",
      description:"Читай быстрее очень важно",
      image:"https://delo.ua/files/news/images/3675/76/picture2_v-rezhime-work-fr_367576_p0.jpg",
      datePublished:new Date(new Date().setDate(new Date().getDate()+1)).toLocaleString()
    },{
      title:"Новость 2",
      description:"зарплата в понедельник",
      image:"https://delo.ua/files/news/images/3675/76/picture2_v-rezhime-work-fr_367576_p0.jpg",
      datePublished:new Date(new Date().setDate(new Date().getDate()+2)).toLocaleString()
    },{
      title:"Новость 3",
      description:"Просто тестируем",
      image:"https://delo.ua/files/news/images/3675/76/picture2_v-rezhime-work-fr_367576_p0.jpg",
      datePublished:new Date(new Date().setDate(new Date().getDate()+3)).toLocaleString()
    }],
    block: [
      {
        name: "text",
        childrens: [
          {
            id: 1,
            name: "children",
            html:`<p>children</p>`,
          },
        ],
      },
      {
        name: "text1",
        childrens: [
          {
            id: 1,
            name: "children11",
            html:`<p>children11</p>`,
          },
        ],
      },
    ],
    questions: [
      {
        id: 1,
        name: "question1",
        answers: [
          {
            id:1,
            answer: "answer1",
            trueAnswer: true,
          },
          {
            id:2,
            answer: "answer2",
            trueAnswer: false,
          },
          {
            id:3,
            answer: "answer3",
            trueAnswer: false,
          },
          {
            id:4,
            answer: "answer4",
            trueAnswer: false,
          },
        ],
      },
      {
        id: 2,
        name: "question2",
        answers: [
          {
            id:1,
            answer: "answer1",
            trueAnswer: true,
          },
          {
            id:2,
            answer: "answer2",
            trueAnswer: false,
          },
          {
            id:3,
            answer: "answer3",
            trueAnswer: false,
          },
          {
            id:4,
            answer: "answer4",
            trueAnswer: false,
          },
        ],
      },
      {
        id: 3,
        name: "question3",
        answers: [
          {
            id:1,
            answer: "answer1",
            trueAnswer: true,
          },
          {
            id:2,
            answer: "answer2",
            trueAnswer: false,
          },
          {
            id:3,
            answer: "answer3",
            trueAnswer: false,
          },
          {
            id:4,
            answer: "answer4",
            trueAnswer: false,
          },
        ],
      },
    ],
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, token, user) {
      state.status = "success";
      state.token = token;
      state.user = user;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
    },
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        Vue.$http({
          url: "http://localhost:3000/login",
          data: user,
          method: "POST",
        })
          .then((resp) => {
            const token = resp.data.token;
            const user = resp.data.user;
            localStorage.setItem("token", token);
            // axios.defaults.headers.common['Authorization'] = token
            commit("auth_success", token, user);
            resolve(resp);
          })
          .catch((err) => {
            commit("auth_error");
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        Vue.$http({
          url: "http://localhost:3000/register",
          data: user,
          method: "POST",
        })
          .then((resp) => {
            const token = resp.data.token;
            const user = resp.data.user;
            localStorage.setItem("token", token);
            //axios.defaults.headers.common['Authorization'] = token
            commit("auth_success", token, user);
            resolve(resp);
          })
          .catch((err) => {
            commit("auth_error", err);
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit("logout");
        localStorage.removeItem("token");
        //delete axios.defaults.headers.common['Authorization']
        resolve();
      });
    },
  },
  modules: {},
});
