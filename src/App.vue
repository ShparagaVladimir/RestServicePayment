<template>
  <!-- App.vue -->

  <v-app>
    <v-navigation-drawer app permanent expand-on-hover>
      <v-list nav dense>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <v-list-item>
            <v-list-item-icon style="margin-left:0px">
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <router-link to="/">Главная </router-link>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon style="margin-left:0px">
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <router-link to="/account"> Аккаунт</router-link>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon style="margin-left:0px">
              <v-icon>mdi-account-group-outline</v-icon>
            </v-list-item-icon>
            <router-link to="/statistic"> Статистика</router-link>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app
      ><!-- color="#C62828" -->
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-row no-gutters>
        <v-col>
          <v-row
            ><v-text-field
              class="mt-8 ml-15"
              dense
              outlined
              append-icon="mdi-magnify"
              color="primary"
              label="Поиск курса"
            ></v-text-field> </v-row
        ></v-col>
      </v-row>
      <v-spacer></v-spacer>
      <v-menu bottom left style="margin-right:15px">
        <template v-slot:activator="{ on, attrs }">
          <div style="margin-top: 5px;">
            <v-avatar>
              <img
                v-bind="attrs"
                v-on="on"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ86FKyBDVz7z-HykV_HJDAvVIRYG251rwQhw&usqp=CAU"
                alt="John"
              />
            </v-avatar>
            <span>Тестовый пользователь</span>
          </div>
        </template>
        <v-list>
          <div v-if="!isLoggedIn">
            <v-list-item @click="logged_Registred(true)"
              >Авторизация</v-list-item
            >
            <v-list-item @click="logged_Registred(false)"
              >Регистрация</v-list-item
            >
          </div>
          <div v-if="isLoggedIn">
            <v-list-item><v-btn>Аккаунт</v-btn></v-list-item>
            <v-list-item><v-btn>Настройки</v-btn></v-list-item>
          </div>
        </v-list>
      </v-menu>
      <!-- -->
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main left>
      <!-- Provides the application the proper gutter -->
      <v-container fluid style="padding:0px">
        <router-view></router-view>
      </v-container>
    </v-main>
    <div id="app"></div>
    <v-footer app color="#C62828">
      <!-- -->
    </v-footer>
  </v-app>
</template>
<script>
import store from "./store";
export default {
  data: () => ({ messagesCount: 0, drawer: null }),
  created() {
    this.initialize();
  },
  computed: {
    isLoggedIn: {
      get() {
        console.log(store.getters.isLoggedIn);
        return store.getters.isLoggedIn;
      },
      messages: {
        get() {
          console.log(store.getters.messages);
          return store.getters.messages.length;
        },
      },
    },
  },
  methods: {
    initialize() {
      this.messagesCount = store.getters.messages.length;
    },
    logged_Registred(isLogIn = false) {
      isLogIn ? this.$router.push("/login") : this.$router.push("/register");
    },
    getMessages() {
      console.log(store.getters.messages);
      return store.getters.messages;
    },
  },
};
</script>
<style lang="scss" scoped>
#app {
  //background: url("images/161.jpg") no-repeat center center fixed !important;
  background-size: cover;
  background-color: rgb(171, 192, 212);

  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #081d33;
}
</style>
