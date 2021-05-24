import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  getters: {
    isLoggedIn: (state) => !!state.token,
    getAdmin:()=>false,
    userModel: (state) => state.user,
    getCours: (state) => state.cours,
    getBlock: (state) => state.block,
    getQuestions: (state) => state.questions,
    authStatus: (state) => state.status,
    messages: (state) => state.messages,
  },
  state: {
    dateCurrent: new Date(),
    status: "",
    messages: [{ text: "Новое сообщение 1" }, { text: "Новое сообщение 2" }],
    token: localStorage.getItem("token") || "",
    user: {
      family: "",
      firstName: "Тестовый",
      lastName: "Пользователь",
      razryad: 1,
      id: "1",
      email: "email@.com",
      role:"Администратор"
    },
    cours: [
      {
        title: "Новость 1",
        description: "Читай быстрее очень важно",
        image:
          "https://delo.ua/files/news/images/3675/76/picture2_v-rezhime-work-fr_367576_p0.jpg",
        datePublished: new Date(
          new Date().setDate(new Date().getDate() + 1)
        ).toLocaleString(),
      },
      {
        title: "Новость 2",
        description: "зарплата в понедельник",
        image:
          "https://delo.ua/files/news/images/3675/76/picture2_v-rezhime-work-fr_367576_p0.jpg",
        datePublished: new Date(
          new Date().setDate(new Date().getDate() + 2)
        ).toLocaleString(),
      },
      {
        title: "Новость 3",
        description: "Просто тестируем",
        image:
          "https://delo.ua/files/news/images/3675/76/picture2_v-rezhime-work-fr_367576_p0.jpg",
        datePublished: new Date(
          new Date().setDate(new Date().getDate() + 3)
        ).toLocaleString(),
      },
    ],
    block: [
      {
        name: "Арготроник",
        childrens: [
          {
            id: 1,
            name: "Общее описание",
            html: `<h5>
                        Как это работает? </h5><p>
                          &nbsp;
                        </p><p>
                          Оператор заезжает в массив и направляет датчик рядков в междурядье и активирует систему автовождения.&nbsp;Чувствительный сенсор датчика, касается стеблей левого и правого рядов и передают сигнал в блок управления автовождением. Здесь сигнал обрабатывается и передается команда на мост управляющих колес, которая подсказывает, куда нужно повернуть: левее или правее, чтобы датчик сохранил центральное положение между рядами, по которым идет.
                        </p><p>
                          &nbsp;
                        </p><p>
                          Система управления траекторией движения агромашины на базе датчика рядка РСМ Агротроник Пилот 2.1 идеально подходит для операций по кормозаготовке и уборки пропашных культур.
                      </p>`,
          },
          {
            id: 2,
            name: `Функции контроля, 
            учёта и анализа`,
            html: `<h5>
                        Как это работает? </h5><p>
                          &nbsp;
                        </p><p>
                          Оператор заезжает в массив и направляет датчик рядков в междурядье и активирует систему автовождения.&nbsp;Чувствительный сенсор датчика, касается стеблей левого и правого рядов и передают сигнал в блок управления автовождением. Здесь сигнал обрабатывается и передается команда на мост управляющих колес, которая подсказывает, куда нужно повернуть: левее или правее, чтобы датчик сохранил центральное положение между рядами, по которым идет.
                        </p><p>
                          &nbsp;
                        </p><p>
                          Система управления траекторией движения агромашины на базе датчика рядка РСМ Агротроник Пилот 2.1 идеально подходит для операций по кормозаготовке и уборки пропашных культур.
                      </p>`,
          },
          {
            id: 3,
            name: "Задачи, решаемые системой",
            html: `<h5>
                        Как это работает? </h5><p>
                          &nbsp;
                        </p><p>
                          Оператор заезжает в массив и направляет датчик рядков в междурядье и активирует систему автовождения.&nbsp;Чувствительный сенсор датчика, касается стеблей левого и правого рядов и передают сигнал в блок управления автовождением. Здесь сигнал обрабатывается и передается команда на мост управляющих колес, которая подсказывает, куда нужно повернуть: левее или правее, чтобы датчик сохранил центральное положение между рядами, по которым идет.
                        </p><p>
                          &nbsp;
                        </p><p>
                          Система управления траекторией движения агромашины на базе датчика рядка РСМ Агротроник Пилот 2.1 идеально подходит для операций по кормозаготовке и уборки пропашных культур.
                      </p>`,
          },
          {
            id: 4,
            name: "Направления слежения",
            html: `<h5>
                        Как это работает? </h5><p>
                          &nbsp;
                        </p><p>
                          Оператор заезжает в массив и направляет датчик рядков в междурядье и активирует систему автовождения.&nbsp;Чувствительный сенсор датчика, касается стеблей левого и правого рядов и передают сигнал в блок управления автовождением. Здесь сигнал обрабатывается и передается команда на мост управляющих колес, которая подсказывает, куда нужно повернуть: левее или правее, чтобы датчик сохранил центральное положение между рядами, по которым идет.
                        </p><p>
                          &nbsp;
                        </p><p>
                          Система управления траекторией движения агромашины на базе датчика рядка РСМ Агротроник Пилот 2.1 идеально подходит для операций по кормозаготовке и уборки пропашных культур.
                      </p>`,
          },
          {
            id: 5,
            name: "Арготроник пилот 1.0",
            html: `<h2><span class="ql-size-large">Преимущества системы</span></h2><p><br></p><p><span style="color: rgb(16, 16, 16);" class="ql-size-large">● Автоматическое управление траекторией движения с точностью до 2,2 см.</span></p><p><span style="color: rgb(16, 16, 16);" class="ql-size-large">● Автоматические развороты.</span></p><p><span style="color: rgb(16, 16, 16);" class="ql-size-large">● Поднятие/опускание жатки в конце и начале гона.</span></p><p><span style="color: rgb(16, 16, 16);" class="ql-size-large">● Автоматическое управление скоростью*.</span></p><p><span style="color: rgb(16, 16, 16);" class="ql-size-large">● Отправка карты-задания дистанционно через РСМ Роутер**.</span></p><p><br></p><h2><span class="ql-size-large">Типовой комплект оснащения</span></h2><p><br></p><p><span style="color: rgb(16, 16, 16);" class="ql-size-large">● Приемник.</span></p><p><span style="color: rgb(16, 16, 16);" class="ql-size-large">● Базовая станция RTK.</span></p><p><span style="color: rgb(16, 16, 16);" class="ql-size-large">● Контроллер.</span></p><p><span style="color: rgb(16, 16, 16);" class="ql-size-large">● Насос-дозатор.</span></p><p><span style="color: rgb(16, 16, 16);" class="ql-size-large">● Пылевлагозащищенный дисплей.</span></p><p><br></p><p><span style="color: rgb(16, 16, 16);" class="ql-size-large">Система увеличивает производительность и снижает трудоемкость полевых операций. Благодаря ей до 20 % снижается количество пропусков и перекрытий, экономится ГСМ, а работа в условиях плохой видимости и в темное время суток становится эффективнее.</span></p><h2><span style="color: rgb(16, 16, 16);" class="ql-size-large"><img src="https://rostselmash.com/upload/%D0%A1%D0%BB%D0%B0%D0%B9%D0%B4%D0%B5%D1%80_%D0%A0%D0%A1%D0%9C%20%D0%A3%D0%BC%D0%BD%D0%B0%D1%8F%20%D0%BC%D0%B5%D1%82%D0%BA%D0%B0_%D0%BA%D0%BE%D0%B1%D0%B0%D0%B9%D0%BD_svet.jpg"></span><span class="ql-size-large">Как это работает?</span></h2><p><br></p><p><span style="color: rgb(16, 16, 16);" class="ql-size-large">Антенна принимает сигналы в одночастотном режиме от ГЛОНАСС и GPS. На дисплее отображается весь процесс автоуправления. С помощью дисплея также задаются рабочие параметры, имеется возможность загружать и выгружать необходимые диагностические данные (посредством USB, флеш-карт памяти, GSM-связи), настраивать и калибровать исполнительные механизмы. Способом повышения точности позиционирования является базовая станция RТК. Она обеспечивает высокую точность, непрерывно передавая сигналы коррекции с точностью до 2,2 см посредством радиоканалов.</span></p><p><br></p><p><span style="color: rgb(16, 16, 16);" class="ql-size-large">Система увеличивает производительность до 30% и снижает трудоемкость полевых операций. Благодаря ей до 20 % снижается количество пропусков и перекрытий, экономится ГСМ, а работа в условиях плохой видимости и в темное время суток становится эффективнее.</span></p><p><br></p><p><span style="color: rgb(16, 16, 16);" class="ql-size-large">* Доступно для машин, оснащённых опцией РСМ Адаптивный круиз-контроль.</span></p><p><span style="color: rgb(16, 16, 16);" class="ql-size-large">** Доступно для машин, оснащённых опцией РСМ Роутер.</span></p>`,
          },
          {
            id: 6,
            name: "Арготроник пилот 2.0",
            html: `""`,
          },
          {
            id: 7,
            name: "Арготроник пилот 2.1",
            html: `<p><span class="ql-size-large">Система управления траекторией движения агромашины на базе датчика рядка от Ростсельмаш - РСМ Агротроник Пилот 2.1, предназначена для уборки пропашных культур, высеянных с помощью высокоточной системы навигации - рядками.</span></p><p><br></p><p><strong class="ql-size-large">Система состоит из:</strong></p><p><br></p><p><span class="ql-size-large">- датчика рядков</span></p><p><span class="ql-size-large">- бортового контроллера</span></p><p><span class="ql-size-large">- исполнительного механизма</span></p><p><span class="ql-size-large">- датчика угла поворота колёс</span></p><p><span class="ql-size-large">- бортового дисплея</span></p><p><br></p><h2><br></h2><h2><span class="ql-size-large">Как это работает?</span></h2><p><span class="ql-size-large">&nbsp;</span></p><p><span class="ql-size-large">Оператор заезжает в массив и направляет датчик рядков в междурядье и активирует систему автовождения.&nbsp;Чувствительный сенсор датчика, касается стеблей левого и правого рядов и передают сигнал в блок управления автовождением. Здесь сигнал обрабатывается и передается команда на мост управляющих колес, которая подсказывает, куда нужно повернуть: левее или правее, чтобы датчик сохранил центральное положение между рядами, по которым идет.</span></p><p><span class="ql-size-large">&nbsp;</span></p><blockquote><span class="ql-size-large">Система управления траекторией движения агромашины на базе датчика рядка РСМ Агротроник Пилот 2.1 идеально подходит для операций по кормозаготовке и уборки пропашных культур.</span></blockquote><p><br></p><p><strong class="ql-size-large">Система служит для реализации следующих функций</strong><span class="ql-size-large">&nbsp;</span></p><p><br></p><ol><li><span class="ql-size-large">Автоматическое управление углом наклона козырька в зависимости от высоты подъема и угла поворота силосопровода (выгрузка по прямой линии)</span></li><li><span class="ql-size-large">Автоматический перевод силосопровода в транспортное положение</span></li><li><span class="ql-size-large">Запоминание текущего положения силосопровода (доступно 4 положения) + 1 транспортное</span></li><li><span class="ql-size-large">Перевод силосопровода в выбранное запомненное положение</span></li><li><span class="ql-size-large">Автоматическое перемещение силосопровода в транспортное положение при переводе комбайна в режим «дорога»</span></li><li><span class="ql-size-large">Автоматическое перемещение силосопровода в выбранное запомненное положение при переводе комбайна в режим «поле»</span></li><li><span class="ql-size-large">Оповещение оператора о неконтролируемом перемещении силосопровода и козырька</span></li><li><span class="ql-size-large">Автоматический поворот силосопровода на установленное расстояние</span></li></ol><p><br></p>`,
          },
        ],
      },
    ],
    questions: [
      {
        id: 1,
        name: "Агротроник пилот 1.0 что не входит в типовой комплект оснащения",
        answers: [
          {
            answer: "Приемник",
            trueAnswer: false,
          },
          {
            answer: "Процессор",
            trueAnswer: true,
          },
          {
            answer: "Контроллер",
            trueAnswer: false,
          },
          {
            answer: "Пылевлагозащищенный дисплей",
            trueAnswer: false,
          },
        ],
      },
      {
        id: 2,
        name:
          "На сколько система увеличивает производительность и снижает трудоемкость полевых операций",
        answers: [
          {
            answer: "19%",
            trueAnswer: false,
          },
          {
            answer: "23%",
            trueAnswer: false,
          },
          {
            answer: "21%",
            trueAnswer: false,
          },
          {
            answer: "20%",
            trueAnswer: true,
          },
        ],
      },
      {
        id: 3,
        name: "На сколько снижается количество пропусков и перекрытий",
        answers: [
          {
            answer: "25%",
            trueAnswer: false,
          },
          {
            answer: "30%",
            trueAnswer: false,
          },
          {
            answer: "28%",
            trueAnswer: false,
          },
          {
            answer: "20%",
            trueAnswer: true,
          },
        ],
      },
      {
        id: 4,
        name: "Что не относиться к функцияям контроля, учета и анализа ",
        answers: [
          {
            answer:
              "Местонахождение машины или всего парка машин во времени, с фиксацией траектории движения",
            trueAnswer: false,
          },
          {
            answer:
              "Активность техники – простой, движение, рабочий режим, скорость и отображение этих данных на карте",
            trueAnswer: false,
          },
          {
            answer:
              "Параметры технологического процесса – скорость вращения ротора или барабанов, шнеков, вентилятора очистки, и т. д.",
            trueAnswer: false,
          },
          {
            answer: "Выполняемый физический процесс",
            trueAnswer: true,
          },
          {
            answer: "Использования рабочего времени персоналом",
            trueAnswer: false,
          },
          {
            answer: "Выполняемый технологический процесс%",
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
