<script setup>
import {ref} from 'vue'
import { useRouter } from 'vue-router'
import {useUserStore} from "@/store/user"

const userStore = useUserStore()
const login = ref('')
const password = ref('')
const router = useRouter()


const required = value => !!value || 'Поле обязательно для заполнения'

const loginRules = [required]
const passwordRules = [required]

function auth() {
  const isValid = loginRules.every(rule => rule(login.value) === true) &&
      passwordRules.every(rule => rule(password.value) === true)

  if (!isValid) {
    return
  }

  const user = {
    login: login.value,
    password: password.value
  }
  userStore.setUser(user)
  localStorage.setItem('user', JSON.stringify(user))
  router.push({name: 'main'})
}
</script>

<template>
  <div class="page">
    <div class="block">
      любые логин и пароль
      <v-text-field
          v-model="login"
          :rules="loginRules"
          label="Ваш логин"
          single-line
          variant="outlined"
          hide-details="auto"
      ></v-text-field>
      <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="Ваш пароль"
          single-line
          variant="outlined"
          hide-details="auto"
      ></v-text-field>
      <v-btn @click="auth">Войти</v-btn>
    </div>
  </div>
</template>

<style scoped>
.page {
  width: 100%;
  height: 100vh;
  max-width: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
}
.block {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 25px;
}
</style>
