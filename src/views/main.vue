<script setup>
import { ref, onMounted, reactive, inject} from 'vue'

import Products from '@/components/Products.vue'
import AddProduct from '@/components/AddProduct.vue'

import { fetchProducts } from '@/services/fetch'

const isLoading = ref(false)
const message = ref(null)
const responseData = ref(null)
const addMode = ref(false)
const itemsInCart = reactive([])

const search = inject('searchValue')

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

const snackbar = ref({
  show: false,
  text: ''
})

function showSnackbar(message) {
  snackbar.value.text = message
  snackbar.value.show = true
}

const addProductToCart = product => {
  if (!product?.id) {
    alert('извините, этого товара нет в наличии(нету id)')
    return
  }
  const newCartItem = {
    product: product,
    quantity: 1
  }
  const foundItemsInCart = itemsInCart.find(p => p.product.id === product.id)
  if (foundItemsInCart) {
    foundItemsInCart.quantity += 1
  } else {
    itemsInCart.push(newCartItem)
  }
  localStorage.setItem('cart', JSON.stringify(itemsInCart))
  showSnackbar(`Товар ${product.title} успешно добавлен в корзину`)
}

const deleteData = () => {
  responseData.value = null
}
const addData = () => {
  addMode.value = true
}
const add = (form) => {
  responseData.value.unshift(form.value)
  addMode.value = false
}
onMounted(() => {
  fetchData()
  if (!JSON.parse(localStorage.getItem('cart'))) {
    return
  }
  const localStorageCart = JSON.parse(localStorage.getItem('cart'))
  if (localStorageCart) {
    itemsInCart.push(...localStorageCart)
  }

})
</script>

<template>
  <div class="page">
    <v-snackbar v-model="snackbar.show" color="green">
      {{ snackbar.text }}
    </v-snackbar>
    <div v-if="!addMode">
      <v-btn v-if="responseData" @click="addData">добавить товар к списку</v-btn>
      <div v-if="!responseData" style="display: flex; justify-content: center;">
        <v-btn @click="fetchData" >
          Загрузить данные
        </v-btn>
      </div>
      <p v-if="isLoading">Загрузка...</p>
      <p v-if="message">Ошибка: {{ message }}</p>
      <Products v-if="responseData" :products="responseData" :search="search" @deleteEvent="deleteData" @addProductToCart="addProductToCart"/>
    </div>
    <div v-if="addMode">
      <p>форма добавления нового товара</p>
      <add-product @add="add" @cancel="addMode = false"/>
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
