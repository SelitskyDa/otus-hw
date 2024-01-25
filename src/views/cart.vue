<script setup>
import BuyForm from '@/components/BuyForm.vue'
import CartComponent from '@/components/CartComponent.vue'
import {ref} from "vue";

const step = ref('cart')

</script>

<template>
  <div class="page">
    <h1>Корзина</h1>
    <BuyForm v-if="step === 'checkout'"/>
    <cart-component v-if="step === 'cart'" @buy="step = $event"/>
  </div>
</template>

<style scoped>
.page {
  max-width: 1024px;
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
}
h1 {
  margin: 20px;
  text-align: center;
}
</style>
