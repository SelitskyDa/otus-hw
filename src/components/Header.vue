<script setup>
import { ref, defineEmits } from 'vue'

const emits = defineEmits(['searchEvent'])

const search = ref('')

function filter() {
  emits('searchEvent', search.value)
}

</script>

<template>
  <header>
    <img src="@/static/OTUS.svg" />
    <v-text-field
        v-model="search"
        label="Поиск по цене или названию"
        single-line
        :clearable="true"
        variant="outlined"
        hide-details
        @keyup.enter="filter"
        @click:clear="filter"
    ></v-text-field>
  </header>
</template>

<style scoped>
header {
  width: 100%;
  background-color: #fff;
  box-shadow: 0 4px 4px rgba(0,0,0,.05);
  padding: 0.5rem 2rem;
  display: flex;
  gap: 3rem;
}
img {
  width: 82px;
}
</style>
