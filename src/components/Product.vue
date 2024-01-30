<script setup>
import {reactive, ref} from "vue";
import {useCartStore} from "@/store/cart"

const props = defineProps({
  product: Object
})

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

</script>

<template>
  <div class="container">
    <v-snackbar v-model="snackbar.show" color="green">
      {{ snackbar.text }}
    </v-snackbar>
    <div class="card">
      <img v-if="props.product.image" class="image" :src="`${props.product.image}`">
      <img v-else class="image" src="@/static/html_placeholder_01.jpg">
      <div class="about">
        <p class="title"><b>{{props.product.title}}</b></p>
        <p>{{props.product.description }}</p>
        <p style="text-align: right">Цена: {{props.product.price}}$</p>
      </div>
      <p style="width: 100%; text-align: right; cursor: pointer; margin-top: 1rem" @click="addProductToCart(props.product)">добавить в корзину</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  display: flex;
  justify-content: center;
}
.title {
  width: 100%;
  text-align: center;
}
.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 35px;
}
.image {
  width: 320px;
  height: 320px;
}
.about {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
