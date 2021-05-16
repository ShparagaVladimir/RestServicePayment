<template>
  <div>
    <h1 class="white--text">Выбери курс и вперед к новым знания!</h1>
    <v-row class="mb-1 ml-1"
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
          <v-file-input
            truncate-length="15"
            v-model="courseModel.img"
          ></v-file-input>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" text @click="dialogCourse = false">
            Отмена
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="
              (dialogCourse = false),
               saveCourse()
            "
          >
            Добавить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div class="row">
      <v-col v-for="item in slides" :key="item" class="d-flex child-flex">
        <v-card class="mx-auto" max-width="400" :background-color="item.color">
          <v-chip color="primary" small @click="deleteCourse(item)"
            ><v-icon>mdi-delete</v-icon></v-chip
          >
          <v-chip @click="editCourse(item)" color="blue" small
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
  </div>
</template>

<script>
import store from "../store";
export default {
  data: () => ({
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
    slides: [
      {
        course: 1,
        text: "Арготроник",
        color: "teal",
        img: "images/161.jpg",
        show: false,
        description: "Арготроник",
        progress: 100,
      },
      {
        course: 2,
        text: "РСМ Карта урожайности",
        color: "warning",
        img: "images/161.jpg",
        show: false,
        description: "РСМ Карта урожайности",
        progress: 50,
      },
      {
        course: 3,
        text: "РСМ Уведомления",
        color: "pink darken-2",
        img: "images/161.jpg",
        show: false,
        description: "РСМ Уведомления",
        progress: 15,
      },
      {
        course: 4,
        text: "РСМ Роутер",
        color: "red lighten-1",
        img: "images/161.jpg",
        show: false,
        description: "РСМ Роутер",
        progress: 0,
      },
      {
        course: 5,
        text: "РСМ Ночное видение",
        color: "deep-purple accent-4",
        img: "images/161.jpg",
        show: false,
        description: "РСМ Ночное видение",
        progress: 0,
      },
      {
        course: 6,
        text: "Агротроник Пилот 1.0",
        color: "indigo",
        img: "images/161.jpg",
        show: false,
        description: "Арготроник Пилот 1.0",
        progress: 0,
      },
    ],
    cours: [],
  }),
  methods: {
    initialize() {
      this.cours = store.getters.getCours;
    },
    methodsLog() {
      console.log(this.courseModel.img);
    },
    deleteCourse(item) {
      this.slides.splice(this.slides.indexOf(item), 1);
    },
    editCourse(item) {
      this.editIndex = this.slides.indexOf(item);
      Object.assign(this.courseModel, item);
      this.dialogCourse = true;
    },
    saveCourse() {
      if (this.editIndex == -1) this.slides.push(Object.assign({}, this.courseModel));
      else this.slides[this.editIndex] = Object.assign({}, this.courseModel);
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
