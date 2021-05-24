<template>
  <div>
    <h1>Тестирование курса "Арготроник"</h1>
    <v-row class="mb-2 mt-2 mr-2" no-gutters>
      <v-spacer></v-spacer>
      <v-btn depressed color="primary" @click="dialogAddQuestion = true "
        >Добавить</v-btn
      >
    </v-row>
    <v-dialog   max-width="600" v-model="dialogAddQuestion" >
      <v-card>
        <v-card-title class="headline">
          Заполните данные для добавления вопроса
        </v-card-title>
        <v-card-text>
          <v-text-field
            filled
            dense
            clearable
            label="Вопрос"
            v-model="questionModel.name"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary darken-1"
            text
            @click="dialogAddQuestion =!dialogAddQuestion"
          >
            Отмена
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="questions.push(questionModel), (dialogAddQuestion = false)"
          >
            Добавить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog   max-width="600" v-model="dialogAddAnswer" >
      <v-card>
        <v-card-title class="headline">
          Заполните данные для добавления ответа
        </v-card-title>
        <v-card-text>
          <v-text-field
            filled
            dense
            clearable
            label="Ответ"
            v-model="answerModel.answer"
          ></v-text-field>
          <v-switch v-model="answerModel.trueAnswer"></v-switch>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" text @click="dialogAddAnswer = false">
            Отмена
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="questionModel.answers.push(answerModel), (dialogAddAnswer = false)">
            Добавить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-col
      v-for="question in questions"
      :key="question"
      class="d-flex child-flex"
    >
      <v-card elevation="2">
        <v-row>
          <v-spacer></v-spacer>
          <v-btn class="mr-2 mt-2" x-small @click="deleteQuestion(question)">
            <v-icon>
              mdi-delete
            </v-icon>
          </v-btn>
        </v-row>
        <v-card-title>
          <v-text-field
            filled
            dense
            clearable
            label="Вопрос"
            v-model="question.name"
          ></v-text-field>
        </v-card-title>
        <v-row class="mr-5 mt-0"
          ><v-spacer></v-spacer>
          <v-btn depressed color="primary" @click="dialogAddAnswer = true, questionModel=question,answerModel = Object.assign({},answerModel)"
            >Добавить Ответ</v-btn
          ></v-row
        >
        <v-card-text>
          <v-radio-group :value="answer(question)">
            <v-col v-for="item in question.answers" :key="item.answer">
              <v-row>
                <v-radio  :key="item" :value="item.answer + item.trueAnswer"> </v-radio>
                <v-text-field
                  filled
                  dense
                  clearable
                  label="Ответ"
                  v-model="item.answer"
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-btn
                  class="mr-2 mt-2"
                  x-small
                  @click="deleteAnswer(item, question)"
                >
                  <v-icon>
                    mdi-delete
                  </v-icon>
                </v-btn>
              </v-row>
            </v-col>
          </v-radio-group>
        </v-card-text>
      </v-card>
    </v-col>
     <v-row class="mr-5 mb-2" no-gutters
          ><v-spacer></v-spacer>
          <v-btn depressed color="green" @click="saveChanges"
            >Сохранить все изменеия</v-btn
          ></v-row
        >
  </div>
</template>

<script>
import store from "../store";
export default {
  data: () => ({
    questions: [],
    dialogAddQuestion: false,
    dialogAddAnswer: false,
    questionModel: { name: "", answers: [] },
    answerModel:{id:0,answer:"",trueAnswer:false}
  }),
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.questions = store.getters.getQuestions;
    },
    deleteQuestion(obj) {
      this.questions = this.questions.filter((f) => f != obj);
    },
    deleteAnswer(obj, qe) {
      let answers = this.questions.find((f) => f == qe).answers;
      answers = answers.filter((f) => f != obj);
      this.questions.find((f) => f == qe).answers = answers;
    },
    answer(ques){
        //if(ques.answers.length==0)return "";
        let answ =  ques.answers.find(f=>f.trueAnswer==true);
        if(answ==null)return"";
        return answ.answer+ answ.trueAnswer;
    },
    saveChanges(){
        console.log("метод сохранения всех изменений");
    }
    
  },
  mounted:{
     
  }
};
</script>

<style lang="scss" scoped></style>
