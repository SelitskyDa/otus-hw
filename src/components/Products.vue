<script setup>
import { computed } from 'vue'

const emits = defineEmits(['deleteEvent', 'buyProduct'])

const props = defineProps({
  msg: String,
  products: Object,
  search: [String, Number]
})
const deleteAllData = () => {
  emits('deleteEvent')
}
const buyProduct = (i) => {
  emits('buyProduct', i)
}
const filteredProducts = computed(() => {
  const parseSearch = parseFloat(props.search)
  if (props.search === '' || props.search === null) {
    return props.products
  }

  const isNumber = !isNaN(parseSearch) && isFinite(props.search)

  if (isNumber) {
    const searchNumber = parseSearch
    return props.products.filter(product =>
        product.price === searchNumber
    )
  } else {
    const searchString = props.search.toLowerCase()
    return props.products.filter(product =>
        product.title.toLowerCase().includes(searchString)
    )
  }
})
</script>

<template>
  <v-btn @click="deleteAllData" v-if="products">удалить все товары</v-btn>
  <div class="block">
    <div v-for="(i, index) in filteredProducts" class="card" :key="index" >
      <img v-if="i.image" class="image" :src="`${i.image}`">
      <img v-else class="image" src="@/static/html_placeholder_01.jpg">
      <div class="about">
        <p class="title">{{i.title}}</p>
        <p class="price">{{i.price}}$</p>
      </div>
      <p style="width: 100%; text-align: right; cursor: pointer; margin-top: 1rem" @click="buyProduct(i)">заказать</p>
    </div>
  </div>

</template>

<style scoped>
.block {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: space-between;
}
.title {
  max-width: 250px;
  width: 100%;
}
.card {
}
.image {
  width: 320px;
  height: 320px;
}
.about {
  display: flex;
  gap: 20px;
}
</style>
