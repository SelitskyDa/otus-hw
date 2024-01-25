<script setup>
import Header from '@/components/Header.vue'
import { ref, provide } from "vue"
import {useRoute} from 'vue-router'

const search = ref('')
const route = useRoute()

provide('searchValue', search)

const searchEvent = (text) => {
  search.value = text
}
</script>

<template>
  <Header @searchEvent="searchEvent" v-if="route.name !== 'auth'"/>
  <router-view></router-view>
</template>

<style scoped>
</style>
