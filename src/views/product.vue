<script setup>
import Product from '@/components/Product.vue'

import {onMounted, ref} from "vue"

import {useAppStore} from "@/store/app"
import {useProductsStore} from "@/store/products"

const appStore = useAppStore()
const productsStore = useProductsStore()

const props = defineProps({
  id: String
})

onMounted(() => {
  productsStore.getProducts(props.id)
})

</script>

<template>
  <div class="page">
    <p v-if="appStore.isLoading" style="text-align: center">Зазгрука...</p>
    <Product :product="productsStore.productsState.currentProduct"/>
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
