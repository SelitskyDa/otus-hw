<script setup>
import {ref, defineEmits} from 'vue'
import { logout } from '@/services/auth'
import {useCartStore} from "@/store/cart"
import {useUserStore} from "@/store/user"

const emits = defineEmits(['searchEvent'])
import {useRoute, useRouter} from 'vue-router'

const cartStore = useCartStore()
const userStore = useUserStore()

const route = useRoute()
const router = useRouter()

const search = ref('')

function filter() {
  emits('searchEvent', search.value)
}
function logoutUser () {
  logout()
  router.push({name: 'auth'})
}

</script>

<template>
  <header>
    <img src="@/static/OTUS.svg" style="cursor:pointer;" @click="$router.push({ name: 'main' })"/>
    <v-text-field
        v-if="route.name === 'main'"
        v-model="search"
        label="Поиск по цене или названию"
        single-line
        :clearable="true"
        variant="outlined"
        hide-details
        @keyup.enter="filter"
        @click:clear="filter"
    ></v-text-field>
    <div style="display: flex; gap: 15px">
      <p v-if="userStore.user?.login"><v-icon color="black">mdi-linux</v-icon>{{userStore.user.login}}</p>
      <router-link :to="{ name: 'cart' }">Корзина({{cartStore.totalCount}})</router-link>
      <p @click="logoutUser"><v-icon color="black">mdi-exit-to-app</v-icon>выйти</p>
    </div>
  </header>
</template>

<style scoped>
header {
  width: 100%;
  background-color: #fff;
  box-shadow: 0 4px 4px rgba(0,0,0,.05);
  padding: 0.5rem 2rem;
  display: flex;
  align-items: center;
  gap: 3rem;
  justify-content: space-between;
  min-height: 72px;
}
img {
  width: 82px;
}
</style>
