<script setup>
import { ref, onMounted, reactive, inject} from 'vue'

import Products from '@/components/Products.vue'
import AddProduct from '@/components/AddProduct.vue'

import {useAppStore} from "@/store/app"
import {useProductsStore} from "@/store/products"
import {useCartStore} from "@/store/cart"

const addMode = ref(false)

const search = inject('searchValue')

const appStore = useAppStore()
const productsStore = useProductsStore()
const cartStore = useCartStore()

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
  cartStore.addToCart(product, 1)
  showSnackbar(`Товар ${product.title} успешно добавлен в корзину`)
}

const deleteData = () => {
  productsStore.clearProducts()
}
const addData = () => {
  addMode.value = true
}
function add (form) {
  productsStore.addProduct(form.value)
  addMode.value = false
}
onMounted(() => {
  productsStore.getProducts()
})
</script>

<template>
  <div class="page">
    <v-snackbar v-model="snackbar.show" color="green">
      {{ snackbar.text }}
    </v-snackbar>
    <div v-if="!addMode">
      <v-btn v-if="productsStore.isNotEmptyProducts" @click="addData">добавить товар к списку</v-btn>
      <div v-if="!productsStore.isNotEmptyProducts && !appStore.isLoading" style="display: flex; justify-content: center;">
        <v-btn @click="productsStore.getProducts()" >
          Загрузить данные
        </v-btn>
      </div>
      <p v-if="appStore.isLoading">Загрузка...</p>
      <p v-if="productsStore.message">Ошибка: {{ productsStore.message }}</p>
      <Products v-if="productsStore.isNotEmptyProducts" :products="productsStore.productsState.products" :search="search" @deleteEvent="deleteData" @addProductToCart="addProductToCart"/>
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
