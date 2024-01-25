<script setup>
import Product from '@/components/Product.vue'

import {onMounted, ref} from "vue"

import { fetchProduct } from '@/services/fetch'

const isLoading = ref(false)
const message = ref(null)
const responseData = ref(null)

const props = defineProps({
  id: String
})

const fetchData = async () => {
  isLoading.value = true

  try {
    const response = await fetchProduct(props.id)
    responseData.value = response.data
  } catch (error) {
    message.value = 'Что то пошло не так'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchData()
})

</script>

<template>
  <div class="page">
    <p v-if="isLoading" style="text-align: center">Зазгрука...</p>
    <Product v-if="responseData" :product="responseData"/>
  </div>
</template>

<style scoped lang="scss">
.page {
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  padding: 25px;
  display: flex;
  justify-content: center;
}
</style>
