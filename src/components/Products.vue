<script setup>
import { defineEmits } from 'vue'

const emits = defineEmits(['deleteEvent'])

defineProps({
  msg: String,
  products: Object
})
const deleteAllData = () => {
  emits('deleteEvent')
}
</script>

<template>
  <h1>{{ msg }}</h1>
  <div class="container">
    <button @click="deleteAllData" v-if="products">удалить все товары</button>
    <div v-for="i in products" class="block">
      <p>{{i.id}}</p>
      <p class="title">{{i.title}}</p>
      <p class="price">{{i.price}}</p>
    </div>
  </div>

</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
.block {
  display: flex;
  gap: 10px;
  align-items: center;
}
.title {
  max-width: 250px;
  text-align: center;
  width: 100%;
}
</style>
