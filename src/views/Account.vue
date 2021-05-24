<template>
  <div class="about">
    <h1>Аккаунт</h1>
    <!-- <v-card class="mx-auto" max-width="800" color="#edeff1" outlined>
      <div class="row">
        <div class="col-auto">
          <v-img
            class="rounded-lg"
            lazy-src="https://cdn.vuetifyjs.com/images/john.jpg"
            max-height="250"
            max-width="250"
            style="margin='5px'"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ86FKyBDVz7z-HykV_HJDAvVIRYG251rwQhw&usqp=CAU"
          ></v-img>
        </div>
        <div>
          <v-row style="margin-top:5px">
            <v-col>
              <v-text-field
                v-model="user.family"
                label="Фамилия"
                required
              ></v-text-field>
            </v-col>

            <v-col>
              <v-text-field
                v-model="user.firstName"
                label="Имя"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="user.lastName"
                label="Отчество"
                required
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="user.email"
                label="E-mail"
                required
              ></v-text-field> </v-col
          ></v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="user.razryad"
                label="Разряд"
                required
              ></v-text-field> </v-col
          ></v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="user.role"
               
                label="Роль"
                required
              ></v-text-field> </v-col
          ></v-row>
        </div>
      </div>
    </v-card> -->
    <v-card class="mt-5">
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Поиск"
          single-line
          hide-details
        ></v-text-field>
        <v-btn color="primary" dark class="mb-2" @click="dialog = true">
          Добавить пользователя
        </v-btn>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :search="search"
        style="margin:5px"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ `Добавление пользователя` }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.family"
                  label="Фамилия"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.fName"
                  label="Имя"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.lName"
                  label="Отчество"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="editedItem.email"
                  label="Email"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="editedItem.login"
                  label="Логин"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="editedItem.razryad"
                  label="Разряд"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  :items="roles"
                  v-model="editedItem.role"
                  label="Роль"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Отмена
          </v-btn>
          <v-btn color="success darken-1" text @click="save">
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import store from "../store";
export default {
  data: () => ({
    roles: ["Администратор", "Обучающийся"],
    search: "",
    dialog: false,
    editedItem: { fio: "", login: "", email: "", dateIn: "" },
    headers: [
      {
        text: "ФИО",
        align: "start",
        filterable: false,
        value: "fio",
      },
      { text: "Email", value: "email" },
      { text: "Логин", value: "login" },
      { text: "Разряд", value: "razryad" },
      { text: "Роль", value: "role" },
      { text: "Дата входа", value: "dateIn" },
      { text: "", value: "actions" },
    ],
    desserts: [
      {
        fio: "Тестовый пользователь",
        email: "email@.com",
        login: "testUser",
        razryad: 3,
        dateIn: new Date().toLocaleString(),
        role:"Администратор"
      },
    ],
    user: {},
  }),
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.user = Object.assign({}, store.getters.userModel);
    },
    editItem(item) {
      this.dialog = true;
      this.editItem = item;
      console.log(item);
    },
    deleteItem(item) {
      this.desserts.splice(this.desserts.indexOf(item), 1);
    },
    save() {
      this.desserts.push(this.editedItem);
    },
  },
};
</script>

<style></style>
}
