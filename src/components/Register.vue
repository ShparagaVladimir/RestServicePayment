<template>
  <div >
    <h4>Регистрация</h4>
    <form @submit.prevent="register" >
      <v-container style="max-width:400px">
        <label for="name">Имя</label>
        <div>
          <v-text-field
            id="name"
            type="text"
            v-model="name"
            required
            autofocus
          />
        </div>

        <label for="email">Почта</label>
        <div>
          <v-text-field id="email" type="email" v-model="email" required />
        </div>

        <label for="password">Пароль</label>
        <div>
          <v-text-field
            id="password"
            type="password"
            v-model="password"
            required
          />
        </div>

        <label for="password-confirm">Повторите пароль</label>
        <div>
          <v-text-field
            id="password-confirm"
            type="password"
            v-model="password_confirmation"
            required
          />
        </div>
        <div>
          <v-btn type="submit">Регистрация</v-btn>
        </div>
      </v-container>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      is_admin: null,
    };
  },
  methods: {
    register: function() {
      let data = {
        name: this.name,
        email: this.email,
        password: this.password,
        is_admin: this.is_admin,
      };
      this.$store
        .dispatch("register", data)
        .then(() => this.$router.push("/"))
        .catch((err) => console.log(err));
    },
  },
};
</script>
