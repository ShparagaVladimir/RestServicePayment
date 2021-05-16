<template>
  <div>
    <h1>Статистика</h1>
    <v-card class="mt-5">
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Поиск"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>

      <v-data-table :headers="headers" :items="desserts" :search="search">
        <template v-slot:item.average="{ item }">
          <v-chip :color="getColor(item.average)" dark>
            {{ item.average }}
          </v-chip>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn @click="(dialogInfo = true), Object.assign(infoItem, item)">
            <v-icon>
              mdi-book-information-variant
            </v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog max-width="600" v-model="dialogInfo">
      <v-card>
        <v-card-title>
          Подробноя информация о пройденных курсах
        </v-card-title>
        <v-card-text>
          <v-col v-for="item in courseUser" :key="item">
            <v-row>
              {{ item.course+"----->" }}
              <v-chip :color="getColor(item.amount)" dark>
                {{ item.amount }}
              </v-chip>
            </v-row>
          </v-col>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    search: "",
    dialogInfo: false,
    infoItem: {},
    headers: [
      {
        text: "ФИО",
        align: "start",
        filterable: false,
        value: "fio",
      },
      { text: "Логин", value: "login" },
      { text: "Пройдено курсов", value: "courseComplete" },
      { text: "Средняя оценка", value: "average" },
      { text: "Дата входа", value: "dateIn" },
      { text: "", value: "actions" },
    ],
    desserts: [
      {
        fio: "Тестовый пользователь",
        email: "email@.com",
        courseComplete: 1,
        average: 88,
        dateIn: new Date().toLocaleString(),
      },
    ],
    courseUser: [
      {
        course: "Арготроник",
        amount: "74",
      },
      {
        course: "РСМ Карта урожайности",
        amount: "89",
      },
    ],
  }),
  methods: {
    getColor(average) {
      if (average < 50) return "red";
      else if (average > 50 && average < 75) return "orange";
      else return "green";
    },
  },
};
</script>

<style lang="scss" scoped></style>
