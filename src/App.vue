<script setup>
import Products from './components/Products.vue'
import { ref } from 'vue'
import axios from 'axios'

const isLoading = ref(false)
const message = ref(null)
const responseData = ref(null)

const fetchData = async () => {
  isLoading.value = true

  try {
    const response = await axios.get('https://fakestoreapi.com/products')
    responseData.value = response.data
  } catch (error) {
    message.value = 'Что то пошло не так'
  } finally {
    isLoading.value = false
  }
}
const deleteData = () => {
  responseData.value = null
}
</script>

<template>
  <div>
    <button @click="fetchData" v-if="!responseData">Загрузить данные</button>
    <p v-if="isLoading">Загрузка...</p>
    <p v-if="message">Ошибка: {{ message }}</p>
    <div v-if="!isLoading && responseData">
      <p>Данные успешно загружены:</p>
    </div>
  </div>
  <Products msg="Товары" :products="responseData" @deleteEvent="deleteData"/>
</template>

<style scoped>
</style>
