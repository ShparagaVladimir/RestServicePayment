<template>
  <div>
    <h1>Тестирование по курсу "Агротроник"</h1>
    <v-container fluid>
      <v-card elevation="2" v-model="question">
        <v-card-title>{{ question.name }} </v-card-title>
        <v-card-text>
          <hr />
          <v-radio-group v-model="answerQuestion" row>
            <v-col cols="12">
              <v-radio
                v-for="item in question.answers"
                :key="item.answer"
                :label="item.answer"
                :value="item"
              ></v-radio
            ></v-col>
          </v-radio-group>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            v-if="
              answerQuestion != null &&
                answersUser.length != questions.length - 1
            "
            color="primary "
            @click="next"
          >
            Далее
          </v-btn>
          <v-btn
            v-if="
              answerQuestion != null &&
                answersUser.length == questions.length - 1
            "
            color="green "
            @click=" (dialogResult = true)"
          >
            Отправить ответы
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
    <v-dialog v-model="dialogResult" max-width="400px">
      <v-card>
        <v-card-title>
          Результат
        </v-card-title>
        <v-card-text>
          <v-chip :color="getColor(75)">
            {{ 75 }}
          </v-chip>
        </v-card-text>
        <v-card-actions>
          <v-row no-gutters
            ><v-spacer></v-spacer
            ><v-btn color="primary">Вернуться к курсам</v-btn></v-row
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialogResult: false,
    answerQuestion: null,
    answersUser: [],
    question: {},
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
  }),

  created() {
    this.initialize();
  },
  methods: {
    getColor(average) {
      if (average < 50) return "red";
      else if (average > 50 && average < 75) return "orange";
      else return "green";
    },
    initialize() {
      this.question = this.questions[0];
    },
    next() {
      this.answersUser.push({
        id: this.question.id,
        answer: this.answerQuestion,
      });
      this.question = this.questions[this.getRandomIdQuestion() - 1];
      this.answerQuestion = null;
    },
    getRandomIdQuestion(min, max) {
      var IdsQuestion = this.getArrayIdQuestionNotUserAnswer();
      min = Math.ceil(Math.min.apply(null, IdsQuestion));
      max = Math.floor(Math.max.apply(null, IdsQuestion));
      return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
    },
    //Метод получения всех вопросов не отвеченных пользователем
    getArrayIdQuestionNotUserAnswer() {
      let array = [];
      let arrayUserAnswer = [];
      this.answersUser.forEach((a) => arrayUserAnswer.push(a.id));
      this.questions.forEach((f) =>
        arrayUserAnswer.indexOf(f.id) == -1 ? array.push(f.id) : null
      );
      return array;
    },
  },
};
</script>

<style lang="scss" scoped></style>
