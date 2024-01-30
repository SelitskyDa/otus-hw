<script setup>
import Header from '@/components/Header.vue'
import {ref, provide, onMounted} from "vue"
import {useRoute} from 'vue-router'
import {useCartStore} from "@/store/cart"
import {useUserStore} from "@/store/user"

const cartStore = useCartStore()
const userStore = useUserStore()


const search = ref('')
const route = useRoute()

provide('searchValue', search)

const searchEvent = (text) => {
  search.value = text
}
onMounted(() => {
  cartStore.loadCartFromLocalStorage()
  userStore.loadUserFromLocalStorage()
})
</script>

<template>
  <Header @searchEvent="searchEvent" v-if="route.name !== 'auth'"/>
  <router-view></router-view>
</template>

<style scoped>
</style>
