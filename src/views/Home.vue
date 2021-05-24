<template>
  <div>
    <v-dialog v-model="dialogDelete" max-width="600px">
      <v-card>
        <v-card-title>Вы уверены, что хотите удалить курс?</v-card-title>
        <v-card-actions>
          <v-row no-gutters>
            <v-spacer></v-spacer>
            <v-btn color="primary">Отмена</v-btn>
            <v-btn color="green">Да</v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row no-gutters centered>
      <v-card style="background: #cce4f8;" min-height="200px" width="100%">
        <h1 data-v-fae5bece="" style="color: #5c065c; padding: 70px;">
          Добро пожаловать!
        </h1>
      </v-card>
    </v-row>
    <v-card>
      <v-tabs v-model="tab" centered>
        <v-tab v-for="item in items" :key="item">
          {{ item }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item
          height="100%"
          :key="`Главная`"
          style="background-color: #d9d6d6;min-height: 60em"
        >
          <h1>Курсы для вас!</h1>
          <v-row class="mb-1 ml-1" v-if="admin"
            ><v-btn color="primary" @click="dialogCourse = true"
              >Создать курс</v-btn
            ></v-row
          >
          <v-dialog max-width="600" v-model="dialogCourse">
            <v-card>
              <v-card-title class="headline">
                Создание курса
              </v-card-title>
              <v-card-text>
                <v-text-field
                  filled
                  dense
                  clearable
                  label="Название курса"
                  v-model="courseModel.text"
                ></v-text-field>
                <v-text-field
                  filled
                  dense
                  clearable
                  label="Описание курса"
                  v-model="courseModel.description"
                ></v-text-field>
                <v-text-field
                  filled
                  dense
                  clearable
                  label="Картинка"
                  v-model="courseModel.img"
                ></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary darken-1"
                  text
                  @click="dialogCourse = false"
                >
                  Отмена
                </v-btn>
                <v-btn
                  color="primary darken-1"
                  text
                  @click="dialogCourse = false"
                >
                  Тест
                </v-btn>
                <v-btn
                  color="primary darken-1"
                  text
                  @click="dialogCourse = false"
                >
                  Разделы
                </v-btn>

                <v-btn
                  color="green darken-1"
                  text
                  @click="(dialogCourse = false), saveCourse()"
                >
                  Добавить
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <div class="row">
            <v-col v-for="item in cours" :key="item" class="d-flex child-flex">
              <v-card
                class="mx-auto"
                max-width="400"
                :background-color="item.color"
              >
                <v-chip
                  v-if="admin"
                  color="primary"
                  small
                  @click="(dialogDelete = true), deleteCourse(item)"
                  ><v-icon>mdi-delete</v-icon></v-chip
                >
                <v-chip
                  v-if="admin"
                  @click="editCourse(item)"
                  color="blue"
                  small
                  ><v-icon>mdi-pencil</v-icon></v-chip
                >
                <v-img
                  :lazy-src="item.img"
                  class="white--text align-end"
                  gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
                  height="200px"
                >
                  <v-layout align-center justify-start row>
                    <v-card-title>{{ item.text }} </v-card-title>
                    <v-spacer></v-spacer>
                    <v-progress-circular
                      :rotate="90"
                      :size="100"
                      :width="15"
                      :value="item.progress"
                      :color="item.color"
                    >
                      {{ item.progress }}
                    </v-progress-circular></v-layout
                  >
                </v-img>

                <v-divider class="mx-4"></v-divider>
                <v-card-text class="text--primary">
                  <div>Описание курса</div>
                </v-card-text>

                <v-card-actions>
                  <v-btn icon @click="item.show = !item.show">
                    <v-icon>{{
                      item.show ? "mdi-chevron-up" : "mdi-chevron-down"
                    }}</v-icon>
                  </v-btn>
                  <v-spacer></v-spacer>

                  <v-btn
                    v-if="item.progress == 0"
                    right="right"
                    color="primary"
                    rounded
                    small
                    @click="$router.push('/course?id=' + item.course)"
                  >
                    Начать
                  </v-btn>
                  <v-btn
                    v-if="item.progress < 100 && item.progress > 0"
                    right="right"
                    color="warning"
                    rounded
                    small
                    @click="$router.push('/course?id=' + item.course)"
                  >
                    Продолжить
                  </v-btn>
                  <v-chip
                    v-if="item.progress == 100"
                    class="ma-2"
                    color="green"
                    text-color="white"
                  >
                    Курс пройден
                  </v-chip>
                </v-card-actions>
                <v-expand-transition>
                  <div v-show="item.show">
                    <v-divider></v-divider>
                    <v-card-text>
                      {{ item.description }}
                    </v-card-text>
                  </div>
                </v-expand-transition>
              </v-card>
            </v-col>
          </div>
        </v-tab-item>
        <v-tab-item style="background-color: #d9d6d6;min-height: 60em">
          <div class="row" style="padding:15px">
            <v-col v-for="item in cours" :key="item" class="d-flex child-flex">
              <v-card
                v-if="item.progress > 0 && item.progress < 100"
                class="mx-auto"
                max-width="400"
                :background-color="item.color"
              >
                <v-chip
                  v-if="admin"
                  color="primary"
                  small
                  @click="deleteCourse(item)"
                  ><v-icon>mdi-delete</v-icon></v-chip
                >
                <v-chip
                  v-if="admin"
                  @click="editCourse(item)"
                  color="blue"
                  small
                  ><v-icon>mdi-pencil</v-icon></v-chip
                >
                <v-img
                  :lazy-src="item.img"
                  class="white--text align-end"
                  gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
                  height="200px"
                >
                  <v-layout align-center justify-start row>
                    <v-card-title>{{ item.text }} </v-card-title>
                    <v-spacer></v-spacer>
                    <v-progress-circular
                      :rotate="90"
                      :size="100"
                      :width="15"
                      :value="item.progress"
                      :color="item.color"
                    >
                      {{ item.progress }}
                    </v-progress-circular></v-layout
                  >
                </v-img>

                <v-divider class="mx-4"></v-divider>
                <v-card-text class="text--primary">
                  <div>Описание курса</div>
                </v-card-text>

                <v-card-actions>
                  <v-btn icon @click="item.show = !item.show">
                    <v-icon>{{
                      item.show ? "mdi-chevron-up" : "mdi-chevron-down"
                    }}</v-icon>
                  </v-btn>
                  <v-spacer></v-spacer>

                  <v-btn
                    v-if="item.progress == 0"
                    right="right"
                    color="primary"
                    rounded
                    small
                    @click="$router.push('/course?id=' + item.course)"
                  >
                    Начать
                  </v-btn>
                  <v-btn
                    v-if="item.progress < 100 && item.progress > 0"
                    right="right"
                    color="warning"
                    rounded
                    small
                    @click="$router.push('/course?id=' + item.course)"
                  >
                    Продолжить
                  </v-btn>
                  <v-chip
                    v-if="item.progress == 100"
                    class="ma-2"
                    color="green"
                    text-color="white"
                  >
                    Курс пройден
                  </v-chip>
                </v-card-actions>
                <v-expand-transition>
                  <div v-show="item.show">
                    <v-divider></v-divider>
                    <v-card-text>
                      {{ item.description }}
                    </v-card-text>
                  </div>
                </v-expand-transition>
              </v-card>
            </v-col>
          </div>
        </v-tab-item>
        <v-tab-item style="background-color: #d9d6d6;min-height: 60em">
          <v-row></v-row>
          <div
            class="row"
            style="padding:15px"
            v-if="!checkNotComplitedCourse()"
          >
            <v-col v-for="item in cours" :key="item" class="d-flex child-flex">
              <v-card
                v-if="item.progress == 100"
                class="mx-auto"
                max-width="400"
                :background-color="item.color"
              >
                <v-chip
                  v-if="admin"
                  color="primary"
                  small
                  @click="deleteCourse(item)"
                  ><v-icon>mdi-delete</v-icon></v-chip
                >
                <v-chip
                  v-if="admin"
                  @click="editCourse(item)"
                  color="blue"
                  small
                  ><v-icon>mdi-pencil</v-icon></v-chip
                >
                <v-img
                  :lazy-src="item.img"
                  class="white--text align-end"
                  gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
                  height="200px"
                >
                  <v-layout align-center justify-start row>
                    <v-card-title>{{ item.text }} </v-card-title>
                    <v-spacer></v-spacer>
                    <v-progress-circular
                      :rotate="90"
                      :size="100"
                      :width="15"
                      :value="item.progress"
                      :color="item.color"
                    >
                      {{ item.progress }}
                    </v-progress-circular></v-layout
                  >
                </v-img>

                <v-divider class="mx-4"></v-divider>
                <v-card-text class="text--primary">
                  <div>Описание курса</div>
                </v-card-text>

                <v-card-actions>
                  <v-btn icon @click="item.show = !item.show">
                    <v-icon>{{
                      item.show ? "mdi-chevron-up" : "mdi-chevron-down"
                    }}</v-icon>
                  </v-btn>
                  <v-spacer></v-spacer>

                  <v-btn
                    v-if="item.progress == 0"
                    right="right"
                    color="primary"
                    rounded
                    small
                    @click="$router.push('/course?id=' + item.course)"
                  >
                    Начать
                  </v-btn>
                  <v-btn
                    v-if="item.progress < 100 && item.progress > 0"
                    right="right"
                    color="warning"
                    rounded
                    small
                    @click="$router.push('/course?id=' + item.course)"
                  >
                    Продолжить
                  </v-btn>
                  <v-chip
                    v-if="item.progress == 100"
                    class="ma-2"
                    color="green"
                    text-color="white"
                  >
                    Курс пройден
                  </v-chip>
                </v-card-actions>
                <v-expand-transition>
                  <div v-show="item.show">
                    <v-divider></v-divider>
                    <v-card-text>
                      {{ item.description }}
                    </v-card-text>
                  </div>
                </v-expand-transition>
              </v-card>
            </v-col>
          </div>
          <div v-if="checkNotComplitedCourse()">
            <v-row no-gutters padding="100px">
              <v-card
                style="background: #cce4f8;"
                min-height="200px"
                width="100%"
              >
                <h2 style=" padding: 70px;">
                  <v-icon x-large>mdi-school-outline</v-icon> Здесь отображаются
                  курсы которые вы закончили!
                </h2>
              </v-card>
            </v-row>
          </div>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import store from "../store";
export default {
  data: () => ({
    tab: null,
    dialogDelete: false,
    items: ["Главная", "В процессе", "Пройденные"],
    text: "123",
    dialogCourse: false,
    editIndex: -1,
    courseModel: {
      course: 0,
      text: "",
      color: "",
      img: "",
      show: false,
      description: "",
      progress: 0,
    },
    cours: [
      {
        course: 1,
        text: "Арготроник Пилот",
        color: "teal",
        img:
          "https://rostselmash.com/upload/iblock/96d/96d5b183d8a4beabe6952e8532b3f948.png",
        show: false,
        description:
          "Система увеличивает производительность и снижает трудоемкость полевых операций.",
        progress: 100,
      },
      // {
      //   course: 2,
      //   text: "Арготроник Пилот 2.0",
      //   color: "warning",
      //   img:
      //     "https://rostselmash.com/upload/iblock/758/758a9ee2c1c835a0aa0b1f477789605f.png",
      //   show: false,
      //   description: "Предназначена для увеличения производительности и снижения трудоемкости проведения полевых операций, снижения пропусков и перекрытий, экономии ГСМ и трудозатрат, безостановочной работы в условиях плохой видимости и в темное время суток",
      //   progress: 50,
      // },
      // {
      //   course: 7,
      //   text: "Арготроник Пилот 2.1",
      //   color: "yellow",
      //   img:
      //     "https://rostselmash.com/upload/iblock/2e2/2e2e674e96bd72c1c00febbb7fd14a6a.png",
      //   show: false,
      //   description: "Система управления траекторией движения агромашины на базе датчика рядка от Ростсельмаш - РСМ Агротроник Пилот 2.1, предназначена для уборки пропашных культур, высеянных с помощью высокоточной системы навигации - рядками.",
      //   progress: 0,
      // },
      {
        course: 3,
        text: "РСМ Адаптивный Круиз Контроль",
        color: "warning",
        img:
          "https://rostselmash.com/upload/iblock/d1e/d1e3edeaa2a488866a2c0a9df9133bf7.png",
        show: false,
        description:
          "Система автоматически регулирует скорость комбайна в зависимости от текущей урожайности, уровня потерь, количества массы, возвращаемой на домолот, загрузки двигателя, наклонной камеры и МСУ.",
        progress: 10,
      },
      {
        course: 4,
        text: "РСМ 4Д Очистка",
        color: "red lighten-1",
        img: "https://rostselmash.com/upload/4d.png",
        show: false,
        description:
          "Поддерживает стабильность процесса очистки даже на сложном рельефе поля.",
        progress: 0,
      },
      {
        course: 5,
        text: "РСМ Голосовой помощник",
        color: "deep-purple accent-4",
        img:
          "https://rostselmash.com/upload/iblock/ff3/ff3652dd4cc13c3ae2b0f72f75959907.png",
        show: false,
        description:
          "Уникальный сервисный помощник РСМ Голосовой помощник облегчает доступ ко многим параметрам в меню на дисплее комбайна. Теперь многими рутинными или часто меняемыми настройками становится управлять гораздо проще.",
        progress: 0,
      },
      {
        course: 6,
        text: "РСМ Оценка возврата на домолот",
        color: "indigo",
        img:
          "https://rostselmash.com/upload/iblock/9d3/9d3460211b3460781a3f60c392506fba.png",
        show: false,
        description:
          "Система оценки возврата на домолот предназначена для оперативного отображения оператора текущего уровня загрузки колосового элеватора. ",
        progress: 0,
      },
    ],
    admin: true,
  }),
  methods: {
    initialize() {
      this.admin = store.getters.getAdmin;
    },
    checkNotComplitedCourse() {
      var comp = this.cours.find((f) => f.progress == 100);
      if (comp == null) {
        return true;
      }
      return false;
    },
    methodsLog() {
      console.log(this.courseModel.img);
    },
    deleteCourse(item) {
      this.cours.splice(this.cours.indexOf(item), 1);
    },
    editCourse(item) {
      this.editIndex = this.cours.indexOf(item);
      Object.assign(this.courseModel, item);
      this.dialogCourse = true;
    },
    saveCourse() {
      if (this.editIndex == -1)
        this.cours.push(Object.assign({}, this.courseModel));
      else this.cours[this.editIndex] = Object.assign({}, this.courseModel);
    },
  },
  created() {
    this.initialize();
  },
};
</script>
<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
