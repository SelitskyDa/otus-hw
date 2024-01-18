<script setup>
import { ref } from 'vue'

import Products from './components/Products.vue'
import Header from './components/Header.vue'
import BuyForm from './components/BuyForm.vue'
import AddProduct from './components/AddProduct.vue'

import { fetchProducts } from './services/fetch'

const isLoading = ref(false)
const message = ref(null)
const responseData = ref(null)
const search = ref('')
const sellMode = ref(false)
const addMode = ref(false)
const order = ref([])

const fetchData = async () => {
  isLoading.value = true

  try {
    const response = await fetchProducts()
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
const searchEvent = (text) => {
  search.value = text
}
const success = () => {
  sellMode.value = false
  alert('Спасибо за покупку')
}
const addData = () => {
  addMode.value = true
}
const add = (form) => {
  responseData.value.unshift(form.value)
  addMode.value = false
}
const buyProduct = (i) => {
  sellMode.value = true
  order.value = i
}
fetchData();
</script>

<template>
    <Header @searchEvent="searchEvent" />
    <div class="page">
      <div v-if="!sellMode && !addMode">
        <v-btn v-if="responseData" @click="addData">добавить товар к списку</v-btn>
        <div v-if="!responseData" style="display: flex; justify-content: center;">
          <v-btn @click="fetchData" >
            Загрузить данные
          </v-btn>
        </div>
        <p v-if="isLoading">Загрузка...</p>
        <p v-if="message">Ошибка: {{ message }}</p>
        <Products v-if="responseData" :products="responseData" @deleteEvent="deleteData" @buyProduct="buyProduct" :search="search"/>
      </div>
      <div v-if="!addMode && sellMode">
        <p>Вы собираетесь купить:
          {{order.title}} за {{order.price}}$</p>
        <img style="width: 100px" :src="`${order.image}`">
        <buy-form @success="success" />
      </div>
      <div v-if="addMode && !sellMode">
        <p>форма добавления нового товара</p>
        <add-product @add="add"/>
      </div>
  </div>

</template>

<style scoped>
.page {
  width: 100%;
  display: flex;
  flex-direction: column;
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
}
</style>
