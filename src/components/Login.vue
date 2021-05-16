<template>
  <div>
    <v-dialog fullscreen v-model="dialog">
      <v-card class="login">
        <v-card-title> </v-card-title>
        <v-card-text>
          <v-row class="mb-6">
            <v-col class="mb-10" cols="12"></v-col>
            <v-col class="mb-10" cols="12"></v-col>
            <v-col class="mb-10" cols="12"></v-col>
            <v-col class="mb-10" cols="12"></v-col>
            <v-col class="mb-10" cols="12"></v-col>
            <v-col></v-col>
            <v-col>
              <v-card style="max-width:700px">
                <v-container style="padding:50px">
                <v-card-title >
                  <v-row
                    ><v-col align="start"> <h1>Войти</h1></v-col></v-row
                  >
                </v-card-title>
                <v-card-subtitle  
                  ><v-row justify="start"
                    ><v-col align="start">Добро пожаловать!</v-col></v-row
                  ></v-card-subtitle
                >
                <v-card-text >
                  <v-text-field
                    label="Почта"
                    filled
                    required
                    v-model="email"
                    type="email"
                    placeholder="Name"
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    filled
                    :type="showPassword ? 'text' : 'password'"
                    name="input-10-1"
                    label="Пароль"
                    counter
                    @click:append="showPassword = !showPassword"
                  ></v-text-field>

                  <v-row
                    ><v-col>
                      <v-btn type="submit" large color="error" dark>
                        Войти</v-btn
                      >
                    </v-col></v-row
                  >
                </v-card-text>
                </v-container>
               
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPassword: false,
      dialog: true,
      email: "",
      password: "",
    };
  },
  methods: {
    login: function() {
      let email = this.email;
      let password = this.password;
      this.$store
        .dispatch("login", { email, password })
        .then(() => this.$router.push("/"))
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  background: url("../images/combine.jpg") no-repeat center center fixed !important;
  background-size: cover;
}
</style>
