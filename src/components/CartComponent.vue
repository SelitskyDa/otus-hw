<script setup>
import {defineEmits, onMounted, reactive} from "vue";

const itemsInCart = reactive([])

const emits = defineEmits(['buy'])

function clearCart () {
  itemsInCart.splice(0, itemsInCart.length)
  localStorage.setItem('cart', JSON.stringify([]))
}

function removeFromCart(id) {
  const index = itemsInCart.findIndex((item) => item.product.id === id)
  if (index > -1) {
    itemsInCart.splice(index, 1)
    localStorage.setItem('cart', JSON.stringify(itemsInCart))
  }
}

function changeQuantity(id, action) {
  const cartItem = itemsInCart.find((item) => item.product.id === id)
  if (cartItem) {
    if (action === '+' && cartItem.quantity >= 0) {
      cartItem.quantity++
    } else if (action === '-' && cartItem.quantity > 0) {
      cartItem.quantity--
    }
    if (cartItem.quantity === 0) {
      const index = itemsInCart.indexOf(cartItem)
      if (index > -1) {
        itemsInCart.splice(index, 1)
      }
    }
    localStorage.setItem('cart', JSON.stringify(itemsInCart))
  }
}

onMounted(() => {
  const localStorageCart = JSON.parse(localStorage.getItem('cart'))
  if (localStorageCart) {
    itemsInCart.push(...localStorageCart)
  }
})

</script>

<template>
  <div class="container">
    <h2 style="text-align: center; margin: 25px" v-if="itemsInCart.length === 0">Корзина пустая</h2>
    <div class="info" v-if="itemsInCart.length > 0">
      <v-btn @click="emits('buy', 'checkout')">Оформить заказ</v-btn>
      <v-btn @click="clearCart">Очистить корзину</v-btn>
    </div>
    <div class="block">
      <div class="card" v-for="i in itemsInCart">
        <img v-if="i.product.image" class="image" :src="`${i.product.image}`">
        <img v-else class="image" src="@/static/html_placeholder_01.jpg">
        <div class="about">
          <p class="title">{{i.product.title}}</p>
          <p class="price">{{i.product.price}}$</p>
        </div>
        <p style="margin-bottom: 15px;">Сумма: {{(i.product.price * i.quantity).toFixed(2) }}$</p>
        <div class="edit">
          <div style="display: flex; gap: 15px; align-items: center">
            <v-btn @click="changeQuantity(i.product.id, '-')">-</v-btn>
            <p>{{i.quantity}}</p>
            <v-btn @click="changeQuantity(i.product.id, '+')">+</v-btn>
          </div>
          <v-btn color="red" @click="removeFromCart(i.product.id)"><v-icon color="white">mdi-delete</v-icon></v-btn>
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
