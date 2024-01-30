<script setup>
import {defineEmits} from "vue";

import {useCartStore} from "@/store/cart"

const emits = defineEmits(['buy'])

const cartStore = useCartStore()

</script>

<template>
  <div class="container">
    <h2 style="text-align: center; margin: 25px" v-if="cartStore.cartState.inCart.length === 0">Корзина пустая</h2>
    <div class="info" v-if="cartStore.cartState.inCart.length > 0">
      <v-btn @click="emits('buy', 'checkout')">Оформить заказ</v-btn>
      <v-btn @click="cartStore.clearCart">Очистить корзину</v-btn>
    </div>
    <p style="margin: 25px">Сумма вашего заказа: {{cartStore.totalSum.toFixed(2)}}$</p>
    <div class="block">
      <div class="card" v-for="i in cartStore.cartState.inCart">
        <img v-if="i.image" class="image" :src="`${i.image}`">
        <img v-else class="image" src="@/static/html_placeholder_01.jpg">
        <div class="about">
          <p class="title">{{i.title}}</p>
          <p class="price">{{i.price}}$</p>
        </div>
        <p style="margin-bottom: 15px;">Сумма: {{(i.price * i.count).toFixed(2) }}$</p>
        <div class="edit">
          <div style="display: flex; gap: 15px; align-items: center">
            <v-btn @click="cartStore.changeCount(i.id, '-')">-</v-btn>
            <p>{{i.count}}</p>
            <v-btn @click="cartStore.changeCount(i.id, '+')">+</v-btn>
          </div>
          <v-btn color="red" @click="cartStore.removeFromCart(i.id)"><v-icon color="white">mdi-delete</v-icon></v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
.info {
  display: flex;
  align-items: center;
  gap: 15px;
}
.block {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}
.edit {
  display: flex;
  align-self: flex-end;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
}
.title {
  max-width: 200px;
  width: 100%;
}
.image {
  width: 200px;
  height: 200px;
}
.about {
  display: flex;
  gap: 20px;
  margin-bottom: 15px;
}
</style>
