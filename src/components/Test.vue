<template>
  <div>
    <v-container fluid>
      <v-card elevation="2" v-model="question">
        <v-card-title>{{ question.name }} </v-card-title>
        <v-card-text>
          <hr />
          <v-radio-group v-model="answerQuestion" row>
            <v-radio
              v-for="item in question.answers"
              :key="item.answer"
              :label="item.answer"
              :value="item"
            ></v-radio>
          </v-radio-group>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if="answerQuestion != null && answersUser.length != questions.length-1" color="primary " @click="next">
            Далее
          </v-btn>
           <v-btn v-if="answerQuestion != null && answersUser.length == questions.length-1" color="green " @click="sendAnswers">
            Отправить ответы
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    answerQuestion: null,
    answersUser: [],
    question: {},
    questions: [
      {
        id: 1,
        name: "question1",
        answers: [
          {
            answer: "answer1",
            trueAnswer: true,
          },
          {
            answer: "answer2",
            trueAnswer: false,
          },
          {
            answer: "answer3",
            trueAnswer: false,
          },
          {
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
            answer: "answer1",
            trueAnswer: true,
          },
          {
            answer: "answer2",
            trueAnswer: false,
          },
          {
            answer: "answer3",
            trueAnswer: false,
          },
          {
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
            answer: "answer1",
            trueAnswer: true,
          },
          {
            answer: "answer2",
            trueAnswer: false,
          },
          {
            answer: "answer3",
            trueAnswer: false,
          },
          {
            answer: "answer4",
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
    initialize() {
      this.question = this.questions[0];
    },
    next() {
      this.answersUser.push({
        id: this.question.id,
        answer: this.answerQuestion,
      });
      this.question = this.questions[this.getRandomIdQuestion()-1];
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
      this.questions.forEach((f) => arrayUserAnswer.indexOf(f.id)==-1?array.push(f.id):null);
      return array;
    },
  },
};
</script>

<style lang="scss" scoped></style>
